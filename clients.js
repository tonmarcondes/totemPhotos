
window.onload = () => {

    const campo = document.getElementById("codigos")
    
    campo.addEventListener('keydown', function(e) {
        if (e.code === 'Enter' || e.code === 13) {
            let codigo = document.querySelector('#codigos').value
            console.log(codigo);

            campo.value = null
          }
    })
}