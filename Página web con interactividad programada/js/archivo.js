/* 
 * Luis Ginés Casanova de Utrilla
 * Diseño de Interfaces Web - Tarea Online 6
 */

$(document).ready(function () { // Escribimos nuestro código dentro del evento "ready" para que se ejecute una vez que ha cargado la página

// 1.1 - INICIALIZAR WEB

    $("img[src='imagenes/vista.png']").hide(); // Ocultamos la imagen de la esquina superior derecha

    $($("#imagenes_slider").find("img")).each(function (i) {
        $("img[src^='imagenes/DIW']").eq(i + 1).hide(); // Especificamos que sólo queremos ocultar aquellos elementos desde la segunda posición del índice y cuyo src comience con la cadena 'imagenes/DIW' para que no elimine también botones y demás elementos img.
    });

    $("#vista_clasificacion").hide(); // Ocultamos la sección de Clasificación/Comparación

    /* Definimos los valores iniciales indicados */
    $("#input_color_fondo").val("#343a40");
    $("#select_fuente").val("Arial"); // Aunque es la opción que aparece por defecto, lo añado porque se pide en la tarea
    $("#input_tamano_texto").val("48");
    $("#input_filtro_avatar").prop("checked", false); // Aunque es la opción que aparece por defecto, lo añado porque se pide en la tarea

// 1.2 - FUNCIONALIDAD USUARIO

    /* Función que se activa al hacer click sobre el boton_config */
    $("#boton_config").click(function () {

        $("#modificar_usuario").show(); // Mostramos campo y botones para modificar usuario
        $("#usuario").hide(); // Ocultamos la cabecera de modificación de usuario

        /* Función que se activa al hacer click sobre el boton_modificar_usuario (check con el fondo verde) */
        $("#boton_modificar_usuario").click(function () { 
            if ($('#modificar_usuario > div > input').val() === "") { // Si el input está vacío (valor === ""), colocamos un placeholder con el texto "Campo vacío"
                $("#modificar_usuario > div > input").attr("placeholder", "Campo vacío");
            } else { // Si no está vacío, hacemos lo siguiente:
                $("#usuario > span").text($("#modificar_usuario > div > input").val()); // Modificamos el nombre de usuario y lo colocamos como el nuevo texto de la cabecera del menú (al lado del botón config)

                $("#modificar_usuario").hide(); // Ocultamos los botones y el campo para modificar el usuario
                $("#usuario").show(); // Mostramos de nuevo la cabecera
            }

        });

        /* Función que se activa al hacer click sobre el boton_cancelar_usuario (equis con el fondo rojo) */
        $("#boton_cancelar_usuario").click(function () {

            $("#modificar_usuario").hide(); // Ocultamos los botones y el campo para modificar el usuario
            $("#usuario").show(); // Mostramos de nuevo la cabecera

        });

    });

// 1.3 - INICIO

    /* Función que se activa al hacer click en la opción "Inicio" del menú lateral */
    $($($("#menu").find("li")[0]).find("a[href='#']")).click(function () {

        $("#migas_de_pan > p > span").text("Inicio"); // Modificamos el texto correspondiente a la última palabra de las migas de pan
        $("img[src='imagenes/vista.png']").hide(500); // Ocultamos la imagen de la esquina superior derecha
        $("#vista_clasificacion").hide(); // Ocultamos la sección de clasificación/comparación
        $("#vista_inicio").fadeIn(500); // Hacemos que la sección de inicio (si estaba oculta) aparezca gradualmente

    });

// 1.4 - MIGAS DE PAN

    /* Función que se activa al hacer click en el icono a la izquierda de las migas de pan */
    $($("#migas_de_pan").find("img")).click(function () {

        if ($("#migas_de_pan > img").attr("src") === "imagenes/ocultar.png") { // Para identificar qué efectos y atributos tenemos que aplicar, comprobamos el atributo de la imagen en el momento del click, que nos indica qué imagen se está mostrando. Si es ocultar.png (Ojo tachado), procedemos a encadenar el efecto de ocultar la imagen actual con el de mostrar la siguiente, añadiéndola como el nuevo atributo del elemento (ver.png, en este caso):

            $("#migas_de_pan > img").hide(500,function(){ 
                $("#migas_de_pan > img").attr("src", "imagenes/ver.png").show(500);
            });
            
        } else if ($("#migas_de_pan > img").attr("src") === "imagenes/ver.png") { // Si la imagen actual es ver.png (Ojo sin tachar), procedemos a hacer la operación inversa y devolverle el atributo original al elemento "img" (ocultar.png)
            $("#migas_de_pan > img").hide(500, function(){
                $("#migas_de_pan > img").attr("src", "imagenes/ocultar.png").show(500);
            });
            
        }

        $("#migas_de_pan > p").fadeToggle(500); // Las migas de pan aparecen y desaparecen con fadeToogle

    });

// 1.5 - SLIDER

    var index = 0; // Declaramos la variable global que nos servirá para controlar el índice de nuestra iteración

    /* Función que se activa al hacer click en la flecha del slider para avanzar */
    $($("#botones_slider").find("img[src='imagenes/siguiente.png']")).click(function () {

        index = index + 1; // Con cada click, aumentamos el índice en uno

        $($("#imagenes_slider").find("img")).each(function () {  // No utilizamos el índice del parámetro de la función, sino el nuestro propio

            if (index < $($("#imagenes_slider").find("img")).length) { // Para que el slider sea totalmente independiente del número de imágenes que haya, controlamos que sólo realice los avances (tanto de la imagen como del punto que indica en qué posición del slider estamos) si el valor actual del índice es menor que el total de elementos "img" encontrados en el documento

                $("img[src^='imagenes/DIW']").eq(index - 1).hide(0, function () { // Ocultamos la imagen del índice anterior al actual
                    $($("#botones_slider").find("span")).eq(index - 1).removeClass("imagen_activa"); // Borramos la clase "imagen_activa" del punto correspondiente al índice anterior al actual
                    $($("#botones_slider").find("span")).eq(index).addClass("imagen_activa"); // Atribuimos la clase "imagen_activa" al punto correspondiente al índice actual. Esta clase es la que añade el color verde al punto
                    $("img[src^='imagenes/DIW']").eq(index).fadeIn(1000); // Mostramos la imagen correspondiente al índice actual mediante un fundido desde la anterior (fadeIn) NOTA: Si se espera el segundo, funciona correctamente, pero si se hace click en el botón siguiente compulsivamente, la página se ralla a veces y no oculta bien las imágenes anteriores. Con hide y show no ocurre, con lo que entiendo que es tema del tiempo del fade
                });

            } else { // Si nuestro índice deja de ser menor que el total de elementos "img" encontrados en el documento, reseteamos el índice para empezar desde el principio
                index = 0;
            }

        });

    });

    /* Función que se activa al hacer click en la flecha del slider para retroceder */
    $($("#botones_slider").find("img[src='imagenes/anterior.png']")).click(function () { 

        index = index - 1; // Con cada click, restamos una posición al índice

        $($("#imagenes_slider").find("img")).each(function () {

            if (index >= 0) { // Si el índice es mayor que cero (que siempre va a ser el inicio de nuestro índice), procedemos a hacer lo siguiente:

                $("img[src^='imagenes/DIW']").eq(index + 1).hide(0, function () { // Encadenamos el proceso de ocultar la imagen anterior con el de mostrar la actual, así como la modificación del punto que indica el lugar del slide en el que nos encontramos
                    $("img[src^='imagenes/DIW']").eq(index).fadeIn(1000); // Mostramos gradualmente la nueva imagen
                    $($("#botones_slider").find("span")).eq(index + 1).removeClass("imagen_activa"); // Borramos la clase "imagen_activa" del punto anterior
                    $($("#botones_slider").find("span")).eq(index).addClass("imagen_activa"); // Añadimos la clase "imagen_activa" al punto actual
                });

            } else { // Si el índice es menor (es decir, hemos hecho click en el botón de retroceso estando en la primera posición del slide), procedemos a hacer lo siguiente:

                index = 2; // Reestablecemos el índice para que dé la vuelta. Para ello, le asignamos el total de elementos "img" encontrados en el documento (y le restamos 1, para que se ajuste a nuestra iteración, que siempre comienza en 0)

                $("img[src^='imagenes/DIW']").eq(0).hide(0, function () {
                    $("img[src^='imagenes/DIW']").eq(index).fadeIn(1000); // Mostramos gradualmente la nueva imagen
                    $($("#botones_slider").find("span")).eq(index).addClass("imagen_activa"); // Añadimos la clase "imagen_activa" al punto actual
                }); // Ocultamos la imagen correspondiente al valor inicial del índice ( que siempre va a ser 0, por ser el primero de nuestra iteración)
                $($("#botones_slider").find("span")).eq(0).removeClass("imagen_activa"); // Borramos la clase "imagen_activa" del punto correspondiente al valor inicial del índice (que siempre va a ser 0, por ser el primero de nuestra iteración)

            }

        });

    });

// 1.6 - CLASIFICACIÓN

    /* Función que se activa al hacer click sobre la opción "Clasificación" */
    $($($("#menu").find("li")[1]).find("a[href='#']")).click(function () {

        $("#migas_de_pan > p > span").text("Clasificación"); // Cambiamos la última palabra de las migas de pan a "Clasificación"
        $($(".control_clasificacion").find("img[src='imagenes/vista.png']")).show(500); // Mostramos la imagen de la esquina superior derecha
        $("#vista_inicio").hide(); // Ocultamos la vista de inicio que contiene el slide de imágenes
        $("#vista_clasificacion").fadeIn(500); // Mostramos gradualmente la sección de clasificación/ comparación

    });

    /* Función que se activa al hacer click sobre la imagen de la esquina superior derecha (icono vista.png) */
    $($(".control_clasificacion").find("img[src='imagenes/vista.png']")).click(function () {

        if ($("#vista_clasificacion").css('flex-direction') === "column") { // Si la sección de clasificación/comparación está orientada verticalmente (columna), procedemos a hacer lo siguiente:

            $("#vista_clasificacion").css('display', 'flex'); // Añadimos el atributo display:flex al css de la sección que engloba la zona
            $("#vista_clasificacion").css('flex-direction', 'row'); // Orientamos la sección horizontalmente (en fila)
            $("#vista_clasificacion > article").css('width', '50%'); // Limitamos a cada article un 50% de su ancho
            $($(".control_clasificacion").find("img[src='imagenes/vista.png']")).css('transform', 'rotate(0deg)'); // Rotamos el icono vista.png a la izquierda para que quede orientado de forma vertical 

        } else { // Si la sección de clasificación/comparación está orientada horizontalmente (fila), procedemos a hacer lo siguiente:

            $("#vista_clasificacion").css('display', 'flex'); // Añadimos el atributo display:flex al css de la sección que engloba la zona
            $("#vista_clasificacion").css('flex-direction', 'column'); // Orientamos la sección verticalmente (en columna)
            $("#vista_clasificacion > article").css('width', '100%'); // Desplegamos cada article al 100% de su ancho
            $($(".control_clasificacion").find("img[src='imagenes/vista.png']")).css('transform', 'rotate(90deg)'); // Rotamos el icono vista.png a la derecha para que quede orientado de forma horizontal
        }

    });

    /* Función que se activa al hacer click en el "-" de la esquina superior derecha de la ventana de clasificación y la minimiza/maximiza */
    $($("#ventana_clasificacion > header").find("img[src='imagenes/minimizar.png']")).click(function () {
        $("#clasificacion").slideToggle(800); // Minimizamos y maximizamos con slideToogle
    });

    /* Función que se activa al hacer click en el "-" de la esquina superior derecha de la ventana de comparación y la minimiza/maximiza */
    $($("#ventana_comparacion > header").find("img[src='imagenes/minimizar.png']")).click(function () {
        $("#comparacion").slideToggle(800); // Minimizamos y maximizamos con slideToogle
    });

// 1.7 - FUNCIONALIDAD CLASIFICACIÓN

    $("#clasificacion > table").hide();

    let jornadaActual = $("#jornada_" + $('#jornadas').find(":selected").val()); // Almacenamos en una variable la jornada en la que nos encontramos (por defecto, será la jornada uno, que es el primer valor del select)

    jornadaActual.show(); // Mostramos sólo aquella tabla que esté seleccionada, en función del valor de su select correspondiente (la primera, en este caso)
    
    /* Función que se activa al cambiar el valor del select */
    $("#jornadas").change(function () { // Cada vez que el valor del select cambia, realizamos lo siguiente
        
        jornadaActual.fadeOut(300, function (){
            $("#jornada_" + $('#jornadas').find(":selected").val()).fadeIn(2000); // Mostramos gradualmente la tabla correspondiente a la jornada seleccionada, una vez que se ha desvanecido la anterior
        });
        
        jornadaActual = $("#jornada_" + $('#jornadas').find(":selected").val()); // Actualizamos la variable para que detecte que la nueva jornada es la última que hemos seleccionado
        
    });

    /* Función que se activa al hacer click en una fila de la tabla clasificación */
    $("#clasificacion > table > tbody > tr").click(function () {

        $("#clasificacion > table > tbody > tr").each(function () { // Quitamos la clase "equipo_seleccionado" de todas las filas
            $(this).removeClass("equipo_seleccionado");
        });

        $(this).addClass("equipo_seleccionado"); // Añadimos la clase "equipo_seleccionado" a la fila sobre la que hemos hecho click

        $(this).each(function () { // Recorremos los valores de la fila sobre la que hemos hecho click

            let longitudEstadisticas = $($(this).find("td")).length; // Almacenamos (por claridad en el código) el número total de campos que tiene la fila 

            for (i = 0; i < longitudEstadisticas; i++) { // Recorremos cada campo de la fila y lo introducimos en la tabla de comparación, en el mismo orden (ya que coincide con el de los campos en la tabla de clasificación)
                $($("#comparacion >table > tbody>tr").find("td").eq(i)).text($($(this).find("td").eq(i)).text());
            }

        });

        $($(".icono_deporte > th").find("img")).attr("src", "imagenes/equipos/" + $($(this).find("td").eq(0)).text() + ".png").hide(0).fadeIn(1000); // Cambiamos el icono de la cabecera de la tabla de comparación por el icono del deporte seleccionado, haciendo que el nombre de la imagen que pasamos como valor del atributo src coincida con el nombre del deporte escogido. Encadenamos los efectos ocultar y mostrar gradualmente
    });

// 1.8 - FUNCIONALIDAD COMPARACIÓN

    /* Función que se activa al hacer click sobre el icono de eliminar en la tabla comparativa */
    $("img[src='imagenes/borrar.png']").click(function () {

        $("#clasificacion > table > tbody > tr").each(function () { // Borramos la clase "equipo_seleccionado" de todas las filas de la tabla clasificación, para desmarcarlas
            $(this).removeClass("equipo_seleccionado");
        });

        let longitudEstadisticas = $($("#clasificacion > table > tbody > tr").find("td")).length; // Almacenamos (por claridad en el código) el número total de campos que tiene la fila 

        for (i = 0; i < longitudEstadisticas; i++) { // Recorremos cada campo de la fila y lo vaciamos, en el mismo orden (ya que coincide con el de los campos en la tabla de clasificación)
            $($("#comparacion >table > tbody>tr").find("td").eq(i)).text("");
        }

        $($(".icono_deporte > th").find("img")).attr("src", "imagenes/equipos/icono.png").hide(0).fadeIn(1000); // Cambiamos el icono del deporte que había quedado seleccionado por el icono por defecto (icono.png) concatenando hide y fadeIn

    });

// 1.9 - ESTILOS CABECERA

    /* Función que se activa al hacer click sobre el la opción "Estilos cabecera" del menú lateral */
    $($($("#menu").find("li")[2]).find("a[href='#']")).click(function () {

        $("#opciones_estilos").slideToggle(800); // Desplegamos/contraemos el submenú con slideToggles

    });


    /* Función que se activa al hacer click sobre el botón "Aplicar" */
    $("#boton_aplicar_estilos").click(function () {

        $("#cabecera > h1").css('font-family', $("#select_fuente").val()); // Cambiamos el tipo de fuente de la cabecera, modificando el valor de su CSS y añadiéndole el que hemos seleccionado en el menú "Estilos cabecera"
        $("#cabecera > h1").css('font-size', $("#input_tamano_texto").val() + "px"); // Cambiamos el tamaño de fuente de la cabecera, modificando el valor de su CSS y añadiéndole el que hemos seleccionado en el menú "Estilos cabecera"
        $("#cabecera").css('background-color', $("#input_color_fondo").val()); // Cambiamos el color de fondo de la cabecera, modificando el valor de su CSS y añadiéndole el que hemos seleccionado en el menú "Estilos cabecera"
        if ($("#input_filtro_avatar").prop('checked') === true) { // Comprobamos si el checkbox está marcado 
            $("#logo").css('filter', 'invert(75%)'); // Si lo está, aplicamos el efecto al logo de la esquina superior izquierda
        } else {
            $("#logo").css('filter', '');  // Si no lo está, no aplicamos ningún efecto al logo
        }
    });

    /* Función que se activa al hacer click sobre el botón "Reset" */
    $("#boton_reset_estilos").click(function () {

        // Aplicamos a la cabecera y al logo los valores que teníamos inicialmente, modificando su CSS
        $("#cabecera > h1").css('font-family', 'Arial');
        $("#cabecera > h1").css('font-size', '48px');
        $("#cabecera").css('background-color', '#343a40');
        $("#logo").css('filter', '');

        // Volvemos a aplicar esos mismos valores de inicio también a las opciones por defecto del menú "Estilos cabecera"
        $("#input_color_fondo").val("#343a40");
        $("#select_fuente").val("Arial");
        $("#input_tamano_texto").val("48");
        $("#input_filtro_avatar").prop("checked", false);

    });

// 1.10 - FOOTER

    /* Función que se activa al pasar el ratón por encima de la cabecera */
    $($("footer").find("a[href='#']")).mouseenter(function () {
        $("footer > a").css('font-size', '32px'); // Cambiamos el tamaño de la fuente
        $("footer > a").css('color', '#73c6b6'); // Cambiamos el color del texto
        $("footer > a").css('text-decoration', 'none'); // Quitamos el subrayado
    });

    /* Función que se activa al quitar el ratón de encima de la cabecera */
    $($("footer").find("a[href='#']")).mouseout(function () {
        // Devolvemos el estilo inicial al texto del footer
        $("footer > a").css('font-size', '16px');
        $("footer > a").css('color', '#f4d03f');
        $("footer > a").css('text-decoration', 'underline');
    });

});