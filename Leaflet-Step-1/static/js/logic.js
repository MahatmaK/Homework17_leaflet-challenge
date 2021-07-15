  // Define map
  var myMap = L.map("map", {
      center: [34.0522, -118.2437], // centered on Los Angelos
      zoom: 4
    });

  // Add light map tile
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    minZomo: 3,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

var geojson;

// Call data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // Define json features
  var earthquakes = data.features;

  // Calculate number of earthquakes in dataset
  var numEarthquake = earthquakes.length;

  // Iterate through each earthquake is its data
  for (let i = 0; i < numEarthquake ; i++) {

    // Determine which color to give earthquake based on earthquake depth
    var color = "";
    if  (earthquakes[i].geometry.coordinates[2] < 10) {
      color = "rgb(163, 246, 0)";
    } else if (earthquakes[i].geometry.coordinates[2] < 30) {
      color = "rgb(220, 244, 0)";
    } else if (earthquakes[i].geometry.coordinates[2] < 50) {
      color = "rgb(247, 219, 17)";
    } else if (earthquakes[i].geometry.coordinates[2]< 70) {
      color = "rgb(253, 183, 42)";
    } else if (earthquakes[i].geometry.coordinates[2] < 90) {
      color = "rgb(252, 163, 93)";
    } else {
      color = "rgb(255, 95, 101)";
    }



    // Show each earthquake point
    var marker = L.circleMarker([earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]], {
      color: "black",
      weight: .5,
      fillColor: color, // Calcualated from if loop above
      fillOpacity: 1,
      radius: earthquakes[i].properties.mag * 2
    })
    .bindPopup("<h2>" + earthquakes[i].properties.place + "</h2> <hr>" + "<h3> Magnitude: " + earthquakes[i].properties.mag + "</h3>" + "<h3> Depth: " + earthquakes[i].geometry.coordinates[2] + "</h3>")
    .addTo(myMap);
  }


  // LEGEND //
  
  // Define location of legend
  var legend = L.control({position: 'bottomright'});

  // Define getColor function
  function getColor(d) {
    return d > 90 ? "rgb(255, 95, 101)" : 
    d > 70 ? "rgb(252, 163, 93)" :
    d > 50 ? "rgb(253, 183, 42)" : 
    d > 30 ? "rgb(247, 219, 17)" :
    d > 10 ? "rgb(220, 244, 0)" :
             "rgb(163, 246, 0)";
  }

  // Add legend
  legend.onAdd = function () {

    // Create div for legend
    var div = L.DomUtil.create('div', 'info legend');

    // Define our depth ranges
    var depths = [-10, 10, 30, 50, 70, 90];

    // Iterate through each depth and add the corresponding color and text
    for (var i = 0; i < depths.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' + // define color in html
          depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+'); // define text in html
  }
    return div;
  };

  // Add legend to map
  legend.addTo(myMap);

});
    