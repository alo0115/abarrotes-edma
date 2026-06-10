document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. LÓGICA DEL BUSCADOR
    // ==========================================================================
    const inputBusqueda = document.querySelector('.search-box input');
    const botonBusqueda = document.querySelector('.search-box button');
    const productos = document.querySelectorAll('.producto-card');

    function filtrarProductos() {
        const textoUsuario = inputBusqueda.value.toLowerCase().trim();

        productos.forEach(producto => {
            const nombreProducto = producto.querySelector('.producto-nombre').textContent.toLowerCase();
            if (nombreProducto.includes(textoUsuario)) {
                producto.style.display = "flex";
            } else {
                producto.style.display = "none";
            }
        });
    }

    if(inputBusqueda) inputBusqueda.addEventListener('input', filtrarProductos);
    if(botonBusqueda) botonBusqueda.addEventListener('click', function(e) {
        e.preventDefault();
        filtrarProductos();
    });


    // ==========================================================================
    // 2. LÓGICA DE CANTIDADES Y WHATSAPP AUTOMÁTICO
    // ==========================================================================
    const telefonoTienda = "528111752323"; // Tu número de WhatsApp con código de país

    productos.forEach(producto => {
        const botonPedido = producto.querySelector('.btn-pedido');
        
        if (botonPedido) {
            botonPedido.addEventListener('click', function(e) {
                e.preventDefault(); // Evita que la página salte
                
                // Obtenemos los datos específicos de ESTA tarjeta de producto
                const nombre = producto.querySelector('.producto-nombre').textContent;
                const cantidad = producto.querySelector('.producto-cantidad').value;
                
                // Validamos que no envíen números negativos o vacíos
                if (cantidad < 1) {
                    alert("Por favor, selecciona al menos 1 producto.");
                    return;
                }

                // Creamos el texto amigable para WhatsApp
                const mensaje = `Hola Abarrotes EDMA, me gustaría pedir:\n- ${cantidad} pz de *${nombre}*`;
                
                // Codificamos el texto para que sea válido en un enlace web
                const mensajeCodificado = encodeURIComponent(mensaje);
                
                // Construimos el enlace final de WhatsApp
                const urlWhatsApp = `https://wa.me/${telefonoTienda}?text=${mensajeCodificado}`;
                
                // Abrimos la pestaña de WhatsApp con el pedido listo
                window.open(urlWhatsApp, '_blank');
            });
        }
    });
});