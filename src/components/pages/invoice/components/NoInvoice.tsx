'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NoInvoice = () => {
  return (
    <div className='w-full flex flex-col gap-2 justify-center items-center py-8 px-4 md:p-6'>
      <Image
        src="/invoice/invoice.svg"
        alt="empty"
        width={100}
        height={100}
        className='w-[100px] h-[100px] object-cover'
      />
      <p className='text-default-secondary text-lg font-bold'>  Create your first invoice. </p>

      <p className='text-default-secondary text-base'> Click on the button below to start adding invoice. </p>
      <Link href={'/invoice/create'}>
        <Button
          addDoneIcon
        >
          Create
        </Button>
      </Link>
    </div>
  )
}

export default NoInvoice