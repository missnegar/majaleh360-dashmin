
import React from 'react';
import Card from './Card.tsx';
import AnalyticsChart from './AnalyticsChart.tsx';
import { mockComments } from '../data/mockData.ts';
import { Comment } from '../types.ts';
import { UsersIcon, CommentsIcon, AdsIcon } from './Icons.tsx';

const StatusIndicator: React.FC<{ status: 'good' | 'warning' | 'error'; label: string }> = ({ status, label }) => {
  const colorClasses = {
    good: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };
  return (
    <div className={`px-3 py-1 text-sm font-medium rounded-full inline-block ${colorClasses[status]}`}>
      {label}
    </div>
  );
};

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => (
  <div className="flex items-start space-i-3 py-3 border-b border-gray-100 last:border-b-0">
    <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
    <div className="flex-1">
      <p className="text-sm font-semibold text-text-main">{comment.author} <span className="text-xs text-gray-400 font-normal">در «{comment.postTitle}»</span></p>
      <p className="text-sm text-text-light truncate">{comment.text}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Analytics Card */}
      <Card title="آمار بازدید سایت" className="lg:col-span-2 md:col-span-2">
        <AnalyticsChart />
      </Card>

      {/* User Stats Card */}
      <Card title="کاربران ثبت‌نام شده" icon={<UsersIcon className="w-8 h-8"/>}>
        <div className="flex items-center justify-center h-full">
            <p className="text-5xl font-bold text-primary">۱۱,۲۸۰</p>
        </div>
      </Card>

      {/* Ads Card */}
      <Card title="درخواست‌های تبلیغات" icon={<AdsIcon className="w-8 h-8"/>}>
         <div className="flex flex-col items-center justify-center h-full">
            <p className="text-5xl font-bold text-primary">۱۶</p>
            <p className="text-sm text-text-light mt-2">درخواست جدید</p>
        </div>
      </Card>
      
      {/* Comments Card */}
      <Card title="آخرین نظرات تایید نشده" className="lg:col-span-3 md:col-span-2" icon={<CommentsIcon className="w-8 h-8" />}>
        <div className="flow-root">
          <div className="-my-3 divide-y divide-gray-100">
            {mockComments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
          </div>
        </div>
      </Card>
      
      {/* Status Cards */}
      <div className="lg:col-span-1 md:col-span-2 grid grid-cols-1 gap-6">
        <Card title="وضعیت سلامت سایت">
          <div className="flex flex-col items-center justify-center h-full">
             <StatusIndicator status="good" label="عالی" />
             <p className="text-sm text-text-light mt-2">هیچ مشکلی یافت نشد.</p>
          </div>
        </Card>
        <Card title="امنیت سایت">
          <div className="flex flex-col items-center justify-center h-full">
             <StatusIndicator status="good" label="امن" />
             <p className="text-sm text-text-light mt-2">اسکن امنیتی فعال است.</p>
          </div>
        </Card>
        <Card title="وضعیت سئو">
          <div className="flex flex-col items-center justify-center h-full">
            <StatusIndicator status="warning" label="قابل قبول" />
            <p className="text-sm text-text-light mt-2">چندین مورد برای بهبود وجود دارد.</p>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;