mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvY2hvY29iYXIiLCJhIjoiY2swdndpbnl1MTI5aDNpbjAzZnRmeWt1OSJ9.aZKzuZ2W1kOUn8gwp2OgfA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 2
});

let geojson = {
  // type: 'FeatureCollection',
  features: []
};


document.getElementById('form').addEventListener('submit', function(e){
  const descripcion = document.getElementById('descripcion').value;
  const direccion = document.getElementById('direccion').value;
  const telefono = document.getElementById('telefono').value;
  const coordX  = parseFloat(document.getElementById('coord-x').value);
  const coordY = parseFloat(document.getElementById('coord-y').value);
  const categoria = document.getElementById('categoria').value;

  let nuevosDatos = {
    geometria: {
      coordenadas: [coordX, coordY]
    },
    datos: {
      titulo: descripcion,
      direccion: direccion,
      telefono: telefono,
      categoria: categoria
    }
  }

  new mapboxgl.Marker()
    .setLngLat(nuevosDatos.geometria.coordenadas)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<p><b>Descripción: </b>${descripcion}</p>
      <p><b>Direccion:</b>${direccion}</p>
      <p><b>Teléfono: </b>${telefono}</p>
      <p><b>Coordenadas: </b>${coordX}, ${coordY}</p>
      <p><b>Categoria: </b>${categoria}</p>`))
    .addTo(map);
    
    
  geojson.features.push(nuevosDatos);

  console.log(geojson.features);

  document.getElementById('form').reset();
  e.preventDefault();

});

