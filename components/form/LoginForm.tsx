"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Loader from "../custom/Loader";

export default function LoginForm() {
  const [email, setemail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    const resultat = await signIn("credentials", {
      email,
      password,
      redirect: true,
    });
    if (resultat && !resultat.ok) throw new Error("Erreur");
    // console.log({resultat})
    // La mutation a réussi
  };

  const mutation = useMutation({
    mutationFn: async () => handleSubmit(),
  });

  return (
    <Card className="m-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-center">Connexion</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                size={35}
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                size={35}
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
        {mutation.isError && (
          <div className="mt-2 text-center text-red-500">
            Email ou mot de passe incorrect
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          size="sm"
          type="button"
          onClick={() => {
            mutation.mutate();
          }}
        >
          {mutation.isPending ? <Loader className="mr-2" size={12} /> : <></>}
          Se connecter
        </Button>
      </CardFooter>
    </Card>
  );
}
