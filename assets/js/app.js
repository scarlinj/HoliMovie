var repoContainerEl = document.querySelector("#repos-container");
var carSearchTerm = document.querySelector("#repo-search-term");
var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    // to use fetch ():
    fetch(apiUrl).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayRepos(data, user);


        });
};

// from Ryan:
// fetch(apiUrl).then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         displayRepos(data, user);
//     });

//

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

userFormEl.addEventListener("submit", formSubmitHandler);



getUserRepos();