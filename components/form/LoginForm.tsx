"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
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
import Loader from "../custom/Loader";

export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session) {
      router.push("/"); // Redirigez vers la page souhaitée après la connexion
    }
  }, [session, router]);

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      toast.success("Connexion réussie");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erreur de connexion: " + error.message);
    },
  });

  return (
    <Card className="m-auto w-1/3">
      <CardHeader>
        <CardTitle className="text-center">Connexion</CardTitle>
        <CardDescription>Connectez-vous à votre compte.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Téléphone</Label>
              <Input
                id="username"
                type="tel"
                name="username"
                placeholder="Téléphone"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {mutation.isError && (
            <div className="mt-2 text-center text-red-500">
              {mutation.error?.message || "Une erreur est survenue"}
            </div>
          )}
          <CardFooter className="flex justify-center mt-4">
            <Button size="sm" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <Loader className="mr-2" size={12} />
              ) : null}
              Se connecter
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}