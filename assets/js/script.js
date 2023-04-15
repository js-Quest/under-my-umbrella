var APIKey = "16d07975cebab1a166b549c8cdd345da";

// function to show current time
var timeDisplayEl = document.getElementById('time');
function displayTime() {
  var rightNow = dayjs().format('hh:mm a');
  timeDisplayEl.textContent = rightNow;
};
displayTime();
setInterval(displayTime, 1000);

// function to show current date
var dateDisplayEl = document.getElementById('date');
function displayDate() {
  var dateNOW = dayjs().format('dddd, MMMM D[,] YYYY');
  dateDisplayEl.textContent = dateNOW;
};
displayDate();
setInterval(displayDate, 24 * 60 * 60 * 1000);
