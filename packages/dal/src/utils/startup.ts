import client from "@caw/database";

export async function chatStartUp() {
  const setting = await client.setting.findUnique({
    where: {
      key: "startup",
    },
  });
  if (setting) return setting;

  await client.model.createMany({
    data: [
      {
        modelId: 1,
        modelName: "gpt-3.5-turbo",
        unitPrice: 10,
      },
      {
        modelId: 2,
        modelName: "gpt-4",
        unitPrice: 100,
      },
    ],
  });

  await client.plan.createMany({
    data: [
      {
        planId: 1,
        name: "Free",
        features: ["免费试用"],
      },
      {
        planId: 2,
        name: "Pro",
        features: [],
      },
      {
        planId: 3,
        name: "Premium",
        features: [],
      },
    ],
  });

  await client.prices.createMany({
    data: [
      {
        name: "月付",
        amount: 30,
        duration: 2592000,
        planId: 2,
      },
      {
        name: "季付",
        amount: 79,
        duration: 7776000,
        planId: 2,
      },
      {
        name: "年付",
        amount: 326,
        duration: 31104000,
        planId: 2,
      },
      {
        name: "月付",
        amount: 129,
        duration: 2592000,
        planId: 3,
      },
      {
        name: "季付",
        amount: 259,
        duration: 7776000,
        planId: 3,
      },
      {
        name: "年付",
        amount: 999,
        duration: 31104000,
        planId: 3,
      },
    ],
  });

  await client.limits.createMany({
    data: [
      {
        times: 10,
        planId: 1,
        modelId: 1,
        modelName: "gpt-3.5-turbo",
        duration: 10800,
      },
      {
        times: 50,
        planId: 2,
        modelId: 1,
        modelName: "gpt-3.5-turbo",
        duration: 10800,
      },
      {
        times: 50,
        planId: 2,
        modelId: 2,
        modelName: "gpt-4",
        duration: 10800,
      },
      {
        times: 200,
        planId: 3,
        modelId: 1,
        modelName: "gpt-3.5-turbo",
        duration: 10800,
      },
      {
        times: 200,
        planId: 3,
        modelId: 2,
        modelName: "gpt-4",
        duration: 10800,
      },
    ],
  });

  // await client.user.create({ data: {} });

  return await client.setting.create({
    data: {
      key: "startup",
      value: "true",
    },
  });
}
