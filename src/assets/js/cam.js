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

const activePreviewPhotos = () => {
    disableSection("cam-section");
    disableSection("secondaryTitle");
    disableSection("secondaryLogo");
    activeSection("preview-section");

    let preview = document.querySelector("#preview");

    for (let i = 0; i < arrayImg.length; i++) {
        let img = document.createElement("img");
        img.src = arrayImg[i];
        img.classList.add("photos");
        preview.appendChild(img);
    }
}

const downloadPhotos = () => {
    let fileName = ''
    const id = localStorage.getItem("ID");
    const idJSON = JSON.parse(id);

    idJSON.forEach((id) => {
        if (idJSON.indexOf(id) === idJSON.length - 1) {
            fileName += id;
        } else {
            fileName += `${id}&`;
        }
    })

    downloadFile(fileName);
    localStorage.getItem("ID") ? localStorage.removeItem("ID") : null;
}

const downloadFile = (name) => {
    /*Download the all images
    arrayImg.forEach((img, index) => {
         var link = document.createElement('a');
        link.setAttribute('href', img);
        link.setAttribute('download', nameFile);
        link.click();
    })*/

    //Download the card
    let nameFile = `${name}.png`;
    html2canvas(document.getElementById('preview-section')).then(function (canvas) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            let a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = nameFile;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.remove()
        };
        xhr.open('GET', canvas.toDataURL("image/png", 1.0));
        xhr.send();
    });
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
        })
    })
})

