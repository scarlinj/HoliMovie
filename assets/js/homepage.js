// Public Holiday API (1922 ~ 2122) 200years
const yearInput = document.querySelector(`#yearInput`);
const submitBtn = document.querySelector(`#submitSearch`);
const holidayContainer = document.querySelector(`#holidayContainer`)

submitBtn.addEventListener(`click`, function(event) {
event.preventDefault();
var year = yearInput.value;
var country = countryCode.value;
var searchUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`;

    fetch(searchUrl)
    .then(function (response) {
        response.json().then(function (data) {
        
            console.log(data);

            for (let i = 0; i < data.length; i++) {

                const {localName, date, countryCode, type} = data[i];
                console.log(localName, date, countryCode, type);
                
                var text = document.createElement(`h1`);
                
                holidayContainer.appendChild(text);
            }
        });
    });
});

// Movie Search

var apiKey = `6bbce96a`;

$(document).ready(function(){
    $(`#moviesearch`).submit(function(event){
        event.preventDefault()

        var movie = $(`#movies`).val()
        var result = ""
        var searchUrl = `http://www.omdbapi.com/?t=` + movie + `&apikey=` + apiKey;
        
        $.ajax({
            method:`GET`,
            url: searchUrl,
            success: function(data){
                
                console.log(data);

                result = `<img src="${data.Poster}"/>
                <h2>${data.Title}<h2>
                `;

                $("#movieContainer").html(result);
            }
        })
    })
})

// TV Search

$(document).ready(function(){
    $(`#tvsearch`).submit(function(event){
        event.preventDefault()

        var tvs = $(`#tvs`).val()
        var results = ""
        var searchUrl = `http://api.tvmaze.com/search/shows?q=${tvs}`;
        
        $.ajax({
            method:`GET`,
            url: searchUrl,
            success: function(data){
                
                console.log(data[0].show.image);
                console.log(data[0].show.name);

                results = `<img src="${data[0].show.image.medium}"/>
                <h2>${data[0].show.name}<h2>
                `;

                $("#tvContainer").html(results);
            }
        })
    })
})


// const movieInput = document.querySelector(`#movies`);
// const movieBtn = document.querySelector(`#movieSearch`);
// const movieContainer = document.querySelector(`.movieContainer`)

// movieBtn.addEventListener(`click`, function(event) {
// event.preventDefault();
// var keyword = movies.value;
// var apiKey = `6bbce96a`;

// var searchUrl = `http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`;

//     fetch(searchUrl)
//     .then(function (response) {
//         //console.log(response);
//         return response.json()
//     })    
//     .then(function (movieResponse) {
            
//             console.log(movieResponse);

//             for (var j=0; j < movieResponse.length; j++) {
//                 var currentMovie = movieResponse[j];

//                 console.log(currentMovie.Poster);

//                 var img = document.createElement(`img`);
//                 img.setAttribute(`src`,currentMovie.Poster);
//                 movieContainer.appendChild(img);

            
//             }

//             });
//         });