'use client';
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverPortal } from '@/components/ui/popover';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Menu } from '@/data/menu';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';

interface SidebarItemWithChildProps {
  item: Menu;
  isPathMatched: boolean;
}

const SidebarItemWithChild: React.FC<SidebarItemWithChildProps> = ({ item, isPathMatched }) => {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  if (state === 'collapsed' && !isMobile) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <SidebarMenuItem
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <SidebarMenuButton isActive={isPathMatched} variant="default">
              {item.active ? item.activeIcon : item.icon}

              {isMobile && (
                <>
                  <span>{item.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            side="right"
            align="start"
            sideOffset={-5}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="px-0 py-4"
          >
            <SidebarMenuSub className="border-none m-0">
              {item.subPaths?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.name}>
                  <Link href={subItem.path} className="w-full">
                    <SidebarMenuButton
                      isActive={subItem.active}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        if (isMobile) {
                          setIsOpen(false);
                        }
                      }}
                    >
                      {subItem.name}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    );
  }

  return (
    <Collapsible
      key={item.name}
      asChild
      defaultOpen={isPathMatched} // ✅ open if current route matches any subPath
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.name}
            isActive={pathname.startsWith(item.path)}
            variant="default"
          >
            {item.active ? item.activeIcon : item.icon}
            {
              // !isMobile && (
              <>
                <span>{item.name}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </>
              // )
            }
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.subPaths &&
              item.subPaths.map((subItem) => (
                <SidebarMenuSubItem key={subItem.name}>
                  <Link href={subItem.path}>
                    <SidebarMenuButton
                      tooltip={subItem.name}
                      isActive={subItem.active}
                      variant="outline"
                      onClick={() => {
                        if (isMobile) {
                          setIsOpen(false);
                        }
                      }}
                    >
                      <span>{subItem.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuSubItem>
              ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default SidebarItemWithChild;
