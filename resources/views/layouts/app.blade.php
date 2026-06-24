<!DOCTYPE html>
<html class="light scroll-smooth scroll-pt-16" lang="id" style="">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Praktisi UNMUL - @yield('title', 'Praktikum Sistem Informasi')</title>
    <link rel="icon" href="{{ asset('images/logo.png') }}" type="image/png">
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;700&family=Jetbrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <script id="tailwind-config">
        tailwind.config = {darkMode: "class", theme: {extend: {colors: {primary: "#455d97", secondary: "#bc000a", error: "#ba1a1a", background: "#f9f9f9", "on-background": "#1a1c1c", surface: "#f9f9f9", "outline-variant": "#c4c7c8", "on-surface-variant": "#444748", "secondary-container": "#e51c1a", "on-secondary-container": "#fffbff", "primary-container": "#ffffff", "on-primary-container": "#5d74b0", "tertiary-container": "#ffffff", "on-primary-fixed-variant": "#2d457d", "surface-container-highest": "#e2e2e2", "error-container": "#ffdad6", "tertiary-fixed-dim": "#7ed7c2", "on-error": "#ffffff", "secondary-fixed": "#ffdad5", "surface-container-lowest": "#ffffff", "surface-tint": "#455d97", "on-tertiary-fixed-variant": "#005144", "on-primary-fixed": "#001847", "secondary-fixed-dim": "#ffb4aa", "surface-variant": "#e2e2e2", "on-primary": "#ffffff", "primary-fixed": "#dae2ff", "surface-bright": "#f9f9f9", "on-secondary-fixed": "#410001", "surface-container-high": "#e8e8e8", "on-tertiary": "#ffffff", "on-error-container": "#93000a", "surface-dim": "#dadada", "primary-fixed-dim": "#b1c5ff", "inverse-surface": "#2f3131", "on-tertiary-fixed": "#00201a", "inverse-primary": "#b1c5ff", "surface-container-low": "#f3f3f4", "tertiary-fixed": "#9af3de", tertiary: "#006b5b", "on-tertiary-container": "#238472", outline: "#747878", "on-surface": "#1a1c1c", "surface-container": "#eeeeee", "on-secondary": "#ffffff", "on-secondary-fixed-variant": "#930006", "inverse-on-surface": "#f0f1f1"}, borderRadius: {DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem"}}}}
    </script>
</head>
<body class="bg-background text-on-background">

    @include('layouts.partials.navbar')

    <main class="mt-16 mb-0 flex-grow">
        @yield('content')
    </main>

    @include('layouts.partials.footer')

    <script>
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('shadow-md');
            } else {
                nav.classList.remove('shadow-md');
            }
        });
    </script>
</body>
</html>