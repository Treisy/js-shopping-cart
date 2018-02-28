const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');



// Listeners
cargarEventListeners();

function cargarEventListeners() {
    cursos.addEventListener('click', comprarCurso);
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
}