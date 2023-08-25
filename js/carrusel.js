const carrusel = document.querySelector('.carrusel');
let scrollValor = 0;
let contador = 1;

function inicioCarrusel() {
    setInterval(() => {
        scrollValor -= 1200; // Ancho de cada imagen y desplazamiento horizontal, dos imagenes a la vez
        carrusel.style.transform = `translateX(${scrollValor}px)`;

        // clonacion de imagenes

        if (scrollValor === (contador * -2400)) { // 2400 px es el ancho total de contenedor carrusel visible y oculto 4 imagenes de 600px cada una

            clonarImagen();

            carrusel.style.transition = 'transform 3s ease';
            contador += 1;

        } else {
            carrusel.style.transition = 'transform 3s ease';

        }
    }, 4000); // Con setInterval establezco cada cuanto tiempo quiero ejecutar la función especificada

}

// Funcion para clonar imagen una vez finalizado el primer recorrido

function clonarImagen() {

    //Creo las imagenes con sus atributos

    const img_1 = document.createElement("img");
    img_1.src = "../public/img/controles/nintendo-switch_1.jpg";
    img_1.width = "100%"; 
    img_1.height = "auto"; 

    const img_2 = document.createElement("img");
    img_2.src = "../public/img/controles/PS5_2.jpg";
    img_2.width = "100%"; 
    img_2.height = "auto"; 

    const img_3 = document.createElement("img");
    img_3.src = "../public/img/controles/sega_2.jpg";
    img_3.width = "100%"; 
    img_3.height = "auto"; 

    const img_4 = document.createElement("img");
    img_4.src = "../public/img/controles/Xbox.jpg";
    img_4.width = "100%"; 
    img_4.height = "auto"; 

    //Agrego las imagenes al final del contenedor carrusel

    carrusel.appendChild(img_1);
    carrusel.appendChild(img_2);
    carrusel.appendChild(img_3);
    carrusel.appendChild(img_4);

}

inicioCarrusel();


