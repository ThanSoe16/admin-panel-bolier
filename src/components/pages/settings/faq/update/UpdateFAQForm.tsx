'use client';
import React from 'react';
import { FAQData, UpdateFAQRequest, updateFAQSchema } from '@/features/faqs/types';
import { useGetLandingLanguages } from '@/features/landing-languages/services/queries';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loading } from '@/components/shared/base/loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import Image from 'next/image';
import { toSentenceCase } from '@/utils/toSentenceCase';
import { useUpdateFaq } from '@/features/faqs/services/mutations';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface UpdateFAQFormProps {
  data: FAQData;
}

const UpdateFAQForm: React.FC<UpdateFAQFormProps> = ({ data }) => {
  const router = useRouter();
  const tab = useSearchParams().get('tab') || '';
  const { data: landingLanguages, isLoading } = useGetLandingLanguages();

  const { mutateAsync, isPending } = useUpdateFaq();

  const links = [
    {
      href: '',
      label: 'FAQs',
    },
    {
      href: `/settings/faqs?tab=${tab}`,
      label: toSentenceCase(tab),
    },
    {
      href: '',
      label: 'Edit',
    },
  ];

  const form = useForm<UpdateFAQRequest>({
    resolver: zodResolver(updateFAQSchema),
    defaultValues: {
      contents:
        data.FaqContent.map((language) => ({
          id: language?.id,
          question: language?.question,
          answer: language?.answer,
          languageId: language?.languageId,
        })) || [],
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const submit = async (submittedData: UpdateFAQRequest) => {
    try {
      const response = await mutateAsync({
        id: data.id,
        data: submittedData,
      });

      if (response?.meta?.success) {
        toast.success(response?.meta?.message);
        router.back();
      } else {
        toast.error(response?.meta?.message);
      }
    } catch (error) {}
  };

  return (
    <div>
      <PageBreadcrumb enableBack links={links} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="mt-4">
            {landingLanguages?.body?.data &&
              landingLanguages.body.data.map((language) => {
                const index = data.FaqContent.findIndex(
                  (content) => content.languageId === language.id,
                );

                return (
                  <div key={index} className="flex flex-col space-y-2">
                    <div className="flex flex-row items-center space-x-2 justify-start mt-4">
                      <Image
                        src={language?.File?.url}
                        width={20}
                        height={20}
                        alt="icon"
                        className="rounded-full w-5 h-5"
                      />
                      <p className="font-bold text-default text-base"> For {language.name} </p>
                    </div>

                    <FormField
                      control={form.control}
                      name={`contents.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Question </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              maxLength={60}
                              className="input-field"
                              placeholder="Question"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`contents.${index}.answer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Answer </FormLabel>
                          <FormControl>
                            <Textarea {...field} className="input-field" placeholder="Answer" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
          </div>

          <div className="flex flex-row justify-end items-center space-x-3 mt-4">
            <Button
              variant="outline"
              className="text-text-primary"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button loading={isPending} addDoneIcon>
              {' '}
              Update{' '}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateFAQForm;
