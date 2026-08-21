/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ImagePlus, Loader2, Upload, Video } from "lucide-react";
import { uploadFile } from "../../api/upload";

type MediaKind = "image" | "video";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  kind?: MediaKind;
  hint?: string;
  uploadLabel?: string;
  changeLabel?: string;
  previewClassName?: string;
  previewAlt?: string;
  inputId?: string;
};

const KIND_DEFAULTS: Record<
  MediaKind,
  { accept: string; hint: string; uploadLabel: string; changeLabel: string; error: string }
> = {
  image: {
    accept: "image/*",
    hint: "JPG, PNG, WebP o GIF · máx. 5 MB",
    uploadLabel: "Subir imagen",
    changeLabel: "Cambiar imagen",
    error: "No se pudo subir la imagen.",
  },
  video: {
    accept: "video/mp4,video/webm,video/quicktime,video/x-msvideo,.mp4,.webm,.mov",
    hint: "MP4, WebM o MOV · máx. 50 MB",
    uploadLabel: "Subir video",
    changeLabel: "Cambiar video",
    error: "No se pudo subir el video.",
  },
};

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  kind = "image",
  hint,
  uploadLabel,
  changeLabel,
  previewClassName = "max-h-36 w-full object-cover rounded-lg border border-[var(--border)]",
  previewAlt = "Vista previa",
  inputId,
}) => {
  const generatedId = React.useId();
  const fileInputId = inputId ?? generatedId;
  const [uploading, setUploading] = useState(false);
  const defaults = KIND_DEFAULTS[kind];
  const resolvedHint = hint ?? defaults.hint;
  const resolvedUploadLabel = uploadLabel ?? defaults.uploadLabel;
  const resolvedChangeLabel = changeLabel ?? defaults.changeLabel;

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : defaults.error;
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void handleUpload(file);
  };

  return (
    <div className="space-y-2">
      <span className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
        {label}
        {required ? " *" : ""}
      </span>
      {required ? (
        <input
          type="text"
          value={value}
          required
          readOnly
          tabIndex={-1}
          aria-hidden
          className="sr-only"
        />
      ) : null}

      {value ? (
        <div className="space-y-2">
          {kind === "video" ? (
            <video
              src={value}
              controls
              playsInline
              className={previewClassName}
            />
          ) : (
            <img
              src={value}
              alt={previewAlt}
              className={previewClassName}
              referrerPolicy="no-referrer"
            />
          )}
          <label
            htmlFor={fileInputId}
            className={`inline-flex items-center gap-1.5 text-[10px] font-semibold ${
              uploading ? "opacity-60 cursor-wait" : "cursor-pointer text-[var(--accent)]"
            }`}
          >
            {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {uploading ? "Subiendo..." : resolvedChangeLabel}
          </label>
        </div>
      ) : (
        <label
          htmlFor={fileInputId}
          className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[var(--border)] bg-[var(--bg)]/40 px-4 py-6 text-center ${
            uploading ? "opacity-60 cursor-wait" : "cursor-pointer hover:border-[var(--accent)]"
          }`}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" />
          ) : kind === "video" ? (
            <Video className="w-6 h-6 text-[var(--accent)]" />
          ) : (
            <ImagePlus className="w-6 h-6 text-[var(--accent)]" />
          )}
          <span className="text-[10px] font-semibold text-[var(--text-p)]">
            {uploading ? "Subiendo..." : resolvedUploadLabel}
          </span>
          {resolvedHint ? <span className="text-[9px] font-mono text-[var(--text-s)]">{resolvedHint}</span> : null}
        </label>
      )}

      <input
        id={fileInputId}
        type="file"
        accept={defaults.accept}
        disabled={uploading}
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
};
