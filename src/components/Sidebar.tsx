import React from 'react';
import { 
  DashboardIcon, AnalyticsIcon, PostsIcon, MediaIcon, CategoriesIcon, 
  SeoIcon, AdsIcon, CommentsIcon, SettingsIcon, UsersIcon, LogoutIcon, AccountingIcon, CopywritingIcon, AppearanceIcon 
} from './Icons.tsx';
import { Page } from '../App.tsx';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => (
  <li
    className={`flex items-center p-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
      active
        ? 'bg-secondary/20 text-white'
        : 'text-gray-300 hover:bg-secondary/10 hover:text-white'
    }`}
    onClick={onClick}
    role="button"
    aria-current={active ? 'page' : undefined}
  >
    {icon}
    <span className="me-3">{label}</span>
  </li>
);

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const menuItems: { id: Page, label: string; icon: React.ReactNode; }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: <DashboardIcon className="w-6 h-6" /> },
    { id: 'accounting', label: 'حسابداری', icon: <AccountingIcon className="w-6 h-6" /> },
    { id: 'analytics', label: 'آمار', icon: <AnalyticsIcon className="w-6 h-6" /> },
    { id: 'posts', label: 'پست‌ها', icon: <PostsIcon className="w-6 h-6" /> },
    { id: 'copywriting', label: 'کپی‌رایتینگ', icon: <CopywritingIcon className="w-6 h-6" /> },
    { id: 'media', label: 'مدیا', icon: <MediaIcon className="w-6 h-6" /> },
    { id: 'categories', label: 'دسته‌بندی‌ها', icon: <CategoriesIcon className="w-6 h-6" /> },
    { id: 'seo', label: 'سئو', icon: <SeoIcon className="w-6 h-6" /> },
    { id: 'ads', label: 'تبلیغات', icon: <AdsIcon className="w-6 h-6" /> },
    { id: 'comments', label: 'نظرات', icon: <CommentsIcon className="w-6 h-6" /> },
    { id: 'appearance', label: 'ظاهر', icon: <AppearanceIcon className="w-6 h-6" /> },
    { id: 'settings', label: 'تنظیمات', icon: <SettingsIcon className="w-6 h-6" /> },
    { id: 'users', label: 'کاربران', icon: <UsersIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="w-64 bg-primary text-white flex flex-col h-screen shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-gray-500/30">
        <h1 className="text-2xl font-bold text-white">مدیریت محتوا</h1>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul>
          {menuItems.map((item) => (
            <NavItem 
              key={item.id} 
              icon={item.icon} 
              label={item.label} 
              active={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            />
          ))}
        </ul>
      </nav>
      <div className="px-4 py-4 border-t border-gray-500/30">
        <ul>
          <NavItem icon={<LogoutIcon className="w-6 h-6" />} label="خروج" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;