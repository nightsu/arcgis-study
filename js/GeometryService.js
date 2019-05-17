require([
    "esri/tasks/GeometryService",
    "esri/tasks/support/ProjectParameters",
    ], function(GeometryService, ProjectParameters) {
  
      var geoService = new GeometryService( "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer" );
  
      var projectParams = new ProjectParameters({
        geometries: [points],            // assuming these are defined elsewhere
        outSR: outSR,
        transformation = transformation
      });
  
      geoService.project(projectParams)
        .then(function(projectedGeoms){
         console.log("projected points: ", projectedGeoms);
        }, function(error){
          console.error(error);
        });
  });