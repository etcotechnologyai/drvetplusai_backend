import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ settings }) {
    return (
        <AdminLayout activePage="settings">
            <Head title="إعدادات المنصة - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">إعدادات المنصة ⚙️</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">تهيئة قيم المنظومة، عمولات الكشوفات، وأسعار الاستشارات الطبية الافتراضية.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm max-w-3xl">
                <h3 className="text-base font-extrabold text-slate-800 border-r-4 border-emerald-500 pr-3 mb-6">
                    العمولات وأرباح خادم المنصة
                </h3>

                <form className="space-y-6 text-xs sm:text-sm" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">عمولة المنصة من الاستشارة (%)</label>
                            <input
                                type="number"
                                defaultValue={settings.platform_commission || 15}
                                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                            />
                        </div>
                        <div>
                            <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">الحد الأدنى لرسوم الطبيب البيطري المستقل (ر.س)</label>
                            <input
                                type="number"
                                defaultValue={settings.min_consultation_fee || 50}
                                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                            />
                        </div>
                        <div>
                            <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">ضريبة القيمة المضافة (%)</label>
                            <input
                                type="number"
                                defaultValue={settings.vat_rate || 15}
                                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                            />
                        </div>
                        <div>
                            <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">الحد الأدنى لطلب السحب المالي (ر.س)</label>
                            <input
                                type="number"
                                defaultValue={settings.min_withdrawal_limit || 100}
                                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button type="submit" className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-white font-extrabold rounded-2xl text-xs transition-colors shadow-md">
                            حفظ التعديلات الحالية
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
