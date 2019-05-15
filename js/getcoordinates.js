require(["esri/WebMap",
        "esri/views/MapView",
        "esri/widgets/ScaleBar",
        "esri/widgets/CoordinateConversion"
    ],
    function (WebMap, MapView, ScaleBar, CoordinateConversion) {
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

        var scalebar = new ScaleBar({
            view: view
        });
        var coordinateConversionWidget = new CoordinateConversion({
            view: view
        });
        view.ui.add(scalebar, "bottom-left");
        view.ui.add(coordinateConversionWidget, "bottom-right");

    }
);
