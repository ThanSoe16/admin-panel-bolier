import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  ExchangeRateData,
  UpdateExchangeRateAllRequest,
  updateExchangeRateAllSchema,
} from "@/features/payment-settings/exchange-rate-service/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Grid } from "@radix-ui/themes";
import { Info } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import ExchangeRateRow from "./ExchangeRateRow";
import { Button } from "@/components/ui/button";
import { useUpdateExchangeRateAll } from "@/features/payment-settings/exchange-rate-service/services/mutations";

const EditAllExchangeRate = ({
  open,
  handleClose,
  data,
}: {
  open: boolean;
  handleClose: (value: boolean) => void;
  data: ExchangeRateData[];
}) => {
  const updateExchangeRate = useUpdateExchangeRateAll();
  const form = useForm<UpdateExchangeRateAllRequest>({
    resolver: zodResolver(updateExchangeRateAllSchema),
    defaultValues: {
      currencies: data.map((e) => ({
        ...e,
        exchangeRate: e.exchangeRate.toString(),
        exchangeServiceFee: e.exchangeServiceFee.toString(),
      })),
    },
  });

  const { fields: exchangeRateFields } = useFieldArray({
    control: form.control,
    name: "currencies",
  });

  const submit = async (data: UpdateExchangeRateAllRequest) => {
    updateExchangeRate.mutateAsync(data).then(() => {
      handleClose(false);
    });
  };

  const headers = [
    { name: "Country", column: 2 },
    { name: "Currency Code", column: 1 },
    { name: "Exchange Rate/ $", column: 2 },
    { name: "Service Fee/ $", column: 2 },
    { name: "Status", column: 1 },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[1350px] max-h-[550px] overflow-hidden">
        <DialogTitle> Edit All </DialogTitle>
        <Flex
          align={"center"}
          className="border-l-4 border-primary bg-secondary px-4 py-2 text-sm gap-2"
        >
          <Info className="w-4 h-4 text-primary" />
          Based currency is <b>$</b>.
        </Flex>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col w-full"
          >
            <Flex align={"center"} className="space-x-4 hidden md:flex">
              {/* <div className="w-16">Image</div> */}
              <Grid columns={"8"} className="w-full space-x-4">
                {headers.map((header, key) => (
                  <div
                    key={key}
                    style={{
                      gridColumn: `span ${header.column} / span ${header.column} `,
                    }}
                  >
                    {header.name}
                  </div>
                ))}
              </Grid>
            </Flex>
            <div className="flex flex-col max-h-[300px] overflow-y-scroll gap-8 md:gap-4 pt-4">
              {exchangeRateFields.map((field, key) => (
                <ExchangeRateRow
                  form={form}
                  key={key}
                  index={key}
                  defaultImage={data.flatMap((e) => e.File?.url)}
                />
              ))}
            </div>

            <div className="flex flex-row gap-4 justify-end items-center mt-4">
              <Button
                variant="outline"
                className="text-text-primary min-w-[110px]"
                type="button"
                onClick={() => handleClose(false)}
                size={"lg"}
              >
                Cancel
              </Button>
              <Button
                className="min-w-[110px]"
                loading={updateExchangeRate.isPending}
                disabled={!form.formState.isValid}
                addDoneIcon
                size={"lg"}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditAllExchangeRate;
