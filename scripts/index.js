let lat = '';
let lon = '';
const weatherTable = document.querySelector('.weather-table');
const degrees = document.querySelectorAll('.weather__dergrees');
const skyWeather = document.querySelectorAll('.weather__sky')
const input = document.querySelectorAll('.location__input');
const feature = document.querySelectorAll('.weather__feature');

const place = [{
    "name": "Moscow",
    "coord": {
      "lon": 37.615555,
      "lat": 55.75222
    }
  },

  {
    "name": "SaintPetersburg",
    "coord": {
      "lon": 30.264168,
      "lat": 59.894444
    }
  },
];

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener('click', function () {
    weatherTable.style.display = "flex";
    if (this.value == place[0].name) {
      lat = place[0].coord.lat;
      lon = place[0].coord.lon;
    } else if (this.value == place[1].name) {
      lat = place[1].coord.lat;
      lon = place[1].coord.lon;
    }

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&lang=ru&appid=7859648c19595ba7d19849475f1ca068`)
      .then(function (resp) {
        return resp.json()
      })
      .then(function (data) {
        degrees[0].innerHTML = Math.round(data.current.temp) + '&deg;';
        degrees[1].innerHTML = Math.round(data.daily[1].temp.day) + '&deg;';
        degrees[2].innerHTML = Math.round(data.daily[2].temp.day) + '&deg;';
        degrees[3].innerHTML = Math.round(data.daily[3].temp.day) + '&deg;';

        skyWeather[0].innerHTML = data.current.weather[0].description.toUpperCase();
        skyWeather[1].innerHTML = data.daily[1].weather[0].description.toUpperCase();
        skyWeather[2].innerHTML = data.daily[2].weather[0].description.toUpperCase();
        skyWeather[3].innerHTML = data.daily[3].weather[0].description.toUpperCase();

        feature[0].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">`;
        feature[1].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png">`;
        feature[2].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png">`;
        feature[3].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png">`;
      })
      .catch(function () {
        // catch any errors
      });


  })
}
