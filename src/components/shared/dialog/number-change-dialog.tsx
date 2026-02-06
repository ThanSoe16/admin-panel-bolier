import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NumberChangeDialog = ({
  open,
  isLoading,
  handleClose,
  onSubmit,
  maxAccount = 1,
  title = "Edit Max. Acc Setting",
  description = "Please define the maximum number of receiving account per blog owner in the following.",
}: {
  open: boolean;
  isLoading: boolean;
  handleClose: () => void;
  onSubmit: () => void;
  maxAccount: number;
  title: string;
  description: string;
}) => {
  const [number, setNumber] = useState(maxAccount);
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogTitle>{title}</DialogTitle>
        <p>{description}</p>
        <Input
          value={number}
          onChange={(e) => {
            const numberOnly = e.target.value.replace(/[^0-9]/g, "");
            setNumber(parseInt(numberOnly));
          }}
        />
        <div className="flex flex-row gap-4 justify-end items-center mt-4">
          <Button
            variant="outline"
            className="text-text-primary min-w-[110px]"
            type="button"
            onClick={() => handleClose()}
            size={"lg"}
          >
            Cancel
          </Button>
          <Button
            className="min-w-[110px]"
            loading={isLoading}
            addDoneIcon
            disabled={number == 0}
            size={"lg"}
            onClick={onSubmit}
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NumberChangeDialog;
