require(["esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/widgets/Locate",
        "esri/widgets/Track",
        "esri/widgets/Compass"
    ],
    function (Map, MapView, Graphic, Locate, Track,Compass) {
        var map = new Map({
            basemap: "topo-vector"
        });
        var view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-118.80543, 34.02700],
            zoom: 13
        });
        let locate = new Locate({
            view: view,
            useHeadingEnabled: true,
            goToOverride: function (view, options) {
                options.target.scale = 1500;
                return view.goTo(options.target);
            }
        });
        var track = new Track({
            view: view,
            graphic: new Graphic({
                symbol: {
                    type: "simple-marker",
                    size: "9px",
                    color: "green",
                    outline: {
                        color: "#efefef",
                        width: "1.2px"
                    }
                }
            }),
            useHeadingEnabled: false,
            goToLocationEnabed: false,
            goToOverride: function (view, options) {
                options.target.scale = 5000;
                return view.goTo(options);
            }
        });
        //*** ADD ***//
        var compass = new Compass({
            view: view
        });

        // adds the compass to the top left corner of the MapView
        view.ui.add(compass, "top-left");

        view.ui.add(locate, "top-left");
        view.ui.add(track, "top-left");
    }
);
