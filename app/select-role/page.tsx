"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/templates/PageLayout";
import RoleCard from "@/components/molecules/RoleCard";
import Button from "@/components/atoms/Button";
import "./styles.scss";

export const RoleSelectionPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageLayout maxWidth="sm">
      <div className="role-selection-page">
        <h1 className="role-selection-page__title">Select Your Role</h1>
        <div className="role-selection-page__cards">
          <RoleCard
            title="Admin"
            description="Access to all steps"
            onClick={() => router.push("/wizard?role=admin")}
          />
          <RoleCard
            title="Ops"
            description="Details form only"
            onClick={() => router.push("/wizard?role=ops")}
          />
        </div>
        <Button variant="secondary" onClick={() => router.push("/")} fullWidth>
          Cancel
        </Button>
      </div>
    </PageLayout>
  );
};

export default RoleSelectionPage;
