"use client";
import React, { useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { ChevronDown, ChevronsLeft, ChevronsRight } from "lucide-react";
import useSideBarStore from "@/store";
import { cn } from "@/lib/utils";
import { Image } from "../ui/image";
import { useNavigation } from "@/features/base/hooks/useNavigation";
import { Menu } from "@/data/menu";
import { useRouter } from "next/navigation";
import { useScreenSize } from "@/features/base/hooks/useScreenSize";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SideBar: React.FC = () => {
  const { collapse, setCollapse } = useSideBarStore();
  const { paths } = useNavigation();
  const router = useRouter();
  const screensize = useScreenSize();

  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (path: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const MenuItem = ({ item }: { item: Menu }) => {
    return (
      <div>
        <Flex
          align="center"
          justify="between"
          className={cn(
            item.active ? "bg-primary" : "hover:bg-white hover:text-black",
            "space-x-2 py-3 px-4 rounded-xl"
          )}
          onClick={() => {
            if (item.subPaths) {
              toggleDropdown(item.path);
            } else {
              router.push(item.path);
              if (screensize.width < 500) {
                setCollapse(true);
              }
            }
          }}
        >
          <Flex className="space-x-2 ">
            {item.active ? item.activeIcon : item.icon}
            {!collapse && (
              <div
                className={cn(
                  item.active ? "text-white font-bold " : " ",
                  "w-[155px] truncate"
                )}
              >
                {item.name}
              </div>
            )}
          </Flex>
          {!collapse && item.subPaths && (
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform",
                openDropdowns[item.path] ? "rotate-180" : "",
                item.active ? "text-white" : ""
              )}
            />
          )}
        </Flex>
        {!collapse && item.subPaths && openDropdowns[item.path] && (
          <Box className="mt-2">
            {item.subPaths.map((subItem) => (
              <Flex
                key={subItem.path}
                align="center"
                className={cn(
                  "rounded-lg px-4 py-3 cursor-pointer transition-all mb-1 hover:bg-white hover:text-black"
                )}
                onClick={() => {
                  router.push(subItem.path);
                  if (screensize.width < 500) {
                    setCollapse(true);
                  }
                }}
              >
                <Flex align="center" gap="2">
                  <div className="w-6 h-6" />
                  <div
                    className={subItem.active ? "text-primary font-bold" : ""}
                  >
                    {subItem.name}
                  </div>
                </Flex>
              </Flex>
            ))}
          </Box>
        )}
      </div>
    );
  };
  const CollapseMenuItem = ({ item }: { item: Menu }) => {
    return (
      <div>
        {!item.subPaths && (
          <div
            className={cn(
              item.active ? "bg-primary" : "",
              "py-3 px-4 rounded-xl"
            )}
            onClick={() => {
              router.push(item.path);
            }}
          >
            {item.active ? item.activeIcon : item.icon}
          </div>
        )}
        {item.subPaths && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                item.active ? "bg-primary" : "",
                "py-3 px-4 rounded-xl"
              )}
            >
              {item.active ? item.activeIcon : item.icon}
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="bg-secondary">
              <Box className="mt-2">
                {item.subPaths.map((subItem) => (
                  <Flex
                    key={subItem.path}
                    align="center"
                    className={cn(
                      "rounded-lg px-4 py-3 cursor-pointer transition-all mb-1 hover:bg-white hover:text-black"
                    )}
                    onClick={() => {
                      router.push(subItem.path);
                      if (screensize.width < 500) {
                        setCollapse(true);
                      }
                    }}
                  >
                    <Flex align="center" gap="2">
                      <div
                        className={
                          subItem.active ? "text-primary font-bold" : ""
                        }
                      >
                        {subItem.name}
                      </div>
                    </Flex>
                  </Flex>
                ))}
              </Box>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  };

  return (
    <Box className="h-full">
      <div className="h-full w-full bg-secondary relative cursor-pointer">
        <Box
          className={cn(
            collapse ? "bg-primary " : "bg-primary",
            "h-[70px] px-4 bg-cover bg-center bg-no-repeat"
          )}
        >
          <Flex
            justify={collapse ? "center" : "between"}
            align="center"
            className="h-full w-full"
          >
            {!collapse && (
              <Image
                src="/primary-logo.png"
                width={130}
                height={40}
                alt="Profile Image"
              />
            )}
            <div
              onClick={() => setCollapse(!collapse)}
              className="cursor-pointer"
            >
              {collapse ? (
                <ChevronsRight className="text-white w-6 h-6" />
              ) : (
                <ChevronsLeft className="text-white w-6 h-6" />
              )}
            </div>
          </Flex>
        </Box>
        <div className="p-4 space-y-2 overflow-auto h-[calc(100dvh-100px)]">
          {paths.map((item, index) => {
            return !collapse ? (
              <MenuItem item={item} key={index} />
            ) : (
              <CollapseMenuItem item={item} key={index} />
            );
          })}
        </div>
      </div>
    </Box>
  );
};

export default SideBar;
