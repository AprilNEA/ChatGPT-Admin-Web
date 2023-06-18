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
    // Check if the role already exists before creating it
    const existingRole = await prisma.role.findUnique({
      where: { name: role },
    });
    if (!existingRole) {
      await prisma.role.create({
        data: {
          name: role,
        },
      });
    }
  }

  // Migrate Users
  for (const userEntry of userEntries) {
    const user = userEntry.value;
    try {
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
    } catch (error) {
      console.error(`Failed to create user: ${userEntry.key}`, error);
      // Decide how to handle the error (e.g., stop the process, continue, etc.)
    }
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
      const durationInSeconds = {
        monthly: 30 * 24 * 60 * 60,
        quarterly: 3 * 30 * 24 * 60 * 60,
        yearly: 365 * 24 * 60 * 60,
      }[duration];
      if (durationInSeconds === undefined) {
        console.error(`Unknown duration: ${duration}`);
        continue;
      }
      await prisma.prices.create({
        data: {
          name: duration,
          amount: amount,
          duration: durationInSeconds,
          planId: createdPlan.planId,
        },
      });
    }

    // Migrate Limits
    for (const [modelName, limit] of Object.entries(plan.limits)) {
      const model = await prisma.model.findUnique({
        where: { modelName: modelName },
      });
      if (!model) {
        console.error(`Unknown model: ${modelName}`);
        continue;
      }
      await prisma.limits.create({
        data: {
          times: limit.limit,
          duration: parseInt(limit.window), // Fixme: implement a function to parse the window
          planId: createdPlan.planId,
          modelId: model.modelId,
          modelName: modelName,
        },
      });
    }
  }

  // Migrate Orders
  for (const orderEntry of orderEntries) {
    const order = orderEntry.value;
    const user = await prisma.user.findUnique({
      where: { email: order.email },
    });
    const plan = await prisma.plan.findUnique({
      where: { name: order.plan },
    });
    if (!user || !plan) {
      console.error(`Unknown user or plan for order: ${orderEntry.key}`);
      continue;
    }
    try {
      await prisma.order.create({
        data: {
          orderId: parseInt(orderEntry.key.split(":")[1]), // Assuming the key is in the format "order:{internalOrderId}"
          count: order.count,
          amount: order.totalCents / 100, // Assuming the totalCents is in cents and the amount is in dollars
          status: order.status.toUpperCase() as OrderStatus, // FIXME: only first letter should be capitalized
          userId: user.userId,
          createdAt: new Date(order.createdAt),
          planId: plan.planId,
        },
      });
    } catch (error) {
      console.error(`Failed to create order: ${orderEntry.key}`, error);
      // Decide how to handle the error (e.g., stop the process, continue, etc.)
    }
  }

  // Migrate InvitationCodes
  for (const invitationCodeEntry of invitationCodeEntries) {
    const invitationCode = invitationCodeEntry.value;
    const user = await prisma.user.findUnique({
      where: { email: invitationCode.inviterEmail },
    });
    if (!user) {
      console.error(
        `Unknown user for invitation code: ${invitationCodeEntry.key}`,
      );
      continue;
    }
    try {
      await prisma.invitationCode.create({
        data: {
          code: invitationCodeEntry.key.split(":")[1], // Assuming the key is in the format "invitationCode:{code}"
          ownerId: user.userId,
        },
      });
    } catch (error) {
      console.error(
        `Failed to create invitation code: ${invitationCodeEntry.key}`,
        error,
      );
      // Decide how to handle the error (e.g., stop the process, continue, etc.)
    }

    // Migrate InvitationRecords
    for (const inviteeEmail of invitationCode.inviteeEmails) {
      const invitee = await prisma.user.findUnique({
        where: { email: inviteeEmail },
      });
      if (!invitee) {
        console.error(`Unknown invitee for invitation record: ${inviteeEmail}`);
        continue;
      }
      try {
        await prisma.invitationRecord.create({
          data: {
            inviterId: user.userId,
            inviteeId: invitee.userId,
            code: invitationCodeEntry.key.split(":")[1], // Assuming the key is in the format "invitationCode:{code}"
          },
        });
      } catch (error) {
        console.error(
          `Failed to create invitation record for invitee: ${inviteeEmail}`,
          error,
        );
        // Decide how to handle the error (e.g., stop the process, continue, etc.)
      }
    }
  }
}

migrateData().catch((e) => {
  console.error(e);
  process.exit(1);
});
