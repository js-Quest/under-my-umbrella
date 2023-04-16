

var timeDisplayEl = document.getElementById('time');
var dateDisplayEl = document.getElementById('date');
var currentWeatherItemsEl = document.getElementById('current-weather-items');
var timeZone = document.getElementById('time-zone');
var countryEl = document.getElementById('country');
var weatherForecastEl = document.getElementById('weather-forecast');
var currentTempEl = document.getElementById('current-temp');
var APIkey = "16d07975cebab1a166b549c8cdd345da";

// function to show current time
function displayTime() {
  var rightNow = dayjs().format('hh:mm a');
  timeDisplayEl.textContent = rightNow;
};
displayTime();
setInterval(displayTime, 1000);

// function to show current date
function displayDate() {
  var dateNOW = dayjs().format('dddd, MMMM D[,] YYYY');
  dateDisplayEl.textContent = dateNOW;
};
displayDate();
setInterval(displayDate, 24 * 60 * 60 * 1000);



// array of cities
var cities = JSON.parse(localStorage.getItem("cities")) || [];

// function to save input to local storage
function saveCity() {
  localStorage.setItem("cities", JSON.stringify(cities));
};




// event listener for cit input
var submitBtnEl = document.getElementById('submitBtn');
submitBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  
  var inputEl = document.getElementById('input');
  var city = inputEl.value.trim();
  if (!city) {
    alert('please input a city name');
    return;
  }

  cities.reverse();
  if (!cities.includes(city)) {
    cities.push(city);
    saveCity();
  };
  getCityCoords(city);
  displayCities();
});


// function to display saved cities
function displayCities() {
  var limit;
  if (cities.length < 5) {
    limit = cities.length
  } else {
    limit = 5;
  }
  var viewedCitiesEl = document.getElementById('viewed-cities');
  for (var i = 0; i < limit; i++) {
    var savedCityBtn = document.createElement('button');
    savedCityBtn.setAttribute("id", "button");
    // savedCityBtn.setAttribute("value", i);
    viewedCitiesEl.appendChild(savedCityBtn);
    savedCityBtn.textContent = cities[i];
    savedCityBtn.addEventListener('click', function () {
      getCityCoords(this.textContent);
    });
  }
};





// function to get coordinates of city
function getCityCoords(city) {
  coordQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`;
  fetch(coordQueryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  })

    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);

    // if (!data) {
    //   alert("no results found, please try again");
    // } else {
      getWeatherData(data[0].lat, data[0].lon);
    })
    

};

// function to get weather data based on coordinates of input city
function getWeatherData(latitude, longitude) {

  queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`

  fetch(queryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  })

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      showWeatherData(data);
    })
};

