import { cn } from "@/src/lib/utils";
import { Loader2, LucideProps } from "lucide-react";

function Loader({ className, ...props }: LucideProps) {
  return <Loader2 className={cn("animate-spin", className)} {...props} />;
}

export default Loader;
