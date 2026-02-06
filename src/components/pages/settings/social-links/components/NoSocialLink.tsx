import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const NoSocialLink = () => {
  return (
    <div className='w-full h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-6 text-center text-default-secondary'>
        <Image src="/socials/socials.png" alt='Socials Links' width={100} height={100} />
        <div className="space-y-4">
          <p className="text-base md:text-lg leading-[26px] md:leading-[30px] font-bold">Add Social Link!</p>
          <p className="normal-text">Click on the button below to start adding link.</p>
        </div>
        <Button addDoneIcon className='bg-brand px-5'>
          Add
        </Button>
      </div>
    </div>
  )
}

export default NoSocialLink