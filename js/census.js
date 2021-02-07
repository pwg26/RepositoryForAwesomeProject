// let searchHistory = getSearchHistory();

// addItemSearchHistory("Denver, Co");

// function that uses u.s. census datat to populate fields
var Locationchange = function (place) {
  var APIkey = "9c2fc26375a5e9fb6d689f41066923c3a7eefec6";
  //   //   US Census API  for median houshold income at state level for past 12 monthes
  var queryURL1 =
    "https://api.census.gov/data/2019/acs/acs5?get=NAME,B25119_001E&for=place:*&in=state:*&key=" +
    APIkey;

  $.ajax({
    url: queryURL1,
    method: "GET",
  }).then(function (response) {
    //console.log(response);

    var arrayplacecity = [];
    var arraymoney = [];
    for (let x = 1; x < response.length; x++) {
      var word = response[x][0].split(",");
      word[0] = word[0].split(" ");
      word[1] = word[1].trim();
      word[0].pop();
      word[0] = word[0].join(" ");

      word = word.join(" ");
      arrayplacecity.push(word);
      arraymoney.push(response[x][1]);
    }
    if (arrayplacecity.includes(place)) {
      console.log(arraymoney[arrayplacecity.indexOf(place)]);

      move(place);
      $("#city-name").text(place);
      $("#income").text(
        "Median Household Income: " + arraymoney[arrayplacecity.indexOf(place)]
      );
    }
  });

  //   US Census API  for % of people with highschool degree or higher
  var queryURL2 =
    "https://api.census.gov/data/2019/acs/acs5/profile?get=NAME,DP02_0067PE&for=place:*&in=state:*&key=" +
    APIkey;

  $.ajax({
    url: queryURL2,
    method: "GET",
  }).then(function (response2) {
    //console.log(response2);

    var arrayplacecity = [];
    var arraysmarts = [];
    for (let x = 1; x < response2.length; x++) {
      var word = response2[x][0].split(",");
      word[0] = word[0].split(" ");
      word[1] = word[1].trim();

      word[0].pop();
      word[0] = word[0].join(" ");

      word = word.join(" ");
      arrayplacecity.push(word);

      arraysmarts.push(response2[x][1]);
    }
    if (arrayplacecity.includes(place)) {
      console.log(arraysmarts[arrayplacecity.indexOf(place)]);
      $("#smarts").text(
        "% of Individuals with Highschool Diploma or Higher: " +
          arraysmarts[arrayplacecity.indexOf(place)]
      );
    }
  });

  //   US census api for % population of 25-35 year olds
  var queryURL3 =
    "https://api.census.gov/data/2019/acs/acs5/profile?get=NAME,DP05_0010PE&for=place:*&in=state:*&key=" +
    APIkey;

  $.ajax({
    url: queryURL3,
    method: "GET",
  }).then(function (response3) {
    //console.log(response3);

    var arrayplacecity = [];
    var arrayage1 = [];
    for (let x = 1; x < response3.length; x++) {
      var word = response3[x][0].split(",");
      word[0] = word[0].split(" ");
      word[1] = word[1].trim();
      word[0].pop();
      word[0] = word[0].join(" ");

      word = word.join(" ");
      arrayplacecity.push(word);
      arrayage1.push(response3[x][1]);
    }
    if (arrayplacecity.includes(place)) {
      console.log(arrayage1[arrayplacecity.indexOf(place)]);
      $("#age1").text(
        "% of Individuals aged 25-34: " +
          arrayage1[arrayplacecity.indexOf(place)]
      );
    }
  });

  //   us census api for % population of 35-44 year olds
  var queryURL4 =
    "https://api.census.gov/data/2019/acs/acs5/profile?get=NAME,DP05_0011PE&for=place:*&in=state:*&key=" +
    APIkey;

  $.ajax({
    url: queryURL4,
    method: "GET",
  }).then(function (response4) {
    // console.log(response4);

    var arrayplacecity = [];
    var arrayage2 = [];
    for (let x = 1; x < response4.length; x++) {
      var word = response4[x][0].split(",");
      word[0] = word[0].split(" ");
      word[1] = word[1].trim();
      word[0].pop();
      word[0] = word[0].join(" ");

      word = word.join(" ");
      arrayplacecity.push(word);
      arrayage2.push(response4[x][1]);
    }
    if (arrayplacecity.includes(place)) {
      console.log(arrayage2[arrayplacecity.indexOf(place)]);
      $("#age2").text(
        "% of Individuals aged 35-44: " +
          arrayage2[arrayplacecity.indexOf(place)]
      );
    }
  });

  // us census total population api
  var queryURL5 =
    "https://api.census.gov/data/2019/pep/population?get=NAME,POP&for=place:*&in=state:*&key=" +
    APIkey;

  $.ajax({
    url: queryURL5,
    method: "GET",
  }).then(function (response5) {
    // console.log(response5);

    var arrayplacecity = [];
    var arraypop = [];
    for (let x = 1; x < response5.length; x++) {
      var word = response5[x][0].split(",");
      word[0] = word[0].split(" ");
      word[1] = word[1].trim();
      word[0].pop();
      word[0] = word[0].join(" ");

      word = word.join(" ");
      arrayplacecity.push(word);
      arraypop.push(response5[x][1]);
    }
    if (arrayplacecity.includes(place)) {
      console.log(arraypop[arrayplacecity.indexOf(place)]);
      $("#pop").text(
        "Total population: " + arraypop[arrayplacecity.indexOf(place)]
      );
    }
  });

  // uses realator api to populate sold property values over past 200 sold

  getAutoComplete(place);
};

