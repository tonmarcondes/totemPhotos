const activeSection = function (id) {
    var section = document.getElementById(id);
    section.classList.remove('d-none');
}

const disableSection = function (id) {
    var section = document.getElementById(id);
    section.classList.add('d-none');
}