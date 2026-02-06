"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Cookies from "js-cookie";

import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "@/features/auth/types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useGetMe, useLogin } from "@/features/auth/service/mutations";
import { useRouter } from "next/navigation";
import { matchFirstStoredPermission } from "@/utils/routeMatcher";
import { routePermissionMap } from "@/data/route-permissions";
import { useAuthStore } from "@/store/useAuthStore";
import { PermissionData } from "@/features/admins/types/permission.type";

const Login = () => {
  const router = useRouter();

  // Use global store
  const { setTokens, setPermissions } = useAuthStore();

  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const { mutateAsync: fetchMe, isPending: isMePending } = useGetMe();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginId: "",
      password: "",
    },
  });

  const isLoading = isLoginPending || isMePending;

  const submit = async (data: LoginForm) => {
    try {
      // 1. Perform Login
      const loginResponse = await login(data);

      if (!loginResponse.meta?.success) {
        toast.error(loginResponse?.meta?.message || "Login failed");
        return;
      }

      const { accessToken, refreshToken } = loginResponse.body?.data || {};

      if (!accessToken || !refreshToken) {
        toast.error("Invalid response from server: Missing tokens");
        return;
      }

      toast.success(loginResponse.meta.message || "Login success");

      // 2. Store Tokens (Local State + Cookies)
      setTokens(accessToken, refreshToken);

      const cookieOptions = {
        expires: 365 * 10,
        secure: true,
        sameSite: "lax",
      } as const;
      Cookies.set("token", JSON.stringify(accessToken), cookieOptions);

      // 3. Fetch User Permissions
      const meResponse = await fetchMe();
      const userPermissions = meResponse.body?.data?.AdminRole?.permissions;

      if (userPermissions) {
        // Transform API response to Store format if needed
        // API returns { id: string; value: string }[] but Store expects Record<string, string[]>
        // Since the type error says it returns that array, we must convert it.
        // Assuming 'id' is the permission key and 'value' is JSON string or just the value?
        // Wait, let's look at the error again: "{ id: string; value: string; }[]".
        // Usually `value` is the array of permissions like ["VIEW", "EDIT"].
        // If it's a string, it might be JSON stringified.

        let formattedPermissions: PermissionData = {} as PermissionData;

        if (Array.isArray(userPermissions)) {
          // Basic transformation
          (userPermissions as any[]).forEach(
            (p: { id: string; value: any }) => {
              try {
                // value might be string "[\"VIEW\"]" or array
                const actions = Array.isArray(p.value)
                  ? p.value
                  : JSON.parse(p.value);
                // @ts-ignore
                formattedPermissions[p.id] = actions;
              } catch (e) {
                // fallback if not json
                // @ts-ignore
                formattedPermissions[p.id] = [p.value];
              }
            },
          );
        } else {
          // It might already be the correct shape if the error was misleading or I misread
          formattedPermissions = userPermissions as unknown as PermissionData;
        }

        // Update Store
        setPermissions(formattedPermissions);

        // Update Cookies
        Cookies.set(
          "permissions",
          JSON.stringify(formattedPermissions),
          cookieOptions,
        );

        // 4. Redirect based on permissions
        // Small delay to ensure state/cookies propagate if needed, though with Zustand it should be instant for React components.
        // Keeping a small delay for safety with router.push behavior in some cases.
        setTimeout(() => {
          const match = matchFirstStoredPermission(routePermissionMap);
          if (match) {
            router.push(match.path);
          } else {
            toast.error("No valid route found for your permissions");
          }
        }, 500);
      } else {
        toast.warning("Logged in but no permissions found.");
      }
    } catch (error: any) {
      console.error("Login Check Error:", error);
      toast.error(
        error?.response?.data?.meta?.message ??
          error?.message ??
          "Something went wrong during login",
      );
    }
  };

  return (
    <div
      className="relative w-screen h-screen justify-center items-center flex"
      style={{
        backgroundImage: "url('/auth/auth-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center z-10 bg-white  rounded-lg mx-auto w-[calc(100%-32px)] md:mr-10 md:max-w-[445px] overflow-hidden ">
        <div className="bg-[#FFE14E] flex items-center justify-center w-full py-6 ">
          <Image
            src="/auth/auth-logo.svg"
            alt="primary logo"
            width={300}
            height={92}
            className="w-[150px] md:w-[300px] h-[45px] md:h-[90px] object-cover"
          />
        </div>
        <h1 className="font-bold text-lg mt-4 "> Welcome Back </h1>
        <h2 className="text-gray-500 mt-1">
          Log in to your account to continue
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="w-full ">
            <div className="w-full rounded-xl space-y-4 p-4 md:p-6">
              <div className="flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="loginId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white rounded-lg"
                          placeholder="Enter login ID"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white rounded-lg"
                          placeholder="Enter password"
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full rounded-lg text-sm "
                size="lg"
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
