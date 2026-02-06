'use client';
import { PropsWithChildren, useState } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from 'sonner';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            retryDelay: 1000,
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <Theme>{children}</Theme>
        </NuqsAdapter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
      <Toaster richColors position="top-center" />
    </div>
  );
}
