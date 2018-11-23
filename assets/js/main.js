var h2 = $("h2");
var weather = $(".weather");

//var data = '{"coord":{"lon":-77.61,"lat":42.9},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":13.5,"pressure":1036,"humidity":70,"temp_min":12.02,"temp_max":14},"visibility":16093,"wind":{"speed":4.85,"deg":343.5},"clouds":{"all":1},"dt":1542927300,"sys":{"type":1,"id":2130,"message":0.0043,"country":"US","sunrise":1542888747,"sunset":1542922855},"id":420026867,"name":"Rochester","cod":200}';
//handle(JSON.parse(data));

var request = new XMLHttpRequest();
var url = "https://api.openweathermap.org";// "/data/2.5/weather";
var key = "&APPID=7596ddf7ddf543775e41095ec80fa8c4";
var units = "&units=imperial";

function searchZip(){
    var zip = document.getElementById("search");
    console.log(zip.value);
    if(zip.length < 5 || zip.length >= 6){
        $("#search").value = "";
        return;
    }
    request.open("GET", urlFromZip("14485"), true);
    request.onload = function(){
        var data = JSON.parse(this.response);
        handle(data);
        //roc.html(JSON.stringify(data));
    };
    request.send();
}

function handle(data){
    console.log(data);

    h2.html(data.name);

    var w = "";
    w += "<h4>Temperature</h4>";
    tmp = Math.round(data.main.temp);
    w += "<p>" + tmp + " &degF</p>";

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

function degToString(deg){
    if(deg >= 337.5 || deg < 22.5){
        return "East";
    }
    else if(deg >= 22.5 && deg < 67.5){
        return "North-East";
    }
    else if(deg >= 67.5 && deg < 112.5){
        return "North";
    }
    else if(deg >= 112.5 && deg < 157.5){
        return "North-West";
    }
    else if(deg >= 157.5 && deg < 202.5){
        return "West";
    }
    else if(deg >= 202.5 && deg < 247.5){
        return "South-West";
    }
    else if(deg >= 247.5 && deg < 292.5){
        return "South";
    }
    else{
        return "South-East";
    }
}

function urlFromCity(city){
    return url + "/data/2.5/weather?q=" + city + units + key;
}

function urlFromCityCountry(city, country){
    return url + "/data/2.5/weather?q=" + city + "," + country + units + key;
}

function urlFromZip(zip){
    return url + "/data/2.5/weather?zip=" + zip + units + key;
}