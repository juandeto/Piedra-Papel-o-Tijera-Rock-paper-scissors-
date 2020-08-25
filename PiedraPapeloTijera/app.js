
var btn = document.querySelectorAll('.btn');
var pantalla = document.getElementsByClassName('pantalla')[0];
var tableroPlayer = document.getElementById('player');
var tableroPc = document.getElementById('pc');
var nombrePc = document.getElementById('nombrePc');
var nombrePlayer = document.getElementById('nombrePlayer');
var imagenPc = document.getElementById('imagenPc');
var imagenPlayer = document.getElementById('imagenPlayer');

var resultadoTotal = document.getElementById('resultado-total');
var pcArray = [];
var pc = '';
var player = '';
var resultado = document.getElementById('resultado');
seconds = 3;
resultadoTotal.textContent = '';

window.onload = function () {
    resultado.innerText = '¡Selecciona un elemento!';
    nombrePc.textContent = '';
    nombrePlayer.textContent = '';
    imagenPc.innerHTML = '<img src="PIEDRA.png"alt="foto" class="imagenMano">';
    imagenPlayer.innerHTML = '<img src="PIEDRA.png" alt="" class="imagenMano">';
}


for (let i = 0; i < btn.length; i++) {
    pcArray.push(btn[i].innerText);
}


btn.forEach(btn => btn.addEventListener('click', startTimer))

function limpiarTablero() {
    resultado.style.color = 'black';
    resultado.innerText = '';
    nombrePc.textContent = '';
    nombrePlayer.textContent = '';
    imagenPc.innerHTML = '<img src="PIEDRA.png"alt="foto" class="imagenMano">';
    imagenPlayer.innerHTML = '<img src="PIEDRA.png" alt="" class="imagenMano">';


}


function startTimer() {
    limpiarTablero();
    seconds = 3;

    player = this.innerText;

    displayTimer(seconds)

    cuentaReg = setInterval(() => {
        seconds -= 1;
        if (seconds == -1) {
            randomNum();
            clearInterval(cuentaReg);
            return
        }
        displayTimer(seconds)
    }, 700);

}


function displayTimer(seconds) {
    display = `${seconds == 3 ? '¡PIEDRA!' : ''}${seconds == 2 ? '¡PAPEL!' : ''}${seconds == 1 ? '¡O TIJERA!' : ''}${seconds == 0 ? '¡¡YA!!' : ''}`;
    resultado.innerText = display;
}

function randomNum() {

    var r = Math.floor(Math.random() * 3);
    pc = pcArray[r];
    ganador();
}

var counterPC = 0;
var counterPlayer = 0;
resultadoTotal.textContent = `${'PC: ' + counterPC + '    '}${'Player: ' + counterPlayer}`;

function ganador() {
    console.log(resultado);
    nombrePc.textContent = `${'PC: ' + pc}`;
    nombrePlayer.textContent = `${'Jugador: ' + player}`;
    console.log(resultado.innerText);
    imagenPc.innerHTML = '<img src="' + `${pc + '.png'}` + '"alt="foto" class="imagenMano">';
    imagenPlayer.innerHTML = '<img src="' + `${player + '.png'}` + '" alt="" class="imagenMano">';

    if (player == pc) {
        resultado.textContent = "¡Empate! juga de nuevo";
        resultado.style.color = 'green';
    } else if (pc == 'PIEDRA' && player == 'PAPEL') {
        ganaste();
    } else if (pc == 'PAPEL' && player == 'TIJERA') {
        ganaste();
    } else if (pc == 'TIJERA' && player == 'PIEDRA') {
        ganaste();
    } else {
        perdiste();
    }
    resultadoTotal.textContent = `${'PC: ' + counterPC + '    '}${'Player: ' + counterPlayer}`;


    if (counterPC == 3 || counterPlayer == 3) {
        btn.forEach(btn => btn.removeEventListener('click', startTimer));
        finJuego();
    }

}
function ganaste() {
    resultado.innerText = "¡GANASTE!";
    resultado.style.color = 'gold';
    counterPlayer += 1;
}

function perdiste() {
    resultado.innerText = "PERDISTE... :(";
    resultado.style.color = 'red';
    counterPC += 1;
}


function finJuego() {
    setTimeout(() => {
        if (counterPlayer == 3) {
            pantalla.innerHTML = '<h1 style="color: gold"> GANASTE!</h1> <br> <span class="jugarDeNuevo">Jugar de nuevo</span>';
            var reiniciar = document.getElementsByClassName('jugarDeNuevo')[0];
            reiniciar.addEventListener('click', function () {
                location.reload();

            })
        } else if (counterPC == 3) {
            pantalla.innerHTML = '<h1 style="color: red"> PER-DIS-TE! </h1> <br> <span class="jugarDeNuevo">Jugar de nuevo</span>';
            var reiniciar = document.getElementsByClassName('jugarDeNuevo')[0];
            reiniciar.addEventListener('click', function () {
                location.reload();
            })


        } else { }
    }, 3000);

}