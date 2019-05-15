require(["esri/Map",
    "esri/views/MapView",
    "esri/layers/Layer",
    "esri/core/promiseUtils"
], function (Map, MapView,Layer,promiseUtils) {
    var map = new Map({
        basemap: "topo-vector"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700],
        zoom: 13
    });
    var trailheads = Layer.fromPortalItem({
        portalItem: {
          id: "2e4b3df6ba4b44969a3bc9827de746b3"
        }
      });
    // Trails
    var trails = Layer.fromPortalItem({
        portalItem: {
          id: "6b8ca89d2bd2418f8b91b030f9832ab8"
        }
      });

    // Parks
    var parks = Layer.fromPortalItem({
        portalItem: {
          id: "fbca9c87feb94ba5b00411b3a00809f3"
        }
      });

    promiseUtils.eachAlways([trailheads, trails, parks])
      .then(function(promises){
        for (var i = 0; i < promises.length; i++){
          map.add(promises[i].value,0);
        }
      });
});