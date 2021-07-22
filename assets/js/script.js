//Attempt to pull existing data from localStorage 
var savedCity = localStorage.getItem("city");
var userName = localStorage.getItem("name");

//Pulls up modal with the appropriate fields for input.
function modalMaker(type) {
    //Code to either display or dynamically create modal
    //
    //

    //Populates modal with forms/information according to type
    if (type === "both") {
        //Code to populate data and add listeners
        //
        //
        
        displayInfo(savedCity, userName);
        getCityData(savedCity, "startup");
        localStorage.setItem("city", savedCity);
        localStorage.setItem("name", userName);
    } else if (type === "city") {
        //Code to populate data and add listeners
        //
        //
        
        getCityData(savedCity, "startup");
        displayInfo(savedCity, userName);
        localStorage.setItem("city", savedCity);
    } else if (type === "name") {
        //Code to populate data and add listeners
        //
        //
        
        displayInfo(savedCity, userName);
        localStorage.setItem("name", userName);
    } else if (type === "error") {
        //Code to populate error
        //
        //
    }
};

//Displays user name and city in element
function displayInfo(city, name) {
    //Code that inserts user data into elements
    //
    //
}

//Fetches immediate data for chosen city, including coordinates and current weather.
function getCityData(city, module) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4493e550e9acf995029c8985968d6001")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
            //Sends data according to fed parameter to the appropriate function
            if (module === "startup") {
              getForecast(data);
              initMap(data);  
            } else if (module === "weather") {
                getForecast(data);
            } else if (module === "traffic") {
                initMap(data);
            }
        })
        .catch(function (error) {
            alert("Unable retrieve city from Openweather");
        });
};

//Uses coordinates to get 5-day forecast data
function getForecast(city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + city.coord.lat + "&lon=" + city.coord.lon + "&appid=4493e550e9acf995029c8985968d6001")
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                alert("ERROR");
            }
        })
        .then(function (data) {
            console.log("Forecast Object:")
            console.log(data);
        })
};

//Uses coordiates to display google map with traffic overlay
function initMap(city) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: city.coord.lat, lng: city.coord.lon },
    });
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  };

//startup process basied on parameters
if (savedCity && userName) {
    displayInfo(savedCity, userName);
    getCityData(savedCity, "startup");
} else if (!savedCity && !userName) {
    savedCity = "";
    userName = "";
    modalMaker("full form");
} else if (!savedCity) {
    savedCity = "";
    modalMaker("city form");
} else if (!userName) {
    userName = "";
    modalMaker("name form");
    getCityData(savedCity, "startup");
};