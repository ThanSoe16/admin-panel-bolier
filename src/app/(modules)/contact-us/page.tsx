import { NextPage } from "next";
import ContactUsForms from "@/components/pages/contact-us-forms";
import { Suspense } from "react";

const ContactUsFormsPage: NextPage = () => {
  return (
    <Suspense>
      <ContactUsForms />
    </Suspense>
  );
};

export default ContactUsFormsPage;
