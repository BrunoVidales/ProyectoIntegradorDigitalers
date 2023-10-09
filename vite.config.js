import { resolve } from 'node:path'

// console.log(resolve('pages'))

export default {
    server: {
        port: "2222",
    },
    css: {
        devSourcemap: true,
    },
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                carrito: resolve('pages/carrito.html'),
                contacto: resolve('pages/contacto.html'),
                nosotros: resolve('pages/nosotros.html'),
                consolas: resolve('pages/consolas.html'),
                index: resolve('index.html')
            },
            output: {
                // Cambiar la estructura de las rutas de salida
                manualChunks: {
                  // Cambiar la estructura de las rutas de salida
                    index: ['index.html'],
                    carrito: ['pages/carrito.html'],
                    contacto: ['pages/contacto.html'],
                    nosotros: ['pages/nosotros.html'],
                    consolas: ['pages/consolas.html'],
                },    
            },
        },
    },
};