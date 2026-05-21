import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ provider, flash }) {
    
    // Modal states for rejection
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [modalError, setModalError] = useState('');

    const handleApprove = () => {
        if (confirm('هل أنت متأكد من اعتماد مقدم الخدمة هذا وتنشيط حسابه؟')) {
            router.post(`/admin/providers/${provider.id}/approve`);
        }
    };

    const handleSuspend = () => {
        if (confirm('هل أنت متأكد من تعليق حساب مقدم الخدمة هذا؟')) {
            router.post(`/admin/providers/${provider.id}/suspend`);
        }
    };

    const openRejectModal = () => {
        setShowRejectModal(true);
    };

    const submitReject = () => {
        if (!rejectionReason.trim()) {
            setModalError('يجب كتابة سبب الرفض لتتمكن من المتابعة.');
            return;
        }
        if (rejectionReason.trim().length < 3) {
            setModalError('يجب أن يحتوي سبب الرفض على 3 أحرف على الأقل.');
            return;
        }
        router.post(`/admin/providers/${provider.id}/reject`, {
            rejection_reason: rejectionReason
        }, {
            onSuccess: () => {
                setShowRejectModal(false);
                setRejectionReason('');
                setModalError('');
            }
        });
    };

    // Find commercial register license
    const commercialLicense = provider.licenses.find(l => l.type === 'commercial');
    // Find medical license
    const medicalLicense = provider.licenses.find(l => l.type === 'medical');

    const getFileType = (url) => {
        if (!url) return null;
        const cleanUrl = url.split('?')[0].split('#')[0];
        const ext = cleanUrl.substring(cleanUrl.lastIndexOf('.') + 1).toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
            return 'image';
        }
        if (ext === 'pdf') {
            return 'pdf';
        }
        return 'other';
    };

    const renderFilePreview = (fileUrl) => {
        if (!fileUrl) return null;
        const type = getFileType(fileUrl);
        if (type === 'image') {
            return (
                <div className="mt-4 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 p-2.5 max-w-xl shadow-inner">
                    <p className="text-[10px] text-slate-400 font-bold mb-2 pr-2">معاينة الصورة المرفقة:</p>
                    <img src={fileUrl} alt="معاينة المستند" className="max-h-80 w-auto rounded-lg mx-auto object-contain" />
                </div>
            );
        }
        if (type === 'pdf') {
            return (
                <div className="mt-4 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 p-2 shadow-inner">
                    <p className="text-[10px] text-slate-400 font-bold mb-2 pr-2">معاينة ملف PDF المرفق:</p>
                    <iframe src={fileUrl} title="معاينة PDF" className="w-full h-[400px] rounded-lg border border-slate-200" />
                </div>
            );
        }
        return null;
    };

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
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            <span>بانتظار المراجعة والتدقيق</span>
                        </span>
                    )}
                    {provider.status === 1 && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>الطلب معتمد ونشط</span>
                        </span>
                    )}
                    {provider.status === 2 && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>مرفوض</span>
                        </span>
                    )}
                    {provider.status === 3 && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-300 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                            <span>الحساب موقوف</span>
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
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
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
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
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
                                <span className="text-sm font-extrabold text-slate-800 mt-1 block">
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
                                    provider.services?.medical
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-slate-50 text-slate-400 border-transparent opacity-60'
                                }`}>
                                    <span>🩺</span>
                                    <span>عيادة واستشارات بيطرية</span>
                                </div>
                                <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                                    provider.services?.pharmacy
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : 'bg-slate-50 text-slate-400 border-transparent opacity-60'
                                }`}>
                                    <span>💊</span>
                                    <span>صيدلية بيطرية</span>
                                </div>
                                <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                                    provider.services?.laboratory
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
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <span className="text-slate-800 text-xs sm:text-sm font-extrabold block">مستند السجل التجاري المرفق</span>
                                        <span className="text-slate-400 text-[10px] mt-1 block font-mono">رقم السجل: {commercialLicense.number}</span>
                                    </div>
                                    {commercialLicense.file_url ? (
                                        <a
                                            href={commercialLicense.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors self-stretch sm:self-auto text-center shadow-xs flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            <span>تحميل الملف ورابط مباشر</span>
                                        </a>
                                    ) : (
                                        <span className="text-amber-700 text-[10px] font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">لم يرفع أي مستند</span>
                                    )}
                                </div>
                                {commercialLicense.file_url && renderFilePreview(commercialLicense.file_url)}
                            </div>
                        )}
                    </div>

                    {/* Medical License details if applicable */}
                    {provider.services?.medical && (
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
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
                                            <span className="text-sm font-medium text-slate-700 mt-1 block">{medicalLicense.issued_at || 'غير حدد'}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">تاريخ انتهاء الترخيص</span>
                                            <span className="text-sm font-medium text-slate-700 mt-1 block">{medicalLicense.expires_at || 'غير محدد'}</span>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-100 flex flex-col gap-4">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <span className="text-emerald-950 text-xs sm:text-sm font-extrabold block">شهادة ترخيص المنشأة الطبية</span>
                                                <span className="text-emerald-700 text-[10px] mt-1 block">صادرة عن وزارة البيئة والمياه والزراعة</span>
                                            </div>
                                            {medicalLicense.file_url ? (
                                                <a
                                                    href={medicalLicense.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors self-stretch sm:self-auto text-center shadow-xs flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    <span>عرض وتحميل شهادة الترخيص</span>
                                                </a>
                                            ) : (
                                                <span className="text-amber-700 text-[10px] font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">لم ترفع الشهادة بعد</span>
                                            )}
                                        </div>
                                        {medicalLicense.file_url && renderFilePreview(medicalLicense.file_url)}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs font-semibold leading-relaxed">
                                    ⚠️ <strong>ملاحظة للمدقق:</strong> العميل يطلب تفعيل الخدمات الطبية، ولكن لم يتم العثور على أي ترخيص طبي بيطري موثق مرفق بالطلب. يرجى التدقيق قبل الاعتماد.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Left 1 col: Audit action card */}
                <div className="space-y-8">
                    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                        <h4 className="text-base font-extrabold mb-2 relative z-10">إجراءات مراجعة طلب التسجيل</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-6 relative z-10">
                            بصفتك مراجع إداري، يمكنك اتخاذ قرار الاعتماد الفوري لنظام مقدم الخدمة والمنشآت بعد تدقيق المستندات المرفوعة وصلاحية التراخيص الطبية والتجارية.
                        </p>
                        
                        {provider.status === 0 && (
                            <div className="space-y-3 relative z-10">
                                <button
                                    onClick={handleApprove}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
                                >
                                    <span>✓ اعتماد الحساب وتنشيطه</span>
                                </button>
                                <button
                                    onClick={openRejectModal}
                                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-rose-650/10 flex items-center justify-center gap-2"
                                >
                                    <span>✗ رفض الطلب مع التنبيه</span>
                                </button>
                            </div>
                        )}

                        {provider.status === 1 && (
                            <div className="space-y-4 relative z-10">
                                <div className="bg-emerald-950/80 border border-emerald-800 rounded-2xl p-4.5 text-right">
                                    <span className="text-xs font-bold text-emerald-450 block">✓ الكيان معتمد ونشط</span>
                                    {provider.approved_at && (
                                        <span className="text-[10px] text-slate-400 block mt-1">تاريخ الاعتماد: {provider.approved_at}</span>
                                    )}
                                </div>
                                <button
                                    onClick={handleSuspend}
                                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-amber-550/10 flex items-center justify-center gap-2"
                                >
                                    <span>⏸ تعليق حساب مقدم الخدمة</span>
                                </button>
                            </div>
                        )}

                        {provider.status === 2 && (
                            <div className="space-y-4 relative z-10">
                                <div className="bg-rose-950/80 border border-rose-800 rounded-2xl p-4.5 text-right">
                                    <span className="text-xs font-bold text-rose-400 block">✗ تم رفض هذا الطلب</span>
                                    {provider.rejection_reason && (
                                        <span className="text-[11px] text-slate-350 block mt-2 font-medium leading-relaxed bg-black/10 p-2.5 rounded-xl">
                                            <strong>سبب الرفض:</strong> {provider.rejection_reason}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={handleApprove}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
                                >
                                    <span>✓ إعادة النظر واعتماد الطلب</span>
                                </button>
                            </div>
                        )}

                        {provider.status === 3 && (
                            <div className="space-y-4 relative z-10">
                                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4.5 text-right text-xs font-bold text-slate-300">
                                    <span>⏸ حساب مقدم الخدمة موقوف/معلق مؤقتاً</span>
                                </div>
                                <button
                                    onClick={handleApprove}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
                                >
                                    <span>✓ إعادة تفعيل وتنشيط الحساب</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Rejection Reason Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6.5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                        <h3 className="text-base font-extrabold text-slate-800 mb-2">سبب رفض الطلب</h3>
                        <p className="text-xs text-slate-400 mb-4.5 leading-relaxed">
                            يرجى كتابة سبب رفض طلب انضمام مقدم الخدمة بوضوح. سيتم تخزينه في سجلات النظام لتمكين الإدارة من توضيح سبب الرفض لمقدم الخدمة.
                        </p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => {
                                setRejectionReason(e.target.value);
                                if (e.target.value.trim().length >= 3) setModalError('');
                            }}
                            placeholder="مثال: المستندات المرفقة أو التراخيص الطبية منتهية الصلاحية، أو صورة السجل التجاري غير واضحة..."
                            rows={4}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-2xl p-4.5 text-xs outline-none text-slate-700 placeholder-slate-400 resize-none transition-all"
                        />
                        {modalError && <p className="text-rose-500 text-[10px] font-bold mt-1.5">{modalError}</p>}
                        
                        <div className="mt-6 flex justify-end gap-2.5">
                            <button
                                onClick={() => {
                                    setShowRejectModal(false);
                                    setRejectionReason('');
                                    setModalError('');
                                }}
                                className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={submitReject}
                                className="px-4.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-rose-600/10"
                            >
                                تأكيد الرفض
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
