import { AdministrationInterface } from "@/types/app_types";
import { create } from "zustand";

type AppStore = {
  title: string;
  administrationId?: string;
  currentAdministration?: AdministrationInterface;
};
type ActionAppStore = {
  updateTitle: (newTitle: AppStore["title"]) => void;
  updateAdministrationId: (newId: AppStore["administrationId"]) => void;
  updateCurrentAdministration: (
    newAd: AppStore["currentAdministration"]
  ) => void;
  updateAll: (
    newTitle: AppStore["title"],
    newId: AppStore["administrationId"],
    newAd: AppStore["currentAdministration"]
  ) => void;
};

const useAppStore = create<AppStore & ActionAppStore>((set) => ({
  title: "Caisse Nationnal",
  administrationId: "",
  currentAdministration: undefined,
  updateTitle: (newTitle) => set(() => ({ title: newTitle })),
  updateAdministrationId: (newId) => set(() => ({ administrationId: newId })),
  updateCurrentAdministration: (newAd) =>
    set(() => ({ currentAdministration: newAd })),
  updateAll: (newTitle, newId, newAd) =>
    set(() => ({
      title: newTitle,
      administrationId: newId,
      currentAdministration: newAd,
    })),
}));

export { useAppStore };
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
