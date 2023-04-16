

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

getWeatherData();

function getWeatherData() {

  navigator.geolocation.getCurrentPosition((success) => {
    // console.log(success);
    // var latitude = data.coord.latitufe;
    // var longitude = data.coord.longitude;
    var { latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`, {

    })

      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        showWeatherData(data);
      })
  })
};

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

    currentConditionEl.innerHTML = data.list[0].weather[0].description;
    currentTemperatureEl.innerHTML = data.list[0].main.temp + '°F';
    currentHumidityEl.innerHTML = data.list[0].main.humidity + '%';
    currentWindspeedEl.innerHTML = data.list[0].wind.speed + 'mph';
    currentDayEl.innerHTML = 'Day: ' + data.list[1].main.temp + '°F';
    currentNightEl.innerHTML = 'Night: ' + data.list[2].main.temp + '°F';

    var icon = data.list[0].weather[0].icon;
    iconCurrentEl.innerHTML = `src="http://openweathermap.org/img/w/${icon}.png"`


    // day 1 temp high, temp low, humidity, windspeed
    var dayOneHumidityEl = document.getElementById('humidity-one');
    var dayOneWindspeedEl = document.getElementById('windspeed-one');
    var dayOneDayEl = document.getElementById('day-one');
    var dayOneNightEl = document.getElementById('night-one');

    dayOneHumidityEl.innerHTML = 'Humidity: ' + data.list[8].main.humidity + '%';
    dayOneWindspeedEl.innerHTML = 'Wind:' + data.list[8].wind.speed + 'mph';
    dayOneDayEl.innerHTML = 'Day: ' + data.list[07].main.temp + '°F';
    dayOneNightEl.innerHTML = 'Night: ' + data.list[04].main.temp + '°F';


    // day 2
    var dayTwoHumidityEl = document.getElementById('humidity-two');
    var dayTwoWindspeedEl = document.getElementById('windspeed-two');
    var dayTwoDayEl = document.getElementById('day-two');
    var dayTwoNightEl = document.getElementById('night-two');

    dayTwoHumidityEl.innerHTML = 'Humidity: ' + data.list[16].main.humidity + '%';
    dayTwoWindspeedEl.innerHTML = 'Wind: ' + data.list[16].wind.speed + 'mph';
    dayTwoDayEl.innerHTML = 'Day: ' + data.list[15].main.temp + '°F';
    dayTwoNightEl.innerHTML = 'Night: ' + data.list[12].main.temp + '°F';

    // day 3
    var dayThreeHumidityEl = document.getElementById('humidity-three');
    var dayThreeWindspeedEl = document.getElementById('windspeed-three');
    var dayThreeDayEl = document.getElementById('day-three');
    var dayThreeNightEl = document.getElementById('night-three');

    dayThreeHumidityEl.innerHTML = 'Humidity: ' + data.list[24].main.humidity + '%';
    dayThreeWindspeedEl.innerHTML = 'Wind: ' + data.list[24].wind.speed + 'mph';
    dayThreeDayEl.innerHTML = 'Day: ' + data.list[15].main.temp + '°F';
    dayThreeNightEl.innerHTML = 'Night: ' + data.list[12].main.temp + '°F';

    // day 4
    var dayFourHumidityEl = document.getElementById('humidity-four');
    var dayFourWindspeedEl = document.getElementById('windspeed-four');
    var dayFourDayEl = document.getElementById('day-four');
    var dayFourNightEl = document.getElementById('night-four');


    dayFourHumidityEl.innerHTML = 'Humidity: ' + data.list[32].main.humidity + '%';
    dayFourWindspeedEl.innerHTML = 'Wind:' + data.list[32].wind.speed + 'mph';
    dayFourDayEl.innerHTML = 'Day: ' + data.list[31].main.temp + '°F';
    dayFourNightEl.innerHTML = 'Night: ' + data.list[28].main.temp + '°F';

    // day 5
    var dayFiveHumidityEl = document.getElementById('humidity-five');
    var dayFiveWindspeedEl = document.getElementById('windspeed-five');
    var dayFiveDayEl = document.getElementById('day-five');
    var dayFiveNightEl = document.getElementById('night-five');


    dayFiveHumidityEl.innerHTML = 'Humidity: ' + data.list[39].main.humidity + '%';
    dayFiveWindspeedEl.innerHTML = 'Wind:' + data.list[39].wind.speed + 'mph';
    dayFiveDayEl.innerHTML = 'Day: ' + data.list[38].main.temp + '°F';
    dayFiveNightEl.innerHTML = 'Night: ' + data.list[35].main.temp + '°F';
    
    }

  
};








