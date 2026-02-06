'use client';
import React, { useEffect, useState } from 'react';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import { usePagination } from '@/features/base/hooks/usePagination';
import { useGetTermsConditions } from '@/features/settings/terms-conditions/services/queries';
import { TextEditor } from '@/components/shared/text-editor';
import { Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/shared/base/loading';
import { useUpdateTermsConditions } from '@/features/settings/terms-conditions/services/mutations';
import { UpdateTermsConditionsRequest } from '@/features/settings/terms-conditions/types';
import { toast } from 'sonner';

const TermsConditionDetail = () => {
  const router = useRouter();
  const { language } = usePagination();
  const { data, isLoading } = useGetTermsConditions();
  const updateTC = useUpdateTermsConditions();

  const currentLanguage = data?.body?.data?.find((item) => item?.Language?.key === language);

  const [value, setValue] = useState(currentLanguage?.description || '');

  useEffect(() => {
    if (currentLanguage) {
      setValue(currentLanguage?.description ?? '');
      return;
    }
  }, [currentLanguage]);

  const resetHandler = () => {
    router.back();
  };

  const updateHandler = () => {
    const updatedData: UpdateTermsConditionsRequest = {
      id: currentLanguage?.id ?? '',
      languageId: currentLanguage?.languageId ?? '',
      description: value,
    };
    updateTC.mutateAsync(updatedData).then(() => {
      toast.success('Updated successfully');
      router.back();
    });
  };

  return (
    <div className="space-y-4">
      <PageBreadcrumb
        links={[
          { label: 'Settings', href: '' },
          {
            label: 'Terms & Conditions',
            href: '/settings/terms-conditions',
          },
          { label: 'Detail', href: '' },
        ]}
        enableBack
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <TextEditor value={value} setValue={setValue} />
          <Flex justify="end" className="space-x-2">
            <Button size="lg" variant="outline" type="button" onClick={resetHandler}>
              Cancel
            </Button>
            <Button size="lg" onClick={updateHandler}>
              Update
            </Button>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default TermsConditionDetail;
