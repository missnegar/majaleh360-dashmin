import React, { useState } from 'react';
import { mockAds } from '../data/mockData.ts';
import { Ad } from '../types.ts';
import { PencilIcon, TrashIcon } from './Icons.tsx';

type AdStatus = 'فعال' | 'منقضی شده' | 'در انتظار پرداخت';

const AdStatusBadge: React.FC<{ status: AdStatus }> = ({ status }) => {
  const statusClasses: Record<AdStatus, string> = {
    'فعال': 'bg-green-100 text-green-800',
    'منقضی شده': 'bg-red-100 text-red-800',
    'در انتظار پرداخت': 'bg-yellow-100 text-yellow-800',
  };
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>{status}</span>;
};

const PaymentStatus: React.FC<{ paid: number, total: number }> = ({ paid, total }) => {
    const remaining = total - paid;
    const percentage = total > 0 ? (paid / total) * 100 : 0;
    
    return (
        <div className="w-full">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="text-xs text-text-light">
                {remaining > 0 
                    ? `مانده: ${new Intl.NumberFormat('fa-IR').format(remaining)}`
                    : `پرداخت تکمیل شد`
                }
            </div>
        </div>
    );
}

const AdsPage: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>(mockAds);

    const handleDelete = (adId: number) => {
        if (window.confirm('آیا از حذف این تبلیغ اطمینان دارید؟')) {
            setAds(ads.filter(ad => ad.id !== adId));
        }
    };

    const handleEdit = (adId: number) => {
        alert(`در حال انتقال به صفحه ویرایش تبلیغ شماره ${adId}...`);
    };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-text-main">مدیریت تبلیغات</h2>
              <p className="text-sm text-text-light mt-1">کلیه تبلیغات ثبت شده در سایت را مدیریت کنید.</p>
            </div>
            <button className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              ثبت تبلیغ جدید
            </button>
        </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 font-semibold">تبلیغ دهنده</th>
              <th className="p-4 font-semibold">بنر</th>
              <th className="p-4 font-semibold">رابط</th>
              <th className="p-4 font-semibold">جایگاه</th>
              <th className="p-4 font-semibold">زمان ثبت / انقضا</th>
              <th className="p-4 font-semibold text-center">کلیک</th>
              <th className="p-4 font-semibold">وضعیت پرداخت</th>
              <th className="p-4 font-semibold text-center">وضعیت</th>
              <th className="p-4 font-semibold text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ads.map(ad => (
              <tr key={ad.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={ad.advertiserAvatar} alt={ad.advertiser} className="w-10 h-10 rounded-full object-cover"/>
                    <span className="font-bold text-text-main">{ad.advertiser}</span>
                  </div>
                </td>
                <td className="p-4">
                  <img src={ad.bannerUrl} alt={`بنر ${ad.advertiser}`} className="w-32 h-16 object-cover rounded-md shadow-sm"/>
                </td>
                <td className="p-4 font-medium text-text-light">{ad.agent}</td>
                <td className="p-4 font-medium text-text-light">{ad.placement}</td>
                <td className="p-4">
                  <div className="font-medium text-text-light">{ad.registeredAt}</div>
                  <div className="text-xs text-gray-400">تا {ad.expiresAt}</div>
                </td>
                <td className="p-4 text-center font-bold text-primary">{new Intl.NumberFormat('fa-IR').format(ad.clicks)}</td>
                <td className="p-4">
                    <PaymentStatus paid={ad.paidAmount} total={ad.totalAmount} />
                </td>
                <td className="p-4 text-center"><AdStatusBadge status={ad.status} /></td>
                <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleEdit(ad.id)} className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                            <PencilIcon className="w-5 h-5"/>
                        </button>
                        <button onClick={() => handleDelete(ad.id)} className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors">
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {ads.length === 0 && <div className="text-center py-10 text-gray-500">هیچ تبلیغی یافت نشد.</div>}
    </div>
  );
};

export default AdsPage;