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

export async function checkIsNewUser(clerkId: string) {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    await prisma.$disconnect();

    return !user; // Return true if user does not exist, false otherwise
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
}

export async function createUser(clerkId: string, data: any) {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {
        clerkId: clerkId,
        ...data,
      },
    });
    await prisma.$disconnect();

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(clerkId: string, data: any) {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: {
        ...data,
      },
    });
    await prisma.$disconnect();

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
