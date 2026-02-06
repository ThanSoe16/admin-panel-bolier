"use client";
import React, { useEffect } from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { useRouter } from "next/navigation";
import { usePagination } from "@/features/base/hooks/usePagination";
import { parseAsString, useQueryState } from "nuqs";
import {
  useGetPaymentPolicy,
  useGetPrivacyPolicy,
  useGetRecoveryPolicy,
  useGetRefundPolicy,
} from "@/features/settings/policies/services/queries";
import {
  useUpdatePaymentPolicy,
  useUpdatePrivacyPolicy,
  useUpdateRecoveryPolicy,
  useUpdateRefundPolicy,
} from "@/features/settings/policies/services/mutations";
import { UpdatePolicyRequest } from "@/features/settings/policies/types";
import { TextEditor } from "@/components/shared/text-editor";
import { Loading } from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";

const UpdatePolicy = () => {
  const router = useRouter();
  const { language, query } = usePagination();
  const [tab] = useQueryState(
    "tab",
    parseAsString.withDefault("payment").withOptions({ clearOnDefault: true })
  );
  const paymentPolicy = useGetPaymentPolicy(query);
  const refundPolicy = useGetRefundPolicy(query);
  const privacyPolicy = useGetPrivacyPolicy(query);
  const recoveryPolicy = useGetRecoveryPolicy(query);
  const updatePaymentPolicy = useUpdatePaymentPolicy();
  const updateRefundPolicy = useUpdateRefundPolicy();
  const updatePrivacyPolicy = useUpdatePrivacyPolicy();
  const updateRecoveryPolicy = useUpdateRecoveryPolicy();

  const [value, setValue] = React.useState("");

  const links = [
    { label: "Settings", href: "" },
    {
      label:
        tab === "payment"
          ? "Payment Policy"
          : tab == "refund"
          ? "Refund Policy"
          : tab == "privacy"
          ? "Privacy Policy"
          : "Blog Recovery Policy",
      href: `/settings/policies?tab=${tab}`,
    },
    { label: "Detail", href: "" },
  ];

  const currentGetData =
    tab === "payment"
      ? paymentPolicy
      : tab === "refund"
      ? refundPolicy
      : tab === "privacy"
      ? privacyPolicy
      : recoveryPolicy;

  const currentLanguage = currentGetData.data?.body?.data?.find(
    (item) => item?.Language?.key === language
  );

  useEffect(() => {
    if (currentLanguage) {
      setValue(currentLanguage?.description ?? "");
      return;
    }
  }, [currentLanguage]);

  const updateHandler = async () => {
    let response: any;
    const updateData: UpdatePolicyRequest = {
      id: currentLanguage?.id ?? "",
      languageId: currentLanguage?.languageId ?? "",
      description: value,
    };
    if (tab === "payment") {
      response = await updatePaymentPolicy.mutateAsync(updateData);
    } else if (tab === "refund") {
      response = await updateRefundPolicy.mutateAsync(updateData);
    } else if (tab === "privacy") {
      response = await updatePrivacyPolicy.mutateAsync(updateData);
    } else {
      response = await updateRecoveryPolicy.mutateAsync(updateData);
    }

    if (response?.meta?.success) {
      router.back();
    }
  };

  const resetHandler = () => {
    router.back();
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex items-center gap-4 xl:gap-6">
        <PageBreadcrumb links={links} enableBack />
      </div>
      {paymentPolicy.isLoading || refundPolicy.isLoading ? (
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

export default UpdatePolicy;
