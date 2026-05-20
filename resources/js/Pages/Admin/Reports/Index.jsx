import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index() {
    return (
        <AdminLayout activePage="reports">
            <Head title="التقارير الإحصائية - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">التقارير والتحليلات 📊</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">أداء النظام الإجمالي، الإيرادات المالية ومعدلات نمو الاشتراكات.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-10 text-center max-w-3xl mx-auto shadow-sm">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-4xl mb-4 text-slate-400">
                    📊
                </div>
                <h3 className="text-lg font-extrabold text-slate-800">التقارير التحليلية والذكاء الاصطناعي</h3>
                <p className="text-slate-500 text-sm mt-2.5 leading-relaxed font-medium">
                    هذا القسم سيوفر قريباً رسومات بيانية متقدمة وإحصائيات تفصيلية حول أداء الأطباء والعيادات، ونسب التقييمات، ومعدلات نجاح الاستشارات الطبية الفورية والمنزلية بالمنصة.
                </p>
                <div className="mt-6 inline-block bg-emerald-50 text-emerald-800 px-4 py-2 rounded-2xl text-xs font-bold border border-emerald-100">
                    🛡️ الميزة قيد التطوير وستتصل بنظام التحليلات المركزي قريباً.
                </div>
            </div>
        </AdminLayout>
    );
}
