# Proyecto Final – Simulador eCommerce

Una aplicación web que simula un proceso completo de compra en línea. Permite:

- **Ver un catálogo** de productos cargados dinámicamente desde un archivo JSON.  
- **Agregar** productos al carrito indicando la cantidad deseada (respetando el stock).  
- **Eliminar** productos del carrito.  
- **Finalizar** la compra con una notificación de éxito.  
- **Interactividad y notificaciones** mediante Toastify (en lugar de `alert`/`prompt`).  
- **Carrusel de promociones** con Glide.js.

---

## 📂 Estructura del proyecto

ProyectoFinal_Luna/
├── img/
│ ├── diapositiva1.png
│ ├── diapositiva2.png
│ ├── diapositiva3.png
│ ├── fondo.png
│ ├── Pantalon.png
│ └── Remera.png
├── data.json
├── index.html
├── style.css
└── main.js

---

## 🚀 Tecnologías

- **HTML5**  
- **CSS3** (Flexbox, fondos con `cover`, hover, etc.)  
- **JavaScript (ES6+)**  
  - `fetch` / `async–await` para cargar `data.json`.  
  - DOM API (`createElement`, `querySelector`, `addEventListener`, etc.).  
- **Toastify.js** para notificaciones personalizadas.  
- **Glide.js** para el carrusel de diapositivas.

---

## ⚙️ Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanCarlosLuna/ProyectoFinal_Luna.git