// function to display data on app
function showWeatherData(data) {
  if (data !== null) {

    // current day
    var currentConditionEl = document.getElementById('current-condition');
    var currentTemperatureEl = document.getElementById('current-temperature');
    var currentHumidityEl = document.getElementById('current-humidity');
    var currentWindspeedEl = document.getElementById('current-windspeed');
    var currentDayEl = document.getElementById('current-day');
    var currentNightEl = document.getElementById('current-night');
    var iconCurrentEl = document.getElementById('icon-current');
    var location = document.getElementById('location');

    currentConditionEl.innerHTML = data.list[0].weather[0].description;
    currentTemperatureEl.innerHTML = data.list[0].main.temp + '°F';
    currentHumidityEl.innerHTML = data.list[0].main.humidity + '%';
    currentWindspeedEl.innerHTML = data.list[0].wind.speed + 'mph';
    currentDayEl.innerHTML = 'Day: ' + data.list[1].main.temp + '°F';
    currentNightEl.innerHTML = 'Night: ' + data.list[2].main.temp + '°F';
    location.innerHTML = data.city.name + ',  ' + data.city.country;

    // populate weather icon
    iconCurrentEl.textContent = "";
    var iconCurrent = data.list[0].weather[0].icon;
    var iconImg = document.createElement('img');
    iconImg.src = "http://openweathermap.org/img/wn/" + iconCurrent + "@4x.png";
    iconCurrentEl.appendChild(iconImg);

    // day 1 temp high, temp low, humidity, windspeed
    var dayOneHumidityEl = document.getElementById('humidity-one');
    var dayOneWindspeedEl = document.getElementById('windspeed-one');
    var dayOneDayEl = document.getElementById('day-one');
    var dayOneNightEl = document.getElementById('night-one');

    dayOneHumidityEl.innerHTML = 'Humidity: ' + data.list[8].main.humidity + '%';
    dayOneWindspeedEl.innerHTML = 'Wind:' + data.list[8].wind.speed + 'mph';
    dayOneDayEl.innerHTML = 'Day: ' + data.list[07].main.temp + '°F';
    dayOneNightEl.innerHTML = 'Night: ' + data.list[04].main.temp + '°F';

    var iconOneEl = document.getElementById('icon-one');
    iconOneEl.textContent = "";
    var iconOne = data.list[8].weather[0].icon;
    var iconOneImg = document.createElement('img');
    iconOneImg.src = "http://openweathermap.org/img/wn/" + iconOne + "@2x.png";
    iconOneEl.appendChild(iconOneImg);

    var firstDayEl = document.getElementById('first-day')
    function firstDay() {
      var firstDay = dayjs().add(1, 'day').format('dddd');
      firstDayEl.textContent = firstDay;
    };
    firstDay();
    setInterval(firstDay, 1000);



    // day 2
    var dayTwoHumidityEl = document.getElementById('humidity-two');
    var dayTwoWindspeedEl = document.getElementById('windspeed-two');
    var dayTwoDayEl = document.getElementById('day-two');
    var dayTwoNightEl = document.getElementById('night-two');

    dayTwoHumidityEl.innerHTML = 'Humidity: ' + data.list[16].main.humidity + '%';
    dayTwoWindspeedEl.innerHTML = 'Wind: ' + data.list[16].wind.speed + 'mph';
    dayTwoDayEl.innerHTML = 'Day: ' + data.list[15].main.temp + '°F';
    dayTwoNightEl.innerHTML = 'Night: ' + data.list[12].main.temp + '°F';

    var iconTwoEl = document.getElementById('icon-two');
    iconTwoEl.textContent = "";
    var iconTwo = data.list[16].weather[0].icon;
    var iconTwoImg = document.createElement('img');
    iconTwoImg.src = "http://openweathermap.org/img/wn/" + iconTwo + "@2x.png";
    iconTwoEl.appendChild(iconTwoImg);

    var secondDayEl = document.getElementById('second-day')
    function secondDay() {
      var secondDay = dayjs().add(2, 'days').format('dddd');
      secondDayEl.textContent = secondDay;
    };
    secondDay();
    setInterval(secondDay, 1000);

    // day 3
    var dayThreeHumidityEl = document.getElementById('humidity-three');
    var dayThreeWindspeedEl = document.getElementById('windspeed-three');
    var dayThreeDayEl = document.getElementById('day-three');
    var dayThreeNightEl = document.getElementById('night-three');

    dayThreeHumidityEl.innerHTML = 'Humidity: ' + data.list[24].main.humidity + '%';
    dayThreeWindspeedEl.innerHTML = 'Wind: ' + data.list[24].wind.speed + 'mph';
    dayThreeDayEl.innerHTML = 'Day: ' + data.list[15].main.temp + '°F';
    dayThreeNightEl.innerHTML = 'Night: ' + data.list[12].main.temp + '°F';

    var iconThreeEl = document.getElementById('icon-three');
    iconThreeEl.textContent = "";
    var iconThree = data.list[24].weather[0].icon;
    var iconThreeImg = document.createElement('img');
    iconThreeImg.src = "http://openweathermap.org/img/wn/" + iconThree + "@2x.png";
    iconThreeEl.appendChild(iconThreeImg);

    var thirdDayEl = document.getElementById('third-day')
    function thirdDay() {
      var thirdDay = dayjs().add(3, 'days').format('dddd');
      thirdDayEl.textContent = thirdDay;
    };
    thirdDay();
    setInterval(thirdDay, 1000);

    // day 4
    var dayFourHumidityEl = document.getElementById('humidity-four');
    var dayFourWindspeedEl = document.getElementById('windspeed-four');
    var dayFourDayEl = document.getElementById('day-four');
    var dayFourNightEl = document.getElementById('night-four');

    dayFourHumidityEl.innerHTML = 'Humidity: ' + data.list[32].main.humidity + '%';
    dayFourWindspeedEl.innerHTML = 'Wind:' + data.list[32].wind.speed + 'mph';
    dayFourDayEl.innerHTML = 'Day: ' + data.list[31].main.temp + '°F';
    dayFourNightEl.innerHTML = 'Night: ' + data.list[28].main.temp + '°F';

    var iconFourEl = document.getElementById('icon-four');
    iconFourEl.textContent = "";
    var iconFour = data.list[32].weather[0].icon;
    var iconFourImg = document.createElement('img');
    iconFourImg.src = "http://openweathermap.org/img/wn/" + iconFour + "@2x.png";
    iconFourEl.appendChild(iconFourImg);

    var fourthDayEl = document.getElementById('fourth-day')
    function fourthDay() {
      var fourthDay = dayjs().add(4, 'days').format('dddd');
      fourthDayEl.textContent = fourthDay;
    };
    fourthDay();
    setInterval(fourthDay, 1000);

    // day 5
    var dayFiveHumidityEl = document.getElementById('humidity-five');
    var dayFiveWindspeedEl = document.getElementById('windspeed-five');
    var dayFiveDayEl = document.getElementById('day-five');
    var dayFiveNightEl = document.getElementById('night-five');


    dayFiveHumidityEl.innerHTML = 'Humidity: ' + data.list[39].main.humidity + '%';
    dayFiveWindspeedEl.innerHTML = 'Wind:' + data.list[39].wind.speed + 'mph';
    dayFiveDayEl.innerHTML = 'Day: ' + data.list[38].main.temp + '°F';
    dayFiveNightEl.innerHTML = 'Night: ' + data.list[35].main.temp + '°F';

    var iconFiveEl = document.getElementById('icon-five');
    iconFiveEl.textContent = "";
    var iconFive = data.list[39].weather[0].icon;
    var iconFiveImg = document.createElement('img');
    iconFiveImg.src = "http://openweathermap.org/img/wn/" + iconFive + "@2x.png";
    iconFiveEl.appendChild(iconFiveImg);

    var fifthDayEl = document.getElementById('fifth-day')
    function fifthDay() {
      var fifthDay = dayjs().add(5, 'days').format('dddd');
      fifthDayEl.textContent = fifthDay;
    };
    fifthDay();
    setInterval(fifthDay, 1000);
  }
};








