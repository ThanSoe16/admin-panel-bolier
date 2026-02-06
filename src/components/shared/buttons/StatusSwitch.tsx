import { Switch } from '@/components/ui/switch';
import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import ConfirmationDialog from '../dialog/confirmation-dialog';
import { Image } from '@/components/ui/image';
import { usePathname } from 'next/navigation';
import { matchRouteToStoredPermission } from '@/utils/routeMatcher';
import { routePermissionMap } from '@/data/route-permissions';

const StatusSwitch = ({
  value,
  onChange,
  activeLabel = 'Active',
  inactiveLabel = 'Inactive',
  activeDesc = `Are you sure you want to change this Admin status as "${activeLabel}"?. Once you changed, the admin will no longer be able to login or use this Admin panel anymore.`,
  inactiveDesc = `Are you sure you want to change this Admin status as "${inactiveLabel}"?. Once you changed, the admin will be able to login and use this Admin panel.`,
  disabled = false,
  hideLabel = false,
}: {
  value: boolean;
  onChange?: any;
  activeLabel?: string;
  inactiveLabel?: string;
  activeDesc?: string;
  inactiveDesc?: string;
  disabled?: boolean;
  hideLabel?: boolean;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const match = matchRouteToStoredPermission(pathname, routePermissionMap);

  return (
    <div>
      <Flex align="center" className="space-x-3">
        <Switch
          checked={value}
          onCheckedChange={() => setModalOpen(true)}
          disabled={disabled || !match.includes('EDIT')}
        />
        {!hideLabel && <div>{value ? activeLabel : inactiveLabel}</div>}
      </Flex>
      <ConfirmationDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isDelete={value}
        title={value ? `Change to "${inactiveLabel}"?` : `Change to "${activeLabel}"?`}
        desc={value ? inactiveDesc : activeDesc}
        confirmText={
          value ? (
            <Flex align="center" className="space-x-1">
              <Image src="/components/off.svg" alt="active" width={18} height={10} />
              <div>{value ? inactiveLabel : activeLabel}</div>
            </Flex>
          ) : (
            <Flex align="center" className="space-x-1">
              <Image src="/components/on.svg" alt="active" width={18} height={10} />
              <div>Active</div>
            </Flex>
          )
        }
        onPress={() => {
          onChange();
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default StatusSwitch;
