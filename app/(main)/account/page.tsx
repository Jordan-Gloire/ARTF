import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/src/lib/auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function page() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("not session");
    
  }

  const user = session.user;

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader className="flex flex-row gap-4 space-y-0">
        <Avatar>
          <AvatarFallback>{user.nom?.[0]}</AvatarFallback>
          {user.image && <AvatarImage src={user.image} alt="user image" />}
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{user.nom}</CardTitle>
          <CardDescription>{user.telephone}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
