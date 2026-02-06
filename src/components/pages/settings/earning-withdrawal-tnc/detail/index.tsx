"use client";
import React, { useEffect, useState } from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetEarningWithdrawalTNC } from "@/features/settings/terms-conditions/services/queries";
import { TextEditor } from "@/components/shared/text-editor";
import { Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useUpdateEarningWithdrawalTNC } from "@/features/settings/terms-conditions/services/mutations";
import { UpdateTermsConditionsRequest } from "@/features/settings/terms-conditions/types";
import { toast } from "sonner";

const EarningWithdrawalTNCDetail = () => {
  const router = useRouter();
  const { language } = usePagination();
  const { data, isLoading } = useGetEarningWithdrawalTNC();
  const updateTC = useUpdateEarningWithdrawalTNC();

  const currentLanguage = data?.body?.data?.data.find(
    (item) => item?.Language?.key === language
  );

  const [value, setValue] = useState(currentLanguage?.content || "");

  useEffect(() => {
    if (currentLanguage) {
      setValue(currentLanguage?.content ?? "");
      return;
    }
  }, [currentLanguage]);

  const resetHandler = () => {
    router.back();
  };

  const updateHandler = () => {
    const updatedData: UpdateTermsConditionsRequest = {
      id: currentLanguage?.id ?? "",
      languageId: currentLanguage?.languageId ?? "",
      description: value,
    };
    updateTC.mutateAsync(updatedData).then(() => {
      router.back();
    });
  };

  return (
    <div className="space-y-4">
      <PageBreadcrumb
        links={[
          { label: "Settings", href: "" },
          {
            label: "Earning & Withdrawal Terms & Conditions",
            href: "/settings/earning-withdrawal-tnc",
          },
          { label: "Detail", href: "" },
        ]}
        enableBack
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <TextEditor value={value} setValue={setValue} />
          <Flex justify="end" className="space-x-2">
            <Button
              size="lg"
              variant="outline"
              type="button"
              onClick={resetHandler}
            >
              Cancel
            </Button>
            <Button size="lg" onClick={updateHandler}>
              Update
            </Button>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default EarningWithdrawalTNCDetail;
