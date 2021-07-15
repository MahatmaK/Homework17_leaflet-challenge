d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {

    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 5
      });


    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);




    var earthquakes = data.features;
    var numEarthquake = earthquakes.length;

    console.log(earthquakes[0].geometry.coordinates);
    console.log(earthquakes[0].geometry.coordinates[0]);
    console.log(earthquakes[0].properties.place);
    
    for (let i = 0; i < numEarthquake ; i++) {

      var marker = L.circle([earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]], {
        color: "green",
        fillColor: "green",
        fillOpacity: 0.75,
        radius: 10000
      }).bindPopup("<h2>" + earthquakes[i].properties.place + "</h2> <hr>" + "<h3> Magnitude: " + earthquakes[i].properties.mag + "</h3>")
      .addTo(myMap);
    }


});