import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ProviderPendingApproval() {
    return (
        <>
            <Head title="بانتظار الاعتماد - Dr. VET PLUS" />

            <div className="min-h-screen bg-[#f4fbf7] text-slate-800 font-sans flex flex-col justify-between" dir="rtl">
                {/* Simple Header */}
                <header className="bg-white border-b border-[#e1efe6] py-4 px-6 sm:px-12 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-lg font-bold">
                            🐾
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-l from-emerald-800 to-emerald-600 bg-clip-text text-transparent">Dr. VET PLUS</span>
                    </div>
                    <div>
                        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors">الرئيسية</Link>
                    </div>
                </header>

                {/* Main Card */}
                <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white max-w-md w-full rounded-2xl border border-[#e1efe6] shadow-md p-8 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-6 text-emerald-600 text-3xl">
                            ✓
                        </div>

                        <h2 className="text-2xl font-bold text-emerald-950">
                            تم استلام طلب التسجيل بنجاح
                        </h2>
                        
                        <p className="mt-4 text-sm sm:text-base text-slate-655 leading-relaxed">
                            شكراً لانضمام منشأتكم إلينا. طلبكم حالياً قيد المراجعة والاعتماد من قبل الإدارة وسنتواصل معكم قريباً.
                        </p>
                        
                        <p className="mt-2 text-xs sm:text-sm text-slate-500">
                            سيتم إرسال إشعار تفعيل الحساب على البريد الإلكتروني والجوال المدخلين.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/"
                                className="w-full inline-flex justify-center rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                            >
                                العودة للرئيسية
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Simple Footer */}
                <footer className="bg-white border-t border-[#e1efe6] py-6 text-center text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Dr. VET PLUS. جميع الحقوق محفوظة.</p>
                </footer>
            </div>
        </>
    );
}
