let largura = window.innerWidth
let altura = window.innerHeight

document.addEventListener( 'DOMContentLoaded', function(){
    let video = document.querySelector("#webcam");
         
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
        .then( function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            alert("Não foi possível iniciar a webcam.");
        });
    }
});

function foto(){
    let video = document.querySelector("#webcam");
     
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let ctx = canvas.getContext('2d');
     
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
     
    let dataURI = canvas.toDataURL('image/jpeg'); 
    document.querySelector("#foto").src = dataURI;
    document.querySelector("#base64").value = dataURI;
}

const downloadFile = () =>{
    let nameFile = "Image.jpg"
    var a = document.createElement('a')
    a.href = document.querySelector('#base64').value
    a.download = nameFile
    a.click()
}