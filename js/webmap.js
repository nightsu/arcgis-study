require(["esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/ScaleBar"
    ],
    function (WebMap, MapView,Legend,ScaleBar) {
        var map = new WebMap({
            portalItem: {
                id: "41281c51f9de45edaf1c8ed44bb10e30"
            }
        });
        var view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-118.80543, 34.02700],
            zoom: 13
        });
        //*** ADD ***//
        var legend = new Legend({
            view: view
        });
        view.ui.add(legend, "top-right");

        var scalebar = new ScaleBar({
            view: view
        });
        view.ui.add(scalebar, "bottom-left");
    });
