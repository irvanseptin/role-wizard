import React from "react";
import Button from "@/components/atoms/Button";
import { PageHeaderProps } from "./interface";
import "./styles.scss";

export const PageHeader: React.FC<PageHeaderProps> = ({ title, action }) => {
  return (
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
