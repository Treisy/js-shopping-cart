const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// Listeners
cargarEventListeners();

function cargarEventListeners() {
    cursos.addEventListener('click', comprarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



//Add course to cart
function comprarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;

        leerDatosCurso(curso);
    }
}

//Read course info
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

//Show selected course in cart
function insertarCarrito(curso) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
             <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);
}

//Delete course from the shopping cart
function eliminarCurso(e) {
    e.preventDefault();

    let curso;

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }
}

//Deelte all course from the shopping cart
function vaciarCarrito(e) {
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    return false;
}

//Save courses in Local Storage
function guardarCursoLocalStorage(curso) {
    let cursos;

    cursos = obtenerCursosLS();

    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//Get courses in Local Storage
function obtenerCursosLS() {
    let cursosLS

    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    }
    else {
         cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

//Show courses in Local Storage
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLS();

    cursosLS.forEach(function(curso) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                 <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        listaCursos.appendChild(row);
    });
}