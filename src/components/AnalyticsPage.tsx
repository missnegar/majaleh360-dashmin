import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from './Card.tsx';
import { overallStats, countryData, deviceData, referralData, topPagesData } from '../data/mockData.ts';
import { DeviceDesktopIcon, GlobeIcon, LinkIcon, UsersIcon, GoogleIcon, DirectIcon } from './Icons.tsx';
import { ReferralData } from './types.ts';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <Card title="" className="text-center">
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-secondary mb-2">{icon}</div>
      <p className="text-2xl md:text-3xl font-bold text-primary">{value}</p>
      <p className="text-sm text-text-light mt-1">{title}</p>
    </div>
  </Card>
);

const ChangeIndicator: React.FC<{ change: number }> = ({ change }) => {
  const isPositive = change > 0;
  return (
    <span className={`text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '▲' : '▼'} {Math.abs(change)}%
    </span>
  );
};

const iconMap: { [key: string]: React.ReactNode } = {
  google: <GoogleIcon className="w-5 h-5"/>,
  direct: <DirectIcon className="w-5 h-5 text-gray-500"/>,
  link: <LinkIcon className="w-5 h-5 text-gray-500"/>
};

const ReferralRow: React.FC<{ item: ReferralData }> = ({ item }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center gap-3">
      {iconMap[item.icon]}
      <span className="font-medium text-text-main">{item.source}</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="font-semibold text-text-main">{new Intl.NumberFormat('fa-IR').format(item.visits)}</span>
      <ChangeIndicator change={item.change} />
    </div>
  </div>
);

const AnalyticsPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Overall Stats */}
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="بازدید کل" value={overallStats.totalVisits} icon={<GlobeIcon className="w-8 h-8"/>} />
        <StatCard title="کاربران یکتا" value={overallStats.uniqueVisitors} icon={<UsersIcon className="w-8 h-8"/>} />
        <StatCard title="بازدید صفحات" value={overallStats.pageViews} icon={<DeviceDesktopIcon className="w-8 h-8"/>} />
        <StatCard title="نرخ پرش" value={overallStats.bounceRate} icon={<LinkIcon className="w-8 h-8"/>} />
      </div>

      {/* Country Stats */}
      <Card title="آمار کشورها" className="lg:col-span-1">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={countryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {countryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontFamily: 'Vazirmatn', borderRadius: '8px', direction: 'rtl' }} formatter={(value: number) => [`${value}%`, 'درصد']} />
            <Legend wrapperStyle={{ fontFamily: 'Vazirmatn', fontSize: 12, direction: 'rtl' }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Device Stats */}
      <Card title="آمار دستگاه‌ها" className="lg:col-span-1">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} label>
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontFamily: 'Vazirmatn', borderRadius: '8px', direction: 'rtl' }} formatter={(value: number) => [`${value}%`, 'درصد']} />
             <Legend wrapperStyle={{ fontFamily: 'Vazirmatn', fontSize: 12, direction: 'rtl' }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Referral Sources */}
      <Card title="برترین منابع ورودی" className="lg:col-span-1">
        <div className="flow-root">
          <div className="-my-3 divide-y divide-gray-100">
            {referralData.map(item => <ReferralRow key={item.source} item={item} />)}
          </div>
        </div>
      </Card>
      
      {/* Top Pages */}
      <Card title="صفحات پربازدید" className="lg:col-span-3">
        <div className="flow-root">
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between text-sm font-semibold text-text-light px-2 py-2 bg-gray-50 rounded-t-lg">
              <span>مسیر صفحه</span>
              <span>تعداد بازدید</span>
            </div>
            {topPagesData.map(page => (
              <div key={page.path} className="flex justify-between items-center py-3 px-2 hover:bg-gray-50">
                <span className="text-sm text-text-main font-mono text-left" dir="ltr">{page.path}</span>
                <span className="text-sm font-semibold text-primary">{new Intl.NumberFormat('fa-IR').format(page.views)}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

    </div>
  );
};

export default AnalyticsPage;