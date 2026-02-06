'use client'
import React from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import CustomTextArea from '@/components/shared/custom-textarea';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import Image from 'next/image';
import { MaintenanceContent } from '@/features/settings/maintenance/types';

interface MaintenanceMessageFormProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onSubmit: (data: any) => void;
  maintenanceContents: MaintenanceContent[];
  form: any;
  isPending: boolean;
}

export const MaintenanceMessageForm = ({
  isEditing,
  setIsEditing,
  onSubmit,
  maintenanceContents,
  form,
  isPending
}: MaintenanceMessageFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        {maintenanceContents.map((content, index) => (
          <div key={content.id} className='w-full mb-6'>
            <div className="flex flex-row items-center space-x-4 justify-start mb-6">
              <Image
                src={content.Language.File.url}
                width={24}
                height={24}
                alt="icon"
                className='rounded-full w-6 h-6 object-cover object-center'
              />
              <p className='font-bold text-default text-base'>
                For {content.Language.name}
              </p>
            </div>
            <FormField
              control={form.control}
              name={`MaintenanceContent.${index}.message`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomTextArea
                      textLimit={500}
                      showCount
                      disabled={!isEditing}
                      placeholder='Maintenance Message'
                      className='border rounded-[12px] w-full'
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}

        <div className="flex flex-row justify-end items-center space-x-3 mt-4 w-full">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                className="text-text-primary"
                type='button'
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                loading={isPending}
                addDoneIcon
              >
                Update
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              type='button'
            >
              <PencilIcon className='w-6 h-6' />
              Edit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};