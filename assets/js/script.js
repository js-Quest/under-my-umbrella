var APIKey = "16d07975cebab1a166b549c8cdd345da";

var timeDisplayEl = $('#currentDay');
function displayTime() {
  var rightNow = dayjs().format('[Current Date & Time:] MMM DD, YYYY [ at ] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
};
displayTime();
setInterval(displayTime, 1000);