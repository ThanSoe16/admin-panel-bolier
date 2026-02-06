import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

/* ---------------- Pagination Root ---------------- */

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

/* ---------------- Pagination Content ---------------- */

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

/* ---------------- Pagination Item ---------------- */

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("cursor-pointer", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

/* ---------------- Pagination Link ---------------- */

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = "icon",
  onClick,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled ? true : undefined}
    tabIndex={disabled ? -1 : 0}
    onClick={(e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    }}
    className={cn(
      buttonVariants({
        variant: "ghost",
        size,
      }),
      isActive && "bg-brand-secondary text-[#275EE2] border-none",
      disabled
        ? "pointer-events-none opacity-50 text-muted-foreground"
        : "text-default",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

/* ---------------- Pagination Previous ---------------- */

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  disabled?: boolean;
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    disabled={disabled}
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/* ---------------- Pagination Next ---------------- */

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  disabled?: boolean;
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    disabled={disabled}
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/* ---------------- Pagination Ellipsis ---------------- */

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

/* ---------------- Exports ---------------- */

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
