import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

const regionsAndCities = {
    "الرياض": ["الرياض", "الخرج", "الدرعية", "المجمعة", "الدوادمي", "وادي الدواسر", "الزلفي", "شقراء"],
    "مكة المكرمة": ["مكة المكرمة", "جدة", "الطائف", "رابغ", "القنفذة", "الليث", "خليص"],
    "المدينة المنورة": ["المدينة المنورة", "ينبع", "العلا", "مهد الذهب", "بدر"],
    "القصيم": ["بريدة", "عنيزة", "الرس", "البكيرية", "المذنب"],
    "الشرقية": ["الدمام", "الخبر", "الظهران", "الأحساء", "الجبيل", "القطيف", "الخفجي", "حفر الباطن"],
    "عسير": ["أبها", "خميس مشيط", "أحد رفيدة", "بيشة", "محايل عسير"],
    "تبوك": ["تبوك", "الوجه", "ضباء", "تيماء", "أملج"],
    "حائل": ["حائل", "بقعاء", "الشنان"],
    "الحدود الشمالية": ["عرعر", "رفحاء", "طريف"],
    "جازان": ["جازان", "صبيا", "أبو عريش", "صامطة"],
    "نجران": ["نجران", "شرورة"],
    "الباحة": ["الباحة", "بلجرشي", "المندق"],
    "الجوف": ["سكاكا", "القريات", "دومة الجندل"]
};

