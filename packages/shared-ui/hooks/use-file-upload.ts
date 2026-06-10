import { useCallback, useRef, useState } from "react";

export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};

export type FileWithPreview = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
};

export interface UseFileUploadOptions {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void;
  onFilesAdded?: (files: FileWithPreview[]) => void;
  onError?: (errors: string[]) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function matchesAccept(file: File, accept: string): boolean {
  if (!accept || accept === "*") return true;
  const types = accept.split(",").map((t) => t.trim());
  return types.some((type) => {
    if (type.endsWith("/*")) {
      return file.type.startsWith(type.replace("/*", "/"));
    }
    if (type.startsWith(".")) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    }
    return file.type === type;
  });
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    maxFiles = Infinity,
    maxSize = Infinity,
    accept = "*",
    multiple = false,
    initialFiles = [],
    onFilesChange,
    onFilesAdded,
    onError,
  } = options;

  const [files, setFiles] = useState<FileWithPreview[]>(() =>
    initialFiles.map((meta) => ({ file: meta, id: meta.id, preview: meta.url }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const addFiles = useCallback(
    (input: FileList | File[]) => {
      const incoming = Array.from(input);
      const validationErrors: string[] = [];
      const valid: FileWithPreview[] = [];

      for (const file of incoming) {
        if (!matchesAccept(file, accept)) {
          validationErrors.push(`"${file.name}" is not an accepted file type.`);
          continue;
        }
        if (file.size > maxSize) {
          validationErrors.push(
            `"${file.name}" exceeds maximum size of ${(maxSize / 1024 / 1024).toFixed(1)}MB.`
          );
          continue;
        }
        const preview = file.type.startsWith("image/") || file.type.startsWith("video/")
          ? URL.createObjectURL(file)
          : undefined;
        valid.push({ file, id: generateId(), preview });
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        onError?.(validationErrors);
      }

      if (valid.length === 0) return;

      setFiles((prev) => {
        const maxAllowed = multiple ? maxFiles : 1;
        return multiple ? [...prev, ...valid].slice(0, maxAllowed) : valid.slice(0, 1);
      });

      onFilesChange?.(valid);
      onFilesAdded?.(valid);
    },
    [accept, maxSize, maxFiles, multiple, onFilesChange, onFilesAdded, onError]
  );

  const removeFile = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const target = prev.find((f) => f.id === id);
        if (target?.preview?.startsWith("blob:")) URL.revokeObjectURL(target.preview);
        return prev.filter((f) => f.id !== id);
      });
    },
    []
  );

  const clearFiles = useCallback(() => {
    files.forEach((f) => {
      if (f.preview?.startsWith("blob:")) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
    onFilesChange?.([]);
  }, [files, onFilesChange]);

  const clearErrors = useCallback(() => setErrors([]), []);

  const openFileDialog = useCallback(() => inputRef.current?.click(), []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items?.length) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounterRef.current = 0;
      if (e.dataTransfer.files?.length) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const getInputProps = useCallback(
    (props?: React.InputHTMLAttributes<HTMLInputElement>) => ({
      type: "file" as const,
      ref: inputRef,
      accept,
      multiple,
      style: { display: "none" } as React.CSSProperties,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
          addFiles(e.target.files);
          e.target.value = "";
        }
      },
      ...props,
    }),
    [accept, multiple, addFiles]
  );

  return {
    files,
    isDragging,
    errors,
    addFiles,
    removeFile,
    clearFiles,
    clearErrors,
    openFileDialog,
    getInputProps,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
}



