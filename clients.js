
window.onload = () => {

    const campo = document.getElementById("codigos")
    
    campo.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            let codigo = document.querySelector('#codigos').value
            console.log(codigo);

            campo.value = null
          }
    })
}