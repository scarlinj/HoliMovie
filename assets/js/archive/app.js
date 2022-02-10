// Seatgeek API Key: 400d555ebf158201bb90cfc2888e46c64e50e4e86278f21224cae3465650fb9c 
// Seatgeek API Key: 55feb7d8b7mshe4665b9f7ae2ac2p14e3a4jsnc99b26e4d884
// Seatgeek Client ID: MjU2NDgzNDB8MTY0NDM1Nzk1NC43OTgzMTUz

var repoContainerEl = document.querySelector("#repos-container");
var artistSearchTerm = document.querySelector("#repo-search-term");
var buttonEl = document.querySelector('#search-artist');



var getUserRepos = function () {
    // from car api: var carName = document.querySelector('#carName').value

    var artistName = document.querySelector('#artistName')

    // format the github api url
    // var apiUrl = "https://api.spotify.com/v1";

    var apiUrl = "seatgeek-seatgeekcom.p.rapidapi.com"

    // make a request to the url
    // to use fetch ():
    fetch(apiUrl).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayRepos(data, artistName);
        });
};

// from Ryan:
// fetch(apiUrl).then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         displayRepos(data, car);
//     });

//

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://seatgeek-seatgeekcom.p.rapidapi.com/events",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "seatgeek-seatgeekcom.p.rapidapi.com",
        "x-rapidapi-key": "55feb7d8b7mshe4665b9f7ae2ac2p14e3a4jsnc99b26e4d884"
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
});

// fetch("https://car-data.p.rapidapi.com/cars/cars", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "car-data.p.rapidapi.com",
//             // "x-RapidAPI-Key": "const settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://car-data.p.rapidapi.com/cars?limit=100&page=0",
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "car-data.p.rapidapi.com",
//                 "x-rapidapi-key": "55feb7d8b7mshe4665b9f7ae2ac2p14e3a4jsnc99b26e4d884"
//             }
//         }

// $.ajax(settings).done(function (response) {
//     console.log(response);
// });

// "x-rapidapi-key": "984bf8b00dmshca5e8dd06f832aep10026fjsn98abd3bedf80"
// Noorullah's API key

// })

// .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         console.log(data)
//         var artistName = document.querySelector('#artistname').value
//         displayRepos(data, artistName);
//     })
//     .catch(err => {
//         console.error(err);
//     });



var artistFormEl = document.querySelector("#button-submit");

var artistInputEl = document.querySelector("#artistname");

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log('Test is working!')
    // get value from input element
    var artistName = artistInputEl.value.trim();
    console.log('artistName test', artistName);
    if (artistName) {
        getUserRepos(artistName);
        artistInputEl.value = "";
    } else {
        alert("Please enter a car name");
    }
    console.log(event);
};

var displayRepos = function (repos, searchTerm) {
    //clear old content
    repoContainerEl.textContent = "";
    artistSearchTerm.textContent = searchTerm;
    // var repoContainerEl = document.querySelector("#repos-container");
    // var repoSearchTerm = document.querySelector("#repo-search-term");

    console.log(repos);
    console.log(searchTerm);

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

artistFormEl.addEventListener("click", formSubmitHandler);