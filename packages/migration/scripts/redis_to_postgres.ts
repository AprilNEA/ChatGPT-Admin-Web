import { InvitationCode, Order, Plan, User } from "../types/old_dal";
import { loadJson } from "../utils/json";
import prisma, { OrderStatus } from "@caw/database";

async function migrateData() {
  const userEntries = await loadJson<User>("users");
  const planEntries = await loadJson<Plan>("plans");
  const orderEntries = await loadJson<Order>("orders");
  const invitationCodeEntries = await loadJson<InvitationCode>(
    "invitationCodes",
  );

  // Migrate Roles
  const roles = ["user", "mod", "admin"];
  for (const role of roles) {
    await prisma.role.create({
      data: {
        name: role,
      },
    });
  }

  // Migrate Users
  for (const userEntry of userEntries) {
    const user = userEntry.value;
    await prisma.user.create({
      data: {
        email: userEntry.key.split(":")[1], // Assuming the key is in the format "user:{email}"
        name: user.name,
        passwordHash: user.passwordHash,
        phone: user.phone,
        resetChances: user.resetChances,
        createdAt: new Date(user.createdAt),
        isBlocked: user.isBlocked,
        roleId: roles.indexOf(user.role) + 1, // Assuming the roles are created in the order ["user", "mod", "admin"]
      },
    });
  }

  // Migrate Plans
  for (const planEntry of planEntries) {
    const plan = planEntry.value;
    const createdPlan = await prisma.plan.create({
      data: {
        name: planEntry.key.split(":")[1], // Assuming the key is in the format "plan:{planName}"
      },
    });

    // Migrate Prices
    for (const [duration, amount] of Object.entries(plan.prices)) {
      await prisma.prices.create({
        data: {
          name: duration,
          amount: amount,
          duration: duration === "monthly"
            ? 30 * 24 * 60 * 60
            : duration === "quarterly"
            ? 3 * 30 * 24 * 60 * 60
            : 365 * 24 * 60 * 60, // Assuming the duration is either 'monthly', 'quarterly', or 'yearly'
          planId: createdPlan.planId,
        },
      });
    }

    // Migrate Limits
    for (const [modelName, limit] of Object.entries(plan.limits)) {
      await prisma.limits.create({
        data: {
          times: limit.limit,
          duration: parseInt(limit.window), // Assuming the window is in the format "{number} {unit}"
          planId: createdPlan.planId,
          modelId: 1, // Assuming the modelId is 1
          modelName: modelName,
        },
      });
    }
  }

  // Migrate Orders
  for (const orderEntry of orderEntries) {
    const order = orderEntry.value;
    await prisma.order.create({
      data: {
        orderId: parseInt(orderEntry.key.split(":")[1]), // Assuming the key is in the format "order:{internalOrderId}"
        count: order.count,
        amount: order.totalCents / 100, // Assuming the totalCents is in cents and the amount is in dollars
        status: `${order.status[0].toUpperCase()}${
          order.status.slice(1)
        }` as OrderStatus,
        userId: userEntries.findIndex((userEntry) =>
          userEntry.key === `user:${order.email}`
        ) + 1, // Assuming the userId is the index + 1
        createdAt: new Date(order.createdAt),
        planId: planEntries.findIndex((planEntry) =>
          planEntry.key === `plan:${order.plan}`
        ) + 1, // Assuming the planId is the index + 1
      },
    });
  }

  // Migrate InvitationCodes
  for (const invitationCodeEntry of invitationCodeEntries) {
    const invitationCode = invitationCodeEntry.value;
    await prisma.invitationCode.create({
      data: {
        code: invitationCodeEntry.key.split(":")[1], // Assuming the key is in the format "invitationCode:{code}"
        ownerId: userEntries.findIndex((userEntry) =>
          userEntry.key === `user:${invitationCode.inviterEmail}`
        ) + 1, // Assuming the ownerId is the index + 1
      },
    });

    // Migrate InvitationRecords
    for (const inviteeEmail of invitationCode.inviteeEmails) {
      await prisma.invitationRecord.create({
        data: {
          inviterId: userEntries.findIndex((userEntry) =>
            userEntry.key === `user:${invitationCode.inviterEmail}`
          ) + 1, // Assuming the inviterId is the index + 1
          inviteeId: userEntries.findIndex((userEntry) =>
            userEntry.key === `user:${inviteeEmail}`
          ) + 1, // Assuming the inviteeId is the index + 1
          code: invitationCodeEntry.key.split(":")[1], // Assuming the key is in the format "invitationCode:{code}"
        },
      });
    }
  }
}

await migrateData().catch((e) => {
  console.error(e);
  process.exit(1);
});
