"use client";

import ErreurApp from "@/components/custom/ErreurApp";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionnellement, vous pouvez logger l'erreur dans un service de reporting
    console.error(error);
  }, [error]);

  return <ErreurApp error={error} reset={reset} />;
}
