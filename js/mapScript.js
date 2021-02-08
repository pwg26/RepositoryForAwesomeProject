//a global variable to hold the function that gets called from the census returns
var move;

//makes sure the window has loaded everything to display our map properly
//otherwise it clips through other elements and isn't always properly sized
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

  //function that sets the geocoding api to the correct place
  function setUrl(city) {
    curl =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      city +
      ".json?types=place&country=US&access_token=" +
      apiKey;
  }

  //initializes the map and adds map listener(s)
  function init() {
    setUrl(cityName);
    $.ajax({
      url: curl,
      method: "GET",
    }).then(function (response) {
      //sets mapboxaccess token and builds a map from their api
      mapboxgl.accessToken = apiKey;
      map = new mapboxgl.Map({
        container: "mapLocation",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: response.features[0].center, // starting position [lng, lat]
        zoom: 11, // starting zoom
        trackResize: true,
      });

      //places a red marker at the location the map is set to
      centMark = new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat(response.features[0].center)
        .addTo(map);

      //saves variables for the maps center coordinates
      //used to save map window info, can be used to undo any user map movements
      long = response.features[0].center[0];
      lat = response.features[0].center[1];

      zoom = map.getZoom();
      center = map.getCenter();

      //makes the map layer that displays school locations and names
      schoolFilter();

      // listener that runs when the map has finished moving
      map.on("moveend", function (e) {
        //checks if the movement was from user input,
        //only runs if the movement was initiated by a function call
        if (e.originalEvent) {
          return;
        }
        //sets the saved variables to the finished movement state
        zoom = map.getZoom();
        center = map.getCenter();

        //mapbox movements allow custom event options, checks what movement initiated the move
        //runs a specific function, prevents issues from event listener interuptions

        // the "fit" form just checks to make sure the schools layer is correct/initialized
        // is triggered from the schoolFilter function
        if (e.form == "fit") {
          moveHandler();

          //the "set" form searches for the schools around a location
          // is triggered from the move function
        } else if (e.form == "set") {
          schoolFilter(e.city);
        }
      });
    });
  }

  //checks if the school layer exists and is for the current city
  //makes a map layer with the locations of the 5 closest schools
  //can be expanded to display other places in the future
  function checkSchools(city = cityName) {
    //checksif the map layer/source has been created
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
      //checks if the city passed to the function is different to the saved current city
    } else if (city != cityName) {
      //removes the old map layer/source
      map.removeLayer("school-data");
      map.removeSource("school-data");
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
    }
  }

  //searches for and displays information for the 5 closest schools to the map's center, which is the searched location
  function schoolFilter(city = cityName) {
    //clears any previous school locations
    schoolLoc = [];
    var schools =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/high school.json?proximity=" +
      long +
      "," +
      lat +
      "&access_token=" +
      apiKey;

    // calls the mapbox geocoding api to search for the high schools closest to the current location
    $.ajax({
      url: schools,
      method: "GET",
    }).then(function (response) {
      // an array that holds the coords for a bounding box that ensures all the schools are displayed on the screen
      var bounds = [lat, lat, long, long];
      //empties the display element for the school names
      $(".mapData").empty();
      // makes an ordered list for the schools
      var list = $("<ol>");
      //puts the header into the school display area
      $(".mapData").append(
        $("<h5>").text("5 Closest Schools").attr("style", "text-align: center")
      );
      //loops through all of the call responses, which are schools in order of distance from search location
      response.features.forEach(function (school) {
        //pushes the coords of the school to the list that is used to build the display layer for the map
        schoolLoc.push(school.center);

        //appends the schools name/address to the ordered list,
        list.append($("<li>").text(school.place_name));

        //checks the coordinates of each school against the bounds coordinates to ensure they all fit on the screen
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
      //adds the list to the display element
      $(".mapData").append(list);
      //uses a temperary variable to save the searched city for future checks
      tempCity = city;
      //changes the bounds of the map to display all the schools on screen
      //adds padding so the points aren't on the edge of the map
      //passes custom attributes to the event that triggers from the call
      map.fitBounds(bounds, { padding: 45 }, { form: "fit" });
    });
  }

  //a helper function that gets called from the map moveend listener
  //ensures the listener doesn't interupt other code, makes execution more linear
  // runs the full school search api call
  function moveHandler() {
    //checks the schools layer against the just searched city
    checkSchools(tempCity);
    //changes the current city to the search value
    cityName = tempCity;
  }

  //initializes the global move function
  //takes in the city and state from the census api return
  //makes sure the map need to move before executing possibly unnecessary code
  move = function (city) {
    //checks if the searched city is the same as the current one
    //also checks if the user has moved the map away from the default location of the search
    if (city == cityName && center.distanceTo(map.getCenter()) == 0) {
      return;
    }
    //sets the search url to the current city
    setUrl(city);
    $.ajax({
      url: curl,
      method: "GET",
    }).then(function (response) {
      //sets the central coords to the new location
      long = response.features[0].center[0];
      lat = response.features[0].center[1];
      //moves the marker the tracks the searched city's set location
      centMark.setLngLat(response.features[0].center);
      //moves the map to the new location, resets the pitch and bearing to the default,
      //map defaults to north facing, flat to the screen
      map.jumpTo(
        { center: response.features[0].center, pitch: 0, bearing: 0 },
        { form: "set", city: city }
      );
    });
  };
  init();
});
