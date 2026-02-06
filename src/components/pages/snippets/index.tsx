'use client';
import CancelButton from '@/components/shared/buttons/cancel-button';
import CreateButton from '@/components/shared/buttons/create-button';
import EditButton from '@/components/shared/buttons/edit-button';
import TableBaseButton from '@/components/shared/buttons/table-base-button';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { fetchUsers } from './components/data';
import { User } from './components/types';
import OptionSelect from '@/components/shared/input/option-select';
import { Input } from '@/components/ui/input';
import Combobox from '@/components/shared/input/combobox';
import CustomTextArea from '@/components/shared/input/custom-textarea';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';

const Snippets = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchedData = fetchUsers(page, limit);

    setData(fetchedData);
  }, [page, limit]);

  return (
    <div className="p-4">
      <div>
        <PageBreadcrumb
          links={[
            { label: 'Snippets', href: '/snippets' },
            { label: 'Create', href: '/snippets/create' },
          ]}
        />
      </div>
      <div className="flex flex-row gap-2 mt-4">
        Basic Button Variants
        <Button> Primary(default) </Button>
        <Button variant="destructive"> destructive</Button>
        <Button variant="outline"> outline</Button>
        <Button variant="secondary"> secondary</Button>
        <Button variant="ghost"> ghost</Button>
        <Button variant="link"> link</Button>
      </div>

      <div className="flex flex-row gap-2 mt-4">
        Utility
        <CancelButton />
        <CreateButton />
      </div>

      <div className="flex flex-row gap-2 mt-4">
        table buttons
        <EditButton> Edit </EditButton>
        <TableBaseButton uiType="details"> Details </TableBaseButton>
        <TableBaseButton uiType="block"> block </TableBaseButton>
        <TableBaseButton uiType="unblock"> unblock </TableBaseButton>
      </div>

      <div className="mt-4">
        form components
        <div className="mt-4">
          <OptionSelect
            options={[
              { label: 'Honey Nway OO', value: '1' },
              { label: 'Khin Wint War', value: '2' },
              { label: 'Poe Ma Mhe Thar', value: '3' },
            ]}
            value={'1'}
            onChange={(value) => {}}
          />
        </div>
        <div className="mt-4">
          <Input type="text" placeholder="Enter your name" />
        </div>
        <div className="mt-4">
          <Combobox
            placeholder="Combobox"
            options={[
              { label: 'Honey Nway OO', value: '1' },
              { label: 'Khin Wint War', value: '2' },
              { label: 'Poe Ma Mhe Thar', value: '3' },
            ]}
            value="1"
            setValue={(value) => {}}
          />
        </div>
        <div className="mt-4">
          <CustomTextArea placeholder="normal text area" />
        </div>
        <div className="mt-4">
          <CustomTextArea
            placeholder="normal text area with word count"
            textLimit={100}
            showCount
          />
        </div>
        {/* <TextEditor defaultValue="asdf" value="asdf" setValue={() => {}} /> */}
      </div>
    </div>
  );
};

export default Snippets;
