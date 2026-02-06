import { Flex } from "@radix-ui/themes";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import { UserReceivingAccountData } from "@/features/users/types";
import ViewQRCode from "./QRCode";

const UserAccount = ({
  data,
  hideQRButton = false,
}: {
  data: UserReceivingAccountData;
  hideQRButton?: boolean;
}) => {
  return (
    <div className="border p-4 rounded-lg space-y-4">
      <Flex
        justify={"between"}
        align={"center"}
        className="w-full gap-3"
        wrap={"wrap"}
      >
        <div className="space-y-2">
          <p>
            Withdraw to :{" "}
            <span className="font-semibold">
              {data?.AcceptedReceivingAccount?.name}
            </span>
          </p>
          <Flex align={"center"} className="gap-2" wrap={"wrap"}>
            <p>{data?.accountNumber}</p>
            <div className="bg-primary w-[6px] h-[6px] rounded-full mt-1" />
            <p>{data?.accountName}</p>
          </Flex>
        </div>
        <ProfileAvatar
          photo={data?.AcceptedReceivingAccount.File?.url}
          name={data?.AcceptedReceivingAccount?.name}
          className="min-w-24 min-h-14 rounded-lg"
        />
      </Flex>
      {!hideQRButton && data?.QR?.id && <ViewQRCode data={data} />}
    </div>
  );
};
export default UserAccount;
