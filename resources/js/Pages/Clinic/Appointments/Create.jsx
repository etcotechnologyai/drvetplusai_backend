import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function CreateAppointment({ company, branches, doctors }) {
    const { data, setData, post, processing, errors } = useForm({
        client_name: '',
        client_phone: '',
        pet_name: '',
        branch_id: '',
        doctor_id: '',
        date: '',
        time: '',
        type: 'regular',
        status: 'scheduled'
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('clinic.appointments.store'));
    };

    return (
        <ClinicLayout activePage="appointments">
            <Head title="إضافة موعد جديد" />
            <div className="max-w-3xl mx-auto py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">حجز موعد جديد</h1>
                    <Link href="/clinic/appointments" className="text-sky-600 font-bold hover:underline">العودة للمواعيد</Link>
                </div>

                <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">اسم العميل *</label>
                            <input type="text" className="w-full border-slate-200 rounded-xl" value={data.client_name} onChange={e => setData('client_name', e.target.value)} required />
                            {errors.client_name && <div className="text-red-500 text-xs mt-1">{errors.client_name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">رقم جوال العميل *</label>
                            <input type="text" className="w-full border-slate-200 rounded-xl" value={data.client_phone} onChange={e => setData('client_phone', e.target.value)} required />
                            {errors.client_phone && <div className="text-red-500 text-xs mt-1">{errors.client_phone}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">اسم الحيوان أو المعرف</label>
                        <input type="text" className="w-full border-slate-200 rounded-xl" value={data.pet_name} onChange={e => setData('pet_name', e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">الفرع *</label>
                            <select className="w-full border-slate-200 rounded-xl" value={data.branch_id} onChange={e => setData('branch_id', e.target.value)} required>
                                <option value="">--- اختر الفرع ---</option>
                                {branches && branches.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                            {errors.branch_id && <div className="text-red-500 text-xs mt-1">{errors.branch_id}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">الطبيب المعالج *</label>
                            <select className="w-full border-slate-200 rounded-xl" value={data.doctor_id} onChange={e => setData('doctor_id', e.target.value)} required>
                                <option value="">--- اختر الطبيب ---</option>
                                {doctors && doctors.map(d => (
                                    <option key={d.assignment_id} value={d.assignment_id}>{d.name}</option>
                                ))}
                            </select>
                            {errors.doctor_id && <div className="text-red-500 text-xs mt-1">{errors.doctor_id}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">تاريخ الموعد *</label>
                            <input type="date" className="w-full border-slate-200 rounded-xl" value={data.date} onChange={e => setData('date', e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">الوقت *</label>
                            <input type="time" className="w-full border-slate-200 rounded-xl" value={data.time} onChange={e => setData('time', e.target.value)} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">نوع الموعد</label>
                            <select className="w-full border-slate-200 rounded-xl" value={data.type} onChange={e => setData('type', e.target.value)}>
                                <option value="regular">كشف عام</option>
                                <option value="followup">مراجعة</option>
                                <option value="vaccination">تطعيم</option>
                                <option value="surgery">عملية</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">الحالة</label>
                            <select className="w-full border-slate-200 rounded-xl" value={data.status} onChange={e => setData('status', e.target.value)}>
                                <option value="scheduled">مجدول (قادم)</option>
                                <option value="completed">مكتمل</option>
                                <option value="cancelled">ملغي</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button type="submit" disabled={processing} className="bg-sky-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-sky-700">
                            تأكيد الموعد
                        </button>
                    </div>
                </form>
            </div>
        </ClinicLayout>
    );
}
