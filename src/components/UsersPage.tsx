import React, { useState, useEffect } from 'react';
import { mockUsers } from './data/mockData.ts';
import { User, UserRole, UserStatus } from './types.ts';
import { PencilIcon, TrashIcon, XIcon } from './Icons.tsx';

const roleDisplay: Record<UserRole, { text: string; classes: string; }> = {
    admin: { text: 'ادمین', classes: 'bg-red-200 text-red-800' },
    writer: { text: 'نویسنده', classes: 'bg-blue-200 text-blue-800' },
    support: { text: 'پشتیبان', classes: 'bg-green-200 text-green-800' },
    user: { text: 'کاربر', classes: 'bg-gray-200 text-gray-800' },
};

const statusDisplay: Record<UserStatus, { text: string; classes: string; }> = {
    active: { text: 'فعال', classes: 'bg-green-100 text-green-800' },
    banned: { text: 'بن شده', classes: 'bg-yellow-100 text-yellow-800' },
    suspended: { text: 'اخراج شده', classes: 'bg-red-100 text-red-800' },
};

const RoleBadge: React.FC<{ role: UserRole }> = ({ role }) => {
    const { text, classes } = roleDisplay[role];
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${classes}`}>{text}</span>;
};

const StatusBadge: React.FC<{ status: UserStatus }> = ({ status }) => {
    const { text, classes } = statusDisplay[status];
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes}`}>{text}</span>;
};

