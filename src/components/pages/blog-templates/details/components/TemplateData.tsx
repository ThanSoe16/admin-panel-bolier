"use client";
import React from "react";
import { TemplateDetailsData } from "@/features/blog-templates/types";
import StatusChangeDialog from "@/components/shared/status-change-dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ChevronRight, Star } from "lucide-react";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { TemplateStatusEnum } from "@/features/base/types/backend-defined-enums";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { useToggleTemplateStatus } from "@/features/blog-templates/services/mutations";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Flex } from "@radix-ui/themes";
import { Tooltip } from "@radix-ui/themes";
import EditButton from "@/components/shared/buttons/EditButton";
import SecondaryEditButton from "@/components/shared/buttons/SecondaryEditButton";
import { useRouter } from "next/navigation";

interface Props {
  data: TemplateDetailsData;
}

const TemplateData: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data: languageData } = useGetLandingLanguages();
  const { mutateAsync, isPending } = useToggleTemplateStatus();

  const defaultLanguageId =
    languageData?.body?.data?.find((lang) => lang.key === "en")?.id || "";

  const handleTemplateStatusChange = async () => {
    try {
      const response = await mutateAsync({ template_id: data?.id ?? "" });
      if (response?.meta?.success) {
        toast.success(response?.meta?.message);
        setOpen(false);
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row justify-between items-center">
        <Flex align="center" className="space-x-3">
          <Switch
            checked={data?.Status == TemplateStatusEnum.LAUNCH}
            onCheckedChange={() => setOpen(true)}
          />
          <div>
            {data?.Status == TemplateStatusEnum.LAUNCH ? "Active" : "Inactive"}
          </div>
        </Flex>

        <SecondaryEditButton
          asBtn
          onClick={() => {
            router.push(`/blog-templates/update?id=${data?.id}`);
          }}
          btnName="Edit Details"
        />
      </div>
      <p className="text-lg md:text-xl font-bold"> {data?.name} </p>
      <div className="flex flex-col items-start  gap-4">
        <div className="flex flex-row items-center gap-1 text-base flex-wrap">
          <Tooltip
            content={
              data?.TemplateCategory?.TemplateCategoryContent?.find(
                (category) => category.languageId === defaultLanguageId
              )?.name ?? ""
            }
          >
            <p className=" line-clamp-1">
              {" "}
              {data?.TemplateCategory?.TemplateCategoryContent?.find(
                (category) => category.languageId === defaultLanguageId
              )?.name ?? ""}{" "}
            </p>
          </Tooltip>
          <ChevronRight />
          <Tooltip
            content={
              data?.TemplateOnTemplateSubCategory?.map(
                (item) =>
                  item.TemplateSubCategory?.TemplateSubCategoryContent?.find(
                    (subcategory) =>
                      subcategory.languageId === defaultLanguageId
                  )?.name
              ).join(", ") ?? ""
            }
          >
            <p className="line-clamp-1">
              {" "}
              {data?.TemplateOnTemplateSubCategory?.map(
                (item) =>
                  item.TemplateSubCategory?.TemplateSubCategoryContent?.find(
                    (subcategory) =>
                      subcategory.languageId === defaultLanguageId
                  )?.name
              ).join(", ") ?? ""}{" "}
            </p>
          </Tooltip>
        </div>
        <p className="text-brand"> {data?.templateCode} </p>
      </div>
      <p className="text-lg md:text-xl font-bold">
        {" "}
        ${CurrencyFormat(data?.price)}{" "}
      </p>
      <div>
        {data?.perks &&
          data?.perks.map((highlight) => (
            <Flex align="center" gap={"2"} key={highlight}>
              <Star className="text-primary w-4 h-4" />
              <div>{highlight}</div>
            </Flex>
          ))}
      </div>
      {data?.TemplateDescription.length > 0 && (
        <div>
          <div className="font-bold">Descrition</div>
          {data?.TemplateDescription.map((highlight) => (
            <Flex align="center" gap={"2"} key={highlight.id}>
              <div>{highlight.description}</div>
            </Flex>
          ))}
        </div>
      )}

      {open && (
        <StatusChangeDialog
          open={open}
          loading={isPending}
          handleClose={() => setOpen(false)}
          isActive={data?.Status === TemplateStatusEnum.LAUNCH}
          description={
            data?.Status === TemplateStatusEnum.LAUNCH
              ? "Are you sure you want to change this template status as “Inactive”?. Once you changed, users except for the ones who already purchased this template will not be able to view anymore."
              : "Are you sure you want to change this template status as “Inactive”?. Once you changed, users will be able to view and purchase this template"
          }
          handleChange={handleTemplateStatusChange}
          onName="Active"
          offName="Inactive"
        />
      )}
    </div>
  );
};

export default TemplateData;
