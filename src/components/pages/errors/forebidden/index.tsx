"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";

export default function Forbidden() {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen bg-white px-6 py-12 text-center"
    >
      {/* Optional Illustration */}
      <Image
        src="/logo/logo.png" // <- you can use your own SVG or illustration here
        alt="403 Forbidden"
        width={200}
        height={200}
        className="mb-6"
      />

      <h1 className="text-5xl font-bold text-destructive mb-4 animate-pulse">
        403 - Forbidden
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        Oops! You don’t have access to view this page. <br />
        Please contact your system administrator if you believe this is a
        mistake.
      </p>

      <Button
        onClick={() => router.back()}
        className="w-[200px] rounded-full font-semibold shadow-md"
        variant="destructive"
      >
        Go Back
      </Button>
    </Flex>
  );
}
