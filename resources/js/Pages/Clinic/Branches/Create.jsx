import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function CreateBranch({ company }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        region: '',
        city: '',
        address: '',
        phone: '',
        services: [],
        status: 'active'
    });

    const handleServiceChange = (e) => {
        const value = e.target.value;
        const currentSelected = [...data.services];
        if (e.target.checked) {
            currentSelected.push(value);
        } else {
            const idx = currentSelected.indexOf(value);
            if (idx > -1) currentSelected.splice(idx, 1);
        }
        setData('services', currentSelected);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/clinic/branches');
    };

    return (
        <ClinicLayout activePage="branches">
            <Head title="إضافة فرع جديد" />
            <div className="max-w-3xl mx-auto py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">إضافة فرع جديد</h1>
                    <Link href="/clinic/branches" className="text-sky-600 font-bold hover:underline">العودة للفروع</Link>
                </div>

                <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">اسم الفرع *</label>
                        <input type="text" className="w-full border-slate-200 rounded-xl" value={data.name} onChange={e => setData('name', e.target.value)} required />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">المنطقة</label>
                            <input type="text" className="w-full border-slate-200 rounded-xl" value={data.region} onChange={e => setData('region', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">المدينة</label>
                            <input type="text" className="w-full border-slate-200 rounded-xl" value={data.city} onChange={e => setData('city', e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">العنوان</label>
                        <input type="text" className="w-full border-slate-200 rounded-xl" value={data.address} onChange={e => setData('address', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">رقم الجوال</label>
                        <input type="text" className="w-full border-slate-200 rounded-xl" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">الخدمات المتاحة</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" value="medical" onChange={handleServiceChange} /> خدمات طبية
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" value="pharmacy" onChange={handleServiceChange} /> صيدلية
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" value="lab" onChange={handleServiceChange} /> مختبر
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">الحالة</label>
                        <select className="w-full border-slate-200 rounded-xl" value={data.status} onChange={e => setData('status', e.target.value)}>
                            <option value="active">نشط</option>
                            <option value="inactive">غير نشط</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button type="submit" disabled={processing} className="bg-sky-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-sky-700">
                            حفظ الفرع
                        </button>
                    </div>
                </form>
            </div>
        </ClinicLayout>
    );
}
