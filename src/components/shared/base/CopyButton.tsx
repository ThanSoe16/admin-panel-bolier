import { Flex } from "@radix-ui/themes";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

const CopyButton = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof value === "string") {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Flex align="center" className="gap-2">
      <div className={className}>{value}</div>

      <div onClick={handleCopy} className="cursor-pointer">
        {copied ? (
          <CopyCheck size={18} className="text-green-500" />
        ) : (
          <Copy size={18} className="text-primary" />
        )}
      </div>
    </Flex>
  );
};
export default CopyButton;
