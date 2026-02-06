import {
  // keepPreviousData,
  // useInfiniteQuery,
  // useQueries,
  useQuery,
} from '@tanstack/react-query';
import authApiService from './api';

export const useGetMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: authApiService.getMe,
    refetchOnWindowFocus: false,
  });
};

// export const useGetMeDetail = (id: string) => {
//   return useQuery({
//     queryKey: ["meDetail", id],
//     queryFn: () => authApiService.getUserDetail(),
//     enabled: !!id, // Prevents query from running if `id` is falsy
//     refetchOnWindowFocus: false,
//   });
// };

// export const useGetMesDetail = (ids: (string | undefined)[] | undefined) => {
//   return useQueries({
//     queries: (ids ?? []).map((id) => {
//       return {
//         queryKey: ["meDetail", id],
//         queryFn: () => authApiService.getUserDetail(),
//       };
//     }),
//   });
// };

// export const useGetUsers = (page: number) => {
//   return useQuery({
//     queryKey: ["users", { page }],
//     queryFn: () => authApiService.getUsers(page),
//     placeholderData: keepPreviousData,
//   });
// };

// export const useProducts = () => {
//   return useInfiniteQuery({
//     queryKey: ["products"],
//     queryFn: authApiService.getProducts,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, _, lastPageParam) => {
//       if (lastPage?.body?.data?.length === 0) {
//         return undefined;
//       }
//       return lastPageParam + 1;
//     },
//     getPreviousPageParam: (_, __, firstPageParam) => {
//       if (firstPageParam <= 0) {
//         return undefined;
//       }
//       return firstPageParam - 1;
//     },
//   });
// };
