import React, { useState, useMemo } from 'react';
import { CopywritingTask, CopywritingTaskStatus } from './types.ts';
import { mockCopywritingTasks } from './data/mockData.ts';
import Card from './Card.tsx';
import { UsersIcon, ClipboardDocumentListIcon, DocumentPlusIcon, EyeIcon } from './Icons.tsx';

// Progress Bar Component
const HorizontalProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden shadow-inner">
        <div className="bg-primary h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference px-2">
            {new Intl.NumberFormat('fa-IR').format(progress)}%
        </span>
    </div>
);

// Status Badge Component
const TaskStatusBadge: React.FC<{ status: CopywritingTaskStatus }> = ({ status }) => {
    const statusInfo: Record<CopywritingTaskStatus, { text: string; classes: string }> = {
        in_progress: { text: 'در حال انجام', classes: 'bg-blue-100 text-blue-800' },
        review: { text: 'در حال بازبینی', classes: 'bg-yellow-100 text-yellow-800' },
        completed: { text: 'تکمیل شده', classes: 'bg-green-100 text-green-800' },
        halted: { text: 'متوقف شده', classes: 'bg-red-100 text-red-800' },
    };
    const { text, classes } = statusInfo[status];
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${classes}`}>{text}</span>;
};


const CopywritingPage: React.FC = () => {
    const [tasks, setTasks] = useState<CopywritingTask[]>(mockCopywritingTasks);

    return (
        <div className="space-y-6">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="مدیریت کپی‌رایترها" icon={<UsersIcon className="w-8 h-8"/>}>
                    <p className="text-sm text-text-light flex-grow">افزودن، ویرایش و مشاهده عملکرد کپی‌رایترهای تیم.</p>
                     <button className="mt-4 w-full px-4 py-2 bg-secondary/20 text-secondary font-semibold rounded-lg hover:bg-secondary/30 transition-colors">
                        مشاهده لیست
                    </button>
                </Card>
                <Card title="مدیریت تسک‌ها" icon={<ClipboardDocumentListIcon className="w-8 h-8"/>}>
                     <p className="text-sm text-text-light flex-grow">مشاهده و پیگیری تمام تسک‌های تعریف شده برای تیم محتوا.</p>
                      <button className="mt-4 w-full px-4 py-2 bg-secondary/20 text-secondary font-semibold rounded-lg hover:bg-secondary/30 transition-colors">
                        مشاهده تسک‌ها
                    </button>
                </Card>
                <Card title="ایجاد تسک جدید" icon={<DocumentPlusIcon className="w-8 h-8"/>}>
                     <p className="text-sm text-text-light flex-grow">یک تسک جدید برای تولید محتوا برای یکی از اعضای تیم تعریف کنید.</p>
                     <button className="mt-4 w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                        + ایجاد تسک
                    </button>
                </Card>
            </div>

            {/* Tasks Table */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-text-main mb-4">روند تولید محتوا</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="p-3 font-semibold">کپی‌رایتر</th>
                                <th className="p-3 font-semibold">موضوع مطلب</th>
                                <th className="p-3 font-semibold text-center">کاراکتر الزامی</th>
                                <th className="p-3 font-semibold w-48">روند پروژه</th>
                                <th className="p-3 font-semibold">تاریخ ایجاد</th>
                                <th className="p-3 font-semibold">ددلاین</th>
                                <th className="p-3 font-semibold text-center">وضعیت</th>
                                <th className="p-3 font-semibold text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tasks.map(task => (
                                <tr key={task.id} className="hover:bg-gray-50">
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <img src={task.copywriterAvatar} alt={task.copywriterName} className="w-10 h-10 rounded-full object-cover"/>
                                            <span className="font-semibold text-text-main">{task.copywriterName}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 font-medium text-text-main">{task.topic}</td>
                                    <td className="p-3 text-center text-text-light font-semibold">{new Intl.NumberFormat('fa-IR').format(task.requiredChars)}</td>
                                    <td className="p-3">
                                        <HorizontalProgressBar progress={task.progress} />
                                    </td>
                                    <td className="p-3 text-text-light">{task.createdAt}</td>
                                    <td className="p-3 text-text-light">{task.deadline}</td>
                                    <td className="p-3 text-center">
                                        <TaskStatusBadge status={task.status} />
                                    </td>

                                    <td className="p-3 text-center">
                                        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-200" title="مشاهده جزئیات">
                                            <EyeIcon className="w-5 h-5"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {tasks.length === 0 && <div className="text-center py-10 text-gray-500">هیچ تسکی یافت نشد.</div>}
            </div>
        </div>
    );
}

export default CopywritingPage;