// Selección de elementos
const menuLinks = document.querySelectorAll('.barra-de-navegacion a');
const botonIngresar = document.querySelector('.boton-Ingresar button');
const botonesComprarCurso = document.querySelectorAll('.comprar-curso');
const comentarios = document.querySelectorAll('.grid .item1, .grid .item2, .grid .item3');
const form = document.querySelector('.datos');
const etiquetasCursos = document.querySelectorAll('.curso');

document.addEventListener('DOMContentLoaded', function() {
  let cartCount = 0;

  document.querySelector('.buy-button').addEventListener('click', function() {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
  });
});



// Interacción en el menú de navegación
menuLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = 'blue';
  });
  link.addEventListener('mouseout', () => {
    link.style.color = '';
  });
});

// Botón "Ingresar"
botonIngresar.addEventListener('click', () => {
  alert('¡Bienvenido a CodeLife!');
});

// Botones "Comprar curso"
botonesComprarCurso.forEach(boton => {
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Curso agregado al carrito. ¡Gracias por tu interés!');
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
      comentario.style.display = 'block'; // Para mantener la estructura del carrusel
      comentario.style.opacity = '0.3';
      comentario.style.transition = 'opacity 0.5s ease-in-out';
    }
  });
}
mostrarComentario(comentarioActivo);

setInterval(() => {
  comentarioActivo = (comentarioActivo + 1) % comentarios.length;
  mostrarComentario(comentarioActivo);
}, 5000);

// Efecto interactivo en las etiquetas de los cursos
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

// Validación del formulario de registro
form.addEventListener('submit', (e) => {
  const nombre = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!nombre || !email || password.length < 8) {
    e.preventDefault();
    alert('Por favor, completa todos los campos correctamente.');
  }
});
