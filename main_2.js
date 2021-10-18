window.onload = init;

function init() {

  const map = new ol.Map({
    view: new ol.View({
      projection: 'EPSG:4326',
      center: [80.998158, 6.825878], // remeber to set latlon in 'lon' first and 'lat' scecond
      zoom: 12,
      extent: [79.60507728159328, 5.87518664626196, 81.9021271806201, 9.873768101066211]
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: true,
        extent:[79.60507728159328, 5.87518664626196, 81.9021271806201, 9.873768101066211],
        opacity:1
      })
    ],
    target: 'js-map',
  });
  // Layer Groupa
  const layer_group = new ol.layer.Group({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        zIndex: 0,
        visible: true,
        extent: [79.60507728159328, 5.87518664626196, 81.9021271806201, 9.873768101066211],
        opacity: 1
      })
    ]
  });

  map.addLayer(layer_group);

  map.on('click', function(e) {
    console.log(e.coordinate);
  })
}