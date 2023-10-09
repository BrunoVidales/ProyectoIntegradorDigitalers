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
    procesarPedidoIndex, 
    vaciarCarrito
} from './src/carrito';

const playstation = document.querySelector('#playstation');
const xbox = document.querySelector('#xbox');
const nintendo = document.querySelector('#nintendo');
const sega = document.querySelector('#sega');

const carrito = document.querySelector('#carrito');

const carritoCompra = document.querySelector('#lista-compra');

// Verificamos si los elementos existen en la pagina actual
if (playstation && xbox && nintendo && sega) {
    esConsolas()
} else {
    console.log('no existe productos en esta página.');
}


cargarEventos();

function cargarEventos() {
    const ruta = String(location.href);

    console.log(ruta);

    if (ruta.includes('carrito')) {
        esCarrito();
    } else if (ruta.includes('index')) {
        esIndex();
    } else if (ruta.includes('nosotros')) {
        esNosotros();
    } else if (ruta.includes('contacto')) {
        esContacto();
    }
}


function esConsolas() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito');
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido');

    // Se ejecuta cuando presiono el botón el comprar
    playstation.addEventListener('click', (e) => comprarProducto(e));
    xbox.addEventListener('click', (e) => comprarProducto(e));
    nintendo.addEventListener('click', (e) => comprarProducto(e));
    sega.addEventListener('click', (e) => comprarProducto(e));
    
    // Al cargar el documento se muestra lo cargado en el LS
    document.addEventListener('DOMContentLoaded',  leerLocalStorage());

    // Cuando se elimina un producto del carrito
    carrito.addEventListener('click', e => eliminarProducto(e));

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e));

    // Enviar pedido a otra página
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e));
}

function esIndex() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito');
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido');

    document.addEventListener('DOMContentLoaded', leerLocalStorage());

    carrito.addEventListener('click', e => eliminarProducto(e));

    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e));

    procesarPedidoBtn.addEventListener('click', e => procesarPedidoIndex(e));
}

function esNosotros() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito');
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido');

    document.addEventListener('DOMContentLoaded', leerLocalStorage());

    carrito.addEventListener('click', e => eliminarProducto(e));

    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e));

    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e));
}

function esContacto() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito');
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido');

    document.addEventListener('DOMContentLoaded', leerLocalStorage());

    carrito.addEventListener('click', e => eliminarProducto(e));

    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e));

    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e));
}

function esCarrito() {
    document.addEventListener('DOMContentLoaded',  leerLocalStorageCompra());

    carritoCompra.addEventListener('click', e => eliminarProductoCompra(e));

    calcularTotal();

    carritoCompra.addEventListener('change', e => obtenerEvento(e));
    carritoCompra.addEventListener('keyup', e => obtenerEvento(e));
}

import './src/modoOscuro'















