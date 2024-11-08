// import { create } from "zustand";

// type AppStore = {
//   title: string;
//   administrationId?: string;
// };
// type ActionAppStore = {
//   updateTitle: (newTitle: AppStore["title"]) => void;
//   updateAdministrationId: (newId: AppStore["administrationId"]) => void;
// };

// const useAppStore = create<AppStore & ActionAppStore>((set) => ({
//   title: "Acceuil",
//   administrationId: "",
//   updateTitle: (newTitle) => set(() => ({ title: newTitle })),
//   updateAdministrationId: (newId) => set(() => ({ administrationId: newId })),
// }));

// export { useAppStore };
/*
type State = {
  firstName: string
  lastName: string
}

type Action = {
  updateFirstName: (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
}

// Create your store, which includes both state and (optionally) actions
const usePersonStore = create<State & Action>((set) => ({
  firstName: '',
  lastName: '',
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}))

*/
