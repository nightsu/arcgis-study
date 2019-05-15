require(["esri/Map",
        "esri/views/MapView",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch",
    ],
    function (Map, MapView, GraphicsLayer, Sketch) {
        var graphicsLayer = new GraphicsLayer();
        var map = new Map({
            basemap: "topo-vector",
            layers: [graphicsLayer]
        });
        var view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-118.80543, 34.02700],
            zoom: 13
        });
        var sketch = new Sketch({
            layer: graphicsLayer,
            view: view
        });
        //*** Red stroke, 1px wide ***//
        var stroke = {
            color: [255, 0, 0],
            width: 1
        }

        //*** White fill color with 50% transparency ***//
        var fillColor = [255, 255, 255, .5];

        //*** Override all of the default symbol colors and sizes ***//
        var pointSymbol = sketch.viewModel.pointSymbol;
        pointSymbol.color = fillColor;
        pointSymbol.outline = stroke;
        pointSymbol.size = 8;

        var polylineSymbol = sketch.viewModel.polylineSymbol;
        polylineSymbol.color = stroke.color;
        polylineSymbol.width = stroke.width;

        var polygonSymbol = sketch.viewModel.polygonSymbol;
        polygonSymbol.color = fillColor;
        polygonSymbol.outline = stroke;
        view.ui.add(sketch, "top-right");
    }
);
