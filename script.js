const watchmodeKey = 'KymHqOJePgRiC2m3lXBM49ohK4n9KTA5yZ6a6CJe';




document.getElementById("searchSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value === "")
        return;
    // console.log(value);


    // const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=" + APIKEY;
    // fetch(url)
    //     .then(function(response) {
    //         return response.json();
    //     }).then(function(json) {
    //         // console.log(json);


    //         let results = "";
    //         results += '<h2>Weather in ' + json.name + "</h2>";
    //         for (let i = 0; i < json.weather.length; i++) {
    //             results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
    //         }
    //         results += '<h2>' + json.main.temp + " &deg;F</h2>"
    //         results += "<p>"
    //         for (let i = 0; i < json.weather.length; i++) {
    //             results += json.weather[i].description
    //             if (i !== json.weather.length - 1)
    //                 results += ", "
    //         }
    //         results += "</p>";
    //         document.getElementById("weatherResults").innerHTML = results;
    //     });
});
