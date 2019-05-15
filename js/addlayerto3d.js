require(["esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer"
], function (Map, SceneView,FeatureLayer) {
    var map = new Map({
        basemap: "topo-vector"
    });
    var view = new SceneView({
        container: "viewDiv",
        map: map,
        zoom: 5,
        center: [15, 65]
    });
    layer=new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        definitionExpression: "ELEV_GAIN < 250"
    });
    map.add(layer);
     //*** ADD ***//
     view.when(function(){
        view.goTo({
          center: [-118.80543,34.02700],
          zoom: 13,
          tilt: 70
        })
      });
});