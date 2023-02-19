
window.onload = () => {
    
    const campo = document.getElementById("codigos")
    
    campo.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            let codigo = document.querySelector('#codigos').value

            const over = document.querySelector('.over')
            over.innerHTML = codigo

            campo.value = null
          }
    })
}