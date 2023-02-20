let timerI; // Representa o intervalo de tempo que está sendo executado	
let timerValue;
let second; // Segundos correntes
let interval;
let intervalBackup;
let millisecond = 10; // Milisegundos correntes
let amountPhotos; // Quantidade de fotos que o usuário deseja tirar

const startCounter = (initialValue, intervalValue, amountPic) => {
    timerValue = initialValue;
    second = initialValue;
    interval = intervalValue;
    intervalBackup = intervalValue;
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
        clearInterval(timerI);
    },
    finish: () => {
        takePicture();
        timer.pause();
        
        setText(returnData(second));
    },
    regressive: () => {
        if ((millisecond -= 10) == 0) {
            if(second == 0) {
                takePicture();
                millisecond = 0;
                interval--;
                
                if(interval == 0) {
                    timer.finish();
                    downloadPhotos();
                } else {
                    timer.pause();
                    millisecond = 10;
                    second = intervalBackup;
                    timer.start()
                    setText(returnData(second));
                }

                return;
            }

            millisecond = 1000;
            second--;
        }

        setText(returnData(second));
    }
}

function returnData(input) {
    return input >= 10 ? input : `0${input}`
}


function setText(second){
    document.getElementById('second').innerText = second;
}

