import React from "react";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { PaginationProps } from "./interface";
import "./styles.scss";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="pagination__btn"
      >
        <Icon name="ChevronLeft" size={18} />
      </Button>
      <span className="pagination__info">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="pagination__btn"
      >
        <Icon name="ChevronRight" size={18} />
      </Button>
    </div>
  );
};

export default Pagination;
