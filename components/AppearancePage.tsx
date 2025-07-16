import React, { useState } from 'react';
import Card from './Card.tsx';
import { AppearanceIcon, HeaderMenuIcon, FooterIcon, SidebarIcon, UploadCloudIcon, PencilIcon, TrashIcon } from './Icons.tsx';

type AppearanceTab = 'general' | 'header' | 'footer' | 'sidebar';

const TabButton: React.FC<{ label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }> = ({ label, icon, isActive, onClick }) => (
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

const ColorPicker: React.FC<{ label: string, color: string, onChange: (newColor: string) => void }> = ({ label, color, onChange }) => (
    <div className="flex items-center justify-between p-2 border border-transparent hover:border-gray-200 rounded-lg">
        <span className="text-sm font-medium text-text-main">{label}</span>
        <div className="flex items-center gap-2">
            <input
                type="text"
                value={color}
                onChange={e => onChange(e.target.value)}
                className="w-24 p-1 border border-gray-300 rounded-md text-sm"
                dir="ltr"
            />
            <div className="w-8 h-8 rounded-md overflow-hidden border border-gray-300">
                <input
                    type="color"
                    value={color}
                    onChange={e => onChange(e.target.value)}
                    className="w-full h-full border-0 cursor-pointer"
                    style={{'--tw-shadow': 'none', boxShadow: 'none'} as React.CSSProperties}
                />
            </div>
        </div>
    </div>
);

const MenuManager: React.FC<{ title: string }> = ({ title }) => {
    const [items] = useState(['آیتم منوی ۱', 'آیتم منوی ۲', 'آیتم با فرزند', 'آیتم دیگر']);
    return (
        <Card title={title}>
            <div className="space-y-2">
                <ul className="space-y-2 border rounded-lg p-3 max-h-48 overflow-y-auto">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span className="text-sm font-medium">{item}</span>
                            <div className="flex items-center gap-2">
                                <button className="text-blue-500 hover:text-blue-700"><PencilIcon className="w-4 h-4"/></button>
                                <button className="text-red-500 hover:text-red-700"><TrashIcon className="w-4 h-4"/></button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="w-full text-center py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg hover:bg-primary/20 transition-colors">افزودن آیتم جدید</button>
            </div>
        </Card>
    );
};


const AppearancePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AppearanceTab>('general');
    const [settings, setSettings] = useState({
        general: {
            font: 'Vazirmatn',
            colors: {
                primary: '#748873',
                secondary: '#D1A980',
                background: '#F8F8F8',
                textMain: '#333333',
                textLight: '#555555',
            }
        },
        footer: {
            copyright: '© ۱۴۰۳. تمامی حقوق برای نام سایت شما محفوظ است.',
            logoPosition: 'right',
            colors: {
                background: '#333333',
                text: '#FFFFFF'
            }
        }
    });

    const handleColorChange = (key: keyof typeof settings.general.colors, value: string) => {
        setSettings(prev => ({
            ...prev,
            general: { ...prev.general, colors: { ...prev.general.colors, [key]: value } }
        }));
    };
    
    const handleFooterColorChange = (key: keyof typeof settings.footer.colors, value: string) => {
        setSettings(prev => ({
            ...prev,
            footer: { ...prev.footer, colors: { ...prev.footer.colors, [key]: value } }
        }));
    };

    const handleSave = () => {
        console.log('Saving settings:', settings);
        alert('تنظیمات با موفقیت ذخیره شد.');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-6">
                            <Card title="فونت سایت">
                                <div>
                                    <label htmlFor="site-font" className="block text-sm font-medium text-text-light mb-1">انتخاب فونت سایت</label>
                                    <select id="site-font" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={settings.general.font} onChange={e => setSettings(p => ({...p, general: {...p.general, font: e.target.value}}))}>
                                        <option value="Vazirmatn">وزیرمتن (پیش‌فرض)</option>
                                        <option value="Sahel">ساحل</option>
                                        <option value="Tanha">تنها</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-text-light mb-1">آپلود فونت دلخواه</label>
                                    <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        <UploadCloudIcon className="w-5 h-5 text-gray-500" />
                                        <span className="text-sm font-semibold text-text-main">انتخاب فایل فونت (woff2)</span>
                                    </button>
                                </div>
                            </Card>
                        </div>
                        <div className="lg:col-span-2">
                             <Card title="رنگ‌بندی سایت">
                                <p className="text-sm text-text-light mb-4">رنگ‌بندی اصلی قالب، دکمه‌ها، لینک‌ها و متون را از اینجا مدیریت کنید.</p>
                                <div className="space-y-2">
                                   <ColorPicker label="رنگ اصلی" color={settings.general.colors.primary} onChange={c => handleColorChange('primary', c)} />
                                   <ColorPicker label="رنگ ثانویه" color={settings.general.colors.secondary} onChange={c => handleColorChange('secondary', c)} />
                                   <ColorPicker label="رنگ پس‌زمینه" color={settings.general.colors.background} onChange={c => handleColorChange('background', c)} />
                                   <ColorPicker label="رنگ متن اصلی" color={settings.general.colors.textMain} onChange={c => handleColorChange('textMain', c)} />
                                   <ColorPicker label="رنگ متن روشن" color={settings.general.colors.textLight} onChange={c => handleColorChange('textLight', c)} />
                                </div>
                            </Card>
                        </div>
                    </div>
                );
            case 'header':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <MenuManager title="منو بالا دست راست" />
                        <MenuManager title="منو بالا دست چپ" />
                        <MenuManager title="منو اصلی سایت" />
                    </div>
                );
            case 'footer':
                 return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <MenuManager title="لینک‌های فوتر" />
                        </div>
                        <div className="space-y-6">
                            <Card title="کپی‌رایت">
                                <textarea
                                    value={settings.footer.copyright}
                                    onChange={e => setSettings(p => ({...p, footer: {...p.footer, copyright: e.target.value}}))}
                                    rows={3} className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-y"
                                ></textarea>
                            </Card>
                             <Card title="رنگ‌بندی فوتر">
                                 <ColorPicker label="رنگ پس‌زمینه" color={settings.footer.colors.background} onChange={c => handleFooterColorChange('background', c)} />
                                 <ColorPicker label="رنگ متن" color={settings.footer.colors.text} onChange={c => handleFooterColorChange('text', c)} />
                            </Card>
                            <Card title="جایگاه لوگوها">
                                 <div className="space-y-2">
                                     <div className="flex items-center"><input type="radio" name="logo-pos" id="pos-r" className="ms-2" /><label htmlFor="pos-r">راست چین</label></div>
                                     <div className="flex items-center"><input type="radio" name="logo-pos" id="pos-c" className="ms-2" /><label htmlFor="pos-c">وسط چین</label></div>
                                     <div className="flex items-center"><input type="radio" name="logo-pos" id="pos-l" className="ms-2" /><label htmlFor="pos-l">چپ چین</label></div>
                                 </div>
                            </Card>
                        </div>
                    </div>
                 );
            case 'sidebar':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="سایدبار راست">
                             <p className="text-sm text-text-light mb-4">ویجت‌های این سایدبار را مدیریت کنید.</p>
                              <MenuManager title="ویجت‌های فعال" />
                        </Card>
                         <Card title="سایدبار چپ">
                             <p className="text-sm text-text-light mb-4">ویجت‌های این سایدبار را مدیریت کنید.</p>
                             <MenuManager title="ویجت‌های فعال" />
                        </Card>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">مدیریت ظاهر</h1>
                <button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    ذخیره تغییرات
                </button>
            </div>

            <div className="flex border-b mb-6 bg-white rounded-t-lg shadow-sm overflow-x-auto">
                <TabButton label="ظاهر سایت" icon={<AppearanceIcon className="w-5 h-5" />} isActive={activeTab === 'general'} onClick={() => setActiveTab('general')} />
                <TabButton label="هدر سایت" icon={<HeaderMenuIcon className="w-5 h-5" />} isActive={activeTab === 'header'} onClick={() => setActiveTab('header')} />
                <TabButton label="فوتر" icon={<FooterIcon className="w-5 h-5" />} isActive={activeTab === 'footer'} onClick={() => setActiveTab('footer')} />
                <TabButton label="سایدبار" icon={<SidebarIcon className="w-5 h-5" />} isActive={activeTab === 'sidebar'} onClick={() => setActiveTab('sidebar')} />
            </div>

            <div>{renderTabContent()}</div>
        </div>
    );
}

export default AppearancePage;