"use client";

import { useDropzone } from "react-dropzone";
import { FileIcon, PlusIcon, XIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { MAX_UPLOAD_SIZE } from "@/services/upload.service";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  hint: string;
  file: File | null;
  uploading: boolean;
  progress: number;
  removeLabel: string;
  onFile: (file: File) => void;
  onRemove: () => void;
};

export function FileDropzone({ label, hint, file, uploading, progress, removeLabel, onFile, onRemove }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: MAX_UPLOAD_SIZE,
    disabled: uploading,
    onDropAccepted: ([accepted]) => onFile(accepted),
  });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold">{label}</span>
      {file ? (
        <div className="flex items-center gap-3 rounded-[14px] border bg-background p-4">
          <span className="flex size-11 flex-none items-center justify-center rounded-xl bg-soft text-link">
            {uploading ? <Spinner /> : <FileIcon className="size-5" />}
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-semibold">{file.name}</span>
            <span className="text-sm text-muted-foreground">
              {uploading ? `${progress}%` : `${(file.size / 1024).toFixed(0)} KB`}
            </span>
          </div>
          {!uploading && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={removeLabel}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-soft hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-2 rounded-[14px] border-[1.5px] border-dashed bg-background p-7 text-center transition-colors hover:border-primary",
            isDragActive && "border-primary bg-soft"
          )}
        >
          <input {...getInputProps()} />
          <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-link">
            <PlusIcon className="size-6" />
          </span>
          <span className="text-[15px] text-muted-foreground">{hint}</span>
        </div>
      )}
    </div>
  );
}
