require(["esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function (Map, MapView,FeatureLayer) {
    var map = new Map({
        basemap: "topo-vector"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 5,
        center: [15, 65]
    });
    var layer=new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });
    map.add(layer);
    layer=new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        definitionExpression: "ELEV_GAIN < 250"
    });
    map.add(layer);
});