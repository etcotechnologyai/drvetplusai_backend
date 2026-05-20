import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ owners }) {
    return (
        <AdminLayout activePage="pet-owners">
            <Head title="أصحاب الحيوانات الأليفة - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">أصحاب الحيوانات الأليفة 👥</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">إدارة ومراقبة حسابات العملاء ومربي الحيوانات المسجلين بالتطبيق.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/40">
                    <span className="text-xs font-bold text-slate-500">إجمالي المشتركين: {owners.length} مربي</span>
                </div>

                {owners.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-4 text-slate-400">
                            👥
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800">لا يوجد أصحاب حيوانات مسجلين</h4>
                        <p className="text-slate-400 text-sm mt-1.5 font-medium">تظهر الحسابات هنا فور إتمامهم عملية التسجيل الفوري عبر تطبيق الموبايل.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-4 px-6">الاسم الكامل</th>
                                    <th className="py-4 px-6">البريد الإلكتروني</th>
                                    <th className="py-4 px-6">رقم الجوال</th>
                                    <th className="py-4 px-6">تاريخ الانضمام</th>
                                    <th className="py-4 px-6 text-center">حالة الحساب</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {owners.map((o) => (
                                    <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4.5 px-6 font-extrabold text-slate-800">{o.full_name}</td>
                                        <td className="py-4.5 px-6 font-mono text-slate-600">{o.email}</td>
                                        <td className="py-4.5 px-6 font-mono text-slate-600" dir="ltr">{o.phone}</td>
                                        <td className="py-4.5 px-6 text-slate-400">{o.created_at}</td>
                                        <td className="py-4.5 px-6 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                                o.status === 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${o.status === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                <span>{o.status === 1 ? 'نشط' : 'معلق'}</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="mt-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-100/60 text-xs sm:text-sm text-emerald-900 leading-relaxed font-semibold">
                💡 تمكّن هذه الصفحة الإدارة من فحص المحافظ المالية لكل مربي وتاريخ عمليات الدفع الإلكتروني للاشتراكات.
            </div>
        </AdminLayout>
    );
}
