//--------------Variables---------------//
const carrito = document.querySelector('#cart-modal');
const listaCursos = document.querySelector("#li_cursos");
const listaCarrito = document.querySelector('#cart-items tbody');
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito');
const iconoCarrito = document.querySelector('#add-to-cart');
const totalPriceElement = document.querySelector('#total-price');
const abrirbtn = document.querySelector('#menu-icon');
const nav = document.querySelector('#mobile-menu');
const cerrabtn = document.querySelector('#cerrar-boton');
let articuloCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener("click", comprarCurso);

    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {
        articuloCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    });

    //VACIAR CARRITO
    vaciarCarritoBtn.addEventListener("click", () => {

        articuloCarrito = [];

        limpiarHTML();
        sincronizarStorage();

    });

    abrirbtn.addEventListener('click', () => {
    nav.classList.add('visible');
});

cerrabtn.addEventListener('click', () => {
    nav.classList.remove('visible');
});

  // CARRITO EN MENU MOVIL
  document.querySelectorAll('.cart-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        carrito.classList.toggle('visible');
    });
});

}



//--------------FUNCIONES-------------//

//AÑADE UN CURSO
function comprarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("comprar-curso")) {
        cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//ELIMINA UN UN CURSO
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        const existe = articuloCarrito.some(curso => (curso.id === cursoId && curso.cantidad > 1));

        if (existe) {
            const curso = articuloCarrito.map(curso => {
                if (curso.id === cursoId) {
                    curso.cantidad--;

                    return curso;
                }
            });
        } else {
            articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId);
        }

        carritoHTML();
    }
}

//LEE DATOS DEL CURSO
function leerDatosCurso(curso) {
    infoCurso = {
        titulo: curso.querySelector('.titulo1').textContent,
        precio: parseFloat(curso.querySelector('.precio').textContent.replace('$', '').replace(' ARS', '')),
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articuloCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
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
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        listaCarrito.appendChild(row);

    })

    sincronizarStorage();
    actualizarTotalPrice();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articuloCarrito));
    actualizarIconoCarrito();
}

function limpiarHTML() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

//ACTUALIZAR CARRITO
function actualizarIconoCarrito() {
    const cantidadTotal = articuloCarrito.reduce((total, curso) => total + curso.cantidad, 0);
    iconoCarrito.textContent = cantidadTotal;
}

//ACTUALIZA PRECIO FINAL
function actualizarTotalPrice() {
    const totalPrice = articuloCarrito.reduce((total, curso) => total + (curso.precio * curso.cantidad), 0);
    totalPriceElement.textContent = `Total a pagar: $${totalPrice.toFixed(2)} ARS`;
}