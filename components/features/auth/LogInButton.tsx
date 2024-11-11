"use client";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function LogInButton() {
  const mutation = useMutation({
    mutationFn: async () => signIn(),
  });
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={mutation.isPending}
      onClick={() => {
        mutation.mutate();
      }}
    >
      {mutation.isPending ? <Loader className="mr-2" size={12} /> : <></>}
      se connecter
    </Button>
  );
}
