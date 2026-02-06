'use client';
import React from 'react';
import { Textarea as TextArea } from '@/components/ui/textarea';

interface CustomTextAreaProps extends React.ComponentProps<'textarea'> {
  textLimit?: number;
  showCount?: boolean;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  textLimit,
  showCount = false,
  ...props
}) => {
  return (
    <>
      {showCount && textLimit ? (
        <div className="relative">
          <TextArea
            {...props}
            className="pr-[100px] border "
            style={{
              paddingRight: '80px',
            }}
            onChange={(e) => {
              if (e.target.value.length > textLimit) {
                return;
              }
              props.onChange?.(e);
            }}
            placeholder={props.placeholder}
          />
          <p className="absolute top-2 right-2  md:right-4 text-sm text-placeholder ">
            {(props.value as string)?.length || 0} / {textLimit}
          </p>
        </div>
      ) : (
        <TextArea className="border rounded-[12px] " {...props} />
      )}
    </>
  );
};

export default CustomTextArea;
