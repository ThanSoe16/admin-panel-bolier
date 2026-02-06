"use client"; // Error components must be Client Components

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import { Image } from "@/components/ui/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex justify="center" align="center" direction="column" gap="4">
      <Image
        src={"/logo/logo.png"}
        width={300}
        height={200}
        alt="Logo Picture"
        className="w-[150px] h-[150px]"
      />
      <div className="text-sm">
        {error.message ??
          "This page is under construction. Please come back later."}{" "}
      </div>

      <Button className="rounded-xl px-5" onClick={reset}>
        Refresh
      </Button>
    </Flex>
  );
}
