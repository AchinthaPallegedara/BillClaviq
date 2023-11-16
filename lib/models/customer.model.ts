"use server";

import { PrismaClient } from "@prisma/client";

interface customerProps {
  customerName: string;
  companyName?: string | null;
  customerPhone: string;
  customerAddress?: string | null;
  customerEmail?: string | null;
  customerMoreInfo?: string | null;
  customerOfId: string;
}

export async function createCustomer(customer: customerProps) {
  try {
    const prisma = new PrismaClient();
    const newCustomer = await prisma.customer.create({
      data: customer,
    });
    prisma.$disconnect();

    return newCustomer;
  } catch (error) {
    console.log("error", error);
  }
}
