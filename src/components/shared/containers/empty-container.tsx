import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
interface Props {
  Icon: ReactNode;
  title: string;
  description: string;
  btnRender?: ReactNode;
}

const EmptyContainer: React.FC<Props> = ({ Icon, title, description, btnRender }) => {
  const router = useRouter();
  return (
    <div className="w-full h-[50dvh]">
      <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
        {Icon}
        <p className="font-semibold text-base md:text-lg mt-3"> {title} </p>
        <p className="whitespace-pre-line px-4 text-sm md:text-base text-[#797979] md:w-[60dvw] pt-1 pb-4">
          {description}
        </p>
        {btnRender ? (
          btnRender
        ) : (
          <Button onClick={() => router.replace('/home')}>Back to Homepage</Button>
        )}
      </div>
    </div>
  );
};

export default EmptyContainer;
