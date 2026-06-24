<!DOCTYPE html>
<html class="light" lang="id">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>@yield('title', 'Dashboard Admin') | PRAKTISI UNMUL</title>
    <link rel="icon" href="{{ asset('images/logo.png') }}" type="image/png">
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    
    <script id="tailwind-config">
        tailwind.config = {darkMode: "class", theme: {extend: {colors: {primary: "#203971", secondary: "#bc000a", "accent-red": "#F32923", background: "#f9f9f9", surface: "#f9f9f9", outline: "#E2E8F0", "on-surface": "#1a1c1c", "on-background": "#203971"}, borderRadius: {DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem"}, fontFamily: {headline: ["Hanken Grotesk", "sans-serif"], display: ["Hanken Grotesk", "sans-serif"], body: ["Hanken Grotesk", "sans-serif"], label: ["JetBrains Mono", "monospace"]}}}}
    </script>
    
    <style>
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        body { background-color: #FFFFFF; color: #203971; font-family: 'Hanken Grotesk', sans-serif; }
        .academic-card { background-color: #FFFFFF; border: 1px solid #E2E8F0; transition: all 0.3s ease; }
        .academic-card:hover { border-color: #203971; box-shadow: 0 4px 12px rgba(32, 57, 113, 0.05); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #FFFFFF; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    </style>
</head>
<body class="overflow-hidden bg-white">

    @include('layouts.partials.admin_sidebar')

    <main class="md:ml-64 h-[100dvh] pb-10 overflow-y-auto custom-scrollbar bg-[#f9f9f9] transition-all duration-300 w-full md:w-auto">
        
        @include('layouts.partials.admin_topbar')

        @yield('content')

    </main>

    <script>
        document.querySelectorAll('.academic-card').forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-2px)');
            card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        });
    </script>
</body>
</html>