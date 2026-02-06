import React from 'react';
import { Checkbox, type CheckboxProps } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface FormCheckBoxProps extends CheckboxProps { 
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
}

const FormCheckBox: React.FC<FormCheckBoxProps> = ({
  label,
  labelClassName,
  wrapperClassName,
}) => {
  return (
    <div className={cn('flex flex-row justify-start items-center gap-2 mt-4',
      wrapperClassName
    )}>
      <Checkbox />
      {label && <p className={cn('text-sm font-normal text-[#686868]', labelClassName)}> {label} </p>}
      
    </div>
  )
}

export default FormCheckBox