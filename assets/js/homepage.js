const yearInput = document.querySelector(`#yearInput`);
const submitBtn = document.querySelector(`#submitSearch`);
const countryCode = document.querySelector(`#countryCode`);
const holidayContainer = document.querySelector(`#holidayContainer`);
const holidayContainerResult = document.querySelector(`#holidayContainerResult`);
const movieContainer = document.querySelector(`#movieContainer`);

// Country Code Drop Down
let dropdownValue = ``;
let dropdown = document.getElementById('locality-dropdown');
let defaultOption = document.createElement('option');
dropdown.length = 0;
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

// Country Code
$("#locality-dropdown").on("change", function (e) {
    dropdownValue = e.target.value;
})

// Public Holiday API Using fetch (1922 ~ 2122) 200 years
submitBtn.addEventListener(`click`, function (event) {

    event.preventDefault();

    var year = yearInput.value;
    var searchUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${dropdownValue}`;

    fetch(searchUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            holidayContainerResult.textContent = "";
            for (let j = 0; j < data.length; j++) {
                const currentData = data[j];
                console.log(currentData);
                var p1 = document.createElement(`p`);
                p1.textContent = "     " + currentData.date + ` ` + currentData.localName + ` ` + currentData.countryCode;
                holidayContainerResult.appendChild(p1);
            }
            localStorage.setItem("data", JSON.stringify(data));
        })
        .catch(function (error) {
            handleModal();
        });

    // Get the modal *** --FIX THIS --

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

// Movie Search
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
                <br>
                <h2><u>Movie Title</u><h2>
                <h3>${data.Title}<h3><br>
                <h2><u>Plot</u><h2>
                <h3>${data.Plot}<h3>
                `;

                $("#movieContainerResult").html(result);
                // store in local storage
                localStorage.setItem("data", JSON.stringify(data));
            }
        })

    })
})

var saveHoliday = function () {
    localStorage.setItem("")
}