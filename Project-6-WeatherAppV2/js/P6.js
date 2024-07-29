// import data for cities in Indiana
import { cities } from './cities.js';
// notice cities.js has an "export"
// we can now use the variable 'cities' here in P6.js
// always check to make sure it works:
// console.log(cities);

// PROJECT 6 (SEE DIRECTIONS IN PROJECT ASSIGNMENT)
// Using this code as a starter, and any styling/code from P5 that is helpful
// Make a weather app that takes a zipcode but ALSO any CITY in Indiana (you'll need two inputs)
// then displays the local weather conditions

// THINGS WE ARE LOOKING FOR YOU TO DO:
// • verify that use has entered a valid city name (or zip)
// • for cities, get the city ID from our cities.js for use in the API call
// • update the user with the local weather conditions (at least what was in P5)
// • make sure the temperature is in F or C and not Kelvin
// • give the app an interface
//    if you aren't good with design, start with our CSS from last time
//    if you are, creating your own interface
// • add two new visual aides / weather information (your choice)
// - for example: (1) update the bkg with what the current weather looks like
// - (2) like the WTF weather app, have it display a fun message depending on the conditions
// - (3) give the user a radio button (or similar) choice for F or C readings
// - (4) make a fancier loading animation / graphic
// - (5) add an icon/img showing the conditions, the name of which is part of the current conditions JSON
//       BECAUSE OF SECURITY REASONS, YOU WOULD NEED TO DOWNLOAD THESE TO USE
//       but if you do that, the name of the image is in <data-response>.weather[0].icon
//       https://openweathermap.org/weather-conditions
//       OR download other images or create your own icons
// - (6) come up with your own addition / adjustment

// variable
const base = 'http://api.openweathermap.org/data/2.5/weather';
const api = '176bb8827d5b02d6a2b3581dc7aa82e1';
//grab from html
const input = document.querySelector('.input');
const button = document.querySelector('button');
const error = document.querySelector('.error');
const info = document.querySelector('.weather-info');
const message = document.querySelector('.message');

// Map out cities only
const allCities = cities.map(city => city.name);
console.log(allCities);

// validate zip or city
function searchQuery(value) {
  //  user callback to validate input 
  if (validateInput(value) === true) {
    displayWeather(value).catch(handleError);  
  }
  else {
    //error code
    //console.log('error');
    error.innerText = 'Invalid city or zip!';
  }
}

// validates user input
function validateInput(input) {
  // grabs city name
  const city = /\w+\s?\w+[^\d\W]/;
  // grabs zip code
  const zip = /^\d{5}$/;
  const intOnly = /\d+/;
  // if user input is a int, validate zip
  if(intOnly.test(input) === true) {
    // returns true if input is 5 digits long
    return zip.test(input);
  }
  // if input is word(s), validate city
  else if(typeof(input) === 'string') {
    // if the city is in indiana
    if (allCities.includes(input) === true) {
      return city.test(input);
    }
    else {
      error.innerText = 'Invalid city!';
    }
  }
}

// function takes a weather a condition to change the background to corresponding image
function changeBg (c) {
  let weatherContainer = document.querySelector('.weather-container');
  if (c === "Clouds") {
    // Photo by Sam Schooler on Unsplash
    weatherContainer.style.background = "#d3d3d3 url('images/clouds.jpg') no-repeat center";
    message.innerText = "'Sometimes we get to be the sunshine on someone's cloudy day' - Katrina Mayer";
  }
  else if(c === "Clear") { 
    // Photo by Marla Prusik on Unsplash
    weatherContainer.style.background = "#6abcde url('images/clear.jpg') no-repeat fill";
    message.innerText = "Looks like there's a clear sky. Go out to bathe in sunshine or look at the stars.";
  }
  else if (c === "Thunderstorm") {
    // Photo by Prashant Gurung on Unsplash
    weatherContainer.style.background = "#d3d3d3 url('images/thunderstorm.jpg') no-repeat fill";
    message.innerText = "Looks like it's the perfect day to stay indoors and cozy up.";
  }
  else if (c === "Drizzle") {
    // Photo by Brianna Santellan on Unsplash
    weatherContainer.style.background = "#d3d3d3 url('images/drizzle.jpg') no-repeat fill";
    message.innerText = "Look out the drizzled window and pretend you're in a melancholic music video.";
  }
  else if(c === "Rain") {
    // Photo by Lubo Minar on Unsplash
    weatherContainer.style.background = "#d3d3d3 url('images/rain.jpg') no-repeat fill";
    message.innerText = "Looks like there's rain, don't forget your umbrella.";
  }
  else if(c === "Snow") {
    // Photo by Uta Scholl on Unsplash
    weatherContainer.style.background = "#d3d3d3 url('images/snow.jpg') no-repeat fill";
    message.innerText = "How about buildling a snowman?";
  }
  else if(c === "Mist" || c === "Smoke" || c === "Haze" || c === "Dust" ||
  c === "Fog" || c === "Sand" || c === "Ash" || c === "Squall" || c === "Tornado") {
    // Photo by JC Gellidon on Unsplash
    weatherContainer.style.background = "#d3d3d3 url('images/fog.jpg') no-repeat fill";
    message.innerText = "Silent hill type of weather.";
  }
}

// handle errors
function handleError(e) {
  console.log("ERROR!!", e);
  error.innerText = `ERROR!!`;
}

// change temp from f to c
function toCelsius(f) {
  return (5/9) * (f-32);
}

// change temp from c to f
function toFahrenheit(c) {
  return (c * (9/5)) + 32;
}

// async function
async function displayWeather(input) {
  //clear previous error messages
  error.textContent = "";

  const string = /\w+\s?\w+[^\d\W]/;
  const int = /\d+/;
  // if input is zip code, create url using ZIP
  if(int.test(input) === true) {
    // create url using ZIP DELETE LATER
    const response = await fetch(`${base}?zip=${input},us&appid=${api}`);
    console.log(response);
    const data = response.json();
    // console.log(data);

    //if response works
    if (response.ok) {  
      //clear previous error messages
      error.textContent = "";

      data.then(d => {
        // change the background
        changeBg(d.weather[0].main);

        let mainTemp = Math.round((((d.main.temp-273.15)*1.8) + 32) * 10) / 10; // change temp from K to F

        // change temp to c
        if (document.getElementById('c').checked) {
          //console.log("to C");
          mainTemp = `${Math.round(toCelsius(mainTemp) * 10) / 10} &degC`;
        }
        // change temp to f
        else{
          //console.log("to F");
          mainTemp = `${mainTemp} &degF`;
        }

        info.innerText = "";
        // create html
        // for icons, I am using open weather api's icons. More infor at: https://openweathermap.org/weather-conditions
       const html = `<h3>${d.name}</h3>
                    <h1>${mainTemp}</h1>
                    <div class="condition">
                      <h2>${d.weather[0].description}</h2>
                      <img class="icon" src="http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png">
                    </div>`;
        //insert text
        info.insertAdjacentHTML('beforeend', html);
      });
    }
  }
  // if input is indiana city, create url using CITY ID
  else if(string.test(input) === true) {
    // create url using CITY ID DELETE LATER
    // match index of city to index of its city id
    let index = allCities.indexOf(input);
    input = cities[index].id;

    //fetch data
    const response = await fetch (`${base}?id=${input}&appid=${api}`);
    //console.log(response);
    const data = response.json();

    //if response works
    if (response.ok) {
      //clear previous error messages
      error.textContent = "";

      data.then(d => {
        // change the background
        changeBg(d.weather[0].main);

        let mainTemp = Math.round((((d.main.temp-273.15)*1.8) + 32) * 10) / 10; // change temp from K to F

        // change temp to c
        if (document.getElementById('c').checked) {
          mainTemp = `${Math.round(toCelsius(mainTemp) * 10) / 10} &degC`;
        }
        // change temp to f
        else{
          mainTemp = `${mainTemp} &degF`;
        }

        info.innerText = "";
        // create html
        // for icons, I am using open weather api's icons. More infor at: https://openweathermap.org/weather-conditions
       const html = `<h3>${d.name}</h3>
                     <h1>${mainTemp}</h1>
                     <div class="condition">
                       <h2>${d.weather[0].description}</h2>
                       <img class="icon" src="http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png">
                     </div>`;
        //insert text
        info.insertAdjacentHTML('beforeend', html);
      });
    }
  }
}

// add event listener; when button is clicked run searchQuery funct.
button.addEventListener('click', function (){
  searchQuery(input.value)
});
