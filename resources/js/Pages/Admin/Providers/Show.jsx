import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ provider, flash }) {

    const handleApprove = () => {
        if (confirm('هل أنت متأكد من اعتماد مقدم الخدمة هذا وتفعيل حسابه؟')) {
            router.post(`/admin/providers/${provider.id}/approve`);
        }
    };

    const handleReject = () => {
        if (confirm('هل أنت متأكد من رفض هذا الطلب وإرسال تنبيه للمقدم؟')) {
            router.post(`/admin/providers/${provider.id}/reject`);
        }
    };

    // Find commercial register license
    const commercialLicense = provider.licenses.find(l => l.type === 'commercial');
    // Find medical license
    const medicalLicense = provider.licenses.find(l => l.type === 'medical');

    return (
        <AdminLayout activePage="providers">
            <Head title={`تدقيق طلب: ${provider.full_name} - Dr. VET PLUS`} />

            {/* Top Bar with back link & state status */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link
                    href="/admin/providers"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m7 7l-7-7 7-7" />
                    </svg>
                    <span>الرجوع لطلبات التسجيل</span>
                </Link>
                
                <div>
                    {provider.status === 0 && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-250 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                            <span>بانتظار المراجعة والتدقيق</span>
                        </span>
                    )}
                    {provider.status === 1 && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-250 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>الطلب معتمد ونشط</span>
                        </span>
                    )}
                    {(provider.status === 2 || provider.status === 3) && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-250 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>تم رفض الطلب</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Flash success messages */}
            {flash?.success && (
                <div className="mb-8 p-4.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{flash.success}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Right 2 cols: Main details */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Authorized Person Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                        <h3 className="text-base font-extrabold text-slate-800 border-r-4 border-emerald-500 pr-3 mb-6">
                            بيانات المفوض الرسمي بالتوقيع
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">اسم المفوض الكامل</span>
                                <span className="text-sm font-extrabold text-slate-800 mt-1 block">{provider.full_name}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">البريد الإلكتروني للاتصال</span>
                                <span className="text-sm font-bold text-slate-800 mt-1 block font-mono">{provider.email}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">رقم الجوال الشخصي</span>
                                <span className="text-sm font-bold text-slate-800 mt-1 block font-mono text-right" dir="ltr">{provider.phone}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">تاريخ التسجيل المبدئي</span>
                                <span className="text-sm font-medium text-slate-600 mt-1 block">{provider.created_at}</span>
                            </div>
                        </div>
                    </div>

                    {/* Entity Details Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                        <h3 className="text-base font-extrabold text-slate-800 border-r-4 border-emerald-500 pr-3 mb-6">
                            بيانات الكيان / المنشأة البيطرية
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">اسم المنشأة التجاري</span>
                                <span className="text-sm font-extrabold text-slate-800 mt-1 block">{provider.entity_name}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">المدينة / الفرع الرئيسي</span>
                                <span className="text-sm font-bold text-slate-800 mt-1 block">{provider.city || 'غير محدد'}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">نوع التسجيل الطبي</span>
                                <span className="text-sm font-extrabold text-slate-850 mt-1 block">
                                    {provider.type === 'clinic' ? 'عيادة / مستشفى بيطري متكامل' : 'طبيب بيطري مستقل (عيادة متنقلة)'}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">رقم السجل التجاري</span>
                                <span className="text-sm font-bold text-slate-800 mt-1 block font-mono">{provider.registration_number || 'غير محدد'}</span>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-6" />

                        {/* Allowed platform services */}
                        <div className="mb-8">
                            <span className="text-slate-450 text-xs font-bold block mb-3.5">الخدمات الطبية المطلوب تقديمها بالمنصة:</span>
                            <div className="flex flex-wrap gap-3">
                                <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                                    provider.services.medical
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-slate-50 text-slate-400 border-transparent opacity-60'
                                }`}>
                                    <span>🩺</span>
                                    <span>عيادة واستشارات بيطرية</span>
                                </div>
                                <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                                    provider.services.pharmacy
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-slate-50 text-slate-400 border-transparent opacity-60'
                                }`}>
                                    <span>💊</span>
                                    <span>صيدلية بيطرية</span>
                                </div>
                                <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                                    provider.services.laboratory
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-slate-50 text-slate-400 border-transparent opacity-60'
                                }`}>
                                    <span>🔬</span>
                                    <span>مختبر تحاليل بيطرية</span>
                                </div>
                            </div>
                        </div>

                        {/* Commercial License file */}
                        {commercialLicense && (
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <span className="text-slate-800 text-xs sm:text-sm font-extrabold block">مستند السجل التجاري المرفق</span>
                                    <span className="text-slate-400 text-[10px] mt-1 block font-mono">رقم السجل: {commercialLicense.number}</span>
                                </div>
                                {commercialLicense.file_url ? (
                                    <a
                                        href={commercialLicense.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors self-stretch sm:self-auto text-center shadow-sm shadow-emerald-600/10 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>تحميل الملف</span>
                                    </a>
                                ) : (
                                    <span className="text-amber-700 text-[10px] font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">لم يرفع أي مستند</span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Medical License details if applicable */}
                    {provider.services.medical && (
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                            <h3 className="text-base font-extrabold text-slate-800 border-r-4 border-emerald-500 pr-3 mb-6">
                                بيانات الترخيص الطبي المعتمد للممارسة
                            </h3>
                            
                            {medicalLicense ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">رقم الترخيص الطبي</span>
                                            <span className="text-sm font-bold text-slate-800 mt-1 block font-mono">{medicalLicense.number}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">تاريخ إصدار الترخيص</span>
                                            <span className="text-sm font-medium text-slate-700 mt-1 block">{medicalLicense.issued_at || 'غير محدد'}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">تاريخ انتهاء الترخيص</span>
                                            <span className="text-sm font-medium text-slate-700 mt-1 block">{medicalLicense.expires_at || 'غير محدد'}</span>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <span className="text-emerald-950 text-xs sm:text-sm font-extrabold block">شهادة ترخيص المنشأة الطبية</span>
                                            <span className="text-emerald-700 text-[10px] mt-1 block">صادرة عن وزارة البيئة والمياه والزراعة</span>
                                        </div>
                                        {medicalLicense.file_url ? (
                                            <a
                                                href={medicalLicense.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors self-stretch sm:self-auto text-center shadow-sm shadow-emerald-600/10 flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                <span>عرض شهادة الترخيص</span>
                                            </a>
                                        ) : (
                                            <span className="text-amber-700 text-[10px] font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">لم ترفع الشهادة بعد</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4.5 bg-amber-50 border border-amber-250 text-amber-900 rounded-2xl text-xs font-semibold leading-relaxed">
                                    ⚠️ <strong>ملاحظة للمدقق:</strong> العميل يطلب تفعيل الخدمات الطبية، ولكن لم يتم العثور على أي ترخيص طبي بيطري موثق مرفق بالطلب. يرجى التدقيق قبل الاعتماد.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Left 1 col: Audit action card */}
                <div className="space-y-8">
                    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-555/10 rounded-full blur-2xl pointer-events-none"></div>
                        <h4 className="text-base font-extrabold mb-2 relative z-10">إجراءات مراجعة طلب التسجيل</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-6 relative z-10">
                            بصفتك مراجع إداري، يمكنك اتخاذ قرار الاعتماد الفوري لنظام مقدم الخدمة والمنشآت بعد تدقيق المستندات المرفوعة أعلاه وصلاحية تواريخ الانتهاء للتراخيص الطبية والتجارية.
                        </p>
                        
                        {provider.status === 0 ? (
                            <div className="space-y-3 relative z-10">
                                <button
                                    onClick={handleApprove}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
                                >
                                    <span>✓ اعتماد الحساب وتنشيطه</span>
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-red-650/10 flex items-center justify-center gap-2"
                                >
                                    <span>✗ رفض الطلب مع التنبيه</span>
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 text-center text-xs font-bold text-slate-350 relative z-10">
                                {provider.status === 1 ? (
                                    <span className="text-emerald-450 block">✓ تم تنشيط هذا الحساب وهو متاح للعمل والولوج.</span>
                                ) : (
                                    <span className="text-red-400 block">✗ تم رفض هذا الطلب أو حظره.</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
