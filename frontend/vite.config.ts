import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: 9000,
        hmr: {
            clientPort: 80,
        },
        proxy: {
            '/api': {
                target: 'http://backend_contabilidade:3000',
                changeOrigin: true,
            },
        },
    }
});
