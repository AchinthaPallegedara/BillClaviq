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
import { checkIsNewUser, getUserById } from "@/lib/models/user.model";
import EditUserSettings from "@/components/EditUserSettings";
import { Settings } from "lucide-react";

const page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Not signed in</div>;
  const user = await getUserById(clerkUser.id);

  if (await checkIsNewUser(clerkUser.id)) {
    return (
      <div className="sm:mx-[5vw]">
        <Card>
          <CardHeader>
            <CardTitle className="flex">
              <Settings className="mr-2" />
              Settings
            </CardTitle>
            <CardDescription>Manage your company settings here</CardDescription>
          </CardHeader>
          <CardContent>
            <UserSettings clerkId={clerkUser.id} />
          </CardContent>
        </Card>
      </div>
    );
  } else if (!user) return <div>Loading...</div>;
  else
    return (
      <div className="sm:mx-[5vw]">
        <Card>
          <CardHeader>
            <CardTitle className="flex">
              <Settings className="mr-2" />
              Settings
            </CardTitle>
            <CardDescription>Manage your company settings here</CardDescription>
          </CardHeader>
          <CardContent>
            <EditUserSettings user={user} />
          </CardContent>
        </Card>
      </div>
    );
};

export default page;
