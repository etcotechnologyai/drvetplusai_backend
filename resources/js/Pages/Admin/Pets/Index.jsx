import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ pets }) {
    return (
        <AdminLayout activePage="pets">
            <Head title="سجلات الحيوانات الأليفة - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">الحيوانات الأليفة المسجلة 🐾</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">متابعة سجلات الحيوانات الأليفة وتواريخها المرضية والفصائل المضافة بالمنصة.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/40">
                    <span className="text-xs font-bold text-slate-500">إجمالي الحيوانات: {pets.length} أليف</span>
                </div>

                {pets.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-4 text-slate-400">
                            🐾
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800">لا توجد حيوانات أليفة مسجلة</h4>
                        <p className="text-slate-400 text-sm mt-1.5 font-medium">سيتم ربط الحيوانات الأليفة بالدفاتر الصحية الرقمية وسجلات اللقاحات قريباً.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-55 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-4 px-6">اسم الحيوان</th>
                                    <th className="py-4 px-6">الفصيلة / النوع</th>
                                    <th className="py-4 px-6">العمر (بالسنوات)</th>
                                    <th className="py-4 px-6">المالك / المربي</th>
                                    <th className="py-4 px-6">تاريخ الإضافة</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pets.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4.5 px-6 font-extrabold text-slate-800">🐾 {p.name}</td>
                                        <td className="py-4.5 px-6 font-semibold text-slate-655">{p.breed || 'غير محدد'}</td>
                                        <td className="py-4.5 px-6 font-mono text-slate-600">{p.age || 'غير محدد'}</td>
                                        <td className="py-4.5 px-6">
                                            <div className="font-bold text-slate-700">{p.owner_name}</div>
                                            <div className="text-slate-400 text-xs mt-0.5 font-mono">{p.owner_email}</div>
                                        </td>
                                        <td className="py-4.5 px-6 text-xs text-slate-400">{p.created_at || 'غير محدد'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="mt-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-100/60 text-xs sm:text-sm text-emerald-900 leading-relaxed font-semibold">
                💡 تساعد سجلات الحيوانات الأليفة الأطباء البيطريين على الوصول السريع للتاريخ المرضي والحساسيات لتقديم تشخيص طبي دقيق.
            </div>
        </AdminLayout>
    );
}
