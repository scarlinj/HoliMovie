var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var getUserRepos = function (user) {
    // format the github api url
    // var apiUrl = "https://api.spotify.com/v1";

    // make a request to the url
    // to use fetch():
    fetch(apiUrl).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayRepos(data, user);


        });
};

var getInfo = function () {
    fetch("https://date.nager.at/api/v3/AvailableCountries").then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            console.log(data[17].name); // example for Canada
            console.log(data[73].name); // example for Mexico
            console.log(data[103].name); // example for USA
        });
    });
}
getInfo();

// from Ryan:
// fetch(apiUrl).then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         displayRepos(data, user);
//     });

// Hotels try (this has a CORS function)
// const output = document.querySelector('.output');
// fetch("https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?query=denver&currency=USD&locale=en_US", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
//             "x-rapidapi-key": "6f3dbc74a2msh4c78db503bca4f9p161b7ejsn0002ad20a68c"
//         }
//     })
//     .then(response => {
//         console.log(response);
//         return response.json();
//     }).then(function (data) {
//         console.log(JSON.stringify(data));
//         const destinations = Object.entries(data);
//         console.log(destinations);
//         for (const [key, value] of Object.entries(destinations)) {
//             console.log(`${key}; ${value}`);
//         }
//     });

var userFormEl = document.querySelector("#user-form");

var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

var displayRepos = function (repos, searchTerm) {
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
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

userFormEl.addEventListener("submit", formSubmitHandler);



getUserRepos();