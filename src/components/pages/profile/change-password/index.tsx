'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ChangePasswordAPIPayload,
  ChangePasswordForm,
  changePasswordSchema,
} from '@/features/auth/types';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex } from '@radix-ui/themes';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useChangePassword } from '@/features/auth/service/mutations';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import { Check, CircleAlert } from 'lucide-react';

const validationRules = [
  {
    label: 'Must include at least 1 number and alphabet.',
    rule: (password: string) => /[A-Za-z]/.test(password) && /\d/.test(password),
  },
  {
    label: 'Password length must be 8-12 characters.',
    rule: (password: string) => password.length >= 8 && password.length <= 12,
  },
  {
    label: 'Must include special character. *@#%&^',
    rule: (password: string) => /[-@$!%*?&#]/.test(password),
  },
];

const ChangePassword = () => {
  const router = useRouter();

  const { mutateAsync: updateAction, isPending } = useChangePassword();

  const breadcrumb = [
    {
      href: '/profile',
      label: 'My Profile',
    },
    {
      href: '/profile/change-password',
      label: 'Change Password',
    },
  ];

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const watchedPasswod = useWatch({
    control: form.control,
    name: 'newPassword',
  });

  //uncomment this field in case of debugging
  // useEffect(() => {
  //   const subscription = form.watch((data) => {
  //     console.log("Form State:", data);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [form]);

  const submit = async (data: ChangePasswordForm) => {
    try {
      const dataToSend: ChangePasswordAPIPayload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      const response = await updateAction(dataToSend);
      if (response.meta?.success) {
        toast.success(response.meta.message ?? '');
        router.replace('/profile');
      } else {
        const errorResponse: any = response;

        toast.error(errorResponse.error?.data?.message ?? 'Something Went Wrong');
      }
    } catch (error: any) {}
  };

  return (
    <Box>
      <PageBreadcrumb links={breadcrumb} enableBack />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="w-full flex gap-4 flex-col items-start"
        >
          <Flex className="w-full flex-col items-start">
            {/* <Box>
              <FormTitle > Change Password </FormTitle>
              <FormDescription> We recommend you to choose a strong password. </FormDescription>
            </Box> */}

            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter Old Password" {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter New Password" {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Confirm New Password" {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Box className="!flex flex-row items-center gap-x-2 !justify-end mt-4 w-full">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.formState?.isValid}
                loading={isPending}
                className="ml-2"
                addDoneIcon
              >
                Update
              </Button>
            </Box>
          </Flex>
        </form>

        <div className="flex flex-col gap-1 justify-start items-start">
          {validationRules.map((rule, index) => (
            <div className="flex flex-row gap-2 items-center justify-start" key={index}>
              {rule.rule(watchedPasswod) ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <CircleAlert size={16} className="text-gray-500" />
              )}
              <p> {rule.label} </p>
            </div>
          ))}
        </div>
      </Form>
    </Box>
  );
};

export default ChangePassword;
