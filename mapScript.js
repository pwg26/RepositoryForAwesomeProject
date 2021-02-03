var cityName = "Denver";
var apiKey =
  "pk.eyJ1IjoiY3pvZWxsZXIiLCJhIjoiY2trb2N0cmRxMDk5eDJ2cGNtNWJtNW43NyJ9.h0-nqul__11A8sAYcrsCGg";
var curl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  cityName +
  ".json?types=place&country=US&access_token=" +
  apiKey;

$.ajax({
  url: curl,
  method: "GET",
}).then(function (response) {
  console.log(response);
  var marker = new mapboxgl.Marker();
  mapboxgl.accessToken = apiKey;
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/outdoors-v11", // stylesheet location
    center: response.features[0].center, // starting position [lng, lat]
    zoom: 11, // starting zoom
    trackResize: true,
  });
  var cent = new mapboxgl.Marker({ color: "#FF0000" })
    .setLngLat(response.features[0].center)
    .addTo(map);
  var long = response.features[0].center[0];
  var lat = response.features[0].center[1];
  var zoom = map.getZoom();
  var center = map.getCenter();
  var loc = [];
  var schools =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/high school.json?proximity=" +
    long +
    "," +
    lat +
    "&access_token=" +
    apiKey;
  console.log(schools);
  $.ajax({
    url: schools,
    method: "GET",
  }).then(function (response) {
    var bounds = [lat, lat, long, long];
    console.log(response);
    response.features.forEach(function (school) {
      console.log(school.place_name);
      loc.push(school.center);
      //   var schM = new mapboxgl.Marker({ color: "#000000" })
      //     .setLngLat(school.center)
      //     .addTo(map);
      if (school.center[1] > bounds[3]) {
        bounds[3] = school.center[1];
      }
      if (school.center[1] < bounds[1]) {
        bounds[1] = school.center[1];
      }
      if (school.center[0] > bounds[2]) {
        bounds[2] = school.center[0];
      }
      if (school.center[0] < bounds[0]) {
        bounds[0] = school.center[0];
      }
    });
    console.log(loc);
    map = map.fitBounds(bounds, { padding: 45 });
  });
  map.on("click", function (e) {
    // The event object (e) contains information like the
    // coordinates of the point on the map that was clicked.
    console.log(e.lngLat);
    marker.remove();
    marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
    $("#info").text(map.getZoom());
  });
  $("#init").click(function () {
    map.flyTo({ center: center, zoom: zoom });
  });
  map.on("moveend", function (e) {
    if (e.originalEvent) {
      return;
    }
    zoom = map.getZoom();
    center = map.getCenter();
    map.addSource("school-data", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "MultiPoint",
          coordinates: loc,
        },
        properties: {
          title: "school-data",
        },
      },
    });
    console.log("S");
    map.addLayer({
      id: "schools",
      type: "circle",
      source: "school-data",
      layout: {
        visibility: "visible",
      },
      paint: {
        "circle-radius": 8,
        "circle-color": "#000000",
      },
    });
    console.log("S", map.getSource("school-data"));
    console.log("L", map.getLayer("schools"));
  });
});
