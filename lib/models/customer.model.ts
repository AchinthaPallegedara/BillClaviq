"use server";

import { Customer } from "@/app/(dashboard)/customers/columns";
import { PrismaClient } from "@prisma/client";

interface customerCreateProps {
  name: string;
  company?: string | null;
  phone: string;
  address?: string | null;
  email?: string | null;
  moreInfo?: string | null;
  customerOfId: string;
}

export async function createCustomer(customer: customerCreateProps) {
  try {
    const prisma = new PrismaClient();
    const newCustomer = await prisma.customer.create({
      data: customer,
    });
    prisma.$disconnect();

    return newCustomer;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export async function getCustomers(): Promise<Customer[]> {
  try {
    const prisma = new PrismaClient();
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        company: true,
        phone: true,
        address: true,
        email: true,
      },
    });
    prisma.$disconnect();

    return customers;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
