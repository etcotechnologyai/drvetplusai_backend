import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ header, children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex" dir="rtl">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-l border-gray-200 hidden md:flex md:flex-col shadow-sm">
                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                    <Link href="/" className="text-2xl font-bold text-primary-600">
                        Dr Vet <span className="text-sm font-normal text-gray-500">SaaS</span>
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                    <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-primary-50 text-primary-700"
                    >
                        لوحة التحكم
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <nav className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center md:hidden">
                                <Link href="/" className="text-xl font-bold text-primary-600">Dr Vet</Link>
                            </div>
                            <div className="flex items-center gap-4 mr-auto">
                                <span className="text-sm text-gray-700">{auth?.user?.name}</span>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    تسجيل الخروج
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
