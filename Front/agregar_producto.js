window.onload = function () {
    var nombre_producto = document.getElementById('nombreProducto');
    var precio_producto = document.getElementById('precioProducto');
    var disponible_producto = document.getElementById('disponible');
    var crear = document.getElementById('btnCrear');
    crear.onclick = function (e) {
        e.preventDefault();
        let data = {
            nombre: nombre_producto.value,
            precio: precio_producto.value,
            disponible: disponible_producto.checked
        }
        fetch('https://webinar-codigo.herokuapp.com/agregar_producto',{
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        }).then((rpta)=>{
            return rpta.json();
        }).then((data)=>{
            if(data.ok){
                nombre_producto.value= '';
                precio_producto.value = '';
                disponible_producto.checked = false;
                alert(data.message)
            }
        }).catch((error)=>{
            alert('No se pudo conectar con el servidor, valide la conexión.')
        })   
    }
    
}