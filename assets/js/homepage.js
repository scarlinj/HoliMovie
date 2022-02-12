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
defaultOption.text = 'Finding Country Code';
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
$("#locality-dropdown").on("change", function(e) {
    dropdownValue = e.target.value;
    console.log(e.target.value);
})

// Public Holiday API Using fetch (1922 ~ 2122) 200 years
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
        });
});

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