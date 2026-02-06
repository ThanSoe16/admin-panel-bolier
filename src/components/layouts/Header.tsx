'use client';
import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { useUserInfo } from '@/features/base/hooks/useUserInfo';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import ProfileAvatar from '../shared/base/profile-avatar';
import { useGetMe } from '@/features/auth/service/queries';
import { Loading } from '../shared/base/loading';
import { SidebarTrigger } from '../ui/sidebar';

const Header = () => {
  const { removeAllData } = useUserInfo();
  const { data, isLoading } = useGetMe();

  const logoutHandler = () => {
    window.location.href = '/login';
    removeAllData();
    return;
  };

  const UserAvatar = () => {
    return (
      <Box>
        {isLoading ? (
          <Loading />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-x-2 ">
                <ProfileAvatar
                  photo={data?.body?.data?.Avatar?.url ?? '/images/default-profile.png'}
                  name={data?.body?.data?.name ?? ''}
                  className="w-9 h-9 rounded-full"
                />
                <div className="text-start">
                  <div className="text-sm font-medium text-background max-w-[100px] truncate">
                    {data?.body?.data?.name}
                  </div>
                  <div className="text-xs text-background">{data?.body?.data?.AdminRole?.name}</div>
                </div>
                <ChevronDown className="text-background h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/profile`}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </Box>
    );
  };

  return (
    <Box className="relative z-1000">
      <header className="w-full h-[70px]">
        <Flex
          align="center"
          justify="between"
          className="w-full h-full bg-brand bg-cover bg-center bg-no-repeat"
        >
          <SidebarTrigger className="md:hidden ml-4" />
          <Flex align="center" className="w-full space-x-3 hidden md:flex">
            {/* <Input
              placeholder="Search username or ID"
              className="w-[220px] bg-transparent border-none text-white placeholder:text-white"
              preFix={<Search className="text-white" />}
            />
            <Badge>⌘ + K</Badge>
            <Badge>Ctrl + K</Badge> */}
          </Flex>
          <Flex className="w-full items-center py-1 px-[12px]" justify="end">
            <UserAvatar />
          </Flex>
        </Flex>
      </header>
    </Box>
  );
};

export default Header;
