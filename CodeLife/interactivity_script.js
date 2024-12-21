
const menuLinks = document.querySelectorAll('.barra-de-navegacion a');
const botonIngresar = document.querySelector('.boton-Ingresar button');
const botonesComprarCurso = document.querySelectorAll('.comprar-curso');
const comentarios = document.querySelectorAll('.grid .item1, .grid .item2, .grid .item3');
const form = document.querySelector('.datos');
const etiquetasCursos = document.querySelectorAll('.curso');

document.addEventListener('DOMContentLoaded', function() {
  let cartCount = 0;
  const cartItems = [];

  // Elementos del DOM
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.getElementById('cart-modal');
  const cartItemsList = document.getElementById('cart-items');
  const closeModal = document.querySelector('.close');

  // Evento para el botón de compra
  const buyButton = document.querySelector('.buy-button');
  if (buyButton) {
    buyButton.addEventListener('click', function() {
      addToCart('Producto predeterminado');
    });
  }

  // Evento para los enlaces de ancla "comprar curso"
  const comprarCursoLinks = document.querySelectorAll('.comprar-curso');
  if (comprarCursoLinks.length) {
    comprarCursoLinks.forEach(function(anchor) {
      anchor.addEventListener('click', function(event) {
        event.preventDefault();
        addToCart('Curso');
      });
    });
  }

  // Función para agregar productos al carrito
  function addToCart(product) {
    cartItems.push(product);
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    updateCartDisplay();
  }

  // Función para eliminar productos del carrito
  function removeFromCart(index) {
    cartItems.splice(index, 1);
    cartCount--;
    document.getElementById('cart-count').textContent = cartCount;
    updateCartDisplay();
  }

  // Mostrar el modal del carrito
  cartIcon.addEventListener('click', function() {
    cartModal.style.display = 'block';
  });

  // Cerrar el modal del carrito
  closeModal.addEventListener('click', function() {
    cartModal.style.display = 'none';
  });

  // Actualizar la visualización del carrito
  function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    cartItems.forEach(function(item, index) {
      const li = document.createElement('li');
      li.textContent = item;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Eliminar';
      removeButton.addEventListener('click', function() {
        removeFromCart(index);
      });
      li.appendChild(removeButton);
      cartItemsList.appendChild(li);
    });
  }

  // Cerrar el modal al hacer clic fuera de él
  window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });
});


// Carrusel de comentarios
let comentarioActivo = 0;
function mostrarComentario(index) {
  comentarios.forEach((comentario, i) => {
    if (i === index) {
      comentario.style.display = 'block';
      comentario.style.opacity = '1';
      comentario.style.transition = 'opacity 0.5s ease-in-out';
    } else {
      comentario.style.display = 'block';
      comentario.style.opacity = '0.5';
      comentario.style.transition = 'opacity 0.5s ease-in-out';
    }
  });
}
mostrarComentario(comentarioActivo);

setInterval(() => {
  comentarioActivo = (comentarioActivo + 1) % comentarios.length;
  mostrarComentario(comentarioActivo);
}, 5000);

// tiquetas de los cursos
etiquetasCursos.forEach(curso => {
  curso.addEventListener('mouseover', () => {
    curso.style.transform = 'scale(1.1)';
    curso.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    curso.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });
  curso.addEventListener('mouseout', () => {
    curso.style.transform = 'scale(1)';
    curso.style.boxShadow = 'none';
  });
});