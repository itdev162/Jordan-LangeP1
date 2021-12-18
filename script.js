let weather = {
    "apiKey" : "495bc3be185a38703417d842b77b0c94", //api key that makes the whole thing work
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=" + this.apiKey,
            /**What the above does it opens the api puts in the city that is requested (default is milwaukee)
             * adds in the units tag (if you dont it leaves it as standard)
             * and requests the information using the api key above
             * */
            ).then((response) => response.json()) // returns it in json format
            .then ((data) => this.displayWeather(data))
    },

    displayWeather: function(data) { //pulls the data from the api endpoint in json format
        const {name } = data; // variable pulled from the weather api
        const {icon, description} = data.weather[0]; // variable pulled from the weather api
        const {temp, humidity} = data.main;// variable pulled from the weather api
        const {speed} = data.wind;// variable pulled from the weather api

        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name; //displays the citys name
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+"@2x.png"; // displays an icon from the openweathermap api
        document.querySelector(".description").innerText = description; // description of the weather
        document.querySelector(".temp").innerText = temp + "°F"; //temperate in F
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"; //humidity %
        document.querySelector(".wind").innerText = " Wind Speed: " + speed + "MPH"; //wind speed in mph
        document.querySelector(".weather").classList.remove("loading"); // removes the initial data load
        document.body.style.backgroundImage = 
        "url('https://source.unsplash.com/1600x900/?" + name + "')"; //added flair pulls an image from the city that is searched
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value); // uses the search bar 
    },
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document // allows the user to use the "enter" key rather then clicking the search icon
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

    weather.fetchWeather("Milwaukee"); // default weather app load 