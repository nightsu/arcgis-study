require(["esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/layers/FeatureLayer"
], function (Map, MapView, Search, FeatureLayer) {
  var trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
  });
  var map = new Map({
    basemap: "topo-vector",
    layers: [trailsLayer]
  });


  //*** ADD ***//
  // Add the trailheads as a search source

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 5,
    center: [15, 65]
  });
  let search = new Search({
    view: view
  });
  search.sources.push({
    featureLayer: trailsLayer,
    searchFields: ["TRL_NAME"],
    displayField: "TRL_NAME",
    exactMatch: false,
    outFields: ["TRL_NAME", "PARK_NAME"],
    resultGraphicEnabled: true,
    name: "Trailheads",
    placeholder: "Santa",
  });
  view.ui.add(search, "bottom-right");

  view.on("click", function (event) {
    search.clear();
    view.popup.clear();
    if (search.activeSource) {
      var geocoder = search.activeSource.locator; // World geocode service
      console.log(event.mapPoint);
      geocoder.locationToAddress(event.mapPoint)
        .then(function (response) { // Show the address found
          var address = response.address;
          showPopup(address, event.mapPoint);
        }, function (err) { // Show no address found
          showPopup("No address found.", event.mapPoint);
        });
    }

  });

  function showPopup(address, pt) {
    view.popup.open({
      title: +Math.round(pt.longitude * 100000) / 100000 + "," + Math.round(pt.latitude * 100000) / 100000,
      content: address,
      location: pt
    });
  }
});