const activeCamScreen = () => {
    disableSection("id-section");
    activeSection("cam-section");
    openCamera();
}

const openCamera = () => {
    let video = document.querySelector("#webcam");
    adjustScreen();
         
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user', advanced: [{width: 1280, height: 720}]}})
        .then( function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
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

function foto(){
    let video = document.querySelector("#webcam");     
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let ctx = canvas.getContext('2d');
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
     
    let dataURI = canvas.toDataURL('image/jpeg'); 
    setImgBase64InLocalStorage(dataURI);
}

const downloadFile = (name) =>{
    let nameFile = `${name}.jpg`;
    var link = document.createElement('link');
    link.href = document.querySelector('#base64').value;
    link.download = nameFile
    link.click();

    document.querySelector('#base64').value = null;
}

const setImgBase64InLocalStorage = (value) => {
    const arrayImg = localStorage.getItem("imgBase64");
    if (arrayImg) {
        const arrayImgJson = JSON.parse(arrayImg);
        arrayImgJson.push(value);
        localStorage.setItem("imgBase64", JSON.stringify(arrayImgJson));
    } else {
        const arrayImgJson = [];
        arrayImgJson.push(ID);
        localStorage.setItem("imgBase64", JSON.stringify(arrayImgJson));
    }
}

fetch('../conf/conf.json').then((response) => {
    response.json().then((dados) => {
        dados.conf.map((config) => {
            let amountPictures = config.amountPictures
            let secondsUntilStart = config.timerValue
            let interval = config.interval

            console.log(`amountPictures: ${amountPictures}\n
            secondsUntilStart: ${secondsUntilStart}\n
            interval: ${interval}`);
        })
    })
})