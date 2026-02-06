import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangePasswordAPIPayload, LoginForm } from '../types';
import authApiService from './api';
import { toast } from 'sonner';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginForm) => authApiService.login(data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: async (_, error) => {
      if (error) {
      } else {
        await queryClient.invalidateQueries({ queryKey: ['me'] });
      }
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChangePasswordAPIPayload) => authApiService.changePassword(data),

    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;
        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.refetchQueries({ queryKey: ['me'] });
      }
    },
  });
};

export const useGetMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authApiService.getMe(),

    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.refetchQueries({ queryKey: ['me'] });
      }
    },
  });
};

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: UpdateUserForm }) =>
//       authApiService.updateUser(id, data),
//     onSettled: async (_, error, variables) => {
//       if (error) {
//         console.log("error");
//       } else {
//         await queryClient.invalidateQueries({ queryKey: ["me"] });
//         await queryClient.invalidateQueries({
//           queryKey: ["user", variables.id],
//         });
//       }
//     },
//   });
// };

// export const useDeleteUser = () => {
//   const QueryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string) => authApiService.deleteUser(id),
//     onSuccess: () => {
//       console.log("deleted successfully");
//     },
//     onSettled: async (_, error) => {
//       if (error) {
//         console.log("error");
//       } else {
//         await QueryClient.invalidateQueries({ queryKey: ["me"] });
//       }
//     },
//   });
// };
