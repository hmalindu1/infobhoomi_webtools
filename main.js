window.onload = init;

function init() {

  const container = document.getElementById('popup-container');
  const content = document.getElementById('popup-content');
  const closer = document.getElementById('popup-closer');

  const overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };

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
    overlays: [overlay],
    target: 'js-map',
    keyboardEventTarget: document
  });

  map.on('singleclick', function(e) {
    const coordinate = e.coordinate;
    content.innerHTML = '<p>You clicked here:</p><code>' + coordinate + '</code>';;
    overlay.setPosition(coordinate);
  });

  const drag_rotate_interaction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly
  });

  map.addInteraction(drag_rotate_interaction);

  const draw_interaction = new ol.interaction.Draw({
    type: 'Polygon',
    freehand: true
  });

  map.addInteraction(draw_interaction);

  draw_interaction.on('drawend', function(e) {
    let parser = new ol.format.GeoJSON();
    let drawn_features = parser.writeFeaturesObject([e.feature]);
    console.log(drawn_features.features[0].geometry.coordinates);
  });
}