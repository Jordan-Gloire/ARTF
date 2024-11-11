"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ErreurApp({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="size-6" />
            Une erreur est survenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {error?.message ||
              "Nous sommes désolés, quelque chose s'est mal passé."}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={reset} className="w-full">
            Réessayer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
