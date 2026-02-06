'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useShallow } from 'zustand/react/shallow';

/**
 * @deprecated use useAuthStore directly instead
 */
export const useUserInfo = () => {
  // Use shallow to avoid unnecessary re-renders when selecting multiple state slices
  const { user, setUser, accessToken, setTokens, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
      accessToken: state.accessToken,
      setTokens: state.setTokens,
      logout: state.logout,
    })),
  );

  // Mapping old API to new Store API for backward compatibility

  const storeUserInfo = (data: any) => {
    setUser(data);
  };

  const storeToken = (token: string) => {
    // Note: Old hook didn't seem to enforce both tokens at once in this method,
    // but typically we want to update what we have.
    // For compatibility, we'll assume this updates accessToken.
    // However, the store expects both or separate setters.
    // Let's use the explicit setter for tokens if we have 'refreshToken' available,
    // otherwise just update accessToken in a way attempting to preserve the other?
    // Actually, useAuthStore has setTokens(access, refresh).
    // The old usage in Login.tsx calls storeToken(access) then storeRefreshToken(refresh).
    // State updates in Zustand are immediate/merged, so calling them sequentially is fine.

    // We need a specific action for just access token or just refresh token if we want to mimic exact behavior,
    // but since we control the store, let's just expose a wrapper.
    useAuthStore.setState({ accessToken: token });
  };

  const storeRefreshToken = (token: string) => {
    useAuthStore.setState({ refreshToken: token });
  };

  const removeAllData = () => {
    logout();
  };

  return {
    user,
    storeUserInfo,
    token: accessToken,
    storeToken,
    refreshToken: useAuthStore.getState().refreshToken, // Direct read if needed, or select it above
    storeRefreshToken,
    removeAllData,
  };
};
