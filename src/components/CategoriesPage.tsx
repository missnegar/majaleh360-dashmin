import React, { useState, useMemo } from 'react';
import { mockCategories } from '../src/data/mockData.ts';
import { Category } from '../src/types.ts';
import { PencilIcon, TrashIcon, CornerDownLeftIcon } from './Icons.tsx';

// Utility to generate URL-friendly slugs
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

const initialFormState: Partial<Category> = {
  name: '',
  slug: '',
  parentId: null,
  description: '',
};

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [formData, setFormData] = useState<Partial<Category>>(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setFormData(prev => ({ ...prev, name: value, slug: generateSlug(value) }));
    } else if (name === 'parentId') {
      setFormData(prev => ({ ...prev, parentId: value === 'null' ? null : Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      alert('نام و نام لاتین دسته نمی‌توانند خالی باشند.');
      return;
    }

    if (editingId) {
      // Update existing category
      setCategories(categories.map(cat => cat.id === editingId ? { ...cat, ...formData } as Category : cat));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        name: formData.name,
        slug: formData.slug,
        parentId: formData.parentId || null,
        description: formData.description || '',
        postCount: 0,
      };
      setCategories([...categories, newCategory]);
    }

    // Reset form
    setEditingId(null);
    setFormData(initialFormState);
  };
  
  const handleEdit = (category: Category) => {
      setEditingId(category.id);
      setFormData({
          name: category.name,
          slug: category.slug,
          parentId: category.parentId,
          description: category.description,
      });
  };

  const handleDelete = (categoryId: number) => {
      if (window.confirm('آیا از حذف این دسته اطمینان دارید؟')) {
          // Re-parent children before deleting the category
          const updatedCategories = categories
              .map(c => c.parentId === categoryId ? { ...c, parentId: null } : c)
              .filter(c => c.id !== categoryId);
          setCategories(updatedCategories);
      }
  };

  const cancelEdit = () => {
      setEditingId(null);
      setFormData(initialFormState);
  }

  const CategoryRow = ({ category, level }: { category: Category, level: number }) => (
    <tr className="hover:bg-gray-50">
      <td className="p-3">
        <div className="flex items-center" style={{ paddingRight: `${level * 20}px` }}>
          {level > 0 && <CornerDownLeftIcon className="w-4 h-4 text-gray-400 ms-2"/>}
          <div className="flex flex-col">
            <span className="font-semibold text-text-main">{category.name}</span>
            <span className="text-xs text-gray-500">{category.slug}</span>
          </div>
        </div>
      </td>
      <td className="p-3 text-center text-text-light">{new Intl.NumberFormat('fa-IR').format(category.postCount)}</td>
      <td className="p-3 text-center">
        <div className="flex justify-center items-center gap-3">
            <button onClick={() => handleEdit(category)} className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100">
                <PencilIcon className="w-4 h-4"/>
            </button>
            <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100">
                <TrashIcon className="w-4 h-4"/>
            </button>
        </div>
      </td>
    </tr>
  );

  const renderCategoryTree = (parentId: number | null, level: number): JSX.Element[] => {
    return categories
      .filter(c => c.parentId === parentId)
      .sort((a,b) => a.name.localeCompare(b.name, 'fa'))
      .flatMap(cat => [
        <CategoryRow key={cat.id} category={cat} level={level} />,
        ...renderCategoryTree(cat.id, level + 1)
      ]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Categories List */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
         <h2 className="text-xl font-bold text-text-main mb-4">لیست دسته‌بندی‌ها</h2>
         <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3 font-semibold text-right">نام دسته</th>
                  <th className="p-3 font-semibold text-center w-24">تعداد مطالب</th>
                  <th className="p-3 font-semibold text-center w-28">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {renderCategoryTree(null, 0)}
              </tbody>
            </table>
         </div>
      </div>

      {/* Add/Edit Category Form */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-text-main mb-4">
            {editingId ? 'ویرایش دسته' : 'افزودن دسته جدید'}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-light mb-1">نام دسته</label>
              <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-text-light mb-1">نام لاتین (Slug)</label>
              <input type="text" id="slug" name="slug" value={formData.slug || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg text-left" dir="ltr" required />
              <p className="text-xs text-gray-500 mt-1">این نسخه مناسب URL از نام است.</p>
            </div>
            <div>
              <label htmlFor="parentId" className="block text-sm font-medium text-text-light mb-1">دسته مادر</label>
              <select id="parentId" name="parentId" value={formData.parentId === null ? 'null' : formData.parentId} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                <option value="null">بدون والد</option>
                {categories.filter(c => c.id !== editingId).map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-light mb-1">توضیحات</label>
              <textarea id="description" name="description" value={formData.description || ''} onChange={handleInputChange} rows={4} className="w-full p-2 border border-gray-300 rounded-lg resize-y"></textarea>
              <p className="text-xs text-gray-500 mt-1">این توضیحات برای سئو مهم است.</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="flex-1 px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                {editingId ? 'ذخیره تغییرات' : 'افزودن دسته'}
              </button>
              {editingId && (
                  <button type="button" onClick={cancelEdit} className="px-5 py-2 bg-gray-200 text-text-main rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                      لغو
                  </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;