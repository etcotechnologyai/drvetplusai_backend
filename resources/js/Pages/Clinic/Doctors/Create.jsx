import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function CreateDoctor({ company, branches }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        license_number: '',
        branch_id: '',
        status: 'active'
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('clinic.doctors.store'));
    };

    return (
        <ClinicLayout activePage="doctors">
            <Head title="إضافة طبيب جديد" />
            <div className="max-w-3xl mx-auto py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">إضافة طبيب جديد</h1>
                    <Link href="/clinic/doctors" className="text-sky-600 font-bold hover:underline">العودة للأطباء</Link>
                </div>

                <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">الاسم *</label>
                            <input type="text" className="w-full border-slate-200 rounded-xl" value={data.name} onChange={e => setData('name', e.target.value)} required />
                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">البريد الإلكتروني *</label>
                            <input type="email" className="w-full border-slate-200 rounded-xl" value={data.email} onChange={e => setData('email', e.target.value)} required />
                            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">الجوال *</label>
                            <input type="text" className="w-full border-slate-200 rounded-xl" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">التخصص *</label>
                            <select className="w-full border-slate-200 rounded-xl" value={data.specialty} onChange={e => setData('specialty', e.target.value)} required>
                                <option value="">--- اختر التخصص ---</option>
                                <option value="طب وجراحة الحيوانات الأليفة">طب وجراحة الحيوانات الأليفة</option>
                                <option value="طب الطوارئ والعناية الحرجة">طب الطوارئ والعناية الحرجة</option>
                                <option value="الأمراض الجلدية البيطرية">الأمراض الجلدية البيطرية</option>
                                <option value="طب الأسنان البيطري">طب الأسنان البيطري</option>
                                <option value="طب العيون البيطري">طب العيون البيطري</option>
                                <option value="الجراحة البيطرية">الجراحة البيطرية</option>
                                <option value="الطب الباطني البيطري">الطب الباطني البيطري</option>
                                <option value="الأشعة والتصوير البيطري">الأشعة والتصوير البيطري</option>
                                <option value="المختبرات والتشخيص">المختبرات والتشخيص</option>
                                <option value="الطب الوقائي والتطعيمات">الطب الوقائي والتطعيمات</option>
                                <option value="رعاية الطيور">رعاية الطيور</option>
                                <option value="رعاية القطط">رعاية القطط</option>
                                <option value="رعاية الكلاب">رعاية الكلاب</option>
                                <option value="الحيوانات الغريبة والزواحف">الحيوانات الغريبة والزواحف</option>
                                <option value="التغذية البيطرية">التغذية البيطرية</option>
                                <option value="السلوك الحيواني">السلوك الحيواني</option>
                                <option value="الطب البيطري العام">الطب البيطري العام</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">رقم الترخيص *</label>
                            <input type="text" className="w-full border-slate-200 rounded-xl" value={data.license_number} onChange={e => setData('license_number', e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">الفرع التابع له *</label>
                            <select className="w-full border-slate-200 rounded-xl" value={data.branch_id} onChange={e => setData('branch_id', e.target.value)} required>
                                <option value="">--- اختر الفرع ---</option>
                                {branches && branches.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                            {errors.branch_id && <div className="text-red-500 text-xs mt-1">{errors.branch_id}</div>}
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
                            حفظ الطبيب
                        </button>
                    </div>
                </form>
            </div>
        </ClinicLayout>
    );
}
