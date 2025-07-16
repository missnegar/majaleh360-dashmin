import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockInvoices, mockIncomeData } from '../src/data/mockData.ts';
import { Invoice, InvoicePaymentStatus, InvoiceStatus, InvoiceOrderType, IncomeData } from '../src/types.ts';
import Card from './Card.tsx';
import { CheckCircleIcon, XCircleIcon, XIcon, EyeIcon } from './Icons.tsx';

// Badges
const PaymentStatusBadge: React.FC<{ status: InvoicePaymentStatus }> = ({ status }) => {
  const statusInfo = {
    paid: { text: 'پرداخت شده', classes: 'bg-green-100 text-green-800' },
    pending: { text: 'در انتظار پرداخت', classes: 'bg-yellow-100 text-yellow-800' },
    failed: { text: 'ناموفق', classes: 'bg-red-100 text-red-800' },
  };
  const { text, classes } = statusInfo[status];
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${classes}`}>{text}</span>;
};

const OrderTypeBadge: React.FC<{ type: InvoiceOrderType }> = ({ type }) => {
    const typeInfo = {
        banner: { text: 'بنری', classes: 'bg-blue-100 text-blue-800'},
        text: { text: 'متنی', classes: 'bg-indigo-100 text-indigo-800'},
        reportage: { text: 'ریپورتاژ', classes: 'bg-purple-100 text-purple-800'},
        popup: { text: 'پاپ آپ', classes: 'bg-pink-100 text-pink-800'},
    }
    const { text, classes } = typeInfo[type];
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes}`}>{text}</span>;
}

// Modals
const ViewInvoiceModal: React.FC<{
    invoice: Invoice;
    onClose: () => void;
    onUpdateStatus: (id: number, status: InvoiceStatus) => void;
}> = ({ invoice, onClose, onUpdateStatus }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-bold text-lg text-text-main">جزئیات صورتحساب - {invoice.orderNumber}</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6 text-text-light" /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div><strong className="block text-text-light">مشتری:</strong> <span className="text-text-main">{invoice.customerName}</span></div>
                    <div><strong className="block text-text-light">ایمیل:</strong> <span className="text-text-main">{invoice.email}</span></div>
                    <div><strong className="block text-text-light">شماره تماس:</strong> <span className="text-text-main" dir="ltr">{invoice.phone}</span></div>
                    <div><strong className="block text-text-light">رابط:</strong> <span className="text-text-main">{invoice.agentName}</span></div>
                    <div><strong className="block text-text-light">نوع پرداخت:</strong> <span className="text-text-main">{invoice.paymentMethod}</span></div>
                    <div><strong className="block text-text-light">مبلغ کل:</strong> <span className="text-text-main font-semibold">{new Intl.NumberFormat('fa-IR').format(invoice.amount)} تومان</span></div>
                </div>
                 {invoice.bannerUrls.length > 0 && (
                    <div className="border-t pt-4">
                        <strong className="block text-text-light mb-2">بنرهای ارسالی:</strong>
                        <div className="flex flex-wrap gap-4">
                            {invoice.bannerUrls.map((url, index) => <img key={index} src={url} alt={`بنر ${index+1}`} className="max-w-xs object-contain rounded-md border shadow-sm"/>)}
                        </div>
                    </div>
                )}
                 {invoice.bannerUrls.length === 0 && invoice.orderType === 'banner' && (
                    <div className="border-t pt-4 text-center text-sm text-gray-500">
                        بنری برای این سفارش بارگذاری نشده است.
                    </div>
                 )}
            </div>
            <div className="p-4 bg-gray-50 border-t flex items-center justify-end gap-3">
                {invoice.status === 'pending_approval' && (
                    <>
                    <button onClick={() => { onUpdateStatus(invoice.id, 'rejected'); onClose(); }} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2">
                        <XCircleIcon className="w-5 h-5"/> عدم تایید
                    </button>
                    <button onClick={() => { onUpdateStatus(invoice.id, 'approved'); onClose(); }} className="px-4 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5"/> تایید سفارش
                    </button>
                    </>
                )}
                 <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-text-light bg-gray-200 hover:bg-gray-300 rounded-lg">بستن</button>
            </div>
        </div>
    </div>
);

const CreateInvoiceModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: any) => void;
}> = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        customerName: '', email: '', phone: '', agentName: '',
        orderType: 'banner' as InvoiceOrderType,
        amount: '',
        paymentStatus: 'pending' as InvoicePaymentStatus,
        status: 'pending_approval' as InvoiceStatus,
        paymentMethod: 'درگاه آنلاین',
        bannerUrls: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = { ...formData,
            amount: Number(formData.amount),
            bannerUrls: formData.bannerUrls.split('\n').filter(url => url.trim() !== '')
        };
        onCreate(finalData);
    }
    
    if (!isOpen) return null;

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-bold text-lg text-text-main">ثبت فاکتور جدید</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6 text-text-light" /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow contents">
                    <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <input name="customerName" placeholder="نام مشتری یا شرکت" onChange={handleChange} className="p-2 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition" required />
                        <input name="agentName" placeholder="نام رابط" onChange={handleChange} className="p-2 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition" required />
                        <input name="email" type="email" placeholder="ایمیل" onChange={handleChange} className="p-2 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition" required />
                        <input name="phone" placeholder="شماره تماس" onChange={handleChange} className="p-2 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition" required dir="ltr"/>
                        <select name="orderType" value={formData.orderType} onChange={handleChange} className="p-2 border rounded-lg bg-white focus:ring-1 focus:ring-primary focus:border-primary transition">
                            <option value="banner">بنری</option> <option value="text">متنی</option> <option value="reportage">ریپورتاژ</option> <option value="popup">پاپ آپ</option>
                        </select>
                        <input name="amount" type="number" placeholder="مبلغ (تومان)" onChange={handleChange} className="p-2 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition" required dir="ltr"/>
                        <div className="md:col-span-2">
                           <textarea name="bannerUrls" placeholder="آدرس بنرها (هر آدرس در یک خط)" onChange={handleChange} rows={3} className="w-full p-2 border rounded-lg resize-y focus:ring-1 focus:ring-primary focus:border-primary transition" dir="ltr"></textarea>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t flex items-center justify-end gap-3">
                         <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-text-light bg-gray-200 hover:bg-gray-300 rounded-lg">انصراف</button>
                        <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg">ثبت فاکتور</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

