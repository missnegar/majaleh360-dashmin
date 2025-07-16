import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import AnalyticsPage from './components/AnalyticsPage.tsx';
import PostsPage from './components/PostsPage.tsx';
import MediaPage from './components/MediaPage.tsx';
import CategoriesPage from './components/CategoriesPage.tsx';
import SeoPage from './components/SeoPage.tsx';
import AdsPage from './components/AdsPage.tsx';
import CommentsPage from './components/CommentsPage.tsx';
import SettingsPage from './components/SettingsPage.tsx';
import UsersPage from './components/UsersPage.tsx';
import AccountingPage from './components/AccountingPage.tsx';
import CopywritingPage from './components/CopywritingPage.tsx';
import CreatePostPage from './components/CreatePostPage.tsx';
import AppearancePage from './components/AppearancePage.tsx';
import Footer from './components/Footer.tsx';

export type Page = 'dashboard' | 'analytics' | 'posts' | 'media' | 'categories' | 'seo' | 'ads' | 'comments' | 'settings' | 'users' | 'accounting' | 'copywriting' | 'create-post' | 'appearance';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounting':
        return <AccountingPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'posts':
        return <PostsPage setActivePage={setActivePage} />;
      case 'create-post':
        return <CreatePostPage setActivePage={setActivePage} />;
      case 'copywriting':
        return <CopywritingPage />;
      case 'media':
        return <MediaPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'seo':
        return <SeoPage />;
      case 'ads':
        return <AdsPage />;
      case 'comments':
        return <CommentsPage />;
      case 'appearance':
        return <AppearancePage />;
      case 'settings':
        return <SettingsPage />;
      case 'users':
        return <UsersPage />;
      default:
        return <div className="text-center p-10 text-xl font-semibold text-text-light">صفحه در دست ساخت است...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-main font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;