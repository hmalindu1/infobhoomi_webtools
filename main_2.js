window.onload = init;

function init() {

  const map = new ol.Map({
    view: new ol.View({
      projection: 'EPSG:4326',
      center: [80.998158, 6.825878], // remeber to set latlon in 'lon' first and 'lat' scecond
      zoom: 2,
      // extent: [79.60507728159328, 5.87518664626196, 81.9021271806201, 9.873768101066211]
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: true,
        // extent:[79.60507728159328, 5.87518664626196, 81.9021271806201, 9.873768101066211],
        opacity: 1
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
        visible: false,
        // extent: [79.60507728159328, 5.87518664626196, 81.9021271806201, 9.873768101066211],
        opacity: 1
      }),
      // Bing Maps Basemap Layer
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: "AshrP2YvBPN60emxJEFYNNNtBYcUAqEJ2J0FctgznIkRgrNnOdbPdRpbht_X7eD8",
          imagerySet: 'AerialWithLabels',
        }),
        zIndex: 2,
        visible: false,
      })
    ]
  });

  map.addLayer(layer_group);

  /* map.on('click', function(e) {
      console.log(e.coordinate);
    })*/

  // CartoDB Basemap Layer
  const cartoDB_base_layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{scale}.png'
    }),
    visible: false
  });

  map.addLayer(cartoDB_base_layer);

  // Tile Debug
  /*const tile_debug_layer = new ol.layer.Tile({
    source: new ol.source.TileDebug()
  });
  map.addLayer(tile_debug_layer);*/

  // tile ArcGIS REST API Layer
  const tileArcGISLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer"
    }),
    visible: false
  })
  map.addLayer(tileArcGISLayer);

  // NOAA WMS Layer
  const noaa_wms_layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WMSServer?',
      params: {
        LAYERS: 1,
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      // attributions: '<a href=https://nowcoast.noaa.gov/>© NOAA</a>'
    }),
    zIndex: 3,
    visible: true
  });
  map.addLayer(noaa_wms_layer);
}