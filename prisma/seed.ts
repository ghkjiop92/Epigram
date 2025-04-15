import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function main() {
  await prisma.epigram.createMany({
    data: [
      {
        content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
        author: '앙드레 말로',
        tags: '꿈,도전',
      },
      {
        content: '성공은 작은 노력을 반복한 결과이다.',
        author: '로버트 콜리어',
        tags: '성공,습관',
      },
    ],
  });

  await prisma.card.createMany({
    data: [
      {
        title: '첫 번째 카드',
        content: '이 카드에는 피드 형식의 첫 번째 내용이 들어갑니다.',
        imageUrl: 'https://example.com/image1.jpg',
      },
      {
        title: '두 번째 카드',
        content: '두 번째 카드 내용입니다. 더 흥미로운 정보를 담아 보세요.',
        imageUrl: 'https://example.com/image2.jpg',
      },
      {
        title: '세 번째 카드',
        content: '세 번째 카드 내용. 다양한 정보를 카드 형태로 나타냅니다.',
        imageUrl: 'https://example.com/image3.jpg',
      },
    ],
  });

  await prisma.epigram.createMany({
    data: Array.from({ length: 20 }).map((_, i) => ({
      content: `한강 ${i + 1}`,
      author: `저자 ${i + 1}`,
      tags: '꿈,도전',
    })),
  });

  console.log('✅ Seed 완료 - Epigram과 Card 데이터가 모두 삽입되었습니다.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
