'use client';
import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const CancelButton: React.FC<ButtonProps> = (props) => {
  const router = useRouter();

  return (
    <Button {...props} variant="outline" onClick={() => props.onClick ?? router.back()}>
      Cancel
    </Button>
  );
};

export default CancelButton;
