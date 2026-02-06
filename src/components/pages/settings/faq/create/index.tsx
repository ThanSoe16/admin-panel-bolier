'use client';
import { PageBreadcrumb } from '@/components/shared/breadcrumb';
import { Loading } from '@/components/shared/loading';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { CreateFAQRequest, createFAQSchema } from '@/features/faqs/types';
import { useGetLandingLanguages } from '@/features/landing-languages/services/queries';
import { toSentenceCase } from '@/utils/toSentenceCase';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FAQTypesEnum } from '@/features/base/types/backend-defined-enums';
import { useCreateFaq } from '@/features/faqs/services/mutations';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CreateFAQ = () => {
  const router = useRouter();
  const tab = useSearchParams().get('tab') || FAQTypesEnum.PURCHASING_DOMAINS;
  const { data: landingLanguages, isLoading } = useGetLandingLanguages();

  const { mutateAsync, isPending } = useCreateFaq();

  const form = useForm<CreateFAQRequest>({
    resolver: zodResolver(createFAQSchema),
    defaultValues: {
      type: tab as FAQTypesEnum,
      contents: [],
    },
  });

  useEffect(() => {
    if (landingLanguages?.body?.data) {
      form.reset({
        type: tab as FAQTypesEnum,
        contents: landingLanguages.body.data.map((language) => ({
          question: '',
          answer: '',
          languageId: language.id,
        })),
      });
    }
    //eslint-disable-next-line
  }, [landingLanguages, tab]);

  // uncomment this field in case of debugging
  // useEffect(() => {
  //   const subscription = form.watch((data) => {
  //     console.log("Form State:", data);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [form]);

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
      label: 'Create New',
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  const submit = async (data: CreateFAQRequest) => {
    try {
      const response = await mutateAsync(data);
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
              landingLanguages.body.data.map((language, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="flex flex-row items-center space-x-2 justify-start mt-8">
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
                        <FormControl>
                          <Textarea {...field} className="input-field" placeholder="Answer" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
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
              Create{' '}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateFAQ;
