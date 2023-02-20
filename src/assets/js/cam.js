let arrayImg = [];
let secondsUntilStart;
let timerInterval;
let amountPictures;

const activeCamScreen = () => {
    disableSection("id-section");
    activeSection("cam-section");
    openCamera();
}

const openCamera = async () => {
    let video = document.querySelector("#webcam");
    adjustScreen();
    startCounter(secondsUntilStart, timerInterval, amountPictures);

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'user', advanced: [{ width: 1280, height: 720 }] } })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                alert("Não foi possível iniciar a webcam.");
            });
    }
}

const adjustScreen = () => {
    let section = document.querySelector("section");
    section.style.height = "100%";
    section.style.width = "100%";
    //remover todas margins e paddings

}

function takePicture() {
    let video = document.querySelector("#webcam");
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    let dataURI = canvas.toDataURL('image/jpeg');
    setImgBase64InArray(dataURI);
}

const downloadPhotos = () => {
    let fileName = ''
    arrayImg.forEach((img, index) => {
        const id = localStorage.getItem("ID");
        const idJSON = JSON.parse(id);
        //fazer um laço para cada id e armazenar numa string
        idJSON.forEach((id) => {
            //verificar se é o ultimo elemento do array
            if (idJSON.indexOf(id) === idJSON.length - 1) {
                fileName += id;
            } else {
                fileName += `${id}&`;
            }
        })
    })

    downloadFile(fileName);
    
    localStorage.getItem("ID") ? localStorage.removeItem("ID") : null;
}

const downloadFile = (name) => {
    // fazer download de todos os arquivos

    let nameFile = `${name}.jpg`;
    var link = document.createElement('link');
    link.href = document.querySelector('#base64').value;
    link.download = nameFile;
    link.click();

    document.querySelector('#base64').value = null;
}

const setImgBase64InArray = (value) => {
    arrayImg.push(value);
}

fetch('../assets/counter/conf.json').then((response) => {
    response.json().then((dados) => {
        dados.conf.map((config) => {
            secondsUntilStart = config.timerValue;
            timerInterval = config.interval;
            amountPictures = config.amountPictures;

            console.log(`amountPictures: ${amountPictures}\nsecondsUntilStart: ${secondsUntilStart}\ninterval: ${timerInterval}`);
        })
    })
})

