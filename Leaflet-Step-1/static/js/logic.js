  // Define map
  var myMap = L.map("map", {
      center: [34.0522, -118.2437],
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

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  var earthquakes = data.features;
  var numEarthquake = earthquakes.length;
  
  

  // geojson = L.choropleth(data, {

  //   valueProperty: geometry.coordinates[2],
  //   scale: ["rgb(163, 246, 0)", "rgb(163, 246, 0)"],
  //   steps: 6,
  //   mode: "q",
  //   style: {
  //     color: "black",
  //     weight:1, 
  //     fillOpacity:1,
  //   },

  //   onEachFeature: function(fea


  // })
  
  for (let i = 0; i < numEarthquake ; i++) {

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



    var marker = L.circleMarker([earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]], {
      color: "black",
      weight: .5,
      fillColor: color,
      fillOpacity: 1,
      radius: earthquakes[i].properties.mag * 2
    }).bindPopup("<h2>" + earthquakes[i].properties.place + "</h2> <hr>" + "<h3> Magnitude: " + earthquakes[i].properties.mag + "</h3>" + "<h3> Depth: " + earthquakes[i].geometry.coordinates[2] + "</h3>")
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

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [-10, 10, 30, 50, 70, 90],
    labels = [];

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
    return div;
  };

  legend.addTo(myMap);

});
    