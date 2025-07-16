import React, { useState, useEffect } from 'react';
import { MediaFile } from '../types.ts';
import { formatBytes } from '../utils/formatters.ts';
import { XIcon, TrashIcon, ClipboardIcon } from './Icons.tsx';

interface MediaDetailsSidebarProps {
  file: MediaFile | null;
  onClose: () => void;
  onUpdate: (updatedFile: MediaFile) => void;
  onDelete: (fileId: string) => void;
}

const MediaDetailsSidebar: React.FC<MediaDetailsSidebarProps> = ({ file, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState<Partial<MediaFile>>({});
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (file) {
      setFormData({
        name: file.name,
        altText: file.altText,
        description: file.description,
      });
    }
  }, [file]);

  if (!file) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    onUpdate({ ...file, ...formData } as MediaFile);
  };
  
  const handleCopyUrl = () => {
      navigator.clipboard.writeText(file.url).then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
      });
  };

  const isChanged = file.name !== formData.name || file.altText !== formData.altText || file.description !== formData.description;
  
  const inputStyle = "w-full bg-transparent px-1 py-2 border-0 border-b border-gray-300 focus:ring-0 focus:border-primary transition-colors";

  return (
    <aside className="fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-30 flex flex-col transform transition-transform duration-300 ease-in-out" style={{ transform: file ? 'translateX(0)' : 'translateX(-100%)' }}>
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-bold text-text-main">جزئیات فایل</h3>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
          <XIcon className="w-6 h-6 text-text-light" />
        </button>
      </div>

      <div className="flex-grow p-5 overflow-y-auto">
        <div className="mb-5 rounded-lg p-3 flex items-center justify-center">
            {file.type.startsWith('image/') ? (
                <img src={file.url} alt="پیش‌نمایش" className="max-h-48 rounded-md object-contain" />
            ) : (
                <div className="text-center text-gray-500 py-10">پیش‌نمایش در دسترس نیست</div>
            )}
        </div>
        
        <div className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-text-light block mb-1">نام فایل</label>
              <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleInputChange} className={inputStyle} />
            </div>
            {file.type.startsWith('image/') && (
                <>
                <div>
                  <label htmlFor="altText" className="text-sm font-medium text-text-light block mb-1">متن جایگزین (Alt)</label>
                  <input type="text" id="altText" name="altText" value={formData.altText || ''} onChange={handleInputChange} className={inputStyle} />
                </div>
                <div>
                  <label htmlFor="description" className="text-sm font-medium text-text-light block mb-1">توضیحات</label>
                  <textarea id="description" name="description" value={formData.description || ''} onChange={handleInputChange} rows={3} className={`${inputStyle} resize-none`}></textarea>
                </div>
                </>
            )}
        </div>

        <div className="mt-6 text-xs text-gray-500 space-y-2 border-t pt-4">
            <p><strong>تاریخ آپلود:</strong> {new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(file.createdAt)}</p>
            <p><strong>نوع فایل:</strong> {file.type}</p>
            <p><strong>حجم فایل:</strong> {formatBytes(file.size)}</p>
            {file.type.startsWith('image/') && file.width && file.height ? (
              <p><strong>ابعاد:</strong> {new Intl.NumberFormat('fa-IR').format(file.width)} × {new Intl.NumberFormat('fa-IR').format(file.height)} پیکسل</p>
            ) : null}
            <div>
                <label className="font-bold block mb-1 mt-2">آدرس فایل:</label>
                <div className="flex items-center">
                    <input type="text" readOnly value={file.url} className="w-full text-xs bg-gray-100 p-2 border border-gray-300 rounded-r-md" dir="ltr" />
                    <button onClick={handleCopyUrl} className="p-2 bg-gray-200 border border-gray-300 border-e-0 rounded-l-md hover:bg-gray-300">
                        <ClipboardIcon className="w-5 h-5"/>
                    </button>
                </div>
                 {isCopied && <p className="text-green-600 text-xs mt-1">کپی شد!</p>}
            </div>
        </div>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <button onClick={() => onDelete(file.id)} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800">
          <TrashIcon className="w-4 h-4" />
          حذف فایل
        </button>
        <button onClick={handleSaveChanges} disabled={!isChanged} className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            ذخیره تغییرات
        </button>
      </div>
    </aside>
  );
};

export default MediaDetailsSidebar;