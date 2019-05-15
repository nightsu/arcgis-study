require(["esri/Map",
    "esri/views/MapView",
    "esri/tasks/Locator",
    "esri/Graphic"
], function (Map, MapView, Locator, Graphic) {
    var map = new Map({
        basemap: "topo-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 5,
        center: [15, 65]
    });
    var places = ["Coffee shop", "Gas station", "Food", "Hotel", "Neighborhood", "Parks and Outdoors"];
    var select = document.createElement("select", "");
    places.forEach(function (p) {
        var option = document.createElement("option");
        option.value = p;
        option.innerHTML = p;
        select.appendChild(option);
    });

    view.ui.add(select, "top-right");
  
    var locator = new Locator({
        url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    });

    // Search for places in center of map when the app loads
    findPlaces(select.value, view.center);

    // Listen for category changes and find places
    select.addEventListener('change', function (event) {
        findPlaces(event.target.value, view.center);
    });

    // Listen for mouse clicks and find places
    view.on("click", function (event) {
        view.hitTest(event.screenPoint)
            .then(function (response) {
                if (response.results.length < 2) { // If graphic is not clicked, find places
                    findPlaces(select.options[select.selectedIndex].text, event.mapPoint);
                }
            })
    });
    // Find places and add them to the map
    function findPlaces(category, pt) {
        locator.addressToLocations({
                location: pt,
                categories: [category],
                maxLocations: 25,
                outFields: ["Place_addr", "PlaceName"]
            })
            .then(function (results) {
                // Clear the map
                view.popup.close();
                view.graphics.removeAll();
                // Add graphics
                results.forEach(function (result) {
                    view.graphics.add(
                        new Graphic({
                            attributes: result.attributes,
                            geometry: result.location,
                            symbol: {
                                type: "simple-marker",
                                color: "#000000",
                                size: "8px",
                                outline: {
                                    color: "#ffffff",
                                    width: "1.5px"
                                }
                            },
                            popupTemplate: {
                                title: "{PlaceName}",
                                content: "{Place_addr}"
                            }
                        }));
                });
            });
    }
});