'use client';
import React from 'react';
import PageTitle from '@/components/shared/base/page-title';
import { Loading } from '@/components/shared/base/loading';
import TermsCard from './_components/TermsCard';
import { useGetTermsConditions } from '@/features/settings/terms-conditions/services/queries';
import { Grid } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/dateTime';

const TermsConditions = () => {
  const router = useRouter();
  const { data, isLoading } = useGetTermsConditions();

  return (
    <div>
      <PageTitle> Terms & Conditions </PageTitle>
      {isLoading ? (
        <Loading />
      ) : (
        data?.body?.data && (
          <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
            {data?.body?.data?.map((item) => (
              <TermsCard
                key={item.id}
                flagSrc={item?.Language?.File?.url}
                language={item?.Language?.name}
                title={item?.Language?.name}
                updatedOn={formatDate(item?.updatedAt)}
                description={item?.description}
                onEdit={() =>
                  router.push(`/settings/terms-conditions/detail?language=${item?.Language?.key}`)
                }
              />
            ))}
          </Grid>
        )
      )}
    </div>
  );
};

export default TermsConditions;
