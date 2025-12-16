import React from "react";
import { RoleCardProps } from "./interface";
import "./styles.scss";

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <button className="role-card" onClick={onClick}>
      <div className="role-card__title">{title}</div>
      <div className="role-card__description">{description}</div>
    </button>
  );
};

export default RoleCard;
