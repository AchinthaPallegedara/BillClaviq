"use server";

import { PrismaClient } from "@prisma/client";

export async function getUserById(clerkId: string) {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    prisma.$disconnect();

    return user;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
