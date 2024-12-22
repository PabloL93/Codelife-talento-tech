//Variables//
const carrito = document.querySelector('#cart-modal');
const listaCursos = document.querySelector("#li_cursos");
const listaCarrito = document.querySelector('#cart-items tbody');
const vaciarCarritoBtn = document.querySelector('.vaciar-carrito');
let articuloCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener("click", comprarCurso);
}

//Funciones//
function comprarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("comprar-curso")) {
        cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso) {
    //Crear un objeto con el contenido del curso actual
    infoCurso = {
        titulo: curso.querySelector('.titulo1').textContent,
        precio: curso.querySelector('.precio').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articuloCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        //Actualizamos la cantidad
        const cursos = articuloCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
               curso.cantidad++;
               return curso;
            } else {
                return curso;
            }
        });
        articuloCarrito = [...cursos]
    } else {
        articuloCarrito = [...articuloCarrito, infoCurso];
    }

    console.log(infoCurso);

    carritoHTML();
}

function carritoHTML() {

    limpiarHTML();

    articuloCarrito.forEach(curso => {
        const { titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>

              ${titulo}

            </td>
            <td>

              ${precio}

            </td>
            <td>

              ${cantidad}

            </td>
            <td>
              <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>

        `;

        listaCarrito.appendChild(row);

    })
}

//Limpiar el HTML //
function limpiarHTML() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}