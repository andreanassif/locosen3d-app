const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecTipos = document.getElementById('selecTipos')
const buscador = document.getElementById('search')

let carritoDeCompras = []

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carritoDeCompras')){
        carritoDeCompras = JSON.parse(localStorage.getItem('carritoDeCompras'))
        actualizarCarrito()
    }
})



selecTipos.addEventListener('change',()=>{
    console.log(selecTipos.value);
    if(selecTipos.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        let arrayNuevo = stockProductos.filter(elemento => elemento.tipo === selecTipos.value)
        console.log(arrayNuevo);
        mostrarProductos(arrayNuevo)
    }
})



mostrarProductos(stockProductos)


function mostrarProductos(array){

    contenedorProductos.innerHTML = ""

    array.forEach(el => {
    let div = document.createElement('div')

    div.classList.add('producto')
    div.innerHTML= `<div class="card">
                        <div class="card-image">
                            <img src="${el.img}">
                            <span class="card-title">${el.nombre}</span>
                            <a id="boton${el.id}" class="addCarrito"><i class="material-icons">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>${el.tipo}</p>
                            <p>${el.desc}</p>
                            <span><p> $${el.precio}</p></span>
                        </div>
                    </div>`

    contenedorProductos.appendChild(div)

    let btnAgregar = document.getElementById(`boton${el.id}`)
    
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(el.id);
    })

    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras))

  })


}

function agregarAlCarrito(id) {
   
    let productoAgregar = stockProductos.find(obj=> obj.id === id)
    carritoDeCompras.push(productoAgregar)
    mostrarCarrito(productoAgregar)
    actualizarCarrito()
        
}

function mostrarCarrito(productoAgregar) {

   let div = document.createElement('div')
    div.setAttribute('class', 'productoEnCarrito')
    div.innerHTML=`<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener('click',()=>{
        btnEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id !== productoAgregar.id)
        console.log(carritoDeCompras);
        actualizarCarrito()
    })
}


function  actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.length
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.precio, 0)  
}                                                          

let btnFinCompra = document.getElementById(`finCompra`)
    
    btnFinCompra.addEventListener('click',()=>{
        procesarPago();
    })





