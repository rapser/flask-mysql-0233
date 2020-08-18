let traerDatos = (contenedor) => {
    fetch('https://webinar-codigo.herokuapp.com/productos').then((rpta) => {
        return rpta.json();
    }).then((data) => {
        console.log(data);
        console.log(data.message);
        contenedor.innerHTML = '';
        if (data.content) {
            console.log(data.content);
            for (let index = 0; index < data.content.length; index++) {
                console.log(data.content[index]);
                let disponible = ''
                if (data.content[index].disponible) {
                    disponible = '<p class="card-text text-success">Disponible</p>';
                } else {
                    disponible = '<p class="card-text text-danger">No Disponible</p>';
                }
                contenedor.innerHTML += `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body bg-light">
                    <h5 class="card-title">${data.content[index].nombre}</h5>
                    <button type="button" class="close text-danger" aria-label="Close" onclick="eliminar(${data.content[index].id})">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <p class="card-text">Precio: S/ ${data.content[index].precio}</p>
                        ${disponible}
                </div>
            </div>`
            }
        }else{
            if(data.message){
                contenedor.innerHTML += `<div class="col-12"><p class="text-center text-light">${data.message}</p></div> `
            }else{
                contenedor.innerHTML += `<div class="col-12"><p class="text-center text-light">No hay productos, agregue uno.</p></div> `
            }
        }
    }).catch((error)=>{
        console.log(error);
        console.log('No hay server');
        contenedor.innerHTML += `<div class="col-12"><p class="text-center text-danger">No se pudo conectar con el servidor, valide la conexión.</p></div> `
    });
}

window.onload = function () {
    var contenedor = document.getElementById('contenedor');
    traerDatos(contenedor);
}
function eliminar(index) {
    var contenedor = document.getElementById('contenedor');
    fetch(`https://webinar-codigo.herokuapp.com/producto/${index}`).then((rpta) => {
        return rpta.json();
    }).then((data) => {
        console.log(data);
        alert(data.message);
        traerDatos(contenedor);
    });

}