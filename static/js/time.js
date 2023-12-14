// get time for dashboard
function setCurrentTime() {
    var myDate = new Date();
    var isDST = isDaylightSavingTime(myDate);

    // Calculate the UTC offset in minutes, accounting for DST
    var utcOffset = myDate.getTimezoneOffset() + (isDST ? 60 : 0);

    // Adjust for UTC-8 by adding 8 hours (in minutes)
    myDate.setMinutes(myDate.getMinutes() + 8 * 60 - utcOffset);

    // Function to add a '0' before single digits
    function addLeadingZero(num) {
        return num < 10 ? '0' + num : num;
    }

    let hours = addLeadingZero(myDate.getHours());
    let minutes = addLeadingZero(myDate.getMinutes());
    let seconds = addLeadingZero(myDate.getSeconds());

    let currentTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById('current-time').innerText = currentTime;
}

function isDaylightSavingTime(date) {
    var januaryDST = new Date(date.getFullYear(), 0, 1);
    var julyDST = new Date(date.getFullYear(), 6, 1);
    return date.getTimezoneOffset() < Math.max(januaryDST.getTimezoneOffset(), julyDST.getTimezoneOffset());
}

setInterval(function() {
    setCurrentTime();
}, 1000);