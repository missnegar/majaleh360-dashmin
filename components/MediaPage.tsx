import React, { useState, useCallback, useMemo, useRef } from 'react';
import { MediaFile } from '../types.ts';
import { mockMediaFiles } from '../data/mockData.ts';
import { processAndCompressImage } from '../utils/imageProcessor.ts';
import { formatBytes } from '../utils/formatters.ts';
import MediaDetailsSidebar from './MediaDetailsSidebar.tsx';
import { UploadCloudIcon, MediaIcon } from './Icons.tsx';

const MediaPage: React.FC = () => {
  const [files, setFiles] = useState<MediaFile[]>(mockMediaFiles);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSize = useMemo(() => files.reduce((acc, file) => acc + file.size, 0), [files]);

  const handleFileSelect = useCallback(async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setIsProcessing(true);
    const newMediaFiles: MediaFile[] = [];

    for (const file of Array.from(selectedFiles)) {
      try {
        const { file: processedFile, width, height } = await processAndCompressImage(file);
        const newMediaFile: MediaFile = {
          id: self.crypto.randomUUID(),
          name: processedFile.name,
          url: URL.createObjectURL(processedFile),
          type: processedFile.type,
          size: processedFile.size,
          altText: '',
          description: '',
          createdAt: new Date(),
          width,
          height,
        };
        newMediaFiles.push(newMediaFile);
      } catch (error) {
        console.error('Error processing file:', error);
        // Optionally show an error message to the user
      }
    }
    setFiles(prev => [...newMediaFiles, ...prev]);
    setIsProcessing(false);
  }, []);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    // Reset file input to allow selecting the same file again
    if (e.target) e.target.value = '';
  };
  
  const handleUpdateFile = (updatedFile: MediaFile) => {
      setFiles(files.map(f => f.id === updatedFile.id ? updatedFile : f));
      setSelectedFile(updatedFile);
  };
  
  const handleDeleteFile = (fileId: string) => {
      if(window.confirm('آیا از حذف این فایل اطمینان دارید؟ این عمل قابل بازگشت نیست.')) {
        // Revoke object URL to prevent memory leaks if it's a recently uploaded file
        const fileToDelete = files.find(f => f.id === fileId);
        if (fileToDelete && fileToDelete.url.startsWith('blob:')) {
            URL.revokeObjectURL(fileToDelete.url);
        }
        setFiles(files.filter(f => f.id !== fileId));
        setSelectedFile(null);
      }
  };

  return (
    <div className="flex h-full">
        <MediaDetailsSidebar 
            file={selectedFile} 
            onClose={() => setSelectedFile(null)}
            onUpdate={handleUpdateFile}
            onDelete={handleDeleteFile}
        />
      <div className="flex-1 flex flex-col p-1 transition-all duration-300" style={{ marginLeft: selectedFile ? '384px' : '0' }}>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-5 border-b pb-4">
            <div>
              <h2 className="text-xl font-bold text-text-main">کتابخانه مدیا</h2>
              <p className="text-sm text-text-light mt-1">
                {new Intl.NumberFormat('fa-IR').format(files.length)} فایل ({formatBytes(totalSize)})
              </p>
            </div>
          </div>

          <div
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 bg-gray-50'}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*"
              onChange={onFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center">
              <UploadCloudIcon className="w-12 h-12 text-gray-400 mb-3" />
              <p className="font-semibold text-text-main">فایل‌ها را بکشید و اینجا رها کنید</p>
              <p className="text-sm text-text-light mt-1">یا</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400"
                disabled={isProcessing}
              >
                {isProcessing ? 'در حال پردازش...' : 'انتخاب فایل'}
              </button>
               {isProcessing && <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4"><div className="bg-secondary h-2.5 rounded-full animate-pulse" style={{width: '100%'}}></div></div>}
            </div>
          </div>
        </div>

        <div className="mt-6 flex-grow">
          {files.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {files.map(file => (
                <div key={file.id} onClick={() => setSelectedFile(file)} className="relative group cursor-pointer aspect-square bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                  {file.type.startsWith('image/') ? (
                    <img src={file.url} alt={file.altText} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-2">
                        <MediaIcon className="w-12 h-12 text-gray-400"/>
                        <p className="text-xs text-center text-text-light mt-2 break-all">{file.name}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-2">
                    <p className="text-white text-xs truncate w-full opacity-0 group-hover:opacity-100 transition-opacity">{file.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
                <p>کتابخانه مدیا خالی است.</p>
                <p className="text-sm mt-2">فایل‌های خود را با کشیدن و رها کردن اضافه کنید.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;