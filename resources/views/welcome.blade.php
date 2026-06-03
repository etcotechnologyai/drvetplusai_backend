<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <title>دكتور فيت بلس | Dr Vet Plus - قريباً</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="https://cdn.tailwindcss.com"></script>

    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Cairo', sans-serif;
        }

        .medical-gradient {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }
    </style>
</head>

<body class="min-h-screen flex items-center justify-center medical-gradient text-zinc-800 p-4">

    <div
        class="relative max-w-2xl w-full text-center p-8 md:p-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white">

     
        <div class="flex items-center justify-center">
            <img src="{{ URL::asset('build/images/logo-light.png') }}"
                class="card-logo card-logo-light"
                alt="logo light"
                height="22">
        </div>

 
        <div class="mt-10">
            <h1 class="text-4xl md:text-5xl font-black text-emerald-900 tracking-tight">
                دكتور فيت بلس
            </h1>
        </div>

      
        <p class="mt-6 text-lg text-zinc-600 font-medium leading-relaxed">
            منصة رقمية للاستشارات البيطرية عن بُعد، تربط بين ملاك الحيوانات
            والأطباء البيطريين والعيادات والصيدليات البيطرية في مكان واحد.
        </p>

    
        <div class="mt-10">
            <div
                class="p-8 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-inner transition-all duration-300">

                <div class="text-4xl mb-4">
                    💬
                </div>

                <h3 class="font-bold text-emerald-900 text-xl mb-2">
                    خدمات الاستشارات البيطرية
                </h3>

                <p class="text-sm text-emerald-700 leading-relaxed max-w-md mx-auto">
                    استشارات نصية وصوتية ومرئية لجميع أنواع الحيوانات،
                    مع إمكانية رفع الصور والفيديو واستلام التشخيص
                    والوصفة البيطرية إلكترونياً.
                </p>

                <div class="mt-6 flex justify-center gap-6 opacity-80">
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-bold text-emerald-800">فيديو</span>
                    </div>

                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-bold text-emerald-800">صوت</span>
                    </div>

                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-bold text-emerald-800">دردشة</span>
                    </div>
                </div>
            </div>
        </div>

      
        <div class="mt-10 flex justify-center">
            <a href="{{ route('company.register.create') }}"
                class="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">

                تسجيل منشأتك

                <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">

                    <path stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
            </a>
        </div>

    
        <div
            class="mt-12 pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">

            <div class="text-[10px] text-zinc-400 font-bold uppercase">
                © {{ date('Y') }} DR VET PLUS | منصة للاستشارات البيطرية الرقمية
            </div>
        </div>

    </div>

</body>

</html>