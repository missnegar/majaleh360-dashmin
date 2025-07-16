
import React, { useState, useRef, useEffect } from 'react';
import { KebabMenuIcon } from './Icons.tsx';
import { getShamsiDate } from './utils/date.ts';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between h-16 bg-white shadow-sm px-6">
      <div className="flex items-center">
        <img src="https://picsum.photos/id/1/40/40" alt="آواتار کاربر" className="w-10 h-10 rounded-full object-cover ms-4" />
        <span className="text-text-main font-semibold">خوش آمدی، مدیر عزیز</span>
      </div>
      <div className="flex items-center space-i-4">
        <div className="relative" ref={menuRef}>
          <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary">
            <KebabMenuIcon className="w-6 h-6 text-text-light"/>
          </button>
          {isMenuOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20 border border-gray-200">
              <ul className="py-1 text-right">
                <li className="px-4 py-2 text-sm text-gray-500 border-b">
                  <span className="font-semibold">تاریخ:</span> {getShamsiDate()}
                </li>
                 <li className="px-4 py-2 text-sm text-gray-500 border-b">
                  <span className="font-semibold">IP:</span> 192.168.1.10
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-text-main hover:bg-gray-100">نمایش مجله</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-text-main hover:bg-gray-100">تنظیمات کاربری</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;