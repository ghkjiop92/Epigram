import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function main() {
  await prisma.epigram.createMany({
    data: [
      {
        quote: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
        author: '앙드레 말로',
        emotiontag: ['꿈', '도전'],
      },
      {
        quote: '성공은 작은 노력을 반복한 결과이다.',
        author: '로버트 콜리어',
        emotiontag: ['성공', '습관'],
      },
    ],
  });

  const cardResult = await prisma.card.createMany({
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
    data: [
      {
        quote: '작은 습관이 큰 변화를 만든다.',
        author: '제임스 클리어',
        emotiontag: ['습관', '변화'],
      },
      {
        quote: '위대한 일은 작은 일들의 연속이다.',
        author: '빈센트 반 고흐',
        emotiontag: ['성공', '지속'],
      },
      {
        quote: '포기하지 마라, 지금 멈추면 어제와 같은 내일이 온다.',
        author: '익명',
        emotiontag: ['동기부여', '끈기'],
      },
      {
        quote: '어제보다 나은 내가 되자.',
        author: '나 자신',
        emotiontag: ['성장', '다짐'],
      },
    ],
  });

  console.log(
    '✅ Seed 완료 - Epigram과 Card 데이터가 모두 삽입되었습니다.',
    cardResult,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
