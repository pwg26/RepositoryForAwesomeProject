var cityName = "Denver";
var apiKey =
  "pk.eyJ1IjoiY3pvZWxsZXIiLCJhIjoiY2trb2N0cmRxMDk5eDJ2cGNtNWJtNW43NyJ9.h0-nqul__11A8sAYcrsCGg";
var curl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  cityName +
  ".json?types=place&country=US&access_token=" +
  apiKey;

var map;
var long;
var lat;
var zoom;
var center;
var schoolLoc;

function schoolFilter() {
  schoolLoc = [];
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
      schoolLoc.push(school.center);

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
    console.log(schoolLoc);
    map = map.fitBounds(bounds, { padding: 45 });
  });
}

$.ajax({
  url: curl,
  method: "GET",
}).then(function (response) {
  console.log(response);
  var marker = new mapboxgl.Marker();
  mapboxgl.accessToken = apiKey;
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/outdoors-v11", // stylesheet location
    center: response.features[0].center, // starting position [lng, lat]
    zoom: 11, // starting zoom
    trackResize: true,
  });
  var cent = new mapboxgl.Marker({ color: "#FF0000" })
    .setLngLat(response.features[0].center)
    .addTo(map);
  long = response.features[0].center[0];
  lat = response.features[0].center[1];
  zoom = map.getZoom();
  center = map.getCenter();
  schoolFilter();

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

  $("#schools").click(function () {
    var visibility = map.getLayoutProperty("schools", "visibility");

    // toggle layer visibility by changing the layout object's visibility property
    if (visibility === "visible") {
      map.setLayoutProperty("schools", "visibility", "none");
      //this.className = "";
    } else {
      //this.className = "active";
      map.setLayoutProperty("schools", "visibility", "visible");
    }
  });

  map.on("moveend", function (e) {
    if (e.originalEvent) {
      return;
    }
    zoom = map.getZoom();
    center = map.getCenter();
    if (!map.getSource("school-data")) {
      map.addSource("school-data", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "MultiPoint",
            coordinates: schoolLoc,
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
    }
  });
});
