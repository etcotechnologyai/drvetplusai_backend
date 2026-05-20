import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ consultations }) {
    return (
        <AdminLayout activePage="consultations">
            <Head title="الاستشارات البيطرية - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">الاستشارات البيطرية 💬</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">متابعة ورقابة الاستشارات الفورية والدردشات الطبية القائمة بالمنصة.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/40">
                    <span className="text-xs font-bold text-slate-500">إجمالي الاستشارات: {consultations.length}</span>
                </div>

                {consultations.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-4 text-slate-400">
                            💬
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800">لا توجد استشارات مسجلة</h4>
                        <p className="text-slate-400 text-sm mt-1.5 font-medium">تظهر تفاصيل الاستشارات الطبية وحالتها (جارية، مكتملة) فور بدئها.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-4 px-6">رقم الاستشارة</th>
                                    <th className="py-4 px-6">صاحب الأليف / المربي</th>
                                    <th className="py-4 px-6">الحيوان الأليف</th>
                                    <th className="py-4 px-6">الحالة</th>
                                    <th className="py-4 px-6">وقت البدء</th>
                                    <th className="py-4 px-6 text-center">تاريخ الحجز</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {consultations.map((c) => (
                                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4.5 px-6 font-mono font-bold text-slate-800">#CS-{c.id}</td>
                                        <td className="py-4.5 px-6 text-slate-700 font-bold">{c.owner_name}</td>
                                        <td className="py-4.5 px-6 font-semibold text-slate-600">🐾 {c.pet_name}</td>
                                        <td className="py-4.5 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                                c.status === 'completed'
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : c.status === 'active'
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'bg-amber-50 text-amber-700'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    c.status === 'completed' ? 'bg-emerald-500' : c.status === 'active' ? 'bg-blue-550 animate-pulse' : 'bg-amber-500'
                                                }`}></span>
                                                <span>
                                                    {c.status === 'completed' ? 'مكتملة' : c.status === 'active' ? 'نشطة' : 'معلقة'}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="py-4.5 px-6 font-mono text-slate-500 text-xs">{c.started_at || 'غير محدد'}</td>
                                        <td className="py-4.5 px-6 text-xs text-slate-400">{c.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
