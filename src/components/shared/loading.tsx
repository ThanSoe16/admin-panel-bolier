import { cn } from '@/lib/utils';
import { Flex } from '@radix-ui/themes';
import { Loader } from 'lucide-react';

export const Loading = ({ className }: { className?: string }) => {
  return (
    <Flex
      justify="center"
      align="center"
      className={cn('w-full h-full text-primary', className && className)}
    >
      <Loader className="w-6 h-6 animate-spin" />
    </Flex>
  );
};
