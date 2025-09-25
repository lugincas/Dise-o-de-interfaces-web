// Archivo JS para el ejercicio 3 - Luis Ginés Casanova de Utrilla

// Botón que permite parar la animación
var botonParar = document.getElementById("boton_parar"); // Selecciona el botón por su ID
botonParar.addEventListener('click', function () { // Agrega un evento de clic al botón
    var tapete = document.getElementById("tapete_juego"); //seleccionamos el tapete por su ID 
    var taco = document.getElementById("taco_billar"); //seleccionamos el taco por su ID
    var titulo = document.getElementById("titulo_jugada"); //seleccionamos el titulo por su ID
    var bolaBlanca = document.getElementById("bola_blanca"); //seleccionamos la bola blanca por su ID 
    var bolaCambiacolor = document.getElementById("bola_cambiacolor"); //seleccionamos la bola cambiacolor por su ID
    // modificamos la propiedad CSS animationPlayState para que pause la animación del elemento seleccionado
    tapete.style.animationPlayState = "paused";
    taco.style.animationPlayState = "paused";
    titulo.style.animationPlayState = "paused";
    bolaBlanca.style.animationPlayState = "paused";
    bolaCambiacolor.style.animationPlayState = "paused";
});

// Botón que permite iniciar la animación
var botonReanudar = document.getElementById("boton_reanudar"); // Selecciona el botón por su ID
botonReanudar.addEventListener("click", function () { // Agrega un evento de clic al botón 
    var tapete = document.getElementById("tapete_juego"); //seleccionamos el tapete por su ID 
    var taco = document.getElementById("taco_billar"); //seleccionamos el taco por por su ID 
    var titulo = document.getElementById("titulo_jugada"); //seleccionamos el titulo por su ID 
    var bolaBlanca = document.getElementById("bola_blanca"); //seleccionamos la bola blanca por su ID 
    var bolaCambiacolor = document.getElementById("bola_cambiacolor"); //seleccionamos la bola cambiacolor por su ID
    // modificamos la propiedad CSS animationPlayState para que reproduzca la animación del elemento seleccionado
    tapete.style.animationPlayState = "running";
    taco.style.animationPlayState = "running";
    titulo.style.animationPlayState = "running";
    bolaBlanca.style.animationPlayState = "running";
    bolaCambiacolor.style.animationPlayState = "running";
});