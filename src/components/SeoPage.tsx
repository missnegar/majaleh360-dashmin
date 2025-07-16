import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SeoSettings, SeoAnalyticsDataPoint } from '../src/types.ts';
import Card from './Card.tsx';
import { seoAnalyticsData } from '../src/data/mockData.ts';
import { CodeIcon, SeoIcon, AnalyticsIcon } from './Icons.tsx';

type SeoTab = 'general' | 'analytics' | 'header' | 'body' | 'footer';

const initialSettings: SeoSettings = {
  titleSeparator: '-',
  homepageMetaTitle: 'صفحه اصلی | نام سایت',
  homepageMetaDescription: 'توضیحات پیش‌فرض برای صفحه اصلی سایت شما.',
  knowledgeGraphType: 'Organization',
  knowledgeGraphName: 'نام سازمان شما',
  knowledgeGraphLogo: 'https://example.com/logo.png',
  analyticsTrackingCode: `<!-- کد رهگیری گوگل آنالیتیکس یا سرویس‌های دیگر در اینجا قرار می‌گیرد -->`,
  headerCode: `<!-- کدهای سفارشی برای بخش <head> -->`,
  bodyCode: `<!-- کدهای سفارشی برای بعد از تگ باز <body> -->`,
  footerCode: `<!-- کدهای سفارشی برای قبل از تگ بسته </body> -->`,
};

const TabButton: React.FC<{label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
            isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-text-light hover:text-text-main'
        }`}
    >
        {icon}
        {label}
    </button>
);


const SeoPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SeoTab>('general');
    const [settings, setSettings] = useState<SeoSettings>(initialSettings);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSave = () => {
        // In a real app, this would send data to a server
        console.log('Saving settings:', settings);
        alert('تنظیمات با موفقیت ذخیره شد.');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <Card title="تنظیمات عمومی سئو">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="homepageMetaTitle" className="block text-sm font-medium text-text-light mb-1">عنوان متا صفحه اصلی</label>
                                <input type="text" id="homepageMetaTitle" name="homepageMetaTitle" value={settings.homepageMetaTitle} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div>
                                <label htmlFor="homepageMetaDescription" className="block text-sm font-medium text-text-light mb-1">توضیحات متا صفحه اصلی</label>
                                <textarea id="homepageMetaDescription" name="homepageMetaDescription" value={settings.homepageMetaDescription} onChange={handleInputChange} rows={3} className="w-full p-2 border border-gray-300 rounded-lg resize-y"></textarea>
                            </div>
                            <div className="border-t pt-6">
                                <h4 className="text-md font-semibold mb-3">Knowledge Graph</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="knowledgeGraphType" className="block text-sm font-medium text-text-light mb-1">نوع</label>
                                        <select id="knowledgeGraphType" name="knowledgeGraphType" value={settings.knowledgeGraphType} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                                            <option value="Organization">سازمان</option>
                                            <option value="Person">شخص</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="knowledgeGraphName" className="block text-sm font-medium text-text-light mb-1">نام سازمان یا شخص</label>
                                        <input type="text" id="knowledgeGraphName" name="knowledgeGraphName" value={settings.knowledgeGraphName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            case 'analytics':
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-2">
                             <Card title="اتصال به گوگل آنالیتیکس">
                                 <p className="text-sm text-text-light mb-3">کد رهگیری خود را برای اتصال به گوگل آنالیتیکس و نمایش آمار در اینجا وارد کنید.</p>
                                 <textarea
                                    name="analyticsTrackingCode"
                                    value={settings.analyticsTrackingCode}
                                    onChange={handleInputChange}
                                    className="w-full h-40 p-3 font-mono text-xs border border-gray-300 rounded-lg resize-none text-left"
                                    dir="ltr"
                                />
                             </Card>
                        </div>
                        <div className="lg:col-span-3">
                            <Card title="نمای کلی آمار سئو">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={seoAnalyticsData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                        <XAxis dataKey="date" tick={{ fill: '#666', fontSize: 12, fontFamily: 'Vazirmatn' }} />
                                        <YAxis tick={{ fill: '#666', fontSize: 12, fontFamily: 'Vazirmatn' }}/>
                                        <Tooltip contentStyle={{ fontFamily: 'Vazirmatn', borderRadius: '8px', direction: 'rtl' }}/>
                                        <Legend wrapperStyle={{ fontFamily: 'Vazirmatn', fontSize: 14 }}/>
                                        <Line type="monotone" dataKey="clicks" name="کلیک‌ها" stroke="#748873" strokeWidth={2} />
                                        <Line type="monotone" dataKey="impressions" name="بازدیدها" stroke="#D1A980" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>
                    </div>
                );
            case 'header':
            case 'body':
            case 'footer':
                 const titles = { header: 'کدهای سفارشی هدر', body: 'کدهای سفارشی بدنه', footer: 'کدهای سفارشی فوتر'};
                 const descs = { header: 'این کدها به بخش <head> سایت شما اضافه می‌شوند.', body: 'این کدها بلافاصله بعد از تگ باز <body> اضافه می‌شوند.', footer: 'این کدها قبل از بسته شدن تگ </body> اضافه می‌شوند.'};
                return (
                     <Card title={titles[activeTab]}>
                        <p className="text-sm text-text-light mb-4">{descs[activeTab]}</p>
                        <textarea
                            name={`${activeTab}Code`}
                            value={settings[`${activeTab}Code` as keyof SeoSettings] as string}
                            onChange={handleInputChange}
                            className="w-full h-80 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-none text-left"
                            dir="ltr"
                            placeholder={`کدهای خود را اینجا وارد کنید...`}
                        />
                     </Card>
                );
            default:
                return null;
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">تنظیمات سئو</h1>
                <button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    ذخیره تغییرات
                </button>
            </div>
            
            <div className="flex border-b mb-6 bg-white rounded-t-lg shadow-sm">
                 <TabButton label="سئو سایت" icon={<SeoIcon className="w-5 h-5"/>} isActive={activeTab === 'general'} onClick={() => setActiveTab('general')} />
                 <TabButton label="آمار سئو" icon={<AnalyticsIcon className="w-5 h-5"/>} isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
                 <TabButton label="کد هدر" icon={<CodeIcon className="w-5 h-5"/>} isActive={activeTab === 'header'} onClick={() => setActiveTab('header')} />
                 <TabButton label="کد بادی" icon={<CodeIcon className="w-5 h-5"/>} isActive={activeTab === 'body'} onClick={() => setActiveTab('body')} />
                 <TabButton label="کد فوتر" icon={<CodeIcon className="w-5 h-5"/>} isActive={activeTab === 'footer'} onClick={() => setActiveTab('footer')} />
            </div>
            
            <div>{renderTabContent()}</div>
        </div>
    );
}

export default SeoPage;