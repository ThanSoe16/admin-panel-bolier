'use client';
import React from 'react';
import PageTitle from '@/components/shared/base/page-title';
import { Card, CardContent } from '@/components/ui/card';
import { useGetMaintenanceData } from '@/features/settings/maintenance/services/queries';
import {
  useUpdateMaintenance,
  useUpdateMaintenanceStatus,
} from '@/features/settings/maintenance/services/mutations';
import {
  UpdateMaintenanceRequest,
  updateMaintenanceSchema,
} from '@/features/settings/maintenance/types';
import { MaintenanceStatusCard } from './components/MaintenanceStatusCard';
import { MaintenanceMessageForm } from './components/MaintenanceMessageForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MaintenanceSkeleton } from './components/MaintenanceLoadingUI';

const Maintenance = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { data: maintenanceData, isLoading } = useGetMaintenanceData();
  const updateMaintenance = useUpdateMaintenance();
  const updateMaintenanceStatus = useUpdateMaintenanceStatus();

  const form = useForm<UpdateMaintenanceRequest>({
    resolver: zodResolver(updateMaintenanceSchema),
    defaultValues: {
      MaintenanceContent: [],
    },
  });

  React.useEffect(() => {
    if (maintenanceData?.body?.data) {
      const defaultValues = {
        MaintenanceContent: maintenanceData.body.data.MaintenanceContent.map((content) => ({
          id: content.id,
          message: content.message,
        })),
      };
      form.reset(defaultValues);
    }
  }, [maintenanceData, form]);

  const onSubmit = async (data: UpdateMaintenanceRequest) => {
    try {
      const res = await updateMaintenance.mutateAsync(data);
      if (res?.meta?.success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleMaintenance = () => {
    updateMaintenanceStatus.mutateAsync();
  };

  if (isLoading) {
    return <MaintenanceSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex flex-col items-start justify-center h-full gap-4">
        <PageTitle className="mb-0">System Maintenance</PageTitle>

        <MaintenanceStatusCard
          isActive={maintenanceData?.body?.data?.isActive ?? true}
          lastMaintainedAt={maintenanceData?.body?.data?.lastMaintenanceAt}
          onToggle={handleToggleMaintenance}
        />

        <MaintenanceMessageForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSubmit={onSubmit}
          maintenanceContents={maintenanceData?.body?.data?.MaintenanceContent || []}
          form={form}
          isPending={updateMaintenance.isPending}
        />
      </CardContent>
    </Card>
  );
};

export default Maintenance;
