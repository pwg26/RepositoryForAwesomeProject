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
});
