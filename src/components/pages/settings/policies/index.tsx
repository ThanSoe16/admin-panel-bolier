'use client';
import React from 'react';
import PageTitle from '@/components/shared/PageTitle';
import Tabs from '@/components/shared/tabs';
import TextEditorCard from '@/components/shared/text-editor-card';
import { useRouter } from 'next/navigation';
import { usePagination } from '@/features/base/hooks/usePagination';
import { parseAsString, useQueryState } from 'nuqs';
import {
  useGetPaymentPolicy,
  useGetPrivacyPolicy,
  useGetRecoveryPolicy,
  useGetRefundPolicy,
} from '@/features/settings/policies/services/queries';
import { Loading } from '@/components/shared/loading';
import { Grid } from '@radix-ui/themes';
import ErrorContainer from '@/components/shared/base/ErrorContainer';
import { formatDate } from '@/utils/dateTime';

const tabList = [
  {
    tab: `privacy`,
    label: 'Privacy Policy',
  },
  {
    tab: `payment`,
    label: 'Payment Policy',
  },
  // {
  //   tab: `refund`,
  //   label: "Refund Policy",
  // },
  {
    tab: `recovery`,
    label: 'Blog Recovery Policy',
  },
];

const Policies = () => {
  const router = useRouter();
  const { query } = usePagination();
  const [tab] = useQueryState(
    'tab',
    parseAsString.withDefault('payment').withOptions({ clearOnDefault: true }),
  );

  const paymentPolicy = useGetPaymentPolicy(query);
  const refundPolicy = useGetRefundPolicy(query);
  const privacyPolicy = useGetPrivacyPolicy(query);
  const recoveryPolicy = useGetRecoveryPolicy(query);

  return (
    <div>
      <PageTitle> Policies </PageTitle>
      <div>
        <Tabs tabList={tabList} className="mb-4" />
        <div className="grid grid-cols-1  gap-4">
          {tab === 'privacy' &&
            (privacyPolicy.error ? (
              <ErrorContainer />
            ) : privacyPolicy.isLoading ? (
              <Loading />
            ) : (
              <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
                {privacyPolicy?.data?.body?.data?.map((item) => (
                  <TextEditorCard
                    key={item.id}
                    flagSrc={item?.Language?.File?.url}
                    language={item?.Language?.name}
                    title={item?.Language?.name}
                    updatedOn={formatDate(item?.updatedAt)}
                    description={item?.description}
                    onEdit={() =>
                      router.push(
                        `/settings/policies/update?language=${item?.Language?.key}&tab=privacy`,
                      )
                    }
                  />
                ))}
              </Grid>
            ))}
          {tab === 'recovery' &&
            (recoveryPolicy.error ? (
              <ErrorContainer />
            ) : recoveryPolicy.isLoading ? (
              <Loading />
            ) : (
              <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
                {recoveryPolicy?.data?.body?.data?.map((item) => (
                  <TextEditorCard
                    key={item.id}
                    flagSrc={item?.Language?.File?.url}
                    language={item?.Language?.name}
                    title={item?.Language?.name}
                    updatedOn={formatDate(item?.updatedAt)}
                    description={item?.description}
                    onEdit={() =>
                      router.push(
                        `/settings/policies/update?language=${item?.Language?.key}&tab=recovery`,
                      )
                    }
                  />
                ))}
              </Grid>
            ))}

          {tab === 'payment' &&
            (paymentPolicy.error ? (
              <ErrorContainer />
            ) : paymentPolicy.isLoading ? (
              <Loading />
            ) : (
              <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
                {paymentPolicy?.data?.body?.data?.map((item) => (
                  <TextEditorCard
                    key={item.id}
                    flagSrc={item?.Language?.File?.url}
                    language={item?.Language?.name}
                    title={item?.Language?.name}
                    updatedOn={formatDate(item?.updatedAt)}
                    description={item?.description}
                    onEdit={() =>
                      router.push(
                        `/settings/policies/update?language=${item?.Language?.key}&tab=payment`,
                      )
                    }
                  />
                ))}
              </Grid>
            ))}

          {tab === 'refund' &&
            (refundPolicy.error ? (
              <ErrorContainer />
            ) : refundPolicy.isLoading ? (
              <Loading />
            ) : (
              refundPolicy.data?.body?.data && (
                <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
                  {refundPolicy?.data?.body?.data?.map((item) => (
                    <TextEditorCard
                      key={item.id}
                      flagSrc={item?.Language?.File?.url}
                      language={item?.Language?.name}
                      title={item?.Language?.name}
                      updatedOn={formatDate(item?.updatedAt)}
                      description={item?.description}
                      onEdit={() =>
                        router.push(
                          `/settings/policies/update?language=${item?.Language?.key}&tab=refund`,
                        )
                      }
                    />
                  ))}
                </Grid>
              )
            ))}
        </div>
      </div>
    </div>
  );
};

export default Policies;
