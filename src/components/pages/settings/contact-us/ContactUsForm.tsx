'use client';
import React from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  ContactUSType,
  UpdateContactApiType,
  updateContactUsSchema,
  UpdateContactUSType,
} from '@/features/settings/contact-us/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextArea from '@/components/shared/custom-textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdateContactUs } from '@/features/settings/contact-us/services/mutations';
import Image from 'next/image';
import { toast } from 'sonner';
import { PencilIcon } from 'lucide-react';

interface ContactUSTypeProps {
  data: ContactUSType;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const ContactUsForm: React.FC<ContactUSTypeProps> = ({ data, isEditing, setIsEditing }) => {
  const { mutateAsync, isPending } = useUpdateContactUs();

  const defaultValues: UpdateContactUSType = {
    office: data.office,
    phoneNumbers: data.phoneNumbers.join(', '),
    email: data.email,
    operationHours: data.operationHours,
    contents: data.ContactUsContent.map((content) => ({
      id: content.id,
      mainTitle: content.mainTitle,
      description: content.description,
      socialTitle: content.socialTitle,
    })),
  };

  const form = useForm<UpdateContactUSType>({
    resolver: zodResolver(updateContactUsSchema),
    defaultValues,
  });

  const submit = async (submittedData: UpdateContactUSType) => {
    try {
      const dataToSend: UpdateContactApiType = {
        office: submittedData.office,
        phoneNumbers: submittedData.phoneNumbers
          .split(',')
          .map((num) => num.replace(/[^\d+]/g, '').trim()),
        email: submittedData.email,
        operationHours: submittedData.operationHours,
        contents: submittedData.contents.map((content) => ({
          id: content.id,
          mainTitle: content.mainTitle,
          description: content.description,
          socialTitle: content.socialTitle,
        })),
      };

      const response = await mutateAsync({
        id: data.id,
        data: dataToSend,
      });

      if (response?.meta?.success) {
        toast.success(response.meta?.message);
        // router.replace('/ads-list');
        setIsEditing(false);
        // Reset form with the updated data
        form.reset({
          office: dataToSend.office,
          phoneNumbers: dataToSend.phoneNumbers.join(', '),
          email: dataToSend.email,
          operationHours: dataToSend.operationHours,
          contents: dataToSend.contents.map((content) => ({
            id: content.id,
            mainTitle: content.mainTitle,
            description: content.description,
            socialTitle: content.socialTitle,
          })),
        });
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse.error?.data?.message ?? '');
      }
    } catch (error) {}
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          {data?.ContactUsContent.map((content, index) => (
            <div key={content?.id}>
              <div className="flex flex-row items-center space-x-2 justify-start mt-8">
                <Image
                  src={content?.Language?.File?.url}
                  width={20}
                  height={20}
                  alt="icon"
                  className="rounded-full w-5 h-5"
                />
                <p className="font-bold text-default text-base">
                  {' '}
                  Main Title For {content?.Language.name}{' '}
                </p>
              </div>
              <FormField
                control={form.control}
                name={`contents.${index}.mainTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} maxLength={60} placeholder="Title" disabled={!isEditing} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`contents.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomTextArea
                        {...field}
                        textLimit={300}
                        rows={3}
                        disabled={!isEditing}
                        showCount
                        placeholder="Description"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}

          {data?.ContactUsContent.map((content, index) => (
            <div key={content?.id}>
              <div className="flex flex-row items-center space-x-2 justify-start mt-8">
                <Image
                  src={content?.Language?.File?.url}
                  width={20}
                  height={20}
                  alt="icon"
                  className="rounded-full w-5 h-5"
                />
                <p className="font-bold text-default text-base">
                  {' '}
                  Social List Title For {content?.Language.name}{' '}
                </p>
              </div>
              <FormField
                control={form.control}
                name={`contents.${index}.socialTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} maxLength={60} disabled={!isEditing} placeholder="Title" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}

          <h2 className="pt-6 pb-2 font-bold text-default text-base"> Contact Information </h2>

          <FormField
            control={form.control}
            name={`office`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} disabled={!isEditing} placeholder="Office" maxLength={255} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`phoneNumbers`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} disabled={!isEditing} placeholder="Phone" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`email`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} disabled={!isEditing} placeholder="Email" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`operationHours`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} disabled={!isEditing} placeholder="Operation Hours" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-end items-center space-x-3 mt-4">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  className="text-text-primary"
                  type="button"
                  onClick={(e) => {
                    form.reset();
                    window.location.reload();
                  }}
                >
                  Cancel
                </Button>
                <Button loading={isPending} addDoneIcon>
                  {' '}
                  Update{' '}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} type="button">
                <PencilIcon className="w-6 h-6" />
                Edit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactUsForm;
