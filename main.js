/* Librerías */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Archivos de proyectos */
import './css/style.css'

import { 
    calcularTotal,
        comprarProducto, 
        eliminarProducto, 
        eliminarProductoCompra, 
        leerLocalStorage, 
        leerLocalStorageCompra, 
        obtenerEvento, 
        procesarPedido, 
        vaciarCarrito
    } from './src/carrito';

const playstation = document.querySelector('#playstation');
const xbox = document.querySelector('#xbox');
const nintendo = document.querySelector('#nintendo');
const sega = document.querySelector('#sega');

const carrito = document.querySelector('#carrito');

const carritoCompra = document.querySelector('#lista-compra');




cargarEventos();
esConsolas();

function cargarEventos() {

    const ruta = String(location.href);

    if(!ruta.includes('carrito.html')) {
        
    } else {
        esCarrito();
    };
};

function esConsolas() {
        const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito');
        console.log(vaciarCarrito)
        const procesarPedidoBtn = carrito.querySelector('#procesar-pedido');

        // Se ejecuta cuando presiono el boton el comprar
        playstation.addEventListener('click', (e) => comprarProducto(e) ); 
        xbox.addEventListener('click', (e) => comprarProducto(e) );
        nintendo.addEventListener('click', (e) => comprarProducto(e) );
        sega.addEventListener('click', (e) => comprarProducto(e) );
        // Al cargar el documento se muestra lo cargado en el LS
        document.addEventListener('DOMContentLoaded',  leerLocalStorage());

        // Cuando se elimina un producto del carrito
        carrito.addEventListener('click', e => eliminarProducto(e));

        // Vaciar carrito
        vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e));

        // Enviar pedido a otra pagina
        procesarPedidoBtn.addEventListener('click', e => procesarPedido(e));
}

function esCarrito() {
        document.addEventListener('DOMContentLoaded',  leerLocalStorageCompra());

        carritoCompra.addEventListener('click', e => eliminarProductoCompra(e));

        calcularTotal();


        carritoCompra.addEventListener('change', e => obtenerEvento(e));
        carritoCompra.addEventListener('keyup', e => obtenerEvento(e));
}


import './src/darkmode.js'
