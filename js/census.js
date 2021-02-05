var Locationchange = function (userInput) {
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

  $.ajax({
    url: queryURL1,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var arrayplacecity = [];
    var arraymoney = [];
    for (let x = 1; x < response.length; x++) {
      arrayplacecity.push(response[x][0]);
      arraymoney.push(response[x][1]);
    }
    if (arrayplacecity.includes(userInput)) {
      console.log(arraymoney[arrayplacecity.indexOf(userInput)]);
      $("#city-name").text(userInput);
      $("#income").text(
        "Median Houshold Income: " +
          arraymoney[arrayplacecity.indexOf(userInput)]
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
      arrayplacecity.push(response2[x][0]);
      arraysmarts.push(response2[x][1]);
    }
    if (arrayplacecity.includes(userInput)) {
      console.log(arraysmarts[arrayplacecity.indexOf(userInput)]);
      $("#smarts").text(
        "% of Individuals with Highschool Diploma or Higher: " +
          arraysmarts[arrayplacecity.indexOf(userInput)]
      );
    }
  });
};

// fucntion for user input
$("#searchForm").on("submit", function (event) {
  event.preventDefault();
  var userInput = $("#search").val();
  Locationchange(userInput);
});
