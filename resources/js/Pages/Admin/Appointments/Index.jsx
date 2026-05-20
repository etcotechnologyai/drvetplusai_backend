import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ appointments }) {
    return (
        <AdminLayout activePage="appointments">
            <Head title="المواعيد والحجوزات - Dr. VET PLUS" />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">المواعيد والحجوزات 📅</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">جدولة وإدارة مواعيد الزيارات العيادية والكشوفات المنزلية.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-10 text-center max-w-3xl mx-auto shadow-sm">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-4xl mb-4 text-slate-400">
                    📅
                </div>
                <h3 className="text-lg font-extrabold text-slate-800">إدارة جداول الحجوزات والزيارات</h3>
                <p className="text-slate-500 text-sm mt-2.5 leading-relaxed font-medium">
                    هذا القسم سيوفر قريباً شاشات تتبع المواعيد المجدولة حضورياً للعيادات والزيارات المنزلية للأطباء البيطريين لضمان عدم تعارض المواعيد وسرعة استجابة الأطباء.
                </p>
                <div className="mt-6 inline-block bg-amber-50 text-amber-800 px-4 py-2 rounded-2xl text-xs font-bold border border-amber-100">
                    ⚙️ الميزة قيد التطوير بالتوازي مع إطلاق تطبيق العيادات والمنشآت البيطرية.
                </div>
            </div>
        </AdminLayout>
    );
}
