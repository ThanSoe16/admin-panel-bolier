"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import BlogLanguages from "./_components/BlogLanguages";
import MerchantAccountLimit from "./_components/MerchantAccountLimit";

const BlogPreferences = () => {
  return (
    <div className="w-full">
      <PageTitle> Blog Preferences </PageTitle>
      <div className="flex flex-col gap-4 justify-start items-start">
        <MerchantAccountLimit />
        <BlogLanguages />
      </div>
    </div>
  );
};

export default BlogPreferences;
