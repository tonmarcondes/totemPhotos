let timerInterval; // Representa o intervalo de tempo que está sendo executado	
let timerValue; // Valor do timer inserido pelo usuário
let second; // Segundos correntes
let millisecond = 10; // Milisegundos correntes
let amountPictures; // Quantidade de fotos que o usuário deseja tirar

var resumeBtn = document.getElementById("resume");
var pauseBtn = document.getElementById("pause");
var resetBtn = document.getElementById("reset");

function setSeconds(seconds) {
    timerValue = seconds;
    second = seconds;
    document.getElementById('second').innerText = returnData(second);
}

function setAmountPictures(amount){
    amountPictures = amount;
}

function checkFields(){
    if(timerValue && amountPictures) 
        return true;

    alert("Preencha todos os campos!")
    return false;
}

resumeBtn.addEventListener("click", function () {
    if(!checkFields()) return;

    timer.start();

    pauseBtn.classList.remove("disabled");
    resumeBtn.classList.add("disabled");
    resetBtn.classList.add("disabled");
});

pauseBtn.addEventListener("click", function () {
    timer.pause();

    pauseBtn.classList.add("disabled");
    resumeBtn.classList.remove("disabled");
    resetBtn.classList.remove("disabled");
});

resetBtn.addEventListener("click", function () {
    timer.reset()

    pauseBtn.classList.add("disabled");
    resumeBtn.classList.remove("disabled");
    resetBtn.classList.add("disabled");
});

const timer = {
    start: () => {
        timer.pause();
        timerInterval = setInterval(() => {
            timer.regressive();
        }, 10);
    },
    pause: () => {
        clearInterval(timerInterval);
    },
    reset: () => {
        second = timerValue;
        millisecond = 10;

        setText(returnData(second), '00');
    },
    finish: () => {
        takePicture();
        timer.pause();
        setText(returnData(second), returnData(millisecond));

        pauseBtn.classList.add("disabled");
        resetBtn.classList.remove("disabled");
    },
    regressive: () => {
        if ((millisecond -= 10) == 0) {
            if(second == 0) {
                millisecond = 0;
                timer.finish();

                return;
            }

            millisecond = 1000;
            second--;
        }

        setText(returnData(second), returnData(millisecond));
    }
}

function returnData(input) {
    return input >= 10 ? input : `0${input}`
}

function takePicture() {
    for(let i = 0; i < amountPictures; i++) {
        console.log("Tirando foto");
    }
}

function setText(second, millisecond){
    document.getElementById('second').innerText = second;
    document.getElementById('millisecond').innerText = millisecond;
}