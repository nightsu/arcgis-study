require(["esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function (Map, MapView, FeatureLayer) {
    var map = new Map({
        basemap: "topo-vector"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700],
        zoom: 13
    });

    const trailheadsRenderer = {
        "type": "simple",
        "symbol": {
            "type": "picture-marker",
            "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            "width": "18px",
            "height": "18px"
        }
    };
    const trailheadsLabels = {
        symbol: {
            type: "text",
            color: "#FFFFFF",
            haloColor: "#5E8D74",
            haloSize: "2px",
            font: {
                size: "12px",
                family: "noto-sans",
                style: "italic",
                weight: "normal"
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.TRL_NAME"
        }
    };

    // Define a popup for Trailheads
    // Define popup for Parks and Open Spaces
    var popupOpenspaces = {
        "title": "{PARK_NAME}",
        "content": [{
            "type": "fields",
            "fieldInfos": [{
                    "fieldName": "TRL_NAME",
                    "label": "TRL_NAME",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },
                {
                    "fieldName": "CITY_JUR",
                    "label": "CITY_JUR",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },
                {
                    "fieldName": "ELEV_FT",
                    "label": "ELEV_FT",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },
                {
                    "fieldName": "PARKING",
                    "label": "PARKING",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                        "places": 2,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "text-box"
                }
            ]
        }]
    }

    let layer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
        renderer: trailheadsRenderer,
        labelingInfo: [trailheadsLabels],
        outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
        popupTemplate: popupOpenspaces
    });
    map.add(layer);
    layer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        definitionExpression: "ELEV_GAIN < 250"
    });
    map.add(layer);
});