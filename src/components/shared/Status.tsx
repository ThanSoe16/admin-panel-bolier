import React from 'react';
import { Text } from '@radix-ui/themes';
import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';

interface StatusProps {
  showGreenDot: boolean;
  status: string; //status can be Active, Inactive or ongoing, disabled, Ended
}

const Status: React.FC<StatusProps> = ({ showGreenDot, status }) => {
  return (
    <div className="flex flex-row items-center">
      <Dot
        className={cn(
          'w-10 h-10 -ml-[12px] md:w-10 md:h-10 md:-ml-[16px]',
          showGreenDot ? 'text-green-500' : 'text-red-500',
        )}
      />
      <Text className="text-text-primary text-base -ml-1 capitalize"> {status} </Text>
    </div>
  );
};

export default Status;
