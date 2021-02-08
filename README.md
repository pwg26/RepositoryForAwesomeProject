Urban El Dorado
Introduction:
This repository contains a type of location evaluator that uses a user’s location input to return a map and a fact sheet containing information based on the searched location. A realtor API and an API from the U.S. census bureau were used to generate the fact sheet, while the API MapBox was used for the interactive map.

Motivation:
The vast majority of us at some point in our lives will make the transition of renter to homeowner. This is a major live event so one must be prepared. When picking out a home several are factors into consideration. What is the average property cost? How are the schools? And other generic inquiries such as these can be found by simple google and realtor searches but what the demographic data such as level of education in the area or percentage of individuals by age group. Qualitative census data would be the way to go when considering these factors. An app that would generate in-depth census information based on location searches would be an ideal way to solve this.

Development:
To begin, a concept was designed in a wire frame where for the overall setup of the website. The group creating the project was then split into groups of backend and front end where the front end team handled the styling used with materialize framework and the backend designing the API calls. The user input was used as an argument for an entire function that called each of the API’s. Within the mapbox API, the query url was modified with the input to return the corresponding location along with the option to return landmarks within a certain distance. For the census api, the user input was compared to the object arrays keys, and if matched returned the desired data. Each user search was also stored in local data which was then converted into display buttons with click events for each search to act as a working history. Lastly a modal was utilized to inform the user if their search was valid or not.

<img src= "https://github.com/pwg26/RepositoryForAwesomeProject/blob/main/images/census.png" >

<img src= "https://github.com/pwg26/RepositoryForAwesomeProject/blob/main/images/map.png" >

<img src= "https://github.com/pwg26/RepositoryForAwesomeProject/blob/main/images/index.png" >


Usage:
The user first enters a search into the search bar which then returns a map with locations of the 5 nearest highschools and a fact sheet containing demographic information. Each search also populates the search history section with buttons of previous searches that when click the given location is set to that previous search. This feature also works when the page is refreshed. If a users search does not match any location in the census or map box they will be prompted to enter a different location.

<img src= "https://github.com/pwg26/RepositoryForAwesomeProject/blob/main/images/urban.png" >

Forward:
Originally the developers wanted to use additional apis for real estate data. Unfortunately however some of the free apis have call limits and are quickly used up.

https://pwg26.github.io/RepositoryForAwesomeProject/
