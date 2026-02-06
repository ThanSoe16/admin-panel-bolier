'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { setAuthCookies } from '@/utils/auth-cookies';

import { useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from '@/features/auth/types';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useGetMe, useLogin } from '@/features/auth/service/mutations';
import { useRouter } from 'next/navigation';
import { matchFirstStoredPermission } from '@/utils/routeMatcher';
import { routePermissionMap } from '@/data/route-permissions';
import { useAuthStore } from '@/store/useAuthStore';
import { PermissionData } from '@/features/admins/types/permission.type';

const Login = () => {
  const router = useRouter();

  // Use global store
  const { setTokens, setPermissions } = useAuthStore();

  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const { mutateAsync: fetchMe, isPending: isMePending } = useGetMe();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginId: '',
      password: '',
    },
  });

  const isLoading = isLoginPending || isMePending;

  const submit = async (data: LoginForm) => {
    try {
      const response = await login(data);
      if (response.meta?.success) {
        toast.success(response?.meta?.message ?? '');
        setTokens(
          response?.body?.data?.accessToken ?? '',
          response?.body?.data?.refreshToken ?? '',
        );

        fetchMe()
          .then((res) => {
            setAuthCookies(
              response?.body?.data?.accessToken ?? '',
              JSON.stringify(res.body?.data?.AdminRole?.permissions ?? []),
            );

            setTimeout(() => {
              const match = matchFirstStoredPermission(routePermissionMap);
              if (match) {
                router.push(match.path);
              }
            }, 1000);
          })
          .finally(() => {});
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse.error?.meta?.message ?? '');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.meta?.message ?? 'Something went wrong');
    }
  };

  return (
    <div
      className="relative w-screen h-screen justify-center items-center flex"
      style={{
        backgroundImage: "url('/auth/auth-bg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
        <h2 className="text-gray-500 mt-1">Log in to your account to continue</h2>
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
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
