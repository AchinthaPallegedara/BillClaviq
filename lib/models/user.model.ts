"use server";

import { prisma } from "@/lib/prisma";

export async function getUserById(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    return user;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function checkIsNewUser(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    return !user; // Return true if user does not exist, false otherwise
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
}

export async function createUser(clerkId: string, data: any) {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId: clerkId,
        ...data,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(clerkId: string, data: any) {
  try {
    const user = await prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: {
        ...data,
      },
    });

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
