import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/ziggy.js'
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            'ziggy-js': path.resolve("vendor/tightenco/ziggy"),
        }
    },
    ssr: {
        noExternal: [""]
    }
});
