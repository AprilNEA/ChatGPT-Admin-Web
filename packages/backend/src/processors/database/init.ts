import {
  monthDuration,
  quarterDuration,
  yearDuration,
} from '@/processors/database/database.service';
import { PrismaClient } from '@prisma/client';

export async function initDatabase(prisma: PrismaClient) {
  prisma.$transaction(async (prisma) => {
    const models = await prisma.model.findMany();
    if (models.length !== 0) {
      return;
    }
    await prisma.model.createMany({
      data: [
        {
          id: 1,
          name: 'gpt-3.5-turbo',
          price: 1,
        },
        {
          id: 2,
          name: 'gpt-4',
          price: 10,
        },
      ],
    });
    await prisma.category.createMany({
      data: [
        {
          id: 1,
          name: '月付',
        },
        {
          id: 2,
          name: '季付',
        },
        {
          id: 3,
          name: '年付',
        },
        {
          id: 4,
          name: '次数包',
        },
      ],
    });
    await prisma.product.createMany({
      data: [
        {
          id: 1,
          name: '免费会员',
          features: ['可使用 GPT 3.5', '每三小时 10 次'],
          price: 0,
          duration: -1,
        },
        {
          id: 2,
          name: '初级会员-月付',
          features: ['可使用 GPT 3.5', '不限制使用次数'],
          price: 30,
          duration: monthDuration,
          categoryId: 1,
        },
        {
          id: 3,
          name: '高级会员-月付',
          features: ['可使用 GPT 3.5/GPT 4', '不限制使用次数'],
          price: 129,
          duration: monthDuration,
          categoryId: 1,
        },
        {
          id: 4,
          name: '初级会员-季付',
          features: ['可使用 GPT 3.5', '不限制使用次数', '九折优惠'],
          price: 79,
          duration: quarterDuration,
          categoryId: 2,
        },
        {
          id: 5,
          name: '高级会员-季付',
          features: ['可使用 GPT 3.5/GPT 4', '不限制使用次数', '九折优惠'],
          price: 259,
          duration: quarterDuration,
          categoryId: 2,
        },
        {
          id: 6,
          name: '初级会员-年付',
          features: ['可使用 GPT 3.5', '不限制使用次数', '八折优惠'],
          price: 329,
          duration: yearDuration,
          categoryId: 3,
        },
        {
          id: 7,
          name: '高级会员-年付',
          features: ['可使用 GPT 3.5/GPT 4', '不限制使用次数', '八折优惠'],
          price: 999,
          duration: yearDuration,
          categoryId: 3,
        },
        {
          id: 8,
          name: 'GPT3.5次数包',
          features: ['可使用 GPT 3.5'],
          price: 1,
          duration: -1,
          categoryId: 4,
        },
        {
          id: 9,
          name: 'GPT4次数包',
          features: ['可使用 GPT 4'],
          price: 10,
          duration: -1,
          categoryId: 4,
        },
      ],
    });
    await prisma.modelInProduct.createMany({
      data: [
        // 免费
        {
          modelId: 1,
          productId: 1,
          times: 10,
          duration: 10800,
        },
        // 初级
        ...[2, 4, 6].map((productId) => ({
          modelId: 1,
          productId,
          times: 200,
          duration: 3600,
        })),
        // 高级
        ...[3, 5, 7].map((productId) => ({
          modelId: 1,
          productId,
          times: 200,
          duration: 3600,
        })),
        ...[3, 5, 7].map((productId) => ({
          modelId: 2,
          productId,
          times: 200,
          duration: 3600,
        })),
      ],
    });
  });
}
