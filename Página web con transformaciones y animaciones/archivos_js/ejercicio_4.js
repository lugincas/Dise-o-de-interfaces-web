// Archivo JS para el ejercicio 4 - Luis Ginés Casanova de Utrilla

var miCanvas = document.getElementById("mi_canvas"); // Almacenamos nuestro canvas en una variable para operar con él
var dibujo = miCanvas.getContext("2d");
var botonDeInicio = document.getElementById("boton_iniciar"); // Almacenamos nuestro botón de inicio de la animación en una variable para operar con él

window.addEventListener('load', dibujoInicial); // Al cargar la página, reproducimos el dibujo inicial mediante la función de mismo nombre
botonDeInicio.addEventListener('click', dibujar); // Al hacer click en nuestro botón, comienza la animación mediante la llamada a la función dibujar()

function dibujoInicial() { // Función que dibuja la mesa de billar y sus elementos para disponerlos antes de ser animados

    // Dibujo y color de la mesa de billar
    dibujo.fillStyle = "rgb(12, 103, 23)";
    dibujo.fillRect(0, 0, miCanvas.width, miCanvas.height);

    // Dibujo y color del contorno de la mesa
    dibujo.lineWidth = "11";
    dibujo.strokeStyle = "rgb(156, 0, 0)";
    dibujo.strokeRect(0, 0, miCanvas.width, miCanvas.height);

    // Dibujo y color del taco
    dibujo.fillStyle = "rgb(139, 92, 0)";
    dibujo.fillRect(40, 115, 80, 8);

    // Dibujo y color de la bola de billar
    dibujo.beginPath();
    dibujo.fillStyle = "rgb(255, 255, 255)";
    dibujo.strokeStyle = "rgb(0, 0, 0)";
    dibujo.lineWidth = "5";
    dibujo.arc(200, 120, 15, 0, 2 * Math.PI, true);
    dibujo.stroke();
    dibujo.fill();
    dibujo.closePath();
}

function dibujar() { // Función que aglutina las animaciones

    dibujo.clearRect(0, 0, miCanvas.width, miCanvas.height); // Limpiamos los elementos que conforman el dibujo al iniciar

    // Almacenamos las posiciones con las que queremos operar en variables
    var ejeXRectangulo = 40; 
    var ejeXBola = 200;

    // Dibujamos y coloreamos la mesa de billar
    dibujo.fillStyle = "rgb(12, 103, 23)";
    dibujo.fillRect(0, 0, miCanvas.width, miCanvas.height);

    // Dibujamos y coloreamos el contorno de la mesa de billar
    dibujo.lineWidth = "11";
    dibujo.strokeStyle = "rgb(156, 0, 0)";
    dibujo.strokeRect(0, 0, miCanvas.width, miCanvas.height);

    // Establecemos una función con setInterval para que se ejecute durante el tiempo que definamos (30ms). Primero estableceremos el movimiento del taco, y el movimiento de la bola quedará integrado dentro de este.
    var intervaloTaco = setInterval(function () {
        dibujo.clearRect(ejeXRectangulo, 115, 80, 8); // Borramos el taco en la posición actual
        ejeXRectangulo += 1; // Aumentamos la posición del taco en el ejeX en uno

        dibujo.fillStyle = "rgb(12, 103, 23)";
        dibujo.fillRect(ejeXRectangulo - 1, 115, 80, 8); // En la posición que hemos borrado (-1, puesto que la hemos aumentado), vamos rellenando el espacio que dejamos en la transparencia con el mismo color del tapete, para que no quede en blanco. Podríamos poner esta línea de código antes del aumento, pero entonces el taco tiene un efecto raro en el último frame antes de golpear a la bola

        // Vamos dibujando el taco en esa nueva posición aumentada
        dibujo.fillStyle = "rgb(139, 92, 0)";
        dibujo.fillRect(ejeXRectangulo, 115, 80, 8);

        if (ejeXRectangulo >= 102) {  // Al llegar a la posición de la bola, utilizamos clearInterval para parar el intervalo de tiempo que animaba el movimiento de nuestro taco y comenzamos tanto la animación de movimiento de la bola como la aparición del título publicitario
            clearInterval(intervaloTaco);

            // Definimos el texto, su fuente, su color y su contorno
            dibujo.textAlign = "center";
            dibujo.font = "1.7em Arial";
            dibujo.fillStyle = "rgb(255, 255, 255)";
            dibujo.strokeStyle = "rgb(157, 121, 4)";
            dibujo.strokeText("¡Billares La Unión! | 01/04/2025", 225, 50);
            dibujo.fillText("¡Billares La Unión! | 01/04/2025", 225, 50);

            // Definimos el intervalo para animar el movimiento de la bola blanca
            var intervaloBola = setInterval(function () {

                // Primero, vamos dibujando una bola con un radio un poco mayor del mismo color del fondo. De esta forma, vamos "borrando" el movimiento de la bola blanca, con una bola verde
                dibujo.beginPath();
                dibujo.fillStyle = "rgb(12, 103, 23)";
                dibujo.strokeStyle = "rgb(12, 103, 23)";
                dibujo.lineWidth = "5";
                dibujo.arc(ejeXBola, 120, 20, 0, 2 * Math.PI, true);
                dibujo.stroke();
                dibujo.fill();
                dibujo.closePath();

                // Conforme borramos la posición de la bola que "borra" nuestro dibujo actual, vamos rellenando las posiciones que vamos aumentando en el eje X con una nueva bola blanca
                dibujo.beginPath();
                ejeXBola += 1;
                dibujo.fillStyle = "rgb(255, 255, 255)";
                dibujo.strokeStyle = "rgb(0, 0, 0)";
                dibujo.lineWidth = "5";
                dibujo.arc(ejeXBola, 120, 15, 0, 2 * Math.PI, true);
                dibujo.stroke();
                dibujo.fill();
                dibujo.closePath();
                if (ejeXBola >= 300) {
                    clearInterval(intervaloBola);
                }

            }, 40); // Dejamos diez milésimas más para que parezca que la bola tiene un poco de recorrido
        }
    }, 30);

    // Dibujamos nuestra bola blanca tal y como va a ir apareciendo en la animación para que aparezca ya en la mesa
    dibujo.beginPath();
    dibujo.fillStyle = "rgb(255, 255, 255)";
    dibujo.strokeStyle = "rgb(0, 0, 0)";
    dibujo.lineWidth = "5";
    dibujo.arc(200, 120, 15, 0, 2 * Math.PI, true);
    dibujo.stroke();
    dibujo.fill();
    dibujo.closePath();
}
