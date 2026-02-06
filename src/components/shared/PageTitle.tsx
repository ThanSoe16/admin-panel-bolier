'use client';
import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

interface PageTitleProps extends PropsWithChildren {
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('text-default font-bold text-lg md:text-xl lg:text-2xl mb-4', className)}>
      {children}
    </div>
  );
};

export default PageTitle;
