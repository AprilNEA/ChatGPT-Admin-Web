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
  .map((name, id) => ({ name, id }));

const queryRoleByName = (name: string) => {
  const role = roles.find(({ name: roleName }) => roleName === name);
  if (!role) {
    throw new Error(`Role with name ${name} not found`);
  }
  return role;
};

await saveCsv("roles", roles);

// Users
const users: User[] = distinctBy(userEntries, ({ key }) => key.toUpperCase())
  .map(({
    key,
    value: {
      name,
      passwordHash,
      phone,
      resetChances,
      createdAt,
      isBlocked,
      role,
    },
  }, userId) => ({
    userId,
    email: key.split(":")[1],
    name,
    passwordHash,
    phone: phone ?? null,
    resetChances,
    createdAt: new Date(createdAt),
    updatedAt: new Date(createdAt),
    isBlocked,
    roleId: queryRoleByName(role).id,
  }));

const userEmailMap: Map<string, User> = new Map(
  users.map((user) => [user.email!.toLowerCase(), user]),
);

const queryUserByEmail = (email: string) => {
  const user = userEmailMap.get(email.toLowerCase());
  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }
  return user;
};

await saveCsv("users", users);

// Plans
const plans: Plan[] = planEntries
  .map(({ key }, planId) => ({ planId, name: key.split(":")[1] }));

const queryPlanByName = (name: string) => {
  const plan = plans.find(({ name: planName }) => planName === name);
  if (!plan) {
    throw new Error(`Plan with name ${name} not found`);
  }
  return plan;
};

await saveCsv("plans", plans);

// Prices
const durationToSeconds: Record<string, number> = {
  monthly: 30 * 24 * 60 * 60,
  quarterly: 3 * 30 * 24 * 60 * 60,
  yearly: 365 * 24 * 60 * 60,
};

const prices: Prices[] = planEntries
  .flatMap(({ value: { prices } }, planId) =>
    Object.entries(prices)
      .map(([duration, amount]) => ({
        name: duration,
        amount: amount * 100, // Convert the amount to cents
        duration: durationToSeconds[duration]!,
        planId: planId,
      }))
  )
  .map((prices, id) => ({ id, ...prices }));

await saveCsv("prices", prices);

// Models
const modelNames = deepDistinct(planEntries.flatMap(
  ({ value: { limits } }) => Object.keys(limits),
));

const models: Model[] = modelNames.map((modelName, modelId) => ({
  modelId,
  modelName,
  unitPrice: 0, // unitPrice = 0 is a placeholder
}));

await saveCsv("models", models);

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

await saveCsv("limits", limits);

// Orders
const orders: Order[] = orderEntries
  .map((
    { key, value: { status, count, totalCents, email, createdAt, plan } },
  ) => ({
    orderId: parseInt(key.split(":")[1]),
    count,
    amount: totalCents, // A previous bug caused the totalCents actually not in cents
    status: firstCharUpperCase(status) as OrderStatus,
    userId: queryUserByEmail(email).userId,
    createdAt: new Date(createdAt),
    updatedAt: new Date(createdAt),
    planId: queryPlanByName(plan).planId,
  }));

const queryOrderById = (orderId: string | number) => {
  const order = orders.find(({ orderId: id }) => id === parseInt("" + orderId));
  if (!order) {
    throw new Error(`Order with id ${orderId} not found`);
  }
  return order;
};

await saveCsv("orders", orders);

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

await saveCsv("invitationCodes", invitationCodes);

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

await saveCsv("invitationRecords", invitationRecords);

// Subscriptions
const subscriptions: Subscription[] = userEntries
  .flatMap(({ key, value: { subscriptions } }) => {
    try {
      const userId = queryUserByEmail(key.split(":")[1]).userId;

      return subscriptions.map(({ startsAt, endsAt, tradeOrderId, plan }) => ({
        subscriptionId: crypto.randomUUID(),
        createdAt: new Date(startsAt),
        expiredAt: new Date(endsAt),
        redeemCode: null,
        orderId: queryOrderById(tradeOrderId).orderId,
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

await saveCsv("subscriptions", subscriptions);
