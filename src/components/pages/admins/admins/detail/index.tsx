'use client';
import ErrorContainer from '@/components/shared/containers/error-container';
import ProfileAvatar from '@/components/shared/base/profile-avatar';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import { Loading } from '@/components/shared/base/loading';
import PageTitle from '@/components/shared/base/page-title';
import { Button } from '@/components/ui/button';
import { useGetAdminDetail } from '@/features/admins/services/queries';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/dateTime';
import { passwordDecrypt } from '@/utils/passwordDescrypt';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { Check, Copy, CopyCheck, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { JSX, useState } from 'react';

const AdminDetail = ({ id }: { id: string }) => {
  const adminDetail = useGetAdminDetail(id);

  const AdminRow = ({
    title,
    value,
    isFirst = false,
    isPassword = false,
    isCopy = false,
  }: {
    title?: string;
    value?: string | JSX.Element;
    isFirst?: boolean;
    isPassword?: boolean;
    isCopy?: boolean;
  }) => {
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const displayValue = isPassword && !visible ? '••••••••' : value;

    const handleCopy = () => {
      if (typeof value === 'string') {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };
    return (
      <Grid columns={'2'} className={cn(isFirst && 'border-t', 'py-4 border-b')}>
        <div className="font-medium">{title}</div>
        <Flex align="center" className="gap-2">
          <div>{displayValue}</div>
          {isPassword && (
            <div onClick={() => setVisible((prev) => !prev)} className="cursor-pointer">
              {!visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          )}
          {isCopy && (
            <div onClick={handleCopy} className="cursor-pointer">
              {copied ? <CopyCheck size={18} className="text-green-500" /> : <Copy size={18} />}
            </div>
          )}
        </Flex>
      </Grid>
    );
  };

  return (
    <div className="space-y-4 pb-4">
      <PageBreadcrumb
        links={[
          { label: 'Admin Lists', href: '/admins/list' },
          { label: 'Admin Details', href: '#' },
        ]}
        enableBack
      />
      {adminDetail?.isLoading ? (
        <Loading />
      ) : adminDetail?.error ? (
        <ErrorContainer />
      ) : (
        <div className="space-y-4 pt-6">
          <PageTitle> View Admin Details </PageTitle>
          <div className="space-y-4">
            <Flex justify="center">
              <ProfileAvatar
                photo={adminDetail?.data?.body?.data?.Avatar?.url ?? ''}
                name={adminDetail?.data?.body?.data?.name ?? ''}
                className="w-[160px] h-[160px] rounded-full"
              />
            </Flex>
            <div>
              <AdminRow title="Admin Name" value={adminDetail?.data?.body?.data?.name} isFirst />
              <AdminRow title="Phone Number" value={adminDetail?.data?.body?.data?.phone} />
              <AdminRow title="Login ID" value={adminDetail?.data?.body?.data?.loginId} isCopy />
              <AdminRow
                title="Password"
                value={passwordDecrypt(
                  adminDetail?.data?.body?.data?.encryptedPassword ?? '',
                  adminDetail?.data?.body?.data?.iv ?? '',
                  adminDetail?.data?.body?.data?.key ?? '',
                )}
                isPassword
              />
              <AdminRow title="Admin Role" value={adminDetail?.data?.body?.data?.AdminRole.name} />
              <AdminRow
                title="Status"
                value={
                  <div>
                    {adminDetail?.data?.body?.data?.AdminAccountStatus == 'ACTIVE' ? (
                      <Flex align={'center'} className="space-x-2">
                        <Box className="h-2 w-2 bg-green-500 rounded-full" />
                        <div>Active</div>
                      </Flex>
                    ) : (
                      <Flex align={'center'} className="space-x-2">
                        <Box className="h-2 w-2 bg-red-500 rounded-full" />
                        <div>Inactive</div>
                      </Flex>
                    )}
                  </div>
                }
              />
              <AdminRow
                title="Created on"
                value={formatDate(adminDetail?.data?.body?.data?.createdAt ?? '')}
              />
              <AdminRow
                title="Last Updated on"
                value={formatDate(adminDetail?.data?.body?.data?.updatedAt ?? '')}
              />
            </div>
            <Flex justify="end">
              <Link href={`/admins/list/${id}/update`}>
                <Button size="lg">Edit Admin Information</Button>
              </Link>
            </Flex>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDetail;
