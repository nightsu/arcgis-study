require(["esri/Map","esri/views/SceneView"],function(Map,SceneView){
    var map = new Map({
        basemap: "topo-vector"
      });
  
      //*** ADD ***//
      //var view = new MapView({
      var view = new SceneView({
        container: "viewDiv",
        map: map,
        //*** ADD ***//
        //center: [-118.71511,34.09042],
        //zoom: 15,
        camera: {
          tilt: 65,
          position: {
            x: -118.71,
            y: 33.75,
            z: 25000 // meters
          }
        }
    });
});