import { checkIsNewUser } from "@/lib/models/user.model";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId }: { userId: string | null } = auth();

  if (!userId) return null;
  if (await checkIsNewUser(userId)) {
    return redirect("/settings");
  }
  return <div>page</div>;
};

export default Page;
