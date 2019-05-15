require(["esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol"
    ],
    function (Map, MapView, Graphic,Point,SimpleMarkerSymbol) {
        var map = new Map({
            basemap: "topo-vector",
        });
        var view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-118.80543, 34.02700],
            zoom: 13
        });
       // Create a point
       var point = new Point({
        longitude: -118.29507,
        latitude: 34.13501
      });

      // Create a symbol for drawing the point
      var markerSymbol = new SimpleMarkerSymbol({
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      });


       //*** ADD ***//
      // Create attributes
      var attributes = {
        Name: "I am a point",
        Park: "Griffith Park",
        City: "Los Angeles"
      };

      // Create pop-up template
      var popupTemplate = {
        title: "{Name}",
        content: "I am located in <b>{Park}</b> in the city of <b>{City}</b>."
      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        //*** ADD ***//
        attributes: attributes,
        popupTemplate: popupTemplate
      });

      // Add the graphic to the view
      view.graphics.add(pointGraphic);
      view.when(function(){
        view.goTo({
            target: view.graphics.toArray()
        });
      })
    }
);
