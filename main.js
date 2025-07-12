let carrito = [];
let productos = [];

// 1) Cargar datos desde data.json
async function cargarDatos() {
  try {
    const resp = await fetch('data.json');
    const data = await resp.json();
    productos = data.productos;
    renderizarProductos();
    renderizarCarrito();
  } catch (e) {
    console.error('Error cargando datos:', e);
    Toastify({
      text: 'Error cargando productos',
      duration: 3000,
      gravity: 'top',
      position: 'right'
    }).showToast();
  }
}

// 2) Mostrar productos
function renderizarProductos() {
  const cont = document.getElementById('productos');
  cont.innerHTML = '';
  productos.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <p>Precio: $${prod.precio.toFixed(2)}</p>
      <input type="number" min="1" max="${prod.stock}" value="1" id="cantidad-${prod.id}">
      <button id="add-${prod.id}">Agregar al carrito</button>
    `;
    cont.appendChild(div);
    document.getElementById(`add-${prod.id}`)
      .addEventListener('click', () => agregarAlCarrito(prod.id));
  });
}

// 3) Agregar al carrito
function agregarAlCarrito(id) {
  const qty = parseInt(document.getElementById(`cantidad-${id}`).value);
  const prod = productos.find(p => p.id === id);
  if (qty < 1 || qty > prod.stock) {
    return Toastify({
      text: 'Cantidad inválida o stock insuficiente',
      duration: 3000,
      gravity: 'top',
      position: 'right'
    }).showToast();
  }
  const existe = carrito.find(i => i.id===id);
  if (existe) {
    if (existe.cantidad + qty > prod.stock) {
      return Toastify({
        text: 'Excede stock disponible',
        duration: 3000,
        gravity: 'top',
        position: 'right'
      }).showToast();
    }
    existe.cantidad += qty;
  } else {
    carrito.push({ id, cantidad: qty });
  }
  Toastify({
    text: 'Producto agregado al carrito',
    duration: 2000,
    gravity: 'top',
    position: 'right'
  }).showToast();
  renderizarCarrito();
}

// 4) Mostrar carrito
function renderizarCarrito() {
  const cont = document.getElementById('carrito');
  cont.innerHTML = '';
  if (!carrito.length) {
    cont.innerHTML = '<p>Tu carrito está vacío</p>';
    return;
  }
  carrito.forEach(item => {
    const prod = productos.find(p => p.id===item.id);
    const div = document.createElement('div');
    div.className = 'item-carrito';
    div.innerHTML = `
      <h4>${prod.nombre}</h4>
      <p>Cantidad: ${item.cantidad}</p>
      <p>Subtotal: $${(prod.precio*item.cantidad).toFixed(2)}</p>
      <button id="remove-${item.id}">Eliminar</button>
    `;
    cont.appendChild(div);
    document.getElementById(`remove-${item.id}`)
      .addEventListener('click', () => eliminarDelCarrito(item.id));
  });
}

// 5) Eliminar del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(i=> i.id!==id);
  renderizarCarrito();
  Toastify({
    text: 'Producto eliminado',
    duration: 2000,
    gravity: 'top',
    position: 'right'
  }).showToast();
}

// 6) Finalizar
function checkout() {
  if (!carrito.length) {
    return Toastify({
      text: 'Tu carrito está vacío',
      duration: 2000,
      gravity: 'top',
      position: 'right'
    }).showToast();
  }
  Toastify({
    text: 'Compra realizada con éxito!',
    duration: 3000,
    gravity: 'top',
    position: 'right'
  }).showToast();
  carrito = [];
  renderizarCarrito();
}

// 7) Inicialización
document.getElementById('checkout')
  .addEventListener('click', checkout);

document.addEventListener('DOMContentLoaded', () => {
  cargarDatos();

  // Inicializar Glide
  new Glide('.glide__container', {
    type: 'carousel',
    autoplay: 3000,
    hoverpause: true,
    perView: 1
  }).mount();
});
