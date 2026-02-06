'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import UpdateFAQForm from './UpdateFAQForm';
import { useGetFAQById } from '@/features/faqs/services/queries';

const UpdateFAQ = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const {data} = useGetFAQById(id);
  
  return (
    <div>
      {!!data?.body?.data && <UpdateFAQForm data={data?.body?.data} />}
    </div>
  )
}

export default UpdateFAQ