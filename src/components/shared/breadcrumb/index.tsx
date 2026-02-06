"use client";
import { Flex, Text } from "@radix-ui/themes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import BackBtn from "../back-btn/BackBtn";

export interface BreadcrumbLink {
  href: string;
  label: string;
}

export interface PageBreadcrumbProps {
  links: BreadcrumbLink[];
  enableBack?: boolean;
}

export function PageBreadcrumb(props: PageBreadcrumbProps) {
  const router = useRouter();
  const { links, enableBack } = props;
  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        {enableBack && <BackBtn />}
        {links.map((link, index) => {
          return (
            <Flex
              key={index}
              direction={"row"}
              align="center"
              className="text-[16px] flex !flex-row font-bold"
              gap="0"
            >
              <BreadcrumbItem
                className="flex"
                onClick={() => {
                  if (link.href === "-1") {
                    router.back();
                  }
                }}
              >
                {link.href === "-1" ? (
                  <Text
                    className={`cursor-pointer hover:text-text-primary
                      ${
                        index !== links.length - 1
                          ? "text-default"
                          : "text-secondary cursor-not-allowed"
                      }
                    `}
                  >
                    {link.label}
                  </Text>
                ) : (
                  <BreadcrumbLink
                    onClick={() => {
                      router.replace(link.href);
                    }}
                    className={
                      index == links.length - 1
                        ? "text-default"
                        : "text-text-secondary "
                    }
                  >
                    {" "}
                    {link.label}{" "}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < links.length - 1 && (
                <BreadcrumbSeparator className="p-0 ml-2" />
              )}
            </Flex>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
