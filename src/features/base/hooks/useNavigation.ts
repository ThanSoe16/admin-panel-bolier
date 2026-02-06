"use client";
import { getAllPaths, Menu } from "@/data/menu";
import { getPermissionsFromCookies } from "@/utils/getPermissionsFromCookies";
import { usePathname } from "next/navigation";

export const useNavigation = () => {
  const pathname = usePathname();
  const permissions = getPermissionsFromCookies(); // ✅ Now available

  const paths = getAllPaths(pathname || "")
    .map((menu) => {
      if (!menu.subPaths) {
        if (!menu.permission || permissions.includes(menu.permission)) {
          return menu;
        }
        return null;
      }

      const filteredSubMenu = menu.subPaths?.filter((sub) =>
        permissions.includes(sub.permission || "")
      );

      if (filteredSubMenu && filteredSubMenu.length > 0) {
        return { ...menu, subPaths: filteredSubMenu };
      }

      return null;
    })
    .filter(Boolean) as Menu[];

  console.log("paths", paths);

  return {
    paths,
  };
};
