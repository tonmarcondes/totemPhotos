let timerI; // Representa o intervalo de tempo que está sendo executado	
let timerValue;
let second; // Segundos correntes
let interval;
let millisecond = 10; // Milisegundos correntes
let amountPhotos; // Quantidade de fotos que o usuário deseja tirar

const startCounter = (initialValue, intervalValue, amountPic) => {
    timerValue = initialValue;
    second = initialValue;
    interval = intervalValue;
    amountPhotos = amountPic;
    timer.start();
    activeSection('regressive');
}

const timer = {
    start: () => {
        timer.pause();
        timerI = setInterval(() => {
            timer.regressive();
        }, 10);
    },
    pause: () => {
        clearInterval(timerInterval);
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
    for(let i = 0; i < amountPhotos; i++) {
        console.log("Tirando foto");
    }
}

function setText(second, millisecond){
    document.getElementById('second').innerText = second;
    document.getElementById('millisecond').innerText = millisecond;
}

