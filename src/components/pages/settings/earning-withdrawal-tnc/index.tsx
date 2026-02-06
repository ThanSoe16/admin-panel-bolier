'use client';
import React from 'react';
import PageTitle from '@/components/shared/base/page-title';
import { Loading } from '@/components/shared/base/loading';
import { useGetEarningWithdrawalTNC } from '@/features/settings/terms-conditions/services/queries';
import { Grid } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/dateTime';
import TermsCard from '../terms/_components/TermsCard';

const EarningWithdrawalTNC = () => {
  const router = useRouter();
  const { data, isLoading } = useGetEarningWithdrawalTNC();

  return (
    <div>
      <PageTitle> Earning & Withdrawal Terms & Conditions </PageTitle>
      {isLoading ? (
        <Loading />
      ) : (
        data?.body?.data && (
          <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
            {data?.body?.data?.data.map((item) => (
              <TermsCard
                key={item.id}
                flagSrc={item?.Language?.File?.url}
                language={item?.Language?.name}
                title={item?.Language?.name}
                updatedOn={formatDate(item?.updatedAt)}
                description={item?.content}
                onEdit={() =>
                  router.push(
                    `/settings/earning-withdrawal-tnc/detail?language=${item?.Language?.key}`,
                  )
                }
              />
            ))}
          </Grid>
        )
      )}
    </div>
  );
};

export default EarningWithdrawalTNC;
