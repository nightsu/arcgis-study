require(["esri/Map",
    "esri/views/MapView",
    "esri/geometry/Point",
    "esri/Graphic",
    "esri/geometry/geometryEngine"
], function (Map, MapView,Point,Graphic,geometryEngine) {
    var map = new Map({
        basemap: "topo-vector"
    });
  
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700],
        zoom: 13
    });

    let mahouPoint;

    view.when(function(){
      mahouPoint = new Point({
        latitude: 34.000,
        longitude: -118.806,
        spatialReference: view.spatialReference
      });
    });

    let bufferGraphic;
    let lineGraphic;
    var textGraphic;
    var nearestPointGraphic;
    view.on("pointer-move",function(event){
        event.stopPropagation();
        let point = view.toMap(event);
        var buffer = geometryEngine.geodesicBuffer(point, 500, "meters");
        buffer = geometryEngine.densify(buffer, 250, "meters");
        // Draw the buffer
        view.graphics.remove(bufferGraphic);  // Remove graphic
        bufferGraphic = new Graphic({
          geometry: buffer,
          symbol: {
            type: "simple-fill",
            color: "rgba(0,0,0,.15)",
            outline: {
              color: "green",
              width: 2
            }
          }
        });
        view.graphics.add(bufferGraphic); // Add graphic

        view.graphics.remove(lineGraphic);
        lineGraphic = new Graphic({
          geometry: {
            type: "polyline",
            paths: [
              [point.longitude, point.latitude],
              [mahouPoint.longitude, mahouPoint.latitude]
            ]
          },
          symbol: {
            type: "simple-line",
            color: "#333",
            width: 1
          }
        });
        view.graphics.add(lineGraphic);

        var distance = geometryEngine.distance(point, mahouPoint,"miles");

        view.graphics.remove(textGraphic);
        textGraphic = new Graphic({
          geometry: point,
          symbol: {
            type: "text",
            text: distance.toFixed(2) + " miles",
            color: "black",
            font: {
              size: 12
            }
          }
        });
        view.graphics.add(textGraphic);

        var nearestPoint = geometryEngine.nearestVertex(buffer, mahouPoint);

        view.graphics.remove(nearestPointGraphic);
        nearestPointGraphic = new Graphic({
          geometry: nearestPoint.coordinate,
          symbol: {
            type: "simple-marker",
            color: "black",
            size: 6,
            outline: {
              color: "white",
              width: 1
            }
          }
        });
        view.graphics.add(nearestPointGraphic);
    });


});