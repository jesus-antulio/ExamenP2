var
    tablero, res1, res2, name, timer,
    segundos = 0, size = 3, movimientos = 0;

function inicio(){
    // creación del tablero
    tablero = new Array(size); //Arreglo en el cual se basara la partida
    res1 = new Array(size); //Arreglo en el cual se verififcara si se gana la partida
    res2 = new Array(size); //Arreglo en el cual se verififcara si se gana la partida
    for (var i = 0; i < size; i++){
        tablero[i] = new Array(size);
        res1[i] = new Array(size);
        res2[i] = new Array(size);
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

function checkWin(){
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