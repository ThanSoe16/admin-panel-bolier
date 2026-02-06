import { create } from "zustand";

interface UserStoreState {
  collapse: boolean;
  openGroups: Record<string, boolean>;
}

interface UserStoreActions {
  setCollapse: (collapse: boolean) => void;
  toggleGroup: (key: string) => void;
  setGroup: (key: string, value: boolean) => void;
  reset: () => void;
}

const storeState: UserStoreState = {
  collapse: false,
  openGroups: {},
};

const useSideBarStore = create<UserStoreState & UserStoreActions>((set) => ({
  ...storeState,

  setCollapse: (collapse) => set({ collapse }),

  toggleGroup: (key: string) =>
    set((state) => ({
      openGroups: {
        ...state.openGroups,
        [key]: !state.openGroups[key],
      },
    })),

  setGroup: (key, value) =>
    set((state) => ({
      openGroups: {
        ...state.openGroups,
        [key]: value,
      },
    })),

  reset: () => set(storeState),
}));

export default useSideBarStore;
