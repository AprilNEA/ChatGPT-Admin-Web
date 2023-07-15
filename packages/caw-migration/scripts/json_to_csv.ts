import {
  Duration,
  InvitationCode as OldInvitationCode,
  ms,
  Order as OldOrder,
  Plan as OldPlan,
  User as OldUser,
} from "database-old";
import { loadJson } from "../utils/json";
import { saveCsv } from "../utils/csv";
import {
  InvitationCode,
  InvitationRecord,
  Limits,
  Model,
  Order,
  OrderStatus,
  Plan,
  Prices,
  Redeem,
  Role,
  Subscription,
  User,
} from "@caw/database";
import { deepDistinct, distinctBy, firstCharUpperCase } from "../utils/common";

const userEntries = await loadJson<OldUser>("users");
const planEntries = await loadJson<OldPlan>("plans");
const orderEntries = await loadJson<OldOrder>("orders");
const invitationCodeEntries = await loadJson<OldInvitationCode>(
  "invitationCodes",
);

// Roles
const roles: Role[] = deepDistinct(
  userEntries
    .map(({ value }) => value.role),
)
  .map((name, id) => ({ id, name }));

const queryRoleByName = (name: string) => {
  const role = roles.find(({ name: roleName }) => roleName === name);
  if (!role) {
    throw new Error(`Role with name ${name} not found`);
  }
  return role;
};

// Users
const users: User[] = distinctBy(userEntries, ({ key }) => key.toLowerCase())
  .map(({
    key,
    value: {
      passwordHash,
      phone,
      resetChances,
      createdAt,
      isBlocked,
      role,
    },
  }, userId) => ({
    userId,
    email: key.split(":")[1].toLowerCase(),
    name: null,
    passwordHash,
    phone: phone ?? null,
    roleId: queryRoleByName(role).id,
    resetChances,
    createdAt: new Date(createdAt),
    updatedAt: new Date(createdAt),
    isBlocked,
  }));

const userEmailMap: Map<string, User> = new Map(
  users.map((user) => [user.email!, user]),
);

const queryUserByEmail = (email: string) => {
  const user = userEmailMap.get(email.toLowerCase());
  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }
  return user;
};

// Plans
const plans: Plan[] = planEntries
  .map(({ key }, planId) => ({
    planId,
    name: key.split(":")[1],
    features: [],
  }));

const queryPlanByName = (name: string) => {
  const plan = plans.find(({ name: planName }) => planName === name);
  if (!plan) {
    throw new Error(`Plan with name ${name} not found`);
  }
  return plan;
};

// Prices
const durationToSeconds: Record<string, number> = {
  monthly: 30 * 24 * 60 * 60,
  quarterly: 3 * 30 * 24 * 60 * 60,
  yearly: 365 * 24 * 60 * 60,
};

const findNameByDuration = (duration: number) =>
  Object.entries(durationToSeconds)
    .find(([, seconds]) => seconds === duration)?.[0] ?? "monthly";

const prices: Prices[] = planEntries
  .flatMap(({ value: { prices } }, planId) =>
    Object.entries(prices)
      .map(([duration, amount]) => ({
        name: duration,
        amount: amount * 100, // Convert to cents
        duration: durationToSeconds[duration]!,
        isCurrent: true,
        planId,
      }))
  )
  .map((prices, id) => ({ id, ...prices }));

const queryOrCreatePriceByAmount = (
  amount: number,
  creationInfo?: Pick<Prices, "name" | "planId">,
): Prices => {
  const price = prices.find(({ amount: priceAmount }) =>
    priceAmount === amount
  );
  if (price) return price;
  if (!creationInfo) throw new Error("Price creation info not provided");

  const priceId = prices.length;
  prices.push({
    id: priceId,
    name: creationInfo.name,
    amount,
    duration: durationToSeconds[creationInfo.name]!,
    isCurrent: false,
    planId: creationInfo.planId,
  });
  return prices[priceId];
};

// Models
const modelNames = deepDistinct(planEntries.flatMap(
  ({ value: { limits } }) => Object.keys(limits),
));

const models: Model[] = modelNames.map((modelName, modelId) => ({
  modelId,
  modelName,
  unitPrice: 0, // unitPrice = 0 is a placeholder
}));

// Limits
const limits: Limits[] = planEntries
  .flatMap(({ value: { limits } }, planId) =>
    Object.entries(limits)
      .map(([modelName, { limit, window }]) => ({
        times: limit,
        duration: ms(window as Duration) / 1000, // Convert the duration to seconds
        planId: planId,
        modelId: modelNames.findIndex((name) => name === modelName),
        modelName: modelName,
      }))
  )
  .map((limits, id) => ({ id, ...limits }));

// Orders
const userSubscriptions = userEntries
  .flatMap(({ value: { subscriptions } }) => subscriptions);

const orderIdToDuration = new Map(
  userSubscriptions.map((
    { startsAt, endsAt, tradeOrderId },
  ) => [tradeOrderId, (endsAt - startsAt) / 1000]),
);

const queryDurationByOrderId = (orderId: string) =>
  orderIdToDuration.get(orderId) ?? durationToSeconds.monthly;

