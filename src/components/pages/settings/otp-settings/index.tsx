'use client';
import React, { useState } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { useGetOTPSettings } from '@/features/settings/otp-settings/services/queries';
import OTPSettingForm from './_components/OTPSettingForm';
import { Loading } from '@/components/shared/loading';

const OTPSettings = () => {
  const { data, isLoading } = useGetOTPSettings();

  const [editEnable, setEditEnable] = useState(false);

  return (
    <div>
      <PageTitle> OTPSettings </PageTitle>
      <div className="w-full">
        {isLoading ? (
          <Loading />
        ) : (
          data?.body?.data && (
            <OTPSettingForm
              data={data?.body?.data}
              setEditEnable={setEditEnable}
              editEnable={editEnable}
            />
          )
        )}
      </div>
    </div>
  );
};

export default OTPSettings;
