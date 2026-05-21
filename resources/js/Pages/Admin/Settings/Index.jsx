import React, { useRef } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ settings }) {
    const getSettingValue = (key, def) => {
        const s = settings.find(x => x.key === key);
        return s ? s.value : def;
    };

    const { data: textData, setData: setTextData, post: postText, processing: textProcessing } = useForm({
        platform_name: getSettingValue('platform_name', 'Dr. VET PLUS'),
        platform_logo_url: '', // optional
        platform_commission: getSettingValue('platform_commission', '15'),
        min_consultation_fee: getSettingValue('min_consultation_fee', '50'),
        vat_rate: getSettingValue('vat_rate', '15'),
        min_withdrawal_limit: getSettingValue('min_withdrawal_limit', '100'),
    });

    const { data: logoData, setData: setLogoData, post: postLogo, processing: logoProcessing } = useForm({
        logo: null,
    });

    const fileInputRef = useRef(null);

    const handleTextSubmit = (e) => {
        e.preventDefault();
        postText('/admin/settings', { preserveScroll: true });
    };

    const handleLogoSubmit = (e) => {
        e.preventDefault();
        postLogo('/admin/settings/logo', {
            preserveScroll: true,
            onSuccess: () => {
                if (fileInputRef.current) fileInputRef.current.value = '';
                setLogoData('logo', null);
            }
        });
    };

    return (
        <AdminLayout activePage="settings">
            <Head title={`إعدادات المنصة - ${getSettingValue('platform_name', 'Dr. VET PLUS')}`} />

            <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">إعدادات المنصة ⚙️</h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">تهيئة قيم المنظومة وهوية المنصة بالإضافة إلى العمولات.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-3xl">
                {/* Platform Identity Section */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                    <h3 className="text-base font-extrabold text-slate-800 border-r-4 border-blue-500 pr-3 mb-6">
                        هوية المنصة
                    </h3>

                    <form className="space-y-6 text-xs sm:text-sm mb-8" onSubmit={handleTextSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">اسم المنصة</label>
                                <input
                                    type="text"
                                    value={textData.platform_name}
                                    onChange={e => setTextData('platform_name', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">رابط خارجي للشعار (اختياري، يطغى على الملف)</label>
                                <input
                                    type="url"
                                    value={textData.platform_logo_url}
                                    onChange={e => setTextData('platform_logo_url', e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button type="submit" disabled={textProcessing} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs transition-colors shadow-sm disabled:opacity-50">
                                حفظ الهوية
                            </button>
                        </div>
                    </form>

                    <div className="pt-8 border-t border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800 mb-4">صورة الشعار الحالية (رفع ملف)</h4>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            {getSettingValue('platform_logo', null) ? (
                                <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-sm shrink-0 overflow-hidden">
                                    <img src={getSettingValue('platform_logo', null)} alt="Logo" className="max-w-full max-h-full object-contain" />
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shadow-sm shrink-0 text-3xl">🐾</div>
                            )}

                            <form onSubmit={handleLogoSubmit} className="flex-1 space-y-4 w-full">
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={e => setLogoData('logo', e.target.files[0])}
                                        accept=".png,.jpg,.jpeg,.svg,.webp"
                                        className="block w-full text-sm text-slate-500 file:ml-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                    />
                                    {logoData.logo && (
                                        <p className="mt-2 text-xs text-slate-500">تم اختيار صورتك، اضغط رفع للحفظ.</p>
                                    )}
                                </div>
                                <button type="submit" disabled={logoProcessing || !logoData.logo} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-sm">
                                    رفع الشعار
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Finance Settings Section */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                    <h3 className="text-base font-extrabold text-slate-800 border-r-4 border-emerald-500 pr-3 mb-6">
                        العمولات وأرباح المتجر
                    </h3>

                    <form className="space-y-6 text-xs sm:text-sm" onSubmit={handleTextSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">عمولة المنصة من الاستشارة (%)</label>
                                <input
                                    type="number"
                                    value={textData.platform_commission}
                                    onChange={e => setTextData('platform_commission', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">الحد الأدنى لرسوم المعاينة (ر.س)</label>
                                <input
                                    type="number"
                                    value={textData.min_consultation_fee}
                                    onChange={e => setTextData('min_consultation_fee', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">الضريبة المضافة (%)</label>
                                <input
                                    type="number"
                                    value={textData.vat_rate}
                                    onChange={e => setTextData('vat_rate', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">حد السحب (ر.س)</label>
                                <input
                                    type="number"
                                    value={textData.min_withdrawal_limit}
                                    onChange={e => setTextData('min_withdrawal_limit', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition-all outline-none text-slate-800"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-end">
                            <button type="submit" disabled={textProcessing} className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-white font-extrabold rounded-2xl text-xs transition-colors shadow-md disabled:opacity-50">
                                حفظ إعدادات العمولات
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
