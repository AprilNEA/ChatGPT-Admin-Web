import { PrismaClient } from './client';

const prisma = new PrismaClient();

async function main() {
  const models = await prisma.model.createMany({
    data: [
      {
        id: 1,
        name: 'gpt-3.5-turbo-0613',
        label: 'GPT 3.5',
        price: 1,
      },
      {
        id: 2,
        name: 'gpt-4-turbo',
        label: 'GPT 4',
        price: 10,
      },
    ],
  });
  const categories = await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: '月付',
      },
    ],
  });
  const products = await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: 'Default',
        features: ['可使用 GPT 3.5', '每三小时 10 次'],
        price: 0,
        duration: -1,
      },
    ],
  });
  const limits = await prisma.modelInProduct.createMany({
    data: [
      {
        modelId: 1,
        productId: 1,
        times: 10,
        duration: 10800,
      },
    ],
  });
  console.log({ models, categories, products, limits });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
