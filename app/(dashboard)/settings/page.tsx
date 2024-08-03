import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserSettings from "@/components/UserSettings";

const page = async () => {
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your company settings here</CardDescription>
        </CardHeader>
        <CardContent>
          <UserSettings clerkId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
