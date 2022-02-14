const yearInput = document.querySelector(`#yearInput`);
const submitBtn = document.querySelector(`#submitSearch`);
const countryCode = document.querySelector(`#countryCode`);
const holidayContainer = document.querySelector(`#holidayContainer`)
const movieContainer = document.querySelector(`#movieContainer`)
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
            if (response.ok) {

                return response.json();
            }


        })
        .then(function (data) {
            // if (!data) {
            //     // call handleModal instead of the below
            //     // var modbtn = document.getElementById("clearModal");
            //     // $(modbtn).toggle();
            //     handleModal();
            //     return;
            // }
            holidayContainer.textContent = "";
            for (let j = 0; j < data.length; j++) {
                const currentData = data[j];
                console.log(currentData);
                var p1 = document.createElement(`p`);
                p1.textContent = currentData.date + ` ` + currentData.localName + ` ` + currentData.countryCode;
                holidayContainer.appendChild(p1);
            }
            // $("#results").empty().append(p1);
            localStorage.setItem("data", JSON.stringify(data));
            console.log(holidayContainer);
        })
        .catch(function (error) {
            handleModal();
            console.log(error)
        });

    // 'user-form'.textContent = "";


    // Get the modal *** --FIX THIS --
    // if (    var modal = document.getElementById("submitSearch");
    // )

    function handleModal() {
        // Get the button that opens the modal
        var modal = document.getElementById("clearModal");
        console.log(modal);
        // Get the <span> element that closes the modal
        var span = document.querySelector(".clear");

        // When the user clicks the button, open the modal 
        // btn.onclick = function () {
        modal.style.display = "block";
        // }

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
    }
});

console.log("Hello! Press the button to clear the console!");

function clearHolidays() {
    holidayContainer.textContent = "";

    // console.clear();
    // localStorage.clear();
}

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
                <h3>${data.Plot}<h3>
                `;

                $("#movieContainer").html(result);
                // store in local storage
                localStorage.setItem("data", JSON.stringify(data));
            }
        })
        // 'movie-form'.textContent = "";
        movieContainer.textContent = "";
    })
})

var saveHoliday = function () {
    localStorage.setItem("")
}

console.log("Hello! Press the button to clear the console!");

function clearMovie() {
    movieContainer.textContent = "";
    // console.clear();
    // localStorage.clear();
}