var h2 = $("h2");
var weather = $(".weather");
document.addEventListener('keypress', function(e){
    if(e.keyCode == 13 && $('#search').is(':focus')){
        searchZip();
    }
});

function searchZip() {
    var zip = document.getElementById("search");
    console.log(zip.value);
    if (zip.value.length != 5) {
        $("#search").value = "";
        return;
    }
    var url = "http://corydio.com/api/weatherZip?zip=" + zip.value;
    request.open("GET", url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        handle(data);
    };
    request.send();
}


function handle(data) {
    console.log(data);
    if(data.cod == 429){
        weather.html("Server Error. Please Try Again Later.");
        return;
    }

    h2.html(data.name);

    var w = "";

    w += "<h4>Weather</h4>";
    w += "<img src=" + "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>"
    tmp = data.weather[0].description;
    w += "<p>" + tmp + "</p>";

    w += "<h4>Temperature</h4>";
    tmp = Math.round(data.main.temp);
    w += "<p>" + tmp + " &degF</p>";
    tmp = Math.round(data.main.temp_min);
    w += "<p>Low: " + tmp + " &degF</p>";
    tmp = Math.round(data.main.temp_max);
    w += "<p>High: " + tmp + " &degF</p>";

    w += "<h4>Wind</h4>";
    tmp = degToString(data.wind.deg);
    w += "<p>" + tmp + " ";
    tmp = data.wind.speed;
    w += tmp + " mph</p>";

    w += "<h4>Humidity</h4>";
    tmp = data.main.humidity;
    w += "<p>" + tmp + "%</p>";

    w += "<h4>Pressure</h4>";
    tmp = data.main.pressure;
    w += "<p>" + tmp + " hPa</p>";

    weather.html(w);
}

function degToString(deg) {
    if (deg >= 337.5 || deg < 22.5) {
        return "East";
    }
    else if (deg >= 22.5 && deg < 67.5) {
        return "North-East";
    }
    else if (deg >= 67.5 && deg < 112.5) {
        return "North";
    }
    else if (deg >= 112.5 && deg < 157.5) {
        return "North-West";
    }
    else if (deg >= 157.5 && deg < 202.5) {
        return "West";
    }
    else if (deg >= 202.5 && deg < 247.5) {
        return "South-West";
    }
    else if (deg >= 247.5 && deg < 292.5) {
        return "South";
    }
    else {
        return "South-East";
    }
}