export default function ProviderRegister() {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [cities, setCities] = useState([]);
    const [displayPhone, setDisplayPhone] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        provider_type: 'clinic',
        full_name: '',
        phone: '', // Stored as +9665xxxxxxxx
        email: '',
        password: '',
        password_confirmation: '',
        entity_type: 'clinic',
        clinic_name: '',
        trade_name: '',
        registration_number: '', // Maps to registration_number in Controller (Commercial Register)
        city: '', // Dynamically updated from selected city
        commercial_register_file: null,
        medical_services: false,
        pharmacy: false,
        laboratory: false,
        agreement: false,

        // Medical License Details (Only populated if medical_services is true)
        license_number: '', // Medical License Number
        license_issue_date: '',
        license_expiry_date: '',
        medical_license_file: null,
    });

    // Reset medical fields if medical services is unchecked
    useEffect(() => {
        if (!data.medical_services) {
            setData((prev) => ({
                ...prev,
                license_number: '',
                license_issue_date: '',
                license_expiry_date: '',
                medical_license_file: null
            }));
        }
    }, [data.medical_services]);

    // Clean and handle phone inputs in real-time
    const handlePhoneChange = (val) => {
        let cleaned = val.replace(/\D/g, '');

        if (cleaned.startsWith('00966')) {
            cleaned = cleaned.substring(5);
        } else if (cleaned.startsWith('966')) {
            cleaned = cleaned.substring(3);
        }

        if (cleaned.startsWith('0')) {
            cleaned = cleaned.substring(1);
        }

        cleaned = cleaned.substring(0, 9);

        setDisplayPhone(cleaned);
        setData('phone', cleaned ? `+966${cleaned}` : '');
    };

    // Handle Region Selection
    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);
        if (region && regionsAndCities[region]) {
            setCities(regionsAndCities[region]);
            const firstCity = regionsAndCities[region][0];
            setData('city', firstCity);
        } else {
            setCities([]);
            setData('city', '');
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/register/provider');
    };

    return (
        <>
            <Head title="تسجيل المنشآت البيطرية - Dr. VET PLUS" />

            <div className="min-h-screen bg-[#f4fbf7] text-slate-800 font-sans flex flex-col" dir="rtl">
                {/* Simple Header */}
                <header className="bg-white border-b border-[#e1efe6] py-4 px-6 sm:px-12 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-lg font-bold">
                            🐾
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-l from-emerald-800 to-emerald-600 bg-clip-text text-transparent">Dr. VET PLUS</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors">الرئيسية</Link>
                        <Link href="/login" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">تسجيل الدخول</Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl w-full text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
                            Dr. VET PLUS
                        </h1>
                        <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mt-2">
                            تسجيل المنشآت البيطرية
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
                            سجل منشأتك البيطرية الآن لتنضم إلى شبكة مزودي الخدمات الطبية البيطرية الأكبر وتصل إلى آلاف العملاء.
                        </p>
                    </div>

                    {/* White Card */}
                    <div className="bg-white max-w-3xl w-full rounded-2xl border border-[#e1efe6] shadow-md p-6 sm:p-10">
                        {errors.error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold">
                                {errors.error}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-10" encType="multipart/form-data">
                            
                            {/* Section 1: Authorized Person Info */}
                            <div>
                                <h3 className="text-lg font-bold text-emerald-900 border-r-4 border-emerald-600 pr-3 mb-6">
                                    1. بيانات المفوض
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">الاسم الكامل للمفوض <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            required
                                            placeholder="الاسم الثلاثي أو الرباعي"
                                            className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                        />
                                        {errors.full_name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.full_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">رقم الجوال <span className="text-red-500">*</span></label>
                                        <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 overflow-hidden flex items-center">
                                            <span className="bg-slate-100 text-slate-500 px-3 py-2.5 text-sm border-l border-slate-200 font-semibold" dir="ltr">
                                                +966
                                            </span>
                                            <input
                                                type="text"
                                                value={displayPhone}
                                                onChange={(e) => handlePhoneChange(e.target.value)}
                                                required
                                                placeholder="5xxxxxxxx"
                                                dir="ltr"
                                                className="w-full border-0 focus:ring-0 bg-transparent px-4 py-2.5 text-sm text-left font-semibold outline-none"
                                            />
                                        </div>
                                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">البريد الإلكتروني <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            placeholder="name@example.com"
                                            className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">كلمة المرور <span className="text-red-500">*</span></label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            placeholder="كلمة مرور الحساب"
                                            className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                        />
                                        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">تأكيد كلمة المرور <span className="text-red-500">*</span></label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                            placeholder="أعد إدخال كلمة المرور"
                                            className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                        />
                                        {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password_confirmation}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Entity Info */}
                            <div>
                                <h3 className="text-lg font-bold text-emerald-900 border-r-4 border-emerald-600 pr-3 mb-6">
                                    2. بيانات المنشأة
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">نوع المنشأة <span className="text-red-500">*</span></label>
                                        <select
                                            value={data.entity_type}
                                            onChange={(e) => setData('entity_type', e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-750"
                                        >
                                            <option value="clinic">عيادة بيطرية</option>
                                            <option value="hospital">مستشفى بيطري</option>
                                            <option value="pharmacy">صيدلية بيطرية</option>
                                            <option value="lab">مختبر</option>
                                            <option value="grooming">مركز رعاية/تجميل</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">اسم المنشأة <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.clinic_name}
                                            onChange={(e) => setData('clinic_name', e.target.value)}
                                            required
                                            placeholder="الاسم الرسمي للمنشأة"
                                            className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                        />
                                        {errors.clinic_name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.clinic_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">الاسم التجاري للمنشأة</label>
                                        <input
                                            type="text"
                                            value={data.trade_name}
                                            onChange={(e) => setData('trade_name', e.target.value)}
                                            placeholder="الاسم التجاري إن وجد"
                                            className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                        />
                                        {errors.trade_name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.trade_name}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">المنطقة <span className="text-red-500">*</span></label>
                                            <select
                                                value={selectedRegion}
                                                onChange={handleRegionChange}
                                                required
                                                className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                            >
                                                <option value="">اختر المنطقة</option>
                                                {Object.keys(regionsAndCities).map((region) => (
                                                    <option key={region} value={region}>{region}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">المدينة <span className="text-red-500">*</span></label>
                                            <select
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                required
                                                disabled={!selectedRegion}
                                                className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm disabled:opacity-60"
                                            >
                                                <option value="">اختر المدينة</option>
                                                {cities.map((city) => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">رقم السجل التجاري <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.registration_number}
                                            onChange={(e) => setData('registration_number', e.target.value)}
                                            required
                                            placeholder="أدخل رقم السجل التجاري"
                                            className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                        />
                                        {errors.registration_number && <p className="text-red-500 text-xs mt-1 font-medium">{errors.registration_number}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">ملف السجل التجاري (PDF/صورة) <span className="text-red-500">*</span></label>
                                        <input
                                            type="file"
                                            required
                                            onChange={(e) => setData('commercial_register_file', e.target.files[0])}
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            className="w-full file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 text-slate-550 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none"
                                        />
                                        {errors.commercial_register_file && <p className="text-red-500 text-xs mt-1 font-medium">{errors.commercial_register_file}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Services Provided */}
                            <div>
                                <h3 className="text-lg font-bold text-emerald-900 border-r-4 border-emerald-600 pr-3 mb-6">
                                    3. الخدمات المقدمة
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={data.medical_services}
                                            onChange={(e) => setData('medical_services', e.target.checked)}
                                            className="rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-350"
                                        />
                                        <span className="text-sm font-medium text-slate-800">خدمات طبية</span>
                                    </label>

                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={data.pharmacy}
                                            onChange={(e) => setData('pharmacy', e.target.checked)}
                                            className="rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-350"
                                        />
                                        <span className="text-sm font-medium text-slate-800">صيدلية</span>
                                    </label>

                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={data.laboratory}
                                            onChange={(e) => setData('laboratory', e.target.checked)}
                                            className="rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-350"
                                        />
                                        <span className="text-sm font-medium text-slate-800">مختبر</span>
                                    </label>
                                </div>
                            </div>

                            {/* Section 3.5: Medical License Fields (Only displayed if medical_services is selected) */}
                            {data.medical_services && (
                                <div className="transition-all duration-300 ease-in-out border border-[#e1efe6] bg-[#fdfefe] p-6 rounded-2xl">
                                    <h3 className="text-lg font-bold text-emerald-950 border-r-4 border-emerald-500 pr-3 mb-6">
                                        بيانات الترخيص الطبي
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">رقم الترخيص الطبي <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                value={data.license_number}
                                                onChange={(e) => setData('license_number', e.target.value)}
                                                required
                                                placeholder="أدخل رقم الترخيص الطبي"
                                                className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm"
                                            />
                                            {errors.license_number && <p className="text-red-500 text-xs mt-1 font-medium">{errors.license_number}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">ملف الترخيص الطبي (PDF/صورة) <span className="text-red-500">*</span></label>
                                            <input
                                                type="file"
                                                required
                                                onChange={(e) => setData('medical_license_file', e.target.files[0])}
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                className="w-full file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 text-slate-550 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none"
                                            />
                                            {errors.medical_license_file && <p className="text-red-500 text-xs mt-1 font-medium">{errors.medical_license_file}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">تاريخ الإصدار <span className="text-red-500">*</span></label>
                                            <input
                                                type="date"
                                                value={data.license_issue_date}
                                                onChange={(e) => setData('license_issue_date', e.target.value)}
                                                required
                                                className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-750"
                                            />
                                            {errors.license_issue_date && <p className="text-red-500 text-xs mt-1 font-medium">{errors.license_issue_date}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">تاريخ الانتهاء <span className="text-red-500">*</span></label>
                                            <input
                                                type="date"
                                                value={data.license_expiry_date}
                                                onChange={(e) => setData('license_expiry_date', e.target.value)}
                                                required
                                                className="w-full rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-750"
                                            />
                                            {errors.license_expiry_date && <p className="text-red-500 text-xs mt-1 font-medium">{errors.license_expiry_date}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section 4: Acknowledgment */}
                            <div className="pt-4 border-t border-slate-100">
                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.agreement}
                                        onChange={(e) => setData('agreement', e.target.checked)}
                                        required
                                        className="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-350"
                                    />
                                    <span className="text-xs sm:text-sm text-slate-655 leading-relaxed">
                                        أقر بصحة جميع البيانات المدخلة وأوافق على مراجعتها من قبل إدارة منصة Dr. VET PLUS والتحقق من صحة التراخيص المرفقة.
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 text-center text-base sm:text-lg"
                                >
                                    {processing ? 'جاري إرسال الطلب...' : 'تسجيل المنشأة'}
                                </button>
                            </div>

                        </form>
                    </div>
                </main>

                {/* Simple Footer */}
                <footer className="bg-white border-t border-[#e1efe6] py-6 text-center text-xs text-slate-500 mt-12">
                    <p>© {new Date().getFullYear()} Dr. VET PLUS. جميع الحقوق محفوظة.</p>
                </footer>
            </div>
        </>
    );
}
