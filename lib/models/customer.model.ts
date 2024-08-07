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

export async function getCustomers(customerOfId: String): Promise<Customer[]> {
  try {
    const prisma = new PrismaClient();
    const customers = await prisma.customer.findMany({
      where: {
        customerOfId: customerOfId as string,
      },
      take: 20, //limit 20
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
interface CustomerName {
  id: string;
  name: string;
}

export async function getCustomersName(
  customerOfId: string
): Promise<CustomerName[]> {
  const prisma = new PrismaClient();

  try {
    const customers = (await prisma.customer.findMany({
      where: {
        customerOfId: customerOfId,
      },
      select: {
        id: true,
        name: true,
      },
    })) as CustomerName[];

    return customers;
  } catch (error) {
    console.error("Error in getCustomersName:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteCustomer(id: string) {
  try {
    const prisma = new PrismaClient();
    const customer = await prisma.customer.delete({
      where: {
        id: id,
      },
    });
    prisma.$disconnect();

    return customer;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
