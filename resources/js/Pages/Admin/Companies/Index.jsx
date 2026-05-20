import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ companies }) {
    return (
        <AdminLayout activePage="companies">
            <Head title="العيادات والمنشآت البيطرية - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">العيادات والمنشآت البيطرية 🏢</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">عرض وإدارة جميع المستشفيات والعيادات والصيدليات البيطرية المعتمدة بالمنصة.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/40 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">إجمالي المنشآت: {companies.length}</span>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm">
                        + إضافة منشأة يدوياً
                    </button>
                </div>

                {companies.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-4 text-slate-400">
                            🏢
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800">لا توجد منشآت مسجلة حالياً</h4>
                        <p className="text-slate-400 text-sm mt-1.5 font-medium">سيتم إدراج المنشآت تلقائياً بعد موافقة الإدارة على طلب مقدم الخدمة.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-4 px-6">المنشأة</th>
                                    <th className="py-4 px-6">رقم السجل التجاري</th>
                                    <th className="py-4 px-6">المدينة</th>
                                    <th className="py-4 px-6">مالك الحساب</th>
                                    <th className="py-4 px-6">تاريخ الإضافة</th>
                                    <th className="py-4 px-6 text-center">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {companies.map((c) => (
                                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4.5 px-6 font-extrabold text-slate-800">{c.name}</td>
                                        <td className="py-4.5 px-6 font-mono text-slate-600">{c.registration_number || 'غير محدد'}</td>
                                        <td className="py-4.5 px-6 font-semibold text-slate-600">{c.city}</td>
                                        <td className="py-4.5 px-6">
                                            <div className="font-bold text-slate-700">{c.owner_name}</div>
                                            <div className="text-slate-400 text-xs mt-0.5 font-mono">{c.owner_email}</div>
                                        </td>
                                        <td className="py-4.5 px-6 text-xs text-slate-400">{c.created_at || 'غير محدد'}</td>
                                        <td className="py-4.5 px-6 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                                c.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${c.is_active ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                <span>{c.is_active ? 'نشط' : 'معلق'}</span>
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
                💡 تتوفر إدارة التعديل وحذف المنشآت بالتكامل مع لوحة المشرفين بعد اعتماد أوراق الفروع والمواقع الجغرافية لزيادة دقة البحث.
            </div>
        </AdminLayout>
    );
}
