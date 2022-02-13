const yearInput = document.querySelector(`#yearInput`);
const submitBtn = document.querySelector(`#submitSearch`);
const countryCode = document.querySelector(`#countryCode`);
const holidayContainer = document.querySelector(`#holidayContainer`)
const myInput = document.querySelector('#dropdown');
let dropdownValue = ``;

// Country Code Drop Down
let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;
let defaultOption = document.createElement('option');
defaultOption.text = '-Countries-';
dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

fetch('https://date.nager.at/api/v3/AvailableCountries')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].name;
            option.value = data[i].countryCode;
            dropdown.add(option);
        }
    });
// Country Code to 
$("#locality-dropdown").on("change", function (e) {
    dropdownValue = e.target.value;
    console.log(e.target.value);
})

// Public Holiday API Using fetch (1922 ~ 2122) 200 years
// let holidayDropdown = document.getElementById('holiday-dropdown');
// holidayDropdown.length = 0;
// let defaultHoliday = document.createElement('option');
// defaultHoliday.text = 'Finding Holiday';
// holidayDropdown.add(defaultOption);
// holidayDropdown.selectedIndex = 0;

submitBtn.addEventListener(`click`, function (event) {

    event.preventDefault();

    var year = yearInput.value;
    console.log(year);
    var searchUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${dropdownValue}`;

    fetch(searchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let j = 0; j < data.length; j++) {
                const currentData = data[j];
                console.log(currentData);
                var p1 = document.createElement(`p`);
                p1.textContent = currentData.date + ` ` + currentData.localName + ` ` + currentData.countryCode;
                holidayContainer.appendChild(p1);
            }
            $("#results").empty().append(p1);
        });
    // 'user-form'.textContent = "";
    holidayContainer.textContent = "";

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// Country Code to Holiday
$("#holiday-dropdown").on("change", function (e) {
    dropdownValue = e.target.value;
    console.log(e.target.value);
})

// Movie Search Using ajax
var apiKey = `6bbce96a`;
$(document).ready(function () {
    $(`#moviesearch`).submit(function (event) {
        event.preventDefault()
        var movie = $(`#movies`).val()
        var result = ""
        var searchUrl = `http://www.omdbapi.com/?t=` + movie + `&apikey=` + apiKey;
        $.ajax({
            method: `GET`,
            url: searchUrl,
            success: function (data) {
                console.log(data);
                result = `
                <img src="${data.Poster}"/>
                <h2>${data.Title}<h2>
                <h2>${data.Plot}<h2>
                `;

                $("#movieContainer").html(result);
            }
        })
    })
})

// TV Search Using ajax
$(document).ready(function () {
    $(`#tvsearch`).submit(function (event) {
        event.preventDefault()
        var tvs = $(`#tvs`).val()
        var results = ""
        var searchUrl = `http://api.tvmaze.com/search/shows?q=${tvs}`;
        $.ajax({
            method: `GET`,
            url: searchUrl,
            success: function (data) {
                console.log(data[0].show.image);
                console.log(data[0].show.name);
                results = `
                <img src="${data[0].show.image.medium}"/>
                <h2>${data[0].show.name}<h2>
                `;
                $("#tvContainer").html(results);
            }
        })
    })
})