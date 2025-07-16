import React, { useState } from 'react';
import { AppSettings } from '../types.ts';
import { mockSettings } from '../data/mockData.ts';
import Card from './Card.tsx';
import { GlobeIcon, LinkIcon, MessageIcon, ShieldIcon, CreditCardIcon } from './Icons.tsx';

type SettingsTab = 'site' | 'links' | 'sms' | 'security' | 'payment';

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; dir?: 'ltr' | 'rtl', helpText?: string }> = 
({ label, name, value, onChange, type = 'text', dir = 'rtl', helpText }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-light mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} dir={dir} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition" />
        {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
);

const TextareaField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number }> = 
({ label, name, value, onChange, rows = 3 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-light mb-1">{label}</label>
        <textarea id={name} name={name} value={value} onChange={onChange} rows={rows} className="w-full p-2 border border-gray-300 rounded-lg resize-y focus:ring-1 focus:ring-primary focus:border-primary transition"></textarea>
    </div>
);

const SelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> = 
({ label, name, value, onChange, children }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-light mb-1">{label}</label>
        <select id={name} name={name} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-primary focus:border-primary transition">
            {children}
        </select>
    </div>
);

const ToggleSwitch: React.FC<{ label: string; name: string; checked: boolean; onChange: (checked: boolean) => void; helpText?: string }> = 
({ label, name, checked, onChange, helpText }) => (
    <div className="flex items-center justify-between">
        <div>
            <label htmlFor={name} className="font-medium text-text-main">{label}</label>
            {helpText && <p className="text-xs text-text-light mt-1">{helpText}</p>}
        </div>
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`${checked ? 'bg-primary' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
        >
            <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    </div>
);


const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('site');
    const [settings, setSettings] = useState<AppSettings>(mockSettings);

    const handleInputChange = (tab: SettingsTab, field: string, value: string | boolean) => {
        setSettings(prev => ({
            ...prev,
            [tab]: {
                ...prev[tab],
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        console.log("Saving settings:", settings);
        alert("تنظیمات با موفقیت ذخیره شد.");
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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'site': return (
                <Card title="تنظیمات سایت">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="اسم سایت" name="siteName" value={settings.site.siteName} onChange={(e) => handleInputChange('site', e.target.name, e.target.value)} />
                        <InputField label="آدرس Favicon" name="faviconUrl" value={settings.site.faviconUrl} onChange={(e) => handleInputChange('site', e.target.name, e.target.value)} dir="ltr" helpText="آدرس کامل آیکون سایت را وارد کنید." />
                        <div className="md:col-span-2">
                           <TextareaField label="توضیحات سایت" name="siteDescription" value={settings.site.siteDescription} onChange={(e) => handleInputChange('site', e.target.name, e.target.value)} />
                        </div>
                        <InputField label="آدرس" name="address" value={settings.site.address} onChange={(e) => handleInputChange('site', e.target.name, e.target.value)} />
                        <InputField label="شماره تلفن" name="phone" value={settings.site.phone} onChange={(e) => handleInputChange('site', e.target.name, e.target.value)} dir="ltr" />
                        <InputField label="شماره پشتیبانی" name="supportPhone" value={settings.site.supportPhone} onChange={(e) => handleInputChange('site', e.target.name, e.target.value)} dir="ltr" />
                    </div>
                </Card>
            );
            case 'links': return (
                <Card title="تنظیمات لینک‌ها">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField label="ساختار پیوند یکتا" name="permalinkStructure" value={settings.links.permalinkStructure} onChange={(e) => handleInputChange('links', e.target.name, e.target.value)}>
                            <option value="name">بر اساس نام</option>
                            <option value="random">حروف تصادفی</option>
                        </SelectField>
                        <InputField label="ایمیل مدیر سایت" name="adminEmail" value={settings.links.adminEmail} onChange={(e) => handleInputChange('links', e.target.name, e.target.value)} dir="ltr" />
                        <InputField label="پیشوند URL" name="urlPrefix" value={settings.links.urlPrefix} onChange={(e) => handleInputChange('links', e.target.name, e.target.value)} dir="ltr" helpText="مثال: /blog/"/>
                        <InputField label="پسوند URL" name="urlSuffix" value={settings.links.urlSuffix} onChange={(e) => handleInputChange('links', e.target.name, e.target.value)} dir="ltr" helpText="مثال: .html"/>
                        <div className="md:col-span-2">
                            <InputField label="آدرس ورود به پنل مدیریت" name="adminLoginUrl" value={settings.links.adminLoginUrl} onChange={(e) => handleInputChange('links', e.target.name, e.target.value)} dir="ltr" helpText="لینک نسبی مانند /my-admin"/>
                        </div>
                    </div>
                </Card>
            );
            case 'sms': return (
                 <Card title="تنظیمات پنل پیامک">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField label="سرویس‌دهنده پیامک" name="provider" value={settings.sms.provider} onChange={(e) => handleInputChange('sms', e.target.name, e.target.value)}>
                            <option value="kavenegar">کاوه نگار</option>
                            <option value="sms_ir">SMS.ir</option>
                            <option value="other">دیگر</option>
                        </SelectField>
                        <InputField label="شماره فرستنده" name="senderNumber" value={settings.sms.senderNumber} onChange={(e) => handleInputChange('sms', e.target.name, e.target.value)} dir="ltr" />
                        <div className="md:col-span-2">
                           <InputField label="API Key" name="apiKey" value={settings.sms.apiKey} onChange={(e) => handleInputChange('sms', e.target.name, e.target.value)} dir="ltr" />
                        </div>
                    </div>
                 </Card>
            );
            case 'security': return (
                 <Card title="تنظیمات امنیتی">
                    <div className="space-y-6">
                        <ToggleSwitch label='فعالسازی حالت "coming soon"' name="comingSoonMode" checked={settings.security.comingSoonMode} onChange={(checked) => handleInputChange('security', 'comingSoonMode', checked)} helpText="با فعالسازی این گزینه، سایت برای کاربران عادی از دسترس خارج می‌شود."/>
                        <div className="border-t pt-6">
                            <ToggleSwitch label="احراز هویت دو مرحله‌ای" name="twoFactorAuth" checked={settings.security.twoFactorAuth} onChange={(checked) => handleInputChange('security', 'twoFactorAuth', checked)} helpText="ورود به پنل مدیریت نیازمند کد تایید پیامکی یا اپلیکیشن خواهد بود."/>
                        </div>
                    </div>
                 </Card>
            );
            case 'payment': return (
                <Card title="تنظیمات درگاه پرداخت">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField label="درگاه پرداخت" name="provider" value={settings.payment.provider} onChange={(e) => handleInputChange('payment', e.target.name, e.target.value)}>
                            <option value="zarinpal">زرین پال</option>
                            <option value="mellat">بانک ملت</option>
                            <option value="saman">بانک سامان</option>
                             <option value="other">دیگر</option>
                        </SelectField>
                        <div className="md:col-span-2">
                           <InputField label="Merchant ID / API Key" name="merchantId" value={settings.payment.merchantId} onChange={(e) => handleInputChange('payment', e.target.name, e.target.value)} dir="ltr" />
                        </div>
                    </div>
                </Card>
            );
            default: return null;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">تنظیمات کلی</h1>
                <button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    ذخیره تغییرات
                </button>
            </div>
            
            <div className="flex border-b mb-6 bg-white rounded-t-lg shadow-sm overflow-x-auto">
                 <TabButton label="سایت" icon={<GlobeIcon className="w-5 h-5"/>} isActive={activeTab === 'site'} onClick={() => setActiveTab('site')} />
                 <TabButton label="لینک‌ها" icon={<LinkIcon className="w-5 h-5"/>} isActive={activeTab === 'links'} onClick={() => setActiveTab('links')} />
                 <TabButton label="پیامک" icon={<MessageIcon className="w-5 h-5"/>} isActive={activeTab === 'sms'} onClick={() => setActiveTab('sms')} />
                 <TabButton label="امنیت" icon={<ShieldIcon className="w-5 h-5"/>} isActive={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                 <TabButton label="درگاه پرداخت" icon={<CreditCardIcon className="w-5 h-5"/>} isActive={activeTab === 'payment'} onClick={() => setActiveTab('payment')} />
            </div>
            
            <div>{renderTabContent()}</div>
        </div>
    );
}

export default SettingsPage;