const orders: Order[] = orderEntries
  .map((
    { key, value: { status, count, totalCents, email, createdAt, plan } },
  ) => ({
    orderId: key.split(":")[1],
    count,
    amount: totalCents * 100, // A previous bug caused the totalCents actually not in cents
    status: firstCharUpperCase(status) as OrderStatus,
    userId: queryUserByEmail(email).userId,
    createdAt: new Date(createdAt),
    updatedAt: new Date(createdAt),
    priceId: queryOrCreatePriceByAmount(totalCents * 100 / count, {
      name: findNameByDuration(queryDurationByOrderId(key.split(":")[1])!),
      planId: queryPlanByName(plan).planId,
    }).id,
  }));

// InvitationCodes
const invitationCodes: InvitationCode[] = invitationCodeEntries
  .filter(({ value: { inviterEmail } }) => !!inviterEmail)
  .flatMap(({ key, value: { inviterEmail } }) => {
    try {
      return {
        code: key.split(":")[1],
        ownerId: queryUserByEmail(inviterEmail).userId,
      };
    } catch (e) {
      if (e instanceof Error) {
        console.warn(key, e.message);
      }
      return [];
    }
  });

// InvitationRecords
const invitationRecords: InvitationRecord[] = invitationCodeEntries
  .filter(({ value: { inviterEmail } }) => !!inviterEmail)
  .flatMap(({ key, value: { inviteeEmails, inviterEmail } }) => {
    try {
      const code = key.split(":")[1];
      const inviterId = queryUserByEmail(inviterEmail).userId;

      return inviteeEmails.map((inviteeEmail) => ({
        id: crypto.randomUUID(),
        inviterId,
        inviteeId: queryUserByEmail(inviteeEmail).userId,
        code,
      }));
    } catch (e) {
      if (e instanceof Error) {
        console.warn(key, e.message);
      }
      return [];
    }
  });

// Redeem
const redeemSubscriptions = userEntries.map((entry) => {
  const paidSubscription = entry.value.subscriptions
    .filter(({ tradeOrderId }) => isNaN(parseInt(tradeOrderId)));
  const newEntry = {
    ...entry,
    value: { ...entry.value, subscriptions: paidSubscription },
  };
  return newEntry;
});

const redeems: Redeem[] = distinctBy(
  redeemSubscriptions.flatMap(
    ({ key, value: { subscriptions } }) => {
      try {
        const userId = queryUserByEmail(key.split(":")[1]).userId;

        return subscriptions
          .map(({ startsAt, tradeOrderId, plan }) => ({
            redeemCode: tradeOrderId,
            isActivated: true,
            createdAt: new Date(startsAt),
            activatedAt: new Date(startsAt),
            activatedBy: userId,
            planId: queryPlanByName(plan).planId,
          }));
      } catch (e) {
        if (e instanceof Error) {
          console.warn(key, e.message);
        }
        return [];
      }
    },
  ),
  ({ redeemCode }) => redeemCode,
);

// Subscriptions
const paidSubscriptions = userEntries.map((entry) => {
  const paidSubscription = entry.value.subscriptions
    .filter(({ tradeOrderId }) => !isNaN(parseInt(tradeOrderId)));
  const newEntry = {
    ...entry,
    value: { ...entry.value, subscriptions: paidSubscription },
  };
  return newEntry;
});

const rawSubscriptions: Subscription[] = paidSubscriptions
  .flatMap(({ key, value: { subscriptions } }) => {
    try {
      const userId = queryUserByEmail(key.split(":")[1]).userId;

      return subscriptions.map(({ startsAt, endsAt, tradeOrderId, plan }) => ({
        subscriptionId: crypto.randomUUID(),
        createdAt: new Date(startsAt),
        expiredAt: new Date(endsAt),
        redeemCode: null,
        orderId: tradeOrderId,
        planId: queryPlanByName(plan).planId,
        userId,
      }));
    } catch (e) {
      if (e instanceof Error) {
        console.warn(key, e.message);
      }
      return [];
    }
  });

const orderIdToSubscription = new Map<string, Subscription>();
for (const subscription of rawSubscriptions) {
  const key = subscription.orderId ?? crypto.randomUUID();
  if (orderIdToSubscription.has(key)) {
    const oldSubscription = orderIdToSubscription.get(key)!;
    const newSubscription: Subscription = {
      ...subscription,
      createdAt: oldSubscription.createdAt < subscription.createdAt
        ? oldSubscription.createdAt
        : subscription.createdAt,
      expiredAt: oldSubscription.expiredAt > subscription.expiredAt
        ? oldSubscription.expiredAt
        : subscription.expiredAt,
      redeemCode: oldSubscription.redeemCode ?? subscription.redeemCode ?? null,
    };
    orderIdToSubscription.set(key, newSubscription);
  } else {
    orderIdToSubscription.set(key, subscription);
  }
}

const subscriptions = Array.from(orderIdToSubscription.values());

await saveCsv("roles", roles);
await saveCsv("users", users);
await saveCsv("plans", plans);
await saveCsv("prices", prices);
await saveCsv("models", models);
await saveCsv("limits", limits);
await saveCsv("orders", orders);
await saveCsv("invitationCodes", invitationCodes);
await saveCsv("invitationRecords", invitationRecords);
await saveCsv("redeems", redeems);
await saveCsv("subscriptions", subscriptions);
