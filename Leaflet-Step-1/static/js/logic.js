d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {


  var earthquakes = data.features;
  var numEarthquake = earthquakes.length;

  var myMap = L.map("map", {
      center: [34.0522, -118.2437],
      zoom: 4
    });


  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    minZomo: 3,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);






  // console.log(earthquakes[0].geometry.coordinates);
  // console.log(earthquakes[0].geometry.coordinates[0]);
  // console.log(earthquakes[0].properties.place);
  
  for (let i = 0; i < numEarthquake ; i++) {

    console.log(earthquakes[i].geometry.coordinates[2]);

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
    }).bindPopup("<h2>" + earthquakes[i].properties.place + "</h2> <hr>" + "<h3> Magnitude: " + earthquakes[i].properties.mag + "</h3>")
    .addTo(myMap);
  }


});