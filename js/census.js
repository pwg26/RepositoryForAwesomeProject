var Locationchange = function (userInput) {
  // $(document).ready(function () {
  //     $('.collapsible').collapsible();
  //     $('select').formSelect();
  //     $('.modal').modal();
  // });

  //   US Census API  for median houshold income at state level for past 12 monthes

  var APIkey = "9c2fc26375a5e9fb6d689f41066923c3a7eefec6";
  var queryURL =
    "https://api.census.gov/data/2019/acs/acs5?get=NAME,B25119_001E&for=state:*&key=" +
    APIkey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var arraystate = [];
    var arraymoney = [];
    for (let x = 1; x < response.length; x++) {
      arraystate.push(response[x][0]);
      arraymoney.push(response[x][1]);
    }
    if (arraystate.includes(userInput)) {
      console.log(arraymoney[arraystate.indexOf(userInput)]);
    }
  });
};

// fucntion for user imput
$("#submit").on("submit", function (event) {
  event.preventDefault();
  var userInput = $("#search").val();
  // var userInput = $("#search").val()
  // Locationchange(userInput)
  Locationchange(userInput);
});
