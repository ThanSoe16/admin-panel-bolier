"use client";
import React from "react";
import UserAgreement from "./_components/UserAgreement";
import Features from "./_components/Features";

const FeatureUserAgreement = () => {
  return (
    <div className="space-y-6">
      <Features />
      <UserAgreement />
    </div>
  );
};

export default FeatureUserAgreement;
