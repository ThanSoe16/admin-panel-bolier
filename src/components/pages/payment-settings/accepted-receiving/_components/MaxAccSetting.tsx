import { MoneyInput } from "@/components/shared/base/MoneyInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateReceivingAccountConfig } from "@/features/payment-settings/accepted-receiving/services/mutations";
import { useState } from "react";

const MaxAccSetting = ({
  open,
  handleClose,
  maxAccount = 1,
}: {
  open: boolean;
  handleClose: () => void;
  maxAccount: number;
}) => {
  const updateReceivingAccountConfig = useUpdateReceivingAccountConfig();
  const [number, setNumber] = useState(maxAccount);
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogTitle> Edit Max. Acc Setting </DialogTitle>
        <p>
          Please define the maximum number of receiving account per blog owner
          in the following.
        </p>
        <MoneyInput
          value={number.toString()}
          setValue={(e) => {
            setNumber(parseInt(e));
          }}
        />
        <div className="flex flex-row gap-4 justify-end items-center mt-4">
          <Button
            variant="outline"
            className="text-text-primary min-w-[110px]"
            type="button"
            onClick={() => {
              handleClose();
              setNumber(maxAccount);
            }}
            size={"lg"}
          >
            Cancel
          </Button>
          <Button
            className="min-w-[110px]"
            loading={updateReceivingAccountConfig.isPending}
            addDoneIcon
            disabled={number == 0}
            size={"lg"}
            onClick={() =>
              updateReceivingAccountConfig
                .mutateAsync(number)
                .then(() => handleClose())
            }
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaxAccSetting;
