window.onload = init;

function init() {

  const map = new ol.Map({
    view: new ol.View({
      projection: 'EPSG:4326',
      center: [80.998158, 6.825878], // remeber to set latlon in 'lon' first and 'lat' scecond
      zoom: 12
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'js-map',
  });
}