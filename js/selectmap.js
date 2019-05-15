require(["esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery"
], function (Map, MapView, BasemapToggle, BasemapGallery) {
    var map = new Map({
        basemap: "topo-vector"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 5,
        center: [15, 65]
    });
    var basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "satellite"
    });
    var basemapGallery = new BasemapGallery({
        view: view,
        source: {
            portal: {
                url: "https://www.arcgis.com",
                useVectorBasemaps: true // Load vector tile basemaps
            }
        }
    });
    view.ui.add(basemapToggle, "bottom-right");
    view.ui.add(basemapGallery, "top-right");
});