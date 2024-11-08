// "use client";

// import { useAppStore } from "@/src/stores/app_store";
// import { HeaderAdmin } from "./HeaderAdmin";
// import { HeaderAdministration } from "./HeaderAdministration";
// import { useShallow } from "zustand/react/shallow";

// export default function HeaderDynamic() {
//   const administrationId = useAppStore(
//     useShallow((state) => state.administrationId)
//   );
//    const appTitle = useAppStore(useShallow((state) => state.title));
//   return administrationId ? (
//     <HeaderAdministration
//       administrationId={administrationId}
//       appTitle={appTitle}
//     />
//   ) : (
//     <HeaderAdmin />
//   );
// }
