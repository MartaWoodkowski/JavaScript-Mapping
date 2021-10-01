// URL which contains the data
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Getting GeoJSON data
d3.json(url).then(function(data) {
    
  var features = data.features

  // A function to determine the marker size based on the magnitude (with 15,000 radius)
  function markerSize(size) {
      return size * 15000;
  }

  // A function to determine the marker color based on the depth
  function markerColor (depth) {
      if (depth <10) return 'rgb(163,243,0)';
      else if (depth <30) return 'rgb(220,244,0)';
      else if (depth <50) return 'rgb(247,219,17)';
      else if (depth <70) return 'rgb(253,183,42)';
      else if (depth <90) return 'rgb(252,163,93)';
      else return 'rgb(229,21,43)';
  }
      
  var earthquakeMarkers = [];

  // Loop through locations, and create the earthquake markers
  features.forEach(function(feature){

    var location=feature.geometry;
    var magnitude = feature.properties.mag;
    var depth = feature.geometry.coordinates[2];

    earthquakeMarkers.push(
      L.circle([location.coordinates[1], location.coordinates[0]], {
        stroke: true,
        fillOpacity: 0.9,
        color: 'black',
        weight: 1,
        fillColor: markerColor(depth),
        radius: markerSize(magnitude)
    }).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${magnitude}</p>`)); 
  });
  


  // Tectonic plates boundaries 
  d3.json('./static/json/PB2002_boundaries.json').then(function(boundaries) {
    var tectonicFeatures = boundaries.features;

    var tectonicMarkers = [];

    tectonicFeatures.forEach(function(line) {

      var tectonicData = line.geometry.coordinates;
      var tectonicLines = [];

      tectonicData.forEach(function (point) {
        tectonicLines.push([point[1], point[0]])
      });

      tectonicMarkers.push(
        L.polyline(
          tectonicLines,
          {
          color: 'rgb(224,114,11)'
        })
      );
    });
  
    var earthquakes = L.layerGroup(earthquakeMarkers);
    var tectonicBoundaries = L.layerGroup(tectonicMarkers);

    

    //1. Adding the grayscale tile layer
    var grayscale = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    });
    
    // Tried another 'grayscale' (requires API, not best when doing GitHub pages)->https://maps.omniscale.com/en/examples/leaflet_grayscale
    // var grayscale = L.tileLayer('https://maps.omniscale.net/v2/'+API_KEY+'/style.grayscale/{z}/{x}/{y}.png', {
    // attribution: '&copy; 2021 &middot; <a href="https://maps.omniscale.com/">Omniscale</a> ' + '&middot; Map data: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });

    //2. Adding the outdoors tile layer
    var outdoors = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    });

    //3. Adding the satellite view tile layer
    var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });



    // Create a baseMaps object
    var baseMaps = {
      'Grayscale': grayscale,
      'Outdoor': outdoors,
      'Satellite': satellite
      };

    // Create an overlay object
    var overlayMaps = {
    'Earthquakes': earthquakes,
    'Tectonic Plates': tectonicBoundaries
    };

    // Define a map object
    var myMap = L.map('map', {
    center: [39.063372634251245, -101.4628654424558],
    zoom: 5,
    layers: [grayscale, earthquakes]
    });

    // Pass our map layers to our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
    


    // Legend
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [-10, 10, 30, 50, 70, 90],
            labels = [];
        // loop through the magnitude intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
  });
  
});
