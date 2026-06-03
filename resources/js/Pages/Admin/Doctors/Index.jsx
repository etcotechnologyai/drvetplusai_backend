import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ doctors }) {
    return (
        <AdminLayout activePage="doctors">
            <Head title="الأطباء البيطريون - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">الأطباء البيطريون المستقلون 🩺</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">عرض وإدارة الحسابات الطبية البيطرية المصرح لها بتقديم الاستشارات على المنصة.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                

                {doctors.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-4 text-slate-400">
                            🩺
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800">لا يوجد أطباء مستقلون مسجلون حالياً</h4>
                        <p className="text-slate-400 text-sm mt-1.5 font-medium">يتم إدراج الأطباء وتنشيطهم تلقائياً بعد التحقق من ترخيص ممارسة المهنة.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-4 px-6">اسم الطبيب</th>
                                    <th className="py-4 px-6">البريد الإلكتروني</th>
                                    <th className="py-4 px-6">رقم الجوال</th>
                                    <th className="py-4 px-6">المدينة</th>
                                    <th className="py-4 px-6">تاريخ الانضمام</th>
                                    <th className="py-4 px-6 text-center">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {doctors.map((d) => (
                                    <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4.5 px-6 font-extrabold text-slate-800">{d.full_name}</td>
                                        <td className="py-4.5 px-6 font-mono text-slate-600">{d.email}</td>
                                        <td className="py-4.5 px-6 font-mono text-slate-600" dir="ltr">{d.phone}</td>
                                        <td className="py-4.5 px-6 font-semibold text-slate-600">{d.city || 'غير محدد'}</td>
                                        <td className="py-4.5 px-6 text-xs text-slate-400">{d.created_at || 'غير محدد'}</td>
                                        <td className="py-4.5 px-6 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                                d.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${d.is_active ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                <span>{d.is_active ? 'نشط' : 'معلق'}</span>
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
                💡 سيتم تفعيل شاشات تعديل أوقات وساعات الدوام للعيادات والأطباء البيطريين للتأكد من مواعيد الاستشارات وجودة الاتصال بالإنترنت.
            </div>
        </AdminLayout>
    );
}
