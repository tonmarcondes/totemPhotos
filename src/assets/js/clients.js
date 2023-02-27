
window.onload = async () => {
    const body = document.querySelector("body");
    localStorage.getItem("ID") ? localStorage.removeItem("ID") : null;
    
    body.addEventListener('keydown', async function (e) {
        if (e.ctrlKey && e.key === 'Enter') {
            activeCamScreen();
            return;
        }
        
        if (e.key === 'Enter') {
            const inputId = document.getElementById("inputId");
            let IDCode = inputId.value;
            inputId.value = null;
            await findCamper(IDCode);
        }
        
        if (e.ctrlKey && e.key === 'r') {
            disableSection('preview-section');
            activeSection('id-section');
        }
    })
}

const findCamper = async (ID) => {
    const mainInputs = document.getElementById("id-section")
    const nameReturned = await findID(ID);

    if (nameReturned) {
        const nameCamper = document.createElement("p");
        nameCamper.classList.add("name-camper");
        nameCamper.innerHTML = `${nameReturned}`;
        mainInputs.appendChild(nameCamper);
        setIDInLocalStorage(ID);
    } else {
        alert("Acampante não encontrado!");
    }
}

const findID = async (ID) => {
    const response = await fetch("../assets/campers.json");
    const campersJSON = await response.json();
    const camper = campersJSON.find(camper => camper.ID === ID.toUpperCase());
    
    if(camper) {
        return (camper.Nome + " " + camper.Sobrenome);
    } else{
        return null;
    }
}

const setIDInLocalStorage = (ID) => {
    const arrayId = localStorage.getItem("ID");
    if (arrayId) {
        const arrayIdJSON = JSON.parse(arrayId);
        arrayIdJSON.push(ID);
        localStorage.setItem("ID", JSON.stringify(arrayIdJSON));
    } else {
        const arrayIdJSON = [];
        arrayIdJSON.push(ID);
        localStorage.setItem("ID", JSON.stringify(arrayIdJSON));
    }
}
