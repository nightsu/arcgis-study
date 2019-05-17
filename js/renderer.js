require(["esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
], function (
    Map, MapView,FeatureLayer) {


    var layerURL = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/WorldCities/FeatureServer/0";


    var layer = new FeatureLayer({
        url: layerURL,
        renderer: {
            type: "simple", 
            symbol:{
                type: "simple-marker", 
                style: "diamond",
                color: [255, 128, 45],
                outline:{
                    style: "dash-dot",
                    color: [0, 0, 0]
                }
            }
        }
    });

    var map=new Map({
        basemap:"streets-vector",
        layers:[layer]
    });
    new MapView({
        container:"viewDiv",
        map:map
    });
});