<!DOCTYPE html>
<html class="light" lang="id" style="">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Praktisi UNMUL | Admin Login</title>
    
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script id="tailwind-config">
        tailwind.config = {darkMode: "class", theme: {extend: {colors: {primary: "#455d97", secondary: "#bc000a", error: "#ba1a1a", background: "#f9f9f9", "on-background": "#1a1c1c", surface: "#f9f9f9", "outline-variant": "#c4c7c8", "on-surface-variant": "#444748", "secondary-container": "#e51c1a", "on-secondary-container": "#fffbff", "primary-container": "#ffffff", "on-primary-container": "#5d74b0", "tertiary-container": "#ffffff", "on-primary-fixed-variant": "#2d457d", "surface-container-highest": "#e2e2e2", "error-container": "#ffdad6", "tertiary-fixed-dim": "#7ed7c2", "on-error": "#ffffff", "secondary-fixed": "#ffdad5", "surface-container-lowest": "#ffffff", "surface-tint": "#455d97", "on-tertiary-fixed-variant": "#005144", "on-primary-fixed": "#001847", "secondary-fixed-dim": "#ffb4aa", "surface-variant": "#e2e2e2", "on-primary": "#ffffff", "primary-fixed": "#dae2ff", "surface-bright": "#f9f9f9", "on-secondary-fixed": "#410001", "surface-container-high": "#e8e8e8", "on-tertiary": "#ffffff", "on-error-container": "#93000a", "surface-dim": "#dadada", "primary-fixed-dim": "#b1c5ff", "inverse-surface": "#2f3131", "on-tertiary-fixed": "#00201a", "inverse-primary": "#b1c5ff", "surface-container-low": "#f3f3f4", "tertiary-fixed": "#9af3de", tertiary: "#86DFCA", "on-tertiary-container": "#238472", outline: "#747878", "on-surface": "#1a1c1c", "surface-container": "#eeeeee", "on-secondary": "#ffffff", "on-secondary-fixed-variant": "#930006", "inverse-on-surface": "#f0f1f1"}, borderRadius: {DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem"}}}}
    </script>
</head>

<body class="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden">
    
    <div class="fixed inset-0 -z-10 pointer-events-none">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-[#86DFCA] rounded-full blur-[120px] -mr-40 -mt-40 opacity-20"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#455d97] rounded-full blur-[120px] -ml-40 -mb-40 opacity-20"></div>
    </div>

    <div class="w-full max-w-[1280px] px-6 py-8 flex flex-col items-center justify-center z-10">

        <div class="w-full max-w-[440px] bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-2xl shadow-gray-200/50">
            <div class="mb-8 text-center">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Selamat Datang</h2>
                <p class="text-gray-500 text-sm">Masukan kredensial Anda untuk masuk ke sistem manajemen.</p>
            </div>

            <form method="POST" action="/login" class="space-y-5">
                @csrf 
                
                <div class="flex flex-col gap-2">
                    <label class="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Username</label>
                    <div class="relative group">
                        <input name="username" value="{{ old('username') }}" class="w-full h-14 bg-white border @error('username') border-[#bc000a] @else border-gray-300 @enderror rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#86DFCA] focus:border-[#86DFCA] transition-all outline-none" placeholder="Username" required type="text" autocomplete="off">
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 @error('username') text-[#bc000a] @else text-gray-400 group-focus-within:text-[#86DFCA] @enderror">
                            <span class="material-symbols-outlined" style="font-size: 20px;">person</span> 
                        </div>
                    </div>
                    @error('username')
                        <span class="text-xs text-[#bc000a] pl-1 font-medium">{{ $message }}</span>
                    @enderror
                </div>

                <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center px-1">
                        <label class="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
                    </div>
                    <div class="relative group">
                        <input name="password" class="w-full h-14 bg-white border @error('password') border-[#bc000a] @else border-gray-300 @enderror rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#86DFCA] focus:border-[#86DFCA] transition-all outline-none" placeholder="••••••••••••" required type="password">
                        <button class="absolute right-4 top-1/2 -translate-y-1/2 @error('password') text-[#bc000a] @else text-gray-400 hover:text-gray-600 @enderror transition-colors" type="button" id="toggle-password">
                            <span class="material-symbols-outlined" style="font-size: 20px;">visibility</span>
                        </button>
                    </div>
                    @error('password')
                        <span class="text-xs text-[#bc000a] pl-1 font-medium">{{ $message }}</span>
                    @enderror
                </div>

                <button class="w-full h-14 bg-[#203971] hover:bg-[#152a55] text-white font-bold rounded-lg shadow-lg shadow-[#203971]/30 transition-all flex items-center justify-center gap-3 group mt-6" type="submit">
                    <span>MASUK</span>
                    <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform" style="font-size: 18px;">login</span>
                </button>
            </form>
            
            <div class="mt-8 pt-6 border-t border-gray-100 text-center">
                <a href="/" class="text-sm text-[#455d97] hover:text-[#bc000a] transition-colors font-medium flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-sm">arrow_back</span> Kembali ke Beranda
                </a>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.querySelector('form');
            const inputs = document.querySelectorAll('input');

            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('scale-[1.01]', 'transition-transform');
                });
                input.addEventListener('blur', () => {
                    input.parentElement.classList.remove('scale-[1.01]');
                });
            });

            const toggleBtn = document.getElementById('toggle-password');
            const passInput = document.querySelector('input[name="password"]');
            
            if(toggleBtn && passInput) {
                toggleBtn.addEventListener('click', () => {
                    const isPass = passInput.type === 'password';
                    passInput.type = isPass ? 'text' : 'password';
                    toggleBtn.querySelector('span').textContent = isPass ? 'visibility_off' : 'visibility';
                });
            }

            form.addEventListener('submit', () => {
                const btn = form.querySelector('button[type="submit"]');
                btn.classList.add('opacity-80', 'cursor-not-allowed');
                btn.innerHTML = `<span class="material-symbols-outlined animate-spin" style="font-size: 18px;">progress_activity</span> <span>VERIFYING...</span>`;
            });
        });
    </script>
</body>
</html>