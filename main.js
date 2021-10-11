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

  const popup_container_element = document.getElementById('popup-coordinates');
  const popup = new ol.Overlay({
    element: popup_container_element
  });

  map.addOverlay(popup);

  map.on('click', function(e) {
    const clicked_coordinate = e.coordinate;
    popup.setPosition(undefined);
    popup.setPosition(clicked_coordinate);
    popup_container_element.innerHTML = clicked_coordinate;
  });
}