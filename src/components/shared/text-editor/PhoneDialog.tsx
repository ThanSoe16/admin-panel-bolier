"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface PhoneDialogProps {
  open: boolean;
  handleClose: () => void;
  handleOkay: (phone: string) => void;
}

const PhoneDialog: React.FC<PhoneDialogProps> = ({
  open,
  handleClose,
  handleOkay,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClick = () => {
    try {
      const rawData = phoneNumber?.trim();

      if (!rawData) {
        toast.error("Please enter phone number");
        return;
      }

      const isValidPhone = /^[+\d\s\-()]{6,15}$/.test(rawData);
      // Allow digits (\d), spaces (\s), hyphens (-), and parentheses
      //Length between 6 and 15 characters, which fits most real phone numbers globally,
      //if you made any changes on regex please update the comment

      if (!isValidPhone) {
        toast.error("Invalid Phone Number");
        return;
      }

      handleOkay(phoneNumber);
    } catch (error) {}
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Phone Number</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-4">
          <Input
            type="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
            autoFocus={false}
          />
          <div className="w-full flex flex-row justify-end gap-2">
            <Button onClick={handleClose} type="button" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClick} disabled={!phoneNumber} type="button">
              Okay
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneDialog;
