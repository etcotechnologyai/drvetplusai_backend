import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ plans }) {
    return (
        <AdminLayout activePage="plans">
            <Head title="الباقات والاشتراكات - Dr. VET PLUS" />

            <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">الباقات والاشتراكات 🏷️</h2>
                    <p className="text-slate-500 text-sm mt-1.5 font-medium">عرض وإدارة باقات الاستشارات البيطرية المدفوعة مسبقاً وتفاصيل تسعيرها.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.length === 0 ? (
                    <div className="md:col-span-3 bg-white rounded-3xl border border-slate-100 p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-4 text-slate-400">
                            🏷️
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800">لا توجد باقات اشتراك مضافة</h4>
                        <p className="text-slate-400 text-sm mt-1.5 font-medium">ابدأ بإضافة باقات استشارات جديدة لتسعير خدمات المنصة.</p>
                    </div>
                ) : (
                    plans.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between p-7 hover:shadow-md transition-shadow relative">
                            <div>
                                <div className="flex justify-between items-start mb-5">
                                    <span className="text-xs bg-emerald-50 text-emerald-800 font-extrabold px-3 py-1.5 rounded-xl border border-emerald-100">باقة استشارات</span>
                                    <span className="text-xl font-extrabold text-slate-900">{plan.price} ر.س</span>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-800 mb-2.5">{plan.name}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">{plan.description || 'لا يوجد وصف تفصيلي لهذه الباقة.'}</p>
                                
                                <ul className="space-y-3 mb-8 text-xs text-slate-600 font-semibold">
                                    <li className="flex items-center gap-2">
                                        <span className="text-emerald-500 text-sm">✓</span>
                                        <span>عدد الاستشارات المتاحة: <strong>{plan.consultations_count}</strong></span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-emerald-500 text-sm">✓</span>
                                        <span>مدة صلاحية الرصيد: <strong>{plan.validity_days}</strong> يوم</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition-colors">
                                    تعديل
                                </button>
                                <button className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-650 font-bold rounded-xl text-xs transition-colors">
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}
