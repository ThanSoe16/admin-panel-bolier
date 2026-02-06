"use client"
import React from 'react'
import { PageBreadcrumb } from '@/components/shared/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'

const links = [
  {
    label: 'Template Sales',
    href: '/sale-history/template-sales',
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

      {/* Thumbnails Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="w-full h-full flex flex-col gap-3 items-center">
            <Skeleton className="w-full aspect-[4/3] rounded-xl" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-32 rounded" />
            </div>
          </div>
        ))}
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