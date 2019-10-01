mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvY2hvY29iYXIiLCJhIjoiY2swdndpbnl1MTI5aDNpbjAzZnRmeWt1OSJ9.aZKzuZ2W1kOUn8gwp2OgfA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 2
});

let geojson = {
    features: []
}

class Coordenadas{
    constructor(descripcion, direccion, telefono, coordX, coordY, categoria){
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.coordX = coordX;
        this.coordY = coordY;
        this.categoria = categoria;
    }
}

class Map{
    markerMap(coordenadas){
        let nuevosDatos = {
            geometria: {
              coordenadas: [coordenadas.coordX , coordenadas.coordY]
            },
            datos: {
                descripcion: coordenadas.descripcion,
                direccion: coordenadas.direccion,
                telefono: coordenadas.telefono,
                categoria: coordenadas.categoria
            }
        }   
        
        new mapboxgl.Marker()
            .setLngLat(nuevosDatos.geometria.coordenadas)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<p><b>Descripción: </b>${coordenadas.descripcion}</p>
            <p><b>Direccion:</b>${ coordenadas.direccion}</p>
            <p><b>Teléfono: </b>${coordenadas.telefono}</p>
            <p><b>Coordenadas: </b>${coordenadas.coordX}, ${coordenadas.coordY}</p>
            <p><b>Categoria: </b>${coordenadas.categoria}</p>`))
            .addTo(map);
            
            
        geojson.features.push(nuevosDatos);  
    }


    resetForm(){
        document.getElementById('form').reset();
    }

    mensajeAlerta(mensaje, cssClass){
        const div = document.createElement('div');
        div.className = `container alert alert-${cssClass} alert-own`
        div.appendChild(document.createTextNode(mensaje));

        const body = document.querySelector('#body');
        const formulario = document.querySelector('#formulario');
        body.insertBefore(div, formulario);

        setTimeout(function(){
            document.querySelector('.alert').remove(); 
        },3500);
    }
}




document.getElementById('form').addEventListener('submit', function(e){
    const descripcion = document.getElementById('descripcion').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const coordX  = parseFloat(document.getElementById('coord-x').value);
    const coordY = parseFloat(document.getElementById('coord-y').value);
    const categoria = document.getElementById('categoria').value;

    const coordenadas = new Coordenadas(descripcion, direccion, telefono, coordX, coordY, categoria);
    
    const map = new Map();
    
    if(descripcion === '' || direccion === '' || telefono === '' || isNaN(coordX) || isNaN(coordY)){      
        e.preventDefault();
        return map.mensajeAlerta('Complete los campos necesarios', 'danger');         
    }
    
    map.markerMap(coordenadas);
    map.mensajeAlerta('Agregado Exitosamente', 'success');
    map.resetForm();

    e.preventDefault();

});