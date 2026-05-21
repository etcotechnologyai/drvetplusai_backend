import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Register() {
    const { settings = {} } = usePage().props || {};

    // Guard: platform_name must be a plain string
    const pageTitle =
        typeof settings?.platform_name === 'string' && settings.platform_name.trim()
            ? settings.platform_name.trim()
            : 'Dr. VET PLUS';
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50" dir="rtl">
            <Head title={`تسجيل حساب جديد - ${pageTitle}`} />

            <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-xl">
                <div className="flex justify-center mb-6">
                    {settings?.platform_logo && (
                        <img src={settings.platform_logo} alt={settings?.platform_name || 'Dr. VET PLUS'} className="h-12 w-auto object-contain mb-4" />
                    )}
                </div>
                <div className="flex justify-center mb-6">
                    <h2 className="text-2xl font-bold text-primary-600">حساب جديد - {pageTitle}</h2>
                </div>

                <form onSubmit={submit}>
                    <div>
                        <label className="block text-sm font-medium text-[#1B1B18] dark:text-[#EDEDEC]">الاسم الكامل</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="block w-full appearance-none rounded-md border border-[#e3e3e0] dark:border-[#3E3E3A] bg-transparent px-3 py-2 text-sm text-[#1B1B18] dark:text-[#EDEDEC] placeholder-[#706f6c] focus:border-[#1b1b18] focus:outline-none focus:ring-[#1b1b18] dark:focus:border-[#eeeeec]"
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-[#1B1B18] dark:text-[#EDEDEC]">رقم الجوال</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="block w-full appearance-none rounded-md border border-[#e3e3e0] dark:border-[#3E3E3A] bg-transparent px-3 py-2 text-sm text-[#1B1B18] dark:text-[#EDEDEC] placeholder-[#706f6c] focus:border-[#1b1b18] focus:outline-none focus:ring-[#1b1b18] dark:focus:border-[#eeeeec]"
                                dir="ltr"
                            />
                            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700" htmlFor="email">
                            البريد الإلكتروني
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-md shadow-sm mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <div className="text-red-600 mt-2 text-sm">{errors.email}</div>}
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700" htmlFor="password">
                            كلمة المرور
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-md shadow-sm mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <div className="text-red-600 mt-2 text-sm">{errors.password}</div>}
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700" htmlFor="password_confirmation">
                            تأكيد كلمة المرور
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-md shadow-sm mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        {errors.password_confirmation && <div className="text-red-600 mt-2 text-sm">{errors.password_confirmation}</div>}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href="/login"
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            لديك حساب بالفعل؟
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            تسجيل
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
