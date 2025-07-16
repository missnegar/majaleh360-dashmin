
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dailyAnalytics, weeklyAnalytics, monthlyAnalytics, quarterlyAnalytics } from '../data/mockData.ts';
import { AnalyticsData } from '../types.ts';

type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'quarterly';

const dataMap: Record<TimeFrame, AnalyticsData[]> = {
  daily: dailyAnalytics,
  weekly: weeklyAnalytics,
  monthly: monthlyAnalytics,
  quarterly: quarterlyAnalytics,
};

const timeFrameLabels: Record<TimeFrame, string> = {
  daily: 'امروز',
  weekly: '۷ روز گذشته',
  monthly: 'ماهانه',
  quarterly: '۳ ماه اخیر'
}

const AnalyticsChart: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('weekly');

  const renderTimeFrameButtons = () => {
    return (
      <div className="flex justify-center space-i-2 mb-4">
        {(Object.keys(timeFrameLabels) as TimeFrame[]).map((frame) => (
          <button
            key={frame}
            onClick={() => setTimeFrame(frame)}
            className={`px-4 py-1 text-sm font-medium rounded-full transition-colors ${
              timeFrame === frame
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-text-light hover:bg-gray-300'
            }`}
          >
            {timeFrameLabels[frame]}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {renderTimeFrameButtons()}
      <div className="flex-grow w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataMap[timeFrame]} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12, fontFamily: 'Vazirmatn' }} />
            <YAxis tick={{ fill: '#666', fontSize: 12, fontFamily: 'Vazirmatn' }} />
            <Tooltip
              contentStyle={{ fontFamily: 'Vazirmatn', borderRadius: '8px', direction: 'rtl' }}
              labelStyle={{ color: '#333' }}
              formatter={(value: number) => [new Intl.NumberFormat('fa-IR').format(value), 'بازدید']}
            />
            <Legend wrapperStyle={{ fontFamily: 'Vazirmatn', fontSize: 14 }} formatter={() => 'بازدیدها'}/>
            <Bar dataKey="visits" fill="#D1A980" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;