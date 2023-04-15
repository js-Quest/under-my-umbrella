var APIkey = "16d07975cebab1a166b549c8cdd345da";

var timeDisplayEl = document.getElementById('time');
var dateDisplayEl = document.getElementById('date');
var currentWeatherItemsEl = document.getElementById('current-weather-items');
var timeZone = document.getElementById('time-zone');
var countryEl = document.getElementById('country');
var weatherForecastEl = document.getElementById('weather-forecast');
var currentTempEl = document.getElementById('current-temp');

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

  var { APIKey } = "16d07975cebab1a166b549c8cdd345da";

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${5}&appid=${APIkey}`);


}