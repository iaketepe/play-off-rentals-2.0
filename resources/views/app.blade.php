<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Play Off Rentals, the place for all your arcade needs and dreams.">

        <title>Play-Off Rentals 2</title>    

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @viteReactRefresh
            @vite(['resources/css/Root.css', 'resources/js/Root.jsx'])
        @endif
    </head>
    <body class="bg-[#FDFDFC] min-h-screen h-screen">
        <div 
            class="text-white w-full min-w-xs h-full" 
            id="react-root" 
            data-page="{{ $page ?? 'home' }}"
            >
        </div>
    </body>
</html>
