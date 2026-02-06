'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PageTitle from '@/components/shared/base/page-title';
import ContactUsForm from './ContactUsForm';
import { useGetContactUs } from '@/features/settings/contact-us/services/queries';
import { Loading } from '@/components/shared/base/loading';

const ContactUs = () => {
  const { data, isLoading } = useGetContactUs();
  const [isEditing, setIsEditing] = React.useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card>
      <CardContent>
        <PageTitle> Contact Us </PageTitle>
        {data?.body?.data && (
          <ContactUsForm
            data={data?.body?.data}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ContactUs;
