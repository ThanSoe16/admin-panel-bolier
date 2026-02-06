import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Flex } from '@radix-ui/themes';

const SubPermissionItem = ({
  item,
  value,
  onChange,
  mode,
}: {
  item: any;
  value: Array<'VIEW' | 'EDIT' | 'CREATE' | 'DELETE'>;
  onChange: (value: Array<'VIEW' | 'EDIT' | 'CREATE' | 'DELETE'>) => void;
  mode: 'create' | 'update' | 'view';
}) => {
  const allPermissions: Array<'VIEW' | 'EDIT' | 'CREATE' | 'DELETE'> = item.permissions;
  const isAllSelected =
    allPermissions.length > 0 &&
    allPermissions.every((perm: 'VIEW' | 'EDIT' | 'CREATE' | 'DELETE') => value.includes(perm));

  const handleSelectAll = () => {
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange(allPermissions);
    }
  };

  return (
    <div>
      <Flex className="p-4" wrap={{ initial: 'wrap', md: 'nowrap' }}>
        <div className="w-full md:w-[400px] truncate">{item.title}</div>
        <Flex className="w-full">
          <Flex
            className="w-full gap-4 md:gap-20 pt-4 md:pt-0"
            wrap={{ initial: 'wrap', md: 'nowrap' }}
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                disabled={mode === 'view'}
              />
              <Label htmlFor="all">All</Label>
            </div>

            {item.permissions &&
              item.permissions.map((permission, index) => {
                const isChecked = value && value.includes(permission);

                const handleChange = () => {
                  if (value && value?.includes(permission)) {
                    onChange(value?.filter((p) => p !== permission));
                  } else {
                    onChange([...value, permission]);
                  }
                };

                return (
                  <div className="flex items-center space-x-2" key={index}>
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={handleChange}
                      id={index}
                      disabled={mode === 'view'}
                    />
                    <Label htmlFor={index}>{permission}</Label>
                  </div>
                );
              })}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default SubPermissionItem;
