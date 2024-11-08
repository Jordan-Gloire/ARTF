// "use client";
// import Loader from "@/components/custom/Loader";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import { signOut } from "next-auth/react";
// import { LogOut } from "lucide-react";

// export default function LogInButton() {
//   const mutation = useMutation({
//     mutationFn: async () => signOut(),
//   });
//   return (
//     <Button
//       variant="destructive"
//       size="sm"
//       disabled={mutation.isPending}
//       onClick={() => {
//         mutation.mutate();
//       }}
//     >
//       {mutation.isPending ? (
//         <Loader className="mr-2" size={12} />
//       ) : (
//         <LogOut className="mr-2" size={12} />
//       )}
//       Déconnexion
//     </Button>
//   );
// }
