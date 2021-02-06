var move;

// const settings = {
//   async: true,
//   crossDomain: true,
//   url:
//     "https://realtor.p.rapidapi.com/schools/list-nearby?lon=-117.937021&lat=35.129431",
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "8d03ef92f1msh064a347ce15d2d7p1ef19bjsn16f97626d9b7",
//     "x-rapidapi-host": "realtor.p.rapidapi.com",
//   },
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

$(window).on("load", function () {
  var cityName = "Denver Colorado";
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
  var centMark;
  var tempCity;
  var swap = true;

  function setUrl(city) {
    curl =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      city +
      ".json?types=place&country=US&access_token=" +
      apiKey;
  }

  function init() {
    setUrl(cityName);
    $.ajax({
      url: curl,
      method: "GET",
    }).then(function (response) {
      mapboxgl.accessToken = apiKey;
      map = new mapboxgl.Map({
        container: "mapLocation",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: response.features[0].center, // starting position [lng, lat]
        zoom: 11, // starting zoom
        trackResize: true,
      });

      centMark = new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat(response.features[0].center)
        .addTo(map);
      long = response.features[0].center[0];
      lat = response.features[0].center[1];

      zoom = map.getZoom();
      center = map.getCenter();

      schoolFilter();

      map.on("moveend", function (e) {
        //console.log("moved");
        if (e.originalEvent) {
          return;
        }
        //console.log(e);
        zoom = map.getZoom();
        center = map.getCenter();
        $(".mapData > p").text("(" + long + ", " + lat + ")");
        if (e.form == "fit") {
          moveHandler();
        } else if (e.form == "set") {
          schoolFilter(e.city);
        }
        //checkSchools();
      });
    });
  }

  function checkSchools(city = cityName) {
    if (!map.getSource("school-data")) {
      //adds a data source to the map using the coordinates of schools
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
      //uses the data source to add dots to the map in their own layer
      map.addLayer({
        id: "school-data",
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
    } else if (city != cityName) {
      map.removeLayer("school-data");
      map.removeSource("school-data");

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
      //uses the data source to add dots to the map in their own layer
      map.addLayer({
        id: "school-data",
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
    }
  }

  function schoolFilter(city = cityName) {
    schoolLoc = [];
    var schools =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/high school.json?proximity=" +
      long +
      "," +
      lat +
      "&access_token=" +
      apiKey;

    $.ajax({
      url: schools,
      method: "GET",
    }).then(function (response) {
      var bounds = [lat, lat, long, long];

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
      //console.log(bounds);
      tempCity = city;
      map.fitBounds(bounds, { padding: 45 }, { form: "fit" });
      //console.log("fit");
    });
  }

  function moveHandler() {
    //console.log("bounded");
    checkSchools(tempCity);
    //console.log("check");
    cityName = tempCity;
  }

  move = function (city) {
    if (city == cityName && center.distanceTo(map.getCenter()) == 0) {
      return;
    }
    console.log(city);
    setUrl(city);
    $.ajax({
      url: curl,
      method: "GET",
    }).then(function (response) {
      //console.log(response);
      long = response.features[0].center[0];
      lat = response.features[0].center[1];
      centMark.setLngLat(response.features[0].center);
      map.jumpTo(
        { center: response.features[0].center, pitch: 0, bearing: 0 },
        { form: "set", city: city }
      );

      //schoolFilter(city);
      //console.log("moved");
    });
  };
  init();

  $("#init").click(function () {
    map.flyTo({ center: center, zoom: zoom }, { form: "fly" });
  });

  $("#schools").click(function () {
    var visibility = map.getLayoutProperty("schools", "visibility");

    // toggle layer visibility by changing the layout object's visibility property
    if (visibility === "visible") {
      map.setLayoutProperty("schools", "visibility", "none");
    } else {
      map.setLayoutProperty("schools", "visibility", "visible");
    }
  });
});
