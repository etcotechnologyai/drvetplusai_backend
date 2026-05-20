import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ payments }) {
    return (
        <AdminLayout activePage="payments">
            <Head title="المدفوعات والمحافظ - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">المدفوعات والعمليات المالية 💳</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">مراقبة الفواتير الصادرة، اشتراكات الباقات، ومستحقات الموفرين المالية بالمنصة.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/40">
                    <span className="text-xs font-bold text-slate-500">إجمالي الحركات المالية: {payments.length} عمليات</span>
                </div>

                {payments.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-4 text-slate-400">
                            💳
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800">لا توجد حركات مالية مسجلة</h4>
                        <p className="text-slate-400 text-sm mt-1.5 font-medium">ستظهر هنا تفاصيل الفواتير والمدفوعات فور إجرائها إلكترونياً من العملاء.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-4 px-6">رقم المعاملة</th>
                                    <th className="py-4 px-6">المبلغ الإجمالي</th>
                                    <th className="py-4 px-6">وسيلة الدفع</th>
                                    <th className="py-4 px-6">رقم المرجع (Reference)</th>
                                    <th className="py-4 px-6">الحالة</th>
                                    <th className="py-4 px-6 text-center">تاريخ المعاملة</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {payments.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4.5 px-6 font-mono font-bold text-slate-800">#TXN-{p.id}</td>
                                        <td className="py-4.5 px-6 font-extrabold text-slate-800">{p.amount} ر.س</td>
                                        <td className="py-4.5 px-6 font-semibold text-slate-600">{p.method || 'بطاقة ائتمان'}</td>
                                        <td className="py-4.5 px-6 font-mono text-slate-500 text-xs">{p.reference || 'غير محدد'}</td>
                                        <td className="py-4.5 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                                p.status === 'paid' || p.status === 'success'
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-amber-50 text-amber-700'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'paid' || p.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                <span>{p.status === 'paid' || p.status === 'success' ? 'مدفوع' : 'معلق / فشل'}</span>
                                            </span>
                                        </td>
                                        <td className="py-4.5 px-6 text-xs text-slate-400 text-center">{p.created_at || 'غير محدد'}</td>
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
