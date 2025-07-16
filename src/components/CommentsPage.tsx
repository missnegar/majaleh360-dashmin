import React, { useState, useMemo } from 'react';
import { mockDetailedComments } from '../data/mockData.ts';
import { DetailedComment, CommentStatus } from './types.ts';
import { CheckCircleIcon, XCircleIcon, EyeIcon, XIcon, TrashIcon } from './Icons.tsx';

const CommentStatusBadge: React.FC<{ status: CommentStatus }> = ({ status }) => {
  const statusInfo = {
    approved: { text: 'تایید شده', classes: 'bg-green-100 text-green-800' },
    pending: { text: 'در انتظار تایید', classes: 'bg-yellow-100 text-yellow-800' },
    rejected: { text: 'رد شده', classes: 'bg-red-100 text-red-800' },
  };
  const { text, classes } = statusInfo[status];
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${classes}`}>{text}</span>;
};

const CommentModal: React.FC<{
  comment: DetailedComment;
  onClose: () => void;
  onUpdateStatus: (id: number, status: CommentStatus) => void;
}> = ({ comment, onClose, onUpdateStatus }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full"/>
                    <div>
                        <h3 className="font-bold text-lg text-text-main">{comment.author}</h3>
                        <a href={comment.postUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-600 hover:underline">
                           در پست: {comment.postTitle}
                        </a>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                    <XIcon className="w-6 h-6 text-text-light" />
                </button>
            </div>
            <div className="p-6 overflow-y-auto">
                <p className="text-text-main leading-relaxed whitespace-pre-wrap">{comment.text}</p>
            </div>
            <div className="p-4 bg-gray-50 border-t flex items-center justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-text-light bg-gray-200 hover:bg-gray-300 rounded-lg">بستن</button>
                {comment.status !== 'rejected' && (
                    <button onClick={() => { onUpdateStatus(comment.id, 'rejected'); onClose(); }} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2">
                        <XCircleIcon className="w-5 h-5"/> رد کردن
                    </button>
                )}
                 {comment.status !== 'approved' && (
                    <button onClick={() => { onUpdateStatus(comment.id, 'approved'); onClose(); }} className="px-4 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5"/> تایید کردن
                    </button>
                )}
            </div>
        </div>
    </div>
);


const CommentsPage: React.FC = () => {
    const [comments, setComments] = useState<DetailedComment[]>(mockDetailedComments);
    const [filter, setFilter] = useState<CommentStatus | 'all'>('all');
    const [selectedComment, setSelectedComment] = useState<DetailedComment | null>(null);

    const handleUpdateStatus = (id: number, status: CommentStatus) => {
        setComments(comments.map(c => c.id === id ? { ...c, status } : c));
    };
    
    const handleDelete = (id: number) => {
        if(window.confirm('آیا از حذف این نظر برای همیشه اطمینان دارید؟')) {
            setComments(comments.filter(c => c.id !== id));
        }
    }

    const filteredComments = useMemo(() => {
        if (filter === 'all') return comments;
        return comments.filter(c => c.status === filter);
    }, [comments, filter]);
    
    const filterTabs: { id: CommentStatus | 'all'; label: string }[] = [
        { id: 'all', label: 'همه نظرات' },
        { id: 'pending', label: 'در انتظار تایید' },
        { id: 'approved', label: 'تایید شده' },
        { id: 'rejected', label: 'رد شده' },
    ];

    const getRowClass = (status: CommentStatus) => {
        switch(status) {
            case 'pending': return 'bg-yellow-50/50';
            case 'rejected': return 'bg-red-50/50 opacity-80';
            default: return 'bg-white';
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            {selectedComment && <CommentModal comment={selectedComment} onClose={() => setSelectedComment(null)} onUpdateStatus={handleUpdateStatus} />}
            <div className="flex items-center justify-between mb-5 border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold text-text-main">مدیریت نظرات</h2>
                  <p className="text-sm text-text-light mt-1">نظرات کاربران را مشاهده و مدیریت کنید.</p>
                </div>
            </div>
            
            <div className="flex items-center border-b mb-4">
                {filterTabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`px-4 py-2 font-semibold text-sm transition-colors ${
                            filter === tab.id
                                ? 'border-b-2 border-primary text-primary'
                               : 'text-text-light hover:text-text-main'
                        }`}
                    >
                        {tab.label} ({tab.id === 'all' ? comments.length : comments.filter(c => c.status === tab.id).length})
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-3 font-semibold w-12 text-center">ردیف</th>
                            <th className="p-3 font-semibold">کاربر</th>
                            <th className="p-3 font-semibold">متن نظر</th>
                            <th className="p-3 font-semibold">تاریخ</th>
                            <th className="p-3 font-semibold">مربوط به</th>
                            <th className="p-3 font-semibold text-center">وضعیت</th>
                            <th className="p-3 font-semibold text-center">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredComments.map((comment, index) => (
                            <tr key={comment.id} className={`${getRowClass(comment.status)} hover:bg-gray-100 transition-colors`}>
                                <td className="p-3 text-center text-text-light">{new Intl.NumberFormat('fa-IR').format(index + 1)}</td>
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full object-cover"/>
                                        <span className="font-semibold text-text-main">{comment.author}</span>
                                    </div>
                                </td>
                                <td className="p-3 text-text-light max-w-sm">
                                    <p className={`truncate ${comment.status === 'rejected' ? 'line-through' : ''}`}>{comment.text}</p>
                                </td>
                                <td className="p-3 text-text-light font-sans text-left">{comment.createdAt}</td>
                                <td className="p-3">
                                    <a href={comment.postUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline text-xs" title={comment.postTitle}>
                                        {comment.postTitle.substring(0, 30)}{comment.postTitle.length > 30 ? '...' : ''}
                                    </a>
                                </td>
                                <td className="p-3 text-center">
                                    <CommentStatusBadge status={comment.status} />
                                </td>
                                <td className="p-3 text-center">
                                    <div className="flex justify-center items-center gap-1">
                                        <button onClick={() => setSelectedComment(comment)} title="مشاهده کامل و مدیریت" className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                                            <EyeIcon className="w-5 h-5"/>
                                        </button>
                                        {comment.status !== 'approved' &&
                                            <button onClick={() => handleUpdateStatus(comment.id, 'approved')} title="تایید" className="p-2 rounded-full text-green-500 hover:bg-green-100 transition-colors">
                                                <CheckCircleIcon className="w-5 h-5"/>
                                            </button>
                                        }
                                        {comment.status !== 'rejected' &&
                                            <button onClick={() => handleUpdateStatus(comment.id, 'rejected')} title="رد کردن" className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors">
                                                <XCircleIcon className="w-5 h-5"/>
                                            </button>
                                        }
                                        <button onClick={() => handleDelete(comment.id)} title="حذف" className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors">
                                            <TrashIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredComments.length === 0 && <div className="text-center py-10 text-gray-500">هیچ نظری با این فیلتر یافت نشد.</div>}
        </div>
    );
};

export default CommentsPage;