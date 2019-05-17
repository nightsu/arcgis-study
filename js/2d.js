require(["esri/Map",
    "esri/views/MapView",
    "esri/geometry/Point"
], function (Map, MapView, Point) {
    var map = new Map({
        basemap: "streets-vector"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 5,
        center: [15, 65],
        alphaCompositingEnabled: true,
    });

    var target = new Point({
        latitude: 15,
        longitude: 65
    });

    // view.when(function(){
        window.setTimeout(function(){
             view.goTo(target);
        },5000);
      }
      
        // This function will execute if the promise is rejected due to an error
       
);
