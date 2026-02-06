"use client"
import React from 'react'
import { PageBreadcrumb } from '@/components/shared/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'

const links = [
  {
    label: 'Maintain Sales',
    href: '/sale-history/maintain',
  },
  {
    label: 'Details',
    href: '',
  }
]

const DetailsSkeleton = () => {
  return (
    <div className='space-y-6 mb-10'>
      {/* Breadcrumb and Invoice Skeleton */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <PageBreadcrumb links={links} enableBack />
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-6">
          {[1, 2, 3,].map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[25vh] w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailsSkeleton