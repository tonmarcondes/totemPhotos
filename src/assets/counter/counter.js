let timerInterval; // Representa o intervalo de tempo que está sendo executado	
let timerValue = initialValue;
let second; // Segundos correntes
let interval = interval;
let millisecond = 10; // Milisegundos correntes
let amountPictures; // Quantidade de fotos que o usuário deseja tirar

const timer = {
    start: () => {
        timer.pause();
        timerInterval = setInterval(() => {
            timer.regressive();
        }, 10);
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

const startCounter = (initialValue, intervalValue) => {
    timerValue = initialValue;
    second = initialValue;
    interval = intervalValue;
    timer.start();
}