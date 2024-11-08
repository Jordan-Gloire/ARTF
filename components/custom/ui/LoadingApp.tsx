"use client";

import { Loader2 } from "lucide-react";

export default function LoadingApp() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="size-8 animate-spin text-primary" />
      <span className="sr-only">Chargement...</span>
    </div>
  );
}
