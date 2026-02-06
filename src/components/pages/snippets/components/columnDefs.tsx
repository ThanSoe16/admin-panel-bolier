import { User } from './types';
import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const columDefs: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.image} alt="@shadcn" />
        <AvatarFallback>{row.original.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    ),
  },
];

export default columDefs;
