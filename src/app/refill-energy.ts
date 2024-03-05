'use server';
import prisma from '@/lib/prisma';

export default async function refillEnergy(userId: number) {
  return prisma.user.update({
    where: {
      id: userId,
    }, data: {
      energy: 100000
    }
  });
}