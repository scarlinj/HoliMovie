var repoContainerEl = document.querySelector("#repos-container");
var carSearchTerm = document.querySelector("#repo-search-term");
var buttonEl = document.querySelector('#search-car')
var carName = document.querySelector('#carname')


var getUserRepos = function (carName) {
    // format the github api url
    var apiUrl = "https://car-data.p.rapidapi.com/" + carName + "/types";

    // make a request to the url
    // to use fetch ():
    fetch(apiUrl).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayRepos(data, carName);


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

fetch("https://car-data.p.rapidapi.com/cars/cars", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "car-data.p.rapidapi.com",
            // "x-RapidAPI-Key": "const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://car-data.p.rapidapi.com/cars?limit=100&page=0",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "car-data.p.rapidapi.com",
                "x-rapidapi-key": "55feb7d8b7mshe4665b9f7ae2ac2p14e3a4jsnc99b26e4d884"
            }
        }

        // $.ajax(settings).done(function (response) {
        //     console.log(response);
        // });

        // "x-rapidapi-key": "984bf8b00dmshca5e8dd06f832aep10026fjsn98abd3bedf80"
        // Noorullah's API key

    })

    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        displayRepos(data, carName);
    })
    .catch(err => {
        console.error(err);
    });



var carFormEl = document.querySelector("#button-submit");

var carInputEl = document.querySelector("#carname");

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log('Test is working!')
    // get value from input element
    var carName = carInputEl.value.trim();
    console.log('carName test', carName);
    if (carName) {
        getUserRepos(car);
        nameInputEl.value = "";
    } else {
        alert("Please enter a car name");
    }
    console.log(event);
};

var displayRepos = function (repos, searchTerm) {
    //clear old content
    repoContainerEl.textContent = "";
    carSearchTerm.textContent = searchTerm;
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

carFormEl.addEventListener("click", formSubmitHandler);


getUserRepos();