const AccountingPage: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
    const [incomeTimeFrame, setIncomeTimeFrame] = useState<string>('threeMonths');
    const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    const handleViewInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setViewModalOpen(true);
    };

    const handleUpdateInvoiceStatus = (id: number, status: InvoiceStatus) => {
        setInvoices(invoices.map(inv => {
            if (inv.id === id) {
                const updatedInv = { ...inv, status };
                if (status === 'approved') updatedInv.paymentStatus = 'paid';
                else if (status === 'rejected' && inv.paymentStatus === 'pending') updatedInv.paymentStatus = 'failed';
                return updatedInv;
            }
            return inv;
        }));
    };
    
    const handleCreateInvoice = (newInvoiceData: any) => {
        const newInvoice: Invoice = {
            id: Math.max(0, ...invoices.map(i => i.id)) + 1,
            orderNumber: `ORD-2407-${String(invoices.length + 1).padStart(3, '0')}`,
            registrationDate: new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
            expiryDate: new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
            ...newInvoiceData
        };
        setInvoices([newInvoice, ...invoices]);
        setCreateModalOpen(false);
    };

    const timeFrameLabels: Record<string, string> = { monthly: 'ماه اخیر', threeMonths: '۳ ماه اخیر', sixMonths: '۶ ماه اخیر', yearly: 'سالانه' };

    return (
        <div className="space-y-6">
            {viewModalOpen && selectedInvoice && <ViewInvoiceModal invoice={selectedInvoice} onClose={() => setViewModalOpen(false)} onUpdateStatus={handleUpdateInvoiceStatus} />}
            <CreateInvoiceModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} onCreate={handleCreateInvoice} />

            <Card title="درآمد کل">
                <div className="flex justify-center space-i-2 mb-4">
                    {(Object.keys(timeFrameLabels) as (keyof typeof timeFrameLabels)[]).map((frame) => (
                        <button key={frame} onClick={() => setIncomeTimeFrame(frame)}
                            className={`px-4 py-1 text-sm font-medium rounded-full transition-colors ${incomeTimeFrame === frame ? 'bg-primary text-white' : 'bg-gray-200 text-text-light hover:bg-gray-300'}`}>
                            {timeFrameLabels[frame]}
                        </button>
                    ))}
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockIncomeData[incomeTimeFrame]} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12, fontFamily: 'Vazirmatn' }} />
                            <YAxis tickFormatter={(value) => new Intl.NumberFormat('fa-IR', { notation: 'compact' }).format(value as number)} tick={{ fill: '#666', fontSize: 12, fontFamily: 'Vazirmatn' }} />
                            <Tooltip contentStyle={{ fontFamily: 'Vazirmatn', borderRadius: '8px', direction: 'rtl' }} labelStyle={{ color: '#333' }} formatter={(value: number) => [new Intl.NumberFormat('fa-IR').format(value), 'تومان']} />
                            <Legend wrapperStyle={{ fontFamily: 'Vazirmatn', fontSize: 14 }} formatter={() => 'درآمد'}/>
                            <Bar dataKey="income" fill="#D1A980" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-bold text-text-main">صورتحساب‌ها</h2>
                        <p className="text-sm text-text-light mt-1">کلیه تراکنش‌ها و سفارشات را مدیریت کنید.</p>
                    </div>
                    <button onClick={() => setCreateModalOpen(true)} className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                        ثبت فاکتور جدید
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="p-3 font-semibold w-12 text-center">ردیف</th>
                                <th className="p-3 font-semibold">شماره سفارش</th>
                                <th className="p-3 font-semibold">مشتری</th>
                                <th className="p-3 font-semibold">سفارش</th>
                                <th className="p-3 font-semibold text-center">وضعیت پرداخت</th>
                                <th className="p-3 font-semibold">تاریخ ثبت</th>
                                <th className="p-3 font-semibold text-center">زمان مانده</th>
                                <th className="p-3 font-semibold text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoices.map((invoice, index) => (
                                <tr key={invoice.id} className="hover:bg-gray-50">
                                    <td className="p-3 text-center text-text-light">{new Intl.NumberFormat('fa-IR').format(index + 1)}</td>
                                    <td className="p-3 font-mono text-left font-semibold text-text-main" dir="ltr">{invoice.orderNumber}</td>
                                    <td className="p-3">
                                        <div className="font-semibold text-text-main">{invoice.customerName}</div>
                                        <div className="text-xs text-gray-500">{invoice.email}</div>
                                    </td>
                                    <td className="p-3 text-center"><OrderTypeBadge type={invoice.orderType} /></td>
                                    <td className="p-3 text-center"><PaymentStatusBadge status={invoice.paymentStatus} /></td>
                                    <td className="p-3 text-text-light">{invoice.registrationDate}</td>
                                    <td className="p-3 text-center text-text-light">۳۰ روز</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => handleViewInvoice(invoice)} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors" title="مشاهده جزئیات">
                                            <EyeIcon className="w-5 h-5"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {invoices.length === 0 && <div className="text-center py-10 text-gray-500">هیچ صورتحسابی یافت نشد.</div>}
            </div>
        </div>
    );
};

export default AccountingPage;