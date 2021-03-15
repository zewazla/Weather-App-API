const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const API_KEY = "..."; ///here, write your api key ;]


window.onload = updateWeather;

document.querySelector('.searchInput').addEventListener('keypress', keyPress);

function keyPress(evt) {
    if (evt.keyCode == 13) {
        updateWeather().catch(e => {
            alert(e)
        });
    }
}

async function updateWeather() {
    let city = document.querySelector(".searchInput").value;
    const url = weatherUrl + city + "&appid=" + API_KEY;
    let response = await fetch(url);
    if (response.status != 200) {
        throw new Error('Wrong city, try again');
    }

    const responseWeather = await response.json();
    const temp = Math.round(responseWeather.main.temp);
    const temp_max = Math.round(responseWeather.main.temp_max);
    const temp_min = Math.round(responseWeather.main.temp_min);
    const temp_feels = Math.round(responseWeather.main.feels_like);
    const icon = responseWeather.weather[0].icon;
    document.querySelector(".city").innerHTML = city;
    document.querySelector(".temp").innerHTML = temp + "°c";
    document.querySelector(".temp_min").innerHTML = temp_min + "°c";
    document.querySelector(".temp_max").innerHTML = temp_max + "°c";
    document.querySelector(".temp_feels").innerHTML = temp_feels + "°c";
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

async function getTempForCity(cityName) {
    const url = weatherUrl + cityName + "&appid=" + API_KEY;
    let response = await fetch(url);
    if (response.status != 200) {
        throw new Error('Wrong city, try again');
    }

    let responseWeather = await response.json();
    return Math.round(responseWeather.main.temp);

}

function showTempForCity(cityName, cityClass) {
    getTempForCity(cityName).then(function (t) { document.querySelector(cityClass).innerHTML = t + "°c" });
}


showTempForCity("Sanok", ".sanok");
showTempForCity("Chrzanów", ".chrzanow");
showTempForCity("Piekło", ".pieklo");
showTempForCity("Chicago", ".chicago");

let card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});


  /* ---- cats --- */

  const url = "http://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1";


  async function getCats() {
      let response = await fetch(url);
      let responseCat = await response.json();
      console.log(responseCat);
      if (Array.isArray(responseCat)) {
          let cat = responseCat.map(getData);
          return cat;
      }
          return [getData(responseCat)];
  }

  function getData(cat) {
      return {
          text: cat.text
      }
  }

  function createDiv(x) {
      let newDiv = document.createElement("div");

      newDiv.innerHTML = `
          <h5>"${x.text}"</h5>
      `
      document.querySelector(".cats").appendChild(newDiv);
  }

  function displayCats(displaycat) {
      displaycat.forEach(createDiv);
  }

  (() => {

      getCats()
          .then(displayCats)

  })();
  
  
  document.addEventListener('DOMContentLoaded', function(event) {

    document.getElementById('flip-card-btn-turn-to-back').style.visibility = 'visible';
    document.getElementById('flip-card-btn-turn-to-front').style.visibility = 'visible';

    document.getElementById('flip-card-btn-turn-to-back').onclick = function() {
    document.getElementById('flip-card').classList.toggle('do-flip');
    };

    document.getElementById('flip-card-btn-turn-to-front').onclick = function() {
    document.getElementById('flip-card').classList.toggle('do-flip');
    };

  });
