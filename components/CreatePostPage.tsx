import React, { useState } from 'react';
import { Page } from '../App.tsx';
import Card from './Card.tsx';
import { mockCategories } from '../data/mockData.ts';
import { ArrowRightIcon, EyeIcon, SaveIcon, PublishIcon, TagIcon, MediaIcon, SeoIcon, XIcon } from './Icons.tsx';

interface CreatePostPageProps {
  setActivePage: (page: Page) => void;
}

const CreatePostPage: React.FC<CreatePostPageProps> = ({ setActivePage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [status, setStatus] = useState<'پیش‌نویس' | 'منتشر شده'>('پیش‌نویس');
  const [visibility, setVisibility] = useState<'عمومی' | 'خصوصی'>('عمومی');

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleKeywordInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim() !== '') {
      e.preventDefault();
      if (!keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
      }
      setKeywordInput('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(kw => kw !== keywordToRemove));
  };
  
  const handleSavePost = (action: 'draft' | 'publish') => {
    const postData = {
        title, content, excerpt, selectedCategories,
        keywords, seoTitle, seoDescription,
        status: action === 'publish' ? 'منتشر شده' : 'پیش‌نویس',
        visibility
    };
    console.log("Saving Post:", postData);
    alert(`پست با موفقیت ${action === 'publish' ? 'منتشر شد' : 'به عنوان پیش‌نویس ذخیره شد'}.`);
    setActivePage('posts');
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setActivePage('posts')} className="p-2 rounded-full hover:bg-gray-100" aria-label="بازگشت به لیست پست‌ها">
            <ArrowRightIcon className="w-6 h-6 text-text-light" />
          </button>
          <h1 className="text-2xl font-bold text-text-main">ایجاد پست جدید</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main content column */}
        <div className="lg:col-span-2 space-y-6">
          <input
            type="text"
            placeholder="عنوان پست را اینجا وارد کنید"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <div>
            <textarea
              placeholder="محتوای خود را بنویسید..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-y"
            />
            <div className="text-left text-sm text-text-light mt-2">
              <span>
                تعداد کلمات: {new Intl.NumberFormat('fa-IR').format(wordCount)}
              </span>
              <span className="mx-2">|</span>
              <span>
                تعداد کاراکترها: {new Intl.NumberFormat('fa-IR').format(charCount)}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="lg:col-span-1 space-y-6">
          <Card title="انتشار">
            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-text-light font-medium">وضعیت:</span>
                    <span className="font-semibold text-text-main">{status}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-text-light font-medium">نمایش:</span>
                     <span className="font-semibold text-text-main">{visibility}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 mt-5 border-t pt-4">
              <button onClick={() => handleSavePost('draft')} className="flex-1 px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <SaveIcon className="w-5 h-5"/>
                ذخیره پیش‌نویس
              </button>
              <button onClick={() => handleSavePost('publish')} className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <PublishIcon className="w-5 h-5"/>
                انتشار
              </button>
            </div>
          </Card>
          
          <Card title="دسته‌بندی‌ها">
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                {mockCategories.map(cat => (
                    <div key={cat.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`cat-${cat.id}`}
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => handleCategoryChange(cat.id)}
                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor={`cat-${cat.id}`} className="mr-2 text-sm font-medium text-text-main">{cat.name}</label>
                    </div>
                ))}
            </div>
          </Card>
          
          <Card title="کلمات کلیدی" icon={<TagIcon className="w-5 h-5" />}>
              <div className="flex flex-wrap gap-2 mb-3">
                  {keywords.map((kw, index) => (
                      <span key={index} className="flex items-center gap-1 bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded-full">
                          {kw}
                          <button onClick={() => removeKeyword(kw)} className="text-gray-500 hover:text-gray-800">
                              <XIcon className="w-3 h-3"/>
                          </button>
                      </span>
                  ))}
              </div>
              <input 
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordInput}
                  placeholder="کلمه کلیدی را وارد و Enter بزنید"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              />
          </Card>
          
          <Card title="تصویر شاخص" icon={<MediaIcon className="w-5 h-5" />}>
             <button className="w-full py-2 text-sm font-semibold text-primary border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-colors">
                تنظیم تصویر شاخص
            </button>
          </Card>

           <Card title="چکیده">
                <textarea
                    placeholder="یک چکیده کوتاه برای پست بنویسید..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-y"
                />
            </Card>

          <Card title="پیش‌نمایش سئو" icon={<SeoIcon className="w-5 h-5" />}>
            <div className="space-y-4">
                <div>
                     <label htmlFor="seoTitle" className="block text-sm font-medium text-text-light mb-1">عنوان سئو</label>
                     <input type="text" id="seoTitle" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm"/>
                </div>
                 <div>
                     <label htmlFor="seoDescription" className="block text-sm font-medium text-text-light mb-1">توضیحات متا</label>
                    <textarea id="seoDescription" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-y"></textarea>
                </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;