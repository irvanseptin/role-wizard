import React, { useState } from "react";
import Icon from "@/components/atoms/Icon";
import PhotoPreview from "@/components/molecules/PhotoPreview";
import { FileUploadProps } from "./interface";
import { convertToBase64 } from "@/utils/helpers";
import "./styles.scss";

export const FileUpload: React.FC<FileUploadProps> = ({ value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(value);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      setUploading(true);
      try {
        const base64 = await convertToBase64(file);
        setPreview(base64);
        onChange(base64);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const removePhoto = () => {
    setPreview(null);
    onChange(null);
  };

  if (preview) {
    return <PhotoPreview src={preview} alt="Preview" onRemove={removePhoto} />;
  }

  return (
    <div>
      <label className="file-upload">
        <Icon name="Upload" size={24} />
        <span className="file-upload__text">Click to upload photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-upload__input"
        />
      </label>
      {uploading && <span className="file-upload__loading">Uploading...</span>}
    </div>
  );
};

export default FileUpload;
