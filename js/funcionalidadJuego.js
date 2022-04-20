var
    tablero, res1, res2, name, timer,
    segundos = 0, size=0, movimientos = 0;

function inicio(tamTablero){
    /* guardar variable del tamaño del tablero */
    size = tamTablero;

    llenarArreglo();
    imprimeTablero();

    /* iniciar el cronómetro e impresión del nombre*/
    document.getElementsByClassName("name")[0].innerHTML = name;
    timer = window.setInterval(
        function(){
            segundos++;
            document.getElementsByClassName("time")[0].innerHTML = segundos;
        },1000
    );
}

function llenarArreglo(){
    /* creación del tablero */
    tablero = new Array(size);
    /* creación de los arreglos para verificar si se gana */
    res1 = new Array(size); 
    res2 = new Array(size); 

    /* inicialización de los arreglos */
    for (var i = 0; i < size; i++){
        tablero[i] = new Array(size);
        res1[i] = new Array(size);
        res2[i] = new Array(size);
    }

    /** LLENADO DEL TABLERO Y REPSUESTAS **/
    var num = 0,
        i = 0, j = 0,
        aux = new Array(size*size);
        
    /* Arreglo auxiliar para desordenar los números */
    for(var i = 0; i < (size*size); i++){
        if(i == (size*size)-1){
            aux[i] = -1;
        } else {
            aux[i] = (i+1);
        }
    }
    
    /* se llena los arreglos respuesta */
    for (var i = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            res1[i][j] = aux[num];
            num++
        }
    }

    /* se llena el arreglo en forma de caracol */
    var n=size, inicio=0, limit=n-1, pos=0;

    while(pos < (size*size)){
        for(var i = inicio; i <= limit; i++){
            res2[inicio][i] = aux[pos];
            pos++;
        }
        for(var i = (inicio+1); i <= limit; i++){
            res2[i][limit] = aux[pos];
            pos++;
        }
        for(var i = (limit-1); i >= inicio; i--){
            res2[limit][i] = aux[pos];
            pos++;
        }
        for(var i = (limit-1); i > inicio; i--){
            res2[i][inicio] = aux[pos];
            pos++;
        }
        inicio++;
        limit--;
    }

    /* función para desordenar el arreglo */
    aux.sort(function(){return Math.random()-0.5});
    
    /* llenado del arreglo principal*/
    num = 0;
    for (var i = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            tablero[i][j] = aux[num];
            num++;
        }
    }
}

function imprimeTablero(){
    /* Impresión del tablero en la consola */
    for (var i = 0; i < size; i++)
        console.log(tablero[i]);

    /* Impresion del tablero en pantalla */
    for(var i = 0; i < size; i++)
        for(var j = 0; j < size; j++){
            var posI = String(i),
                posJ = String(j);
            if(tablero[i][j] != -1){
                document.getElementById(posI+posJ).innerHTML = tablero[i][j];
            } else {
                document.getElementById(posI+posJ).innerHTML = "";
            }
        }

    document.getElementsByClassName("moves")[0].innerHTML = movimientos;
}

function move(posI, posJ){
    /* impresión de la posición seleccionada */
    console.log(posI+" - "+posJ);

    /* conversión de cadena a enteros */
    var
        i = parseInt(posI),
        j = parseInt(posJ),
        aux = 0;

    /* verificación de la posición seleccionada */
    if((j+1) < size){
        switch (tablero[i][j+1]){ //Right
            case -1 :
                aux = tablero[i][j+1];
                tablero[i][j+1] = tablero[i][j];
                tablero[i][j] = aux;
                movimientos++;
                imprimeTablero();
                break;
            default :
                break;
        }
    }
    if((i-1) >= 0){
        switch (tablero[i-1][j]){ //Up
            case -1:
                aux = tablero[i-1][j];
                tablero[i-1][j] = tablero[i][j];
                tablero[i][j] = aux;
                movimientos++;
                imprimeTablero();
                break;
            default :
                break;
        }
    }
    if((j+1) >= 0){
        switch (tablero[i][j-1]){ //Left
            case -1:
                aux = tablero[i][j-1];
                tablero[i][j-1] = tablero[i][j];
                tablero[i][j] = aux;
                movimientos++;
                imprimeTablero();
                break;
            default :
                break;
        }
    }
    
    if((i+1) < size){
        switch (tablero[i+1][j]){ //Down
            case -1:
                aux = tablero[i+1][j];
                tablero[i+1][j] = tablero[i][j];
                tablero[i][j] = aux;
                movimientos++;
                imprimeTablero();
                break;
            default :
                break;
        }
    }    

    /* Verificación para ver si se ganó la partida */
    if(checkWin1() == true || checkWin2() == true){
        alert("FELICIDADES, "+name+"!!! Ganaste en "+segundos+" segundos con un total de "+movimientos+" movimientos");
    }
}

function checkWin1(){
    var band = true;
    for (var i = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            if(tablero[i][j] != res1[i][j]){
                band = false;
            }
        }
    }
    return band;
}
function checkWin2(){
    var band = true;
    for (var i = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            if(tablero[i][j] != res2[i][j]){
                band = false;
            }
        }
    }
    return band;
}

function getName(){
    name = prompt("BIENVENIDO!!! \nEscribe tu nombre :)");

    document.getElementsByClassName("name")[0].innerHTML = name;
}