import React from 'react'
import Image from 'next/image'

interface Props {
  imageUrl?: string
  label?: string
}

const LanguageFormLabel: React.FC<Props> = ({
  imageUrl,
  label,
}) => {
  return (
    <div className="flex flex-row items-center space-x-2 justify-start ">
      <Image
        src={imageUrl || "/temp/honey.jpeg"}
        width={20}
        height={20}
        alt="icon"
        className="rounded-full w-5 h-5"
      />
      <p className="font-bold text-default text-base">
        {label || "Label"}
      </p>
    </div>
  )
}

export default LanguageFormLabel