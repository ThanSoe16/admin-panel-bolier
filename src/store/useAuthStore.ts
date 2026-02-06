import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserData } from "@/features/base/types/user-info.types";
import { PermissionData } from "@/features/admins/types/permission.type";

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
  permissions: PermissionData | null;
}

interface AuthActions {
  setAuth: (data: {
    user: UserData;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setPermissions: (permissions: PermissionData) => void;
  setUser: (user: UserData) => void;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  permissions: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setAuth: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      setPermissions: (permissions) => set({ permissions }),

      setUser: (user) => set({ user }),

      logout: () => {
        set(initialState);
        // Clear cookies if needed, though usually handled by the caller or a side-effect
        // Cookies.remove("token");
        // Cookies.remove("permissions");
      },
    }),
    {
      name: "auth-storage", // unique name in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        permissions: state.permissions,
      }),
    },
  ),
);
