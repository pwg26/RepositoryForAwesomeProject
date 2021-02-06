var Locationchange = function (place) {
  // $(document).ready(function () {
  //     $('.collapsible').collapsible();
  //     $('select').formSelect();
  //     $('.modal').modal();
  // });

  //   "https://api.census.gov/data/2019/acs/acs5?get=NAME,B25119_001E&for=place:*&key="

  //api.census.gov/data/2019/acs/acs5?get=NAME,B01001_001E&for=county:*

  var APIkey = "9c2fc26375a5e9fb6d689f41066923c3a7eefec6";
  //   //   US Census API  for median houshold income at state level for past 12 monthes
  var queryURL1 =
    "https://api.census.gov/data/2019/acs/acs5?get=NAME,B25119_001E&for=place:*&in=state:*&key=" +
    APIkey;

  console.log(place);

  $.ajax({
    url: queryURL1,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var arrayplacecity = [];
    var arraymoney = [];
    for (let x = 1; x < response.length; x++) {
      var resPlace = "";
      var word = response[x][0].split(" ");
      for (i = 0; i < word.length - 1; i++) {
        if (i != word.length - 2) {
          resPlace +=
            " " +
            word[i].substr(0, 1).toUpperCase() +
            word[i].substr(1).toLowerCase();
        }
      }
      resPlace +=
        ", " +
        word[word.length - 1].substr(0, 1).toUpperCase() +
        word[word.length - 1].substr(1).toLowerCase();

      //console.log(resPlace);

      arrayplacecity.push(resPlace);
      arraymoney.push(response[x][1]);
    }
    if (arrayplacecity.includes(place)) {
      console.log(arraymoney[arrayplacecity.indexOf(place)]);

      move(place);
      $("#city-name").text(place);
      $("#income").text(
        "Median Houshold Income: " + arraymoney[arrayplacecity.indexOf(place)]
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
    console.log(response2);

    var arrayplacecity = [];
    var arraysmarts = [];
    for (let x = 1; x < response2.length; x++) {
      var resPlace = "";
      var word = response2[x][0].split(" ");
      for (i = 0; i < word.length - 1; i++) {
        if (i != word.length - 2) {
          resPlace +=
            " " +
            word[i].substr(0, 1).toUpperCase() +
            word[i].substr(1).toLowerCase();
        }
      }
      resPlace +=
        ", " +
        word[word.length - 1].substr(0, 1).toUpperCase() +
        word[word.length - 1].substr(1).toLowerCase();

      //console.log(resPlace);

      arrayplacecity.push(resPlace);

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
    console.log(response3);

    var arrayplacecity = [];
    var arrayage1 = [];
    for (let x = 1; x < response3.length; x++) {
      var resPlace = "";
      var word = response3[x][0].split(" ");
      for (i = 0; i < word.length - 1; i++) {
        if (i != word.length - 2) {
          resPlace +=
            " " +
            word[i].substr(0, 1).toUpperCase() +
            word[i].substr(1).toLowerCase();
        }
      }
      resPlace +=
        ", " +
        word[word.length - 1].substr(0, 1).toUpperCase() +
        word[word.length - 1].substr(1).toLowerCase();

      //console.log(resPlace);

      arrayplacecity.push(resPlace);
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
    console.log(response4);

    var arrayplacecity = [];
    var arrayage2 = [];
    for (let x = 1; x < response4.length; x++) {
      var resPlace = "";
      var word = response4[x][0].split(" ");
      for (i = 0; i < word.length - 1; i++) {
        if (i != word.length - 2) {
          resPlace +=
            " " +
            word[i].substr(0, 1).toUpperCase() +
            word[i].substr(1).toLowerCase();
        }
      }
      resPlace +=
        ", " +
        word[word.length - 1].substr(0, 1).toUpperCase() +
        word[word.length - 1].substr(1).toLowerCase();

      //console.log(resPlace);

      arrayplacecity.push(resPlace);
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

  // us census population api
  var queryURL5 =
    "https://api.census.gov/data/2019/pep/population?get=NAME,POP&for=place:*&in=state:*&key=" +
    APIkey;

  $.ajax({
    url: queryURL5,
    method: "GET",
  }).then(function (response5) {
    console.log(response5);

    var arrayplacecity = [];
    var arraypop = [];
    for (let x = 1; x < response5.length; x++) {
      var resPlace = "";
      var word = response5[x][0].split(" ");
      for (i = 0; i < word.length - 1; i++) {
        if (i != word.length - 2) {
          resPlace +=
            " " +
            word[i].substr(0, 1).toUpperCase() +
            word[i].substr(1).toLowerCase();
        }
      }
      resPlace +=
        ", " +
        word[word.length - 1].substr(0, 1).toUpperCase() +
        word[word.length - 1].substr(1).toLowerCase();

      //console.log(resPlace);

      arrayplacecity.push(resPlace);
      arraypop.push(response5[x][1]);
    }
    if (arrayplacecity.includes(place)) {
      console.log(arraypop[arrayplacecity.indexOf(place)]);
      $("#pop").text(
        "Total population: " + arraypop[arrayplacecity.indexOf(place)]
      );
    }
  });

  // realator API-*****************

  // var = score

  // if ()
};

// fucntion for user input
$("#searchForm").on("submit", function (event) {
  event.preventDefault();
  var userInput = $("#search").val();
  if (userInput == "") {
    return;
  }
  passedsearch = $("<button>");
  passedsearch.addClass("section");
  userInput = userInput.split(" ");
  var place = "";
  for (i = 0; i < userInput.length - 1; i++) {
    if (i != userInput.length - 2) {
      place +=
        " " +
        userInput[i].substr(0, 1).toUpperCase() +
        userInput[i].substr(1).toLowerCase();
    }
  }
  place +=
    ", " +
    userInput[userInput.length - 1].substr(0, 1).toUpperCase() +
    userInput[userInput.length - 1].substr(1).toLowerCase();
  passedsearch.attr("location", place);
  passedsearchtext = $("<h6>").text(place);
  passedsearch.prepend(passedsearchtext);
  $("#input-searches").prepend(passedsearch);
  $(".section").on("click", function () {
    Locationchange($(this).attr("location"));
  });

  // passedsearch.text(userInput);
  // ;
  // $("#prepend").prepend(passedsearch);
  // $(".passed").on("click", function () {
  //   Locationchange($(this).attr("location"));
  // });
  // localStorage.setItem(Object.entries(localStorage).length + 1, userInput);
  Locationchange(place);
});

// function that addes entries to local storage from user entry, populates the content with the new entry and adds event listener to run ajax call with that users entry
// $("#saveBtn").on("click", function (event) {
//   event.preventDefault();
//   var userInput = $("#search").val();
//   if (userInput == "") {
//     return;
//   }

//   Addedsearches = $("<button>");
//   Addedsearches.text(userInput);

//   Addedsearches.addClass("btn btn-primary prev-search");
//   Addedsearches.attr("location", userInput);

//   $("#past-area").prepend(Addedsearches);
//   $(".prev-search").on("click", function () {
//     Locationchange($(this).attr("location"));
//   });
//   localStorage.setItem(Object.entries(localStorage).length + 1, userInput);

//   Locationchange(userInput);
// });

// // fuction to populate search history with locally storage values everytime page is re-entered or refreshed from entries in local storage and adds click event to change imput city and run ajax call based off value with user imput
// function initPast() {
//   if (Object.entries(localStorage).length > 0) {
//     for (x = 1; x < Object.entries(localStorage).length + 1; x++) {
//       var Addedsearches = $("<button>");
//       Addedsearches.text(localStorage.getItem([x]));
//       Addedsearches.addClass("btn btn-primary prev-search");
//       Addedsearches.attr("id", [x] + "memory");
//       Addedsearches.attr("location", localStorage.getItem([x]));
//       $("#past-area").prepend(Addedsearches);
//       $(".prev-search").on("click", function () {
//         Locationchange($(this).attr("location"));
//       });
//     }
//   }
// }
// initPast();

// // function that addes entries to local storage from user entry, populates the content with the new entry and adds event listener to run ajax call with that users entry
// $("#saveBtn").on("click", function (event) {
//   event.preventDefault();
//   var userInput = $("#search").val();
//   if (userInput == "") {
//     return;
//   }

//   Addedsearches = $("<button>");
//   Addedsearches.text(userInput);

//   Addedsearches.addClass("btn btn-primary prev-search");
//   Addedsearches.attr("location", userInput);

//   $("#past-area").prepend(Addedsearches);
//   $(".prev-search").on("click", function () {
//     Locationchange($(this).attr("location"));
//   });
//   localStorage.setItem(Object.entries(localStorage).length + 1, userInput);

//   Locationchange(userInput);
// });
