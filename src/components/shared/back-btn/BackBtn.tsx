import React from "react";
import { ArrowLeft } from "lucide-react";
import { Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const BackBtn = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      className="mr-2 cursor-pointer bg-brand-secondary text-default hover:text-white"
      onClick={() => router.back()}
    >
      <ArrowLeft />
      <Text className="text-xs md:text-sm text-text-primary font-normal">
        Back
      </Text>
    </Button>
  );
};

export default BackBtn;
