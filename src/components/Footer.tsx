import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-50 text-left p-3 text-xs text-gray-600 border-t border-gray-200">
      <a 
        href="https://www.negar.agency" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        ساخته شده با 💚 توسط تیم آژانس طراحی و خلاقیت ۳۶۰ ‌ نگار | ۱۴۰۴
      </a>
    </footer>
  );
};

export default Footer;