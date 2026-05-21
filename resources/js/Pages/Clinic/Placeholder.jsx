import React from 'react';
import { Head } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function Placeholder({ title, icon = '🛠️', description = 'هذه الصفحة قيد التطوير وسيتم تفعيلها قريباً.' }) {
    return (
        <ClinicLayout activePage={title === 'المواعيد' ? 'appointments' : title === 'الاستشارات' ? 'consultations' : 'settings'}>
            <Head title={title} />
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
                <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
                    {icon}
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{title}</h2>
                <p className="text-slate-500 max-w-md mx-auto font-medium text-lg">
                    {description}
                </p>
                <div className="mt-10">
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                        قريباً في المرحلة القادمة
                    </span>
                </div>
            </div>
        </ClinicLayout>
    );
}
