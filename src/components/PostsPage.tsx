import React, { useState, useMemo } from 'react';
import { mockPosts } from '../data/mockData.ts';
import { Post, SeoStatus } from './types.ts';
import { PencilIcon, TrashIcon } from './Icons.tsx';
import { Page } from './App.tsx';

const SeoStatusBadge: React.FC<{ status: SeoStatus }> = ({ status }) => {
  const statusClasses: Record<SeoStatus, string> = {
    'عالی': 'bg-green-100 text-green-800',
    'خوب': 'bg-sky-100 text-sky-800',
    'نیاز به بهبود': 'bg-yellow-100 text-yellow-800',
    'ضعیف': 'bg-red-100 text-red-800',
  };
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>{status}</span>;
};

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void; }> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-i-1 mt-4">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        قبلی
      </button>
      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md border text-sm font-medium ${currentPage === number ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
        >
          {new Intl.NumberFormat('fa-IR').format(number)}
        </button>
      ))}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        بعدی
      </button>
    </div>
  );
};

interface PostsPageProps {
  setActivePage: (page: Page) => void;
}


const PostsPage: React.FC<PostsPageProps> = ({ setActivePage }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  }, [posts, currentPage, postsPerPage]);
  
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPostIds(currentPosts.map(p => p.id));
    } else {
      setSelectedPostIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedPostIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleRowClick = (postId: number) => {
    alert(`در حال انتقال به صفحه ویرایش پست شماره ${postId}...`);
  };
  
  const handleDelete = () => {
      if (window.confirm(`آیا از حذف ${selectedPostIds.length} پست انتخاب شده اطمینان دارید؟`)) {
          setPosts(posts.filter(p => !selectedPostIds.includes(p.id)));
          setSelectedPostIds([]);
      }
  };

  const isAllSelected = currentPosts.length > 0 && selectedPostIds.length === currentPosts.length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-text-main">مدیریت پست‌ها</h2>
          <p className="text-sm text-text-light mt-1">همه پست‌های خود را در یک مکان مشاهده و مدیریت کنید.</p>
        </div>
        <button 
          onClick={() => setActivePage('create-post')}
          className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          ایجاد پست جدید
        </button>
      </div>
      
      {/* Bulk Actions Bar */}
      {selectedPostIds.length > 0 && (
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-sky-800">
                  {new Intl.NumberFormat('fa-IR').format(selectedPostIds.length)} پست انتخاب شده است.
              </span>
              <div className="flex items-center space-i-3">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                      <PencilIcon className="w-4 h-4" />
                      ویرایش
                  </button>
                   <button onClick={handleDelete} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800">
                      <TrashIcon className="w-4 h-4" />
                      حذف
                  </button>
              </div>
          </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded" onChange={handleSelectAll} checked={isAllSelected} /></th>
              <th className="p-4 font-semibold">عنوان پست</th>
              <th className="p-4 font-semibold">نویسنده</th>
              <th className="p-4 font-semibold">کلمات کلیدی</th>
              <th className="p-4 font-semibold text-center">وضعیت سئو</th>
              <th className="p-4 font-semibold text-center">بازدید</th>
              <th className="p-4 font-semibold">آخرین بروزرسانی</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentPosts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(post.id)}>
                <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded" checked={selectedPostIds.includes(post.id)} onChange={() => handleSelectOne(post.id)} />
                </td>
                <td className="p-4">
                  <div className="font-bold text-text-main">{post.title}</div>
                  <a href="#" onClick={(e) => e.stopPropagation()} className="text-xs text-cyan-600 hover:underline" dir="ltr">/{post.slug}</a>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full object-cover"/>
                    <span className="font-medium text-text-light">{post.author}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {post.keywords.map(kw => <span key={kw} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{kw}</span>)}
                  </div>
                </td>
                <td className="p-4 text-center"><SeoStatusBadge status={post.seoStatus} /></td>
                <td className="p-4 text-center font-medium text-text-light">{new Intl.NumberFormat('fa-IR').format(post.views)}</td>
                <td className="p-4">
                  <div className="font-medium text-text-light">{post.updatedAt}</div>
                  <div className="text-xs text-gray-400">ایجاد: {post.createdAt}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {posts.length === 0 && <div className="text-center py-10 text-gray-500">هیچ پستی یافت نشد.</div>}
      
      {posts.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}

    </div>
  );
};

export default PostsPage;