<!DOCTYPE html>
<html class="light scroll-smooth scroll-pt-16" lang="id">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    
    <link rel="icon" href="{{ asset('images/logo.png') }}" type="image/png">
    
    <!-- Fonts & Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;700&family=Jetbrains+Mono:wght@400;500;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

    <!-- Scripts & Styles -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body class="bg-background text-on-background">
    @inertia
</body>
</html>
