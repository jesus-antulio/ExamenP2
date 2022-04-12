var name;

function inicio(){
    name = prompt("BIENVENIDO!!! \nEscribe tu nombre :)");

    document.getElementsByClassName("name")[0].innerHTML = name;
}