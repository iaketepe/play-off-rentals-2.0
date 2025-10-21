import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ _, mode }) => ({
    plugins: [
        laravel({
            input: ['resources/css/Root.css', 'resources/js/Root.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    base: '/build/'
}));
