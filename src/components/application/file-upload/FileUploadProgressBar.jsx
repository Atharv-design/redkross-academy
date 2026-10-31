import React, { useState } from 'react';
import { FileUpload, getReadableFileSize } from './file-upload-base';

export const FileUploadProgressBar = ({
  isDisabled = false,
  onFileUploaded,
  onFileRemoved,
  initialFiles = [],
  maxFiles = 3,
  maxSizeBytes = 25 * 1024 * 1024,
  dropZoneTitle = 'Drag & drop laboratory findings PDF',
  dropZoneSubtitle = 'Official .PDF files only (Max 25 MB)'
}) => {
  const [uploadedFiles, setUploadedFiles] = useState(initialFiles);

  const simulateProgressiveUpload = (fileId, file, dataUrl) => {
    let progress = 0;
    const intervalTime = 40; // ms per tick
    const increment = Math.max(2, Math.floor(100 / (file.size > 2 * 1024 * 1024 ? 25 : 15)));

    const timer = setInterval(() => {
      progress += increment;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);

        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, progress: 100, completed: true, dataUrl }
              : f
          )
        );

        if (typeof onFileUploaded === 'function') {
          onFileUploaded({
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type || 'application/pdf',
            dataUrl,
            file
          });
        }
      } else {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, progress }
              : f
          )
        );
      }
    }, intervalTime);
  };

  const handleDropFiles = (files) => {
    if (isDisabled) return;
    const incomingList = Array.from(files);

    incomingList.forEach((file) => {
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const isPdf = fileExt === 'pdf' || file.type === 'application/pdf';
      const isOversized = file.size > maxSizeBytes;

      if (!isPdf) {
        const failedItem = {
          id: fileId,
          name: file.name,
          size: file.size,
          type: fileExt,
          progress: 0,
          failed: true,
          error: 'Only PDF format is accepted',
          fileObject: file
        };
        setUploadedFiles((prev) => [failedItem, ...prev]);
        return;
      }

      if (isOversized) {
        const failedItem = {
          id: fileId,
          name: file.name,
          size: file.size,
          type: 'pdf',
          progress: 0,
          failed: true,
          error: `Exceeds max limit (${getReadableFileSize(maxSizeBytes)})`,
          fileObject: file
        };
        setUploadedFiles((prev) => [failedItem, ...prev]);
        return;
      }

      // Valid PDF file: Add with 0 progress and start real FileReader + Progressive Animation
      const newFileItem = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: 'pdf',
        progress: 5,
        failed: false,
        fileObject: file
      };

      setUploadedFiles((prev) => [newFileItem, ...prev]);

      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        simulateProgressiveUpload(fileId, file, dataUrl);
      };
      reader.onerror = () => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, failed: true, error: 'Failed to read file from disk' }
              : f
          )
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    if (typeof onFileRemoved === 'function') {
      onFileRemoved(id);
    }
  };

  const handleRetryFile = (id) => {
    const file = uploadedFiles.find((f) => f.id === id);
    if (!file) return;

    if (file.fileObject) {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, progress: 10, failed: false, error: null } : f
        )
      );

      const reader = new FileReader();
      reader.onload = (e) => {
        simulateProgressiveUpload(id, file.fileObject, e.target.result);
      };
      reader.readAsDataURL(file.fileObject);
    }
  };

  return (
    <FileUpload.Root>
      <FileUpload.DropZone
        isDisabled={isDisabled}
        onDropFiles={handleDropFiles}
        title={dropZoneTitle}
        subtitle={dropZoneSubtitle}
      />

      <FileUpload.List>
        {uploadedFiles.map((file) => (
          <FileUpload.ListItemProgressBar
            key={file.id}
            {...file}
            size={file.size}
            onDelete={() => handleDeleteFile(file.id)}
            onRetry={() => handleRetryFile(file.id)}
          />
        ))}
      </FileUpload.List>
    </FileUpload.Root>
  );
};

export default FileUploadProgressBar;
