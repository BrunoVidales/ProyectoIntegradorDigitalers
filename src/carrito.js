const listaProductos = document.querySelector('#lista-carrito tbody');
const listaCompra = document.getElementById('lista-compra');


// export: Nos permite añadir un producto al carrito 
export function comprarProducto(e) {
    e.preventDefault(); // Evita que ocurra el comportamiento predeterminado

    /* console.dir(e.target); */

    if(e.target.classList.contains('agregar-carrito') ) {
        const producto = e.target.parentElement.parentElement;
        console.log(producto);
        leerDatosProducto(producto);
    }
}


// Leer datos del producto
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    
    let productosLS;
    productosLS = obtenerProductosLocalStorage();

    productosLS.forEach(function(productoLS) {
        if(productoLS.id === infoProducto.id) {
            productosLS = productoLS.id;
        };
    });


    if(productosLS === infoProducto.id) {
        console.warn('El producto ya esta (en el carrito) en el LocalStorage')
    } else {
        insertarCarrito(infoProducto);
    }
};

// Comprobar que hay elementos LS
function obtenerProductosLocalStorage() {
    let productosLS;


    // Comprobar si hay algo en el LS

    if(localStorage.getItem('productos') === null) {
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }

    return productosLS;
}

// Muestra producto seleccionado en carrito
function insertarCarrito(producto) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
    `

    listaProductos.appendChild(row);
    guardarProductosLocalStorage(producto);
};

function guardarProductosLocalStorage(producto) {
    let productos;
    
    productos = obtenerProductosLocalStorage();

    productos.push(producto);

    localStorage.setItem('productos', JSON.stringify(productos));
}


export function leerLocalStorage() {
    let productosLS;

    productosLS = obtenerProductosLocalStorage();

    productosLS.forEach(function(producto) {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `

        listaProductos.appendChild(row);
    });
};


export function eliminarProducto(e) {
    e.preventDefault();

    let producto, productoID;
    if(e.target.classList.contains('borrar-producto')) {
        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector('a').getAttribute('data-id');
        producto.remove();
        eliminarProductoLocalStorage(productoID);
    };
};


function eliminarProductoLocalStorage(productoID) {
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    productosLS.forEach(function(productoLS, index) {
        if(productoLS.id === productoID) {
            productosLS.splice(index, 1);
        }
    });

    localStorage.setItem('productos', JSON.stringify(productosLS));
};



export function vaciarCarrito(e) {
    e.preventDefault();
    while(listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    };
    vaciarLocalStorage();

    return false;
};

function vaciarLocalStorage() {
    window.localStorage.clear();
};

// Funcion para procesar el pedido
export function procesarPedido(e) {
    e.preventDefault();
    let array = obtenerProductosLocalStorage();
    if(array.length === 0) {
        Swal.fire('Parece que el carrito esta vacio');
    }  else {
        location.href = 'carrito.html';  
    } 
};

export function procesarPedidoIndex(e) {
    e.preventDefault();
    let array = obtenerProductosLocalStorage();
    if(array.length === 0) {
        Swal.fire('Parece que el carrito esta vacio');
    } else {
        location.href = './pages/carrito.html';
    }
}; 


// Mostramos los productos guardados en el LS en la pagina de carrito.html
export function leerLocalStorageCompra() {
    let productosLS;

    productosLS = obtenerProductosLocalStorage();
    productosLS.forEach(function(producto) {
        const div = document.createElement('div');
            div.classList.add('row', 'py-3', 'mb-1', 'rounded-4', 'bg-light');
        div.innerHTML = `
            <div class="col-4 mb-1">
                <div class="bg-image">
                    <img class="w-100" src="${producto.imagen}" alt="${producto.titulo}">
                </div>
            </div>
            <div class="col-6">
                <ul class="d-flex flex-column">
                    <li class="mt-2"><span>${producto.titulo}</span></li>
                    <li class="mt-2">Caracteristicas</li>
                    <li class="mt-2">$${producto.precio}</li>
                    <a data-id="${producto.id}" class="btn-sm text-danger  me-1 mt-2 fa-solid fa-trash-can borrar-producto-compra"></a>
                </ul>
            </div>
            <div class="col-2">
                <input type="number" min="1" class="form-control mb-2 text-center cantidad" placeholder="Cantidad" value="${producto.cantidad}" >
                <p class="text-center my-2 fw-bold">
                    $<strong class="precio">${producto.precio * producto.cantidad}</strong>
                </p>
                <img src="../img/score5.png" class="w-100" alt="">
            </div>
        `
        listaCompra.appendChild(div);
    });
};

// Elimina el producto del carrito.html
export const eliminarProductoCompra = (e) => {
    e.preventDefault();

    let productoID;
    if(e.target.classList.contains('borrar-producto-compra')) {
        e.target.parentElement.parentElement.parentElement.remove();
        let producto = e.target.parentElement.parentElement.parentElement;
        productoID = producto.querySelector('a').getAttribute('data-id');
    };

    eliminarProductoLocalStorage(productoID);

};

// Obtener evento para detectar el cambio del input de cantidad
export const obtenerEvento = (e) => {
    e.preventDefault();

    let id, cantidad, producto, productosLS;

    if(e.target.classList.contains('cantidad')) {
        producto = e.target.parentElement.parentElement;
        console.log(producto);
        id = producto.querySelector('a').getAttribute('data-id');
        cantidad = producto.querySelector('input').value;
        let precio = producto.querySelector('.precio');
        productosLS = obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLs, index) {
            if(productoLs.id === id) {
                productoLs.cantidad = cantidad;
                
                let total = Number(productoLs.cantidad) * Number(productoLs.precio);
                precio.textContent = total.toFixed(2);
                
            }
        });
    }
    localStorage.setItem('productos', JSON.stringify(productosLS));
    calcularTotal();
};

// Calcular el totoal del carrito
export function calcularTotal() {
    let productosLS;
    let total = 0, subTotal = 0, impuestos = 0;
    productosLS = obtenerProductosLocalStorage();

    productosLS.forEach( productoLs => {
        let totalProducto = Number(productoLs.cantidad * productoLs.precio);
        total = total + totalProducto;
        
    });

    impuestos = parseFloat(total * 0.18).toFixed(2);
    subTotal = parseFloat(total - impuestos).toFixed(2);

    document.querySelector('#total').textContent = total.toFixed(2);
    document.querySelector('#sub-total').textContent = subTotal;
    document.querySelector('#iva').textContent = impuestos;
};




