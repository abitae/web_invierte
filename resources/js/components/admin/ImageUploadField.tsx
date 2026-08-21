/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { uploadFile } from "../../api/upload";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  uploadLabel?: string;
  previewClassName?: string;
  previewAlt?: string;
  inputId?: string;
};

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = "URL o subir archivo al servidor",
  hint = "JPG, PNG, WebP o GIF · máx. 5 MB",
  uploadLabel = "Subir imagen",
  previewClassName = "max-h-36 w-full object-cover rounded-lg border border-[var(--border)]",
  previewAlt = "Vista previa",
  inputId,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "No se pudo subir la imagen.";
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={inputId}
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg outline-none text-[var(--text-p)] text-xs"
      />
      <div className="flex flex-wrap items-center gap-3">
        <label
          className={`inline-flex items-center gap-1.5 text-[10px] font-semibold ${
            uploading ? "opacity-60 cursor-wait" : "cursor-pointer text-[var(--accent)]"
          }`}
        >
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          {uploading ? "Subiendo..." : uploadLabel}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) void handleUpload(file);
            }}
          />
        </label>
        {hint && <span className="text-[9px] font-mono text-[var(--text-s)]">{hint}</span>}
      </div>
      {value ? (
        <img
          src={value}
          alt={previewAlt}
          className={previewClassName}
          referrerPolicy="no-referrer"
        />
      ) : null}
    </div>
  );
};
