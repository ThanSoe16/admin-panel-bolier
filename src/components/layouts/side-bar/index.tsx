"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Menu } from "@/data/menu";
import { usePathname } from "next/navigation";
import SidebarItemWithChild from "./SidebarItemWithChild";
import Link from "next/link";

export function NavMain({ items }: { items: Menu[] }) {
  const pathname = usePathname();

  const { state, isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {items.map((item) => {
          const hasSubPaths = !!item.subPaths;
          const isPathMatched = item.active;

          return hasSubPaths ? (
            <SidebarItemWithChild
              key={item.name}
              item={item}
              isPathMatched={isPathMatched ?? false}
            />
          ) : (
            <Link href={item.path} key={item.path}>
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  tooltip={item.name}
                  isActive={pathname.startsWith(item.path)}
                  variant="default"
                  onClick={() => {
                    if (isMobile) {
                      setOpenMobile(false);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.active ? item.activeIcon : item.icon}
                    {(state === "expanded" || isMobile) && (
                      <span>{item.name}</span>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
