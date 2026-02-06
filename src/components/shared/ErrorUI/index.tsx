
import React, { ReactNode } from 'react';

interface Props {
  Icon: ReactNode,
  description: string
}

const ErrorUI: React.FC<Props> = ({
  Icon,
  description,
}) => {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col p-4'>
      {Icon}
      <p className='text-base text-textSecondary text-center px-4'>{description}</p>
    </div>
  )
}

export default ErrorUI