import client, { Prisma, Plan } from "@caw/database";
import { dalErrorCatcher } from "../decorator";
import { DALType } from "@caw/types";

// @dalErrorCatcher
export class PlanDAL {
  constructor() {}

  static async getPlan(): Promise<DALType.Plan[]> {
    return await client.plan.findMany({
      include: {
        prices: {
          select: {
            id: true,
            name: true,
            amount: true,
            duration: true,
          },
        },
        limits: {
          select: {
            modelName: true,
            times: true,
            duration: true,
          },
        },

        orders: false,
        redeems: false,
        subscriptions: false,
      },
    });
  }

  // static async newPlan(plan: DALType.newPlan): Promise<Plan> {
  //   return await client.plan.create({
  //     data: {
  //       name: plan.name,
  //       prices: {
  //         createMany: {
  //           data: [
  //             ...plan.prices.map((price) => ({
  //               name: price.name,
  //               amount: price.amount,
  //               duration: price.duration,
  //             })),
  //           ],
  //         },
  //       },
  //     },
  //   });
  // }
}
