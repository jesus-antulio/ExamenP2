var
    tablero, respuesta, name, timer,
    segundos = 0, size = 4, movimientos = 0;

function inicio(){
    name = prompt("Escribe tu nombre :)");

    // creación del tablero
    tablero = new Array(size); //Arreglo en el cual se basara la partida
    respuesta = new Array(size); //Arreglo en el cual se verififcara si se gana la partida
    for (var i = 0; i < size; i++){
        tablero[i] = new Array(size);
        respuesta[i] = new Array(size);
    }
    llenarArreglo();
    imprimeTablero();

    document.getElementsByClassName("name")[0].innerHTML = name;
    timer = window.setInterval(
        function(){
            segundos++;
            document.getElementsByClassName("time")[0].innerHTML = segundos;
        },1000
    );
}

function move(posI, posJ){
    console.log(posI+" - "+posJ);
    var
        i = parseInt(posI),
        j = parseInt(posJ),
        aux = 0;

    if((j+1) < 4){
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
    
    if((i+1) < 4){
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
    if(checkWin() == true){
        alert("FELICIDADES, "+name+"!!! Ganaste en "+segundos+" segundos con un total de "+movimientos+" movimientos");
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

function llenarArreglo(){
    var num = 0,
        i = 0, j = 0,
        aux = new Array(16);
        
    /* Arreglo auxiliar para desordenar los números */
    for(var i = 0; i < 16; i++){
        if(i == 15){
            aux[i] = -1;
        } else {
            aux[i] = (i+1);
        }
    }

    /* función para desordenar el arreglo */
    aux.sort(function(){return Math.random()-0.5});
    
    /* llenado del arreglo principal*/
    for (var i = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            tablero[i][j] = aux[num];
            num++;
        }
    }

    /* Ciclo para llenar el tablero "respuesta" */
    num = 0;
    for (var i = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            if(num != 15){
                num++;
                respuesta[i][j] = num;
            } else {
                respuesta[i][j] = -1;
            }
        }
    }
}

function checkWin(){
    var band = true;
    for (var i = 0; i < size; i++){
        for (var j = 0; j < size; j++){
            if(tablero[i][j] != respuesta[i][j]){
                band = false;
            }
        }
    }
    return band;
}