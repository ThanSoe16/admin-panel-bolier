'use client';
import { Image } from '@/components/ui/image';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNavigation } from '@/features/base/hooks/useNavigation';
import { cn } from '@/lib/utils';
import { Box, Flex } from '@radix-ui/themes';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { NavMain } from './nav-main';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { paths } = useNavigation();
  const { state, toggleSidebar } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Box
          className={cn(
            state == 'expanded' ? 'px-4' : 'pl-4',
            'h-[70px] bg-cover bg-center bg-no-repeat bg-primary',
          )}
        >
          <Flex justify={'between'} align="center" className="h-full w-full">
            {state == 'expanded' && (
              <Image src="/primary-logo.png" width={130} height={40} alt="Profile Image" />
            )}

            <Flex className="cursor-pointer" onClick={toggleSidebar}>
              {state == 'collapsed' ? (
                <ChevronsRight className="text-white w-6 h-6" />
              ) : (
                <ChevronsLeft className="text-white w-6 h-6" />
              )}
            </Flex>
          </Flex>
        </Box>
      </SidebarHeader>
      <SidebarContent className="bg-secondary">
        <NavMain items={paths} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
