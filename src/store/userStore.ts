// stores/userStore.ts
import { IUser } from "@/types/schemaTypes";
import { create } from "zustand";

type UserStore = {
  userData: IUser | null;
  setUserData: (data: IUser) => void;
  clearUserData: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  clearUserData: () => set({ userData: null }),
}));
