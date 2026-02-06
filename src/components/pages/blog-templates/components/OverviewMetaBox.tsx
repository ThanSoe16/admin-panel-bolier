'use client'
import { useGetTemplateOverview } from '@/features/blog-templates/services/queries'
import { Skeleton } from '@radix-ui/themes';
import React from 'react'

const OverviewMetaBox = () => {
  const { data, isLoading } = useGetTemplateOverview();

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      {isLoading ? (
        [1,2,3].map((item) => (
          <Skeleton
            key={item}
            className='h-20 bg-white rounded-xl border w-full'
          />
        ))
        ) : (
        <>
          <MetaBoxItem
            label='Uploaded Templates'
            value={data?.body?.data?.uploadedTemplates || 0}
            valueColor='#275EE2'
          />
          <MetaBoxItem
            label='User Using Templates'
            value={data?.body?.data?.templatesInUse || 0}
            valueColor='#319300'
          />
          <MetaBoxItem
            label='Ready from Developer (Need a review)'
            value={data?.body?.data?.readyTemplates || 0}
            valueColor='#FF1A1A'
          />
        </>
      )}

    </div>
  )
}

const MetaBoxItem = (props: {
  label: string,
  value: number,
  valueColor: string,
}) => {
  return (
    <div className='flex flex-col gap-2 p-4 bg-white rounded-xl border '>
      <p className='text-sm lg:text-base '>{props.label}</p>
      <p className='text-xl font-bold' style={{ color: props.valueColor }}>{props.value}</p>
    </div>
  )
}

export default OverviewMetaBox