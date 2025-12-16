import React from "react";
import { Icon } from "@/components/atoms";
import { PhotoPreviewProps } from "./interface";
import "./styles.scss";

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  src,
  alt,
  onRemove,
}) => {
  return (
    <div className="photo-preview">
      <img src={src} alt={alt} className="photo-preview__image" />
      <button
        type="button"
        onClick={onRemove}
        className="photo-preview__remove"
        aria-label="Remove photo"
      >
        <Icon name="X" size={16} />
      </button>
    </div>
  );
};

export * from "./interface";