const UserModal: React.FC<{
    user: User;
    onClose: () => void;
    onUpdate: (id: number, role: UserRole, status: UserStatus, password?: string) => void;
}> = ({ user, onClose, onUpdate }) => {
    const [role, setRole] = useState<UserRole>(user.role);
    const [status, setStatus] = useState<UserStatus>(user.status);
    const [password, setPassword] = useState('');

    const handleSave = () => {
        onUpdate(user.id, role, status, password.trim() ? password : undefined);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-bold text-lg text-text-main">مدیریت کاربر</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                        <XIcon className="w-6 h-6 text-text-light" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="flex items-center gap-4">
                        <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="w-20 h-20 rounded-full"/>
                        <div>
                            <h4 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h4>
                            <p className="text-text-light">{user.email}</p>
                            <p className="text-text-light" dir="ltr">{user.mobile}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
                        <p><strong>تاریخ ثبت‌نام:</strong> {user.registrationDate}</p>
                        <p><strong>تعداد دیدگاه‌ها:</strong> {new Intl.NumberFormat('fa-IR').format(user.commentCount)}</p>
                    </div>
                    <div className="space-y-4 pt-4 border-t">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-text-light mb-1">نقش کاربری</label>
                                <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                                    {Object.keys(roleDisplay).map(r => <option key={r} value={r}>{roleDisplay[r as UserRole].text}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-text-light mb-1">وضعیت کاربر</label>
                                <select id="status" value={status} onChange={(e) => setStatus(e.target.value as UserStatus)} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                                    {Object.keys(statusDisplay).map(s => <option key={s} value={s}>{statusDisplay[s as UserStatus].text}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                           <label htmlFor="password" className="block text-sm font-medium text-text-light mb-1">تغییر رمز عبور (اختیاری)</label>
                           <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="برای تغییر، رمز جدید را وارد کنید" />
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-text-light bg-gray-200 hover:bg-gray-300 rounded-lg">انصراف</button>
                    <button onClick={handleSave} className="px-6 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg">ذخیره تغییرات</button>
                </div>
            </div>
        </div>
    );
};

const AddUserModal: React.FC<{
    onClose: () => void;
    onCreate: (data: Omit<User, 'id' | 'avatar' | 'registrationDate' | 'commentCount'> & { password?: string }) => void;
}> = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        role: 'user' as UserRole,
        status: 'active' as UserStatus,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.mobile) {
            alert('لطفاً تمامی فیلدها را پر کنید.');
            return;
        }
        onCreate(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-bold text-lg text-text-main">افزودن کاربر جدید</h3>
                    <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                        <XIcon className="w-6 h-6 text-text-light" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="نام" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        <InputField label="نام خانوادگی" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <InputField label="ایمیل" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    <InputField label="موبایل" name="mobile" type="tel" dir="ltr" value={formData.mobile} onChange={handleChange} required />
                    <InputField label="رمز عبور" name="password" type="password" value={formData.password} onChange={handleChange} required />
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-text-light mb-1">نقش کاربری</label>
                            <select name="role" id="role" value={formData.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                                {Object.keys(roleDisplay).map(r => <option key={r} value={r}>{roleDisplay[r as UserRole].text}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-text-light mb-1">وضعیت کاربر</label>
                            <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                                {Object.keys(statusDisplay).map(s => <option key={s} value={s}>{statusDisplay[s as UserStatus].text}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t flex items-center justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-text-light bg-gray-200 hover:bg-gray-300 rounded-lg">انصراف</button>
                    <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg">افزودن کاربر</button>
                </div>
            </form>
        </div>
    );
};

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; dir?: 'ltr' | 'rtl', required?: boolean }> =
    ({ label, name, value, onChange, type = 'text', dir = 'rtl', required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-light mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <input id={name} name={name} type={type} value={value} dir={dir} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-lg" required={required} />
    </div>
);


const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleUpdateUser = (id: number, role: UserRole, status: UserStatus, password?: string) => {
        setUsers(users.map(u => u.id === id ? { ...u, role, status } : u));
        if (password) {
            alert(`رمز عبور کاربر با شناسه ${id} با موفقیت تغییر کرد.`);
        }
    };

    const handleDeleteUser = (id: number) => {
        if (window.confirm(`آیا از حذف کاربر اطمینان دارید؟ این عمل قابل بازگشت نیست.`)) {
            setUsers(users.filter(u => u.id !== id));
        }
    };
    
    const handleCreateUser = (newUser: Omit<User, 'id' | 'avatar' | 'registrationDate' | 'commentCount'>) => {
        const userToAdd: User = {
            id: Math.max(0, ...users.map(u => u.id)) + 1,
            ...newUser,
            avatar: `https://picsum.photos/seed/${Math.random()}/40/40`,
            registrationDate: new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
            commentCount: 0,
        };
        setUsers([userToAdd, ...users]);
        setIsAddModalOpen(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} onUpdate={handleUpdateUser} />}
            {isAddModalOpen && <AddUserModal onClose={() => setIsAddModalOpen(false)} onCreate={handleCreateUser} />}
            <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-text-main">مدیریت کاربران</h2>
                  <p className="text-sm text-text-light mt-1">کاربران سایت خود را مشاهده و مدیریت کنید.</p>
                </div>
                <button onClick={() => setIsAddModalOpen(true)} className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  افزودن کاربر
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-3 font-semibold">کاربر</th>
                            <th className="p-3 font-semibold">اطلاعات تماس</th>
                            <th className="p-3 font-semibold">تاریخ ثبت‌نام</th>
                            <th className="p-3 font-semibold text-center">دیدگاه‌ها</th>
                            <th className="p-3 font-semibold text-center">نقش</th>
                            <th className="p-3 font-semibold text-center">وضعیت</th>
                            <th className="p-3 font-semibold text-center">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedUser(user)}>
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="w-10 h-10 rounded-full object-cover"/>
                                        <span className="font-semibold text-text-main">{`${user.firstName} ${user.lastName}`}</span>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="font-medium text-text-light">{user.email}</div>
                                    <div className="text-xs text-gray-500" dir="ltr">{user.mobile}</div>
                                </td>
                                <td className="p-3 text-text-light">{user.registrationDate}</td>
                                <td className="p-3 text-center font-medium text-text-light">{new Intl.NumberFormat('fa-IR').format(user.commentCount)}</td>
                                <td className="p-3 text-center"><RoleBadge role={user.role} /></td>
                                <td className="p-3 text-center"><StatusBadge status={user.status} /></td>
                                <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => setSelectedUser(user)} className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors" title="ویرایش">
                                            <PencilIcon className="w-5 h-5"/>
                                        </button>
                                        <button onClick={() => handleDeleteUser(user.id)} className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors" title="حذف">
                                            <TrashIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {users.length === 0 && <div className="text-center py-10 text-gray-500">هیچ کاربری یافت نشد.</div>}
        </div>
    );
};

export default UsersPage;