import React from "react";
import "./styles.scss";

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = "xl",
}) => {
  return (
    <div className="page-layout">
      <div
        className={`page-layout__container page-layout__container--${maxWidth}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