if (Object.entries(localStorage).length > 3) {
  for (x = 0; x < Object.entries(localStorage).length - 2; x++) {
    divAdd = $("<div>");
    divAdd.addClass("divider");
    divAdd.addClass("section");
    divAdd.addClass("historyDivs");
    passedsearch = $("<button>");
    passedsearch.addClass("section");
    passedsearch.attr("id", [x] + "memory");
    passedsearch.attr("location", localStorage.getItem([x]));
    passedsearchtext = $("<h6>").text(localStorage.getItem([x]));
    passedsearch.prepend(passedsearchtext);
    $("#input-searches").prepend(divAdd);
    $("#input-searches").prepend(passedsearch);
    $(".section").on("click", function () {
      Locationchange($(this).attr("location"));
    });
  }
}

// fucntion for user input
$("#searchForm").on("submit", function (event) {
  event.preventDefault();
  var userInput = $("#search").val();
  if (userInput == "") {
    return;
  }

  getAutoComplete(userInput);

  divAdd = $("<div>");
  divAdd.addClass("divider");
  divAdd.addClass("section");
  divAdd.addClass("historyDivs");
  $("#search").val("");

  passedsearch = $("<button>");
  passedsearch.addClass("section");
  userInput = userInput.split(/,* /);
  //console.log(userInput);
  var place = "";
  for (i = 0; i < userInput.length - 1; i++) {
    place +=
      " " +
      userInput[i].substr(0, 1).toUpperCase() +
      userInput[i].substr(1).toLowerCase();
  }
  place +=
    " " +
    userInput[userInput.length - 1].substr(0, 1).toUpperCase() +
    userInput[userInput.length - 1].substr(1).toLowerCase();
  place = place.trim();
  //console.log(place);
  passedsearch.attr("location", place);
  passedsearchtext = $("<h6>").text(place);
  passedsearch.prepend(passedsearchtext);
  $("#input-searches").prepend(passedsearch);
  $("#input-searches").prepend(divAdd);
  $(".section").on("click", function () {
    Locationchange($(this).attr("location"));
  });
  localStorage.setItem(Object.entries(localStorage).length - 2, place);
  Locationchange(place);
});

// function that uses realator api's autocomplete to use the state
function getAutoComplete(city) {
  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://realtor.p.rapidapi.com/locations/auto-complete?input=" +
      city.split(" ").join("%20"),
    method: "GET",
    headers: {
      "x-rapidapi-key": "df5268e97cmshe48e4c9ee315bddp136d9djsnbfac66c2f049",
      "x-rapidapi-host": "realtor.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    const city = response.autocomplete[0];
    const obj = {
      city: city.city,
      state_code: city.state_code,
    };
    // addItemSearchHistory(obj);
    getPropertyValues(obj);
  });
}

function getPropertyValues(cityObj) {
  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://realtor.p.rapidapi.com/properties/list-for-sale?state_code=" +
      cityObj.state_code +
      "&city=" +
      cityObj.city.split(" ").join("%20") +
      "&offset=0&limit=200&radius=10&sort=relevance",
    method: "GET",
    headers: {
      "x-rapidapi-key": "df5268e97cmshe48e4c9ee315bddp136d9djsnbfac66c2f049",
      "x-rapidapi-host": "realtor.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    var count = 0;
    var total = 0;
    for (const sold of response.listings) {
      if (!isNaN(sold.price_raw)) count++;
      total += sold.price_raw;
    }
    var average = (total / count).toFixed(2);

    $("#averageSoldPrice").text(
      "Average price sold of past 200 properties: $" + average
    );
  });
}
