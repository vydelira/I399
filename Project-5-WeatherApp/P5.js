console.log('weather app online');

// please use this key for weather API
const API_KEY = "fc676f0c6032d100db307e3101c4f7fb"

// ONE
// select HTML elements for the form (zipcode & button)
// select HTML elements for the output (error & info)
const input = document.querySelector('.zipcode');
const button = document.querySelector('button');
const error = document.querySelector('.error');
const info = document.querySelector('.info');



// THREE
// Write a function searchQuery to validate the zipcode
//    • check if the zipcode is a valid zipcode (user helper function)
//    • if it is valid (as in it's 5 digits), call getWeather()
//    • if it is not valid, update text inside 'error' HTML element -
//      text should say "Invalid Zip!" (or similar)
function searchQuery(num) {
    //if valid call getWeather function
    if(validateZipCode(num) === true) {
        console.log('valid');
        getWeather(num);
    }
    else {
        //error code
        console.log('error');
        error.innerText = 'Invalid Zip!';
    }
}



// FOUR
// Write a helper function validateZipCode
//    • use regex to make sure it's a series of 5 digits
function validateZipCode(n) {
    //make sure user input is only five digits long
    const zip = /^\d{5}$/;
    return zip.test(n);
}


// FIVE
// Write the function getWeather for fetching weather data using async/await
//    • use async and await
//    • fetch JSON data from OpenWeather API
//    • check the HTTP response status before proceeding in the function
//      - zip might be 5 numbers, but not all 5 number combos are actually zipcodes
//      - OR there could be server issues or internet issues...
//      HOWEVER if data request DID IN FACT work:
//        - clear out any previous error messages
//        - pull data from object for city, humidity, temperature and conditions
//        - by conditions, we mean "Rainy", "Snowy", etc.. 
//        - find where the docs talk about each parameter...
//        - https://openweathermap.org/current
//    • format pulled data using HTML
//    • display in 'info' HTML container - apply class 'weather-desc'
async function getWeather(zip) {
    //fetch data
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}&units=imperial`);
    //console.log(response);

    //if response works
    if (response.ok) {
        //clear previous error messages
        error.textContent = "";
        //transform data into json
        const jsondata = response.json();

        jsondata.then(data => {
            //console.log(data);
            console.log(data.weather[0]);
            info.innerText = "";
            const html = `${data.name}, ${data.main.temp}&deg;F, Humidity: ${data.main.humidity}%, ${data.weather[0].description} <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
            //insert text
            info.insertAdjacentHTML('beforeend', html);
        });
    }
    else {
        error.innerText = `Error: ${response.status} (${response.statusText})`;
    }
}


// TWO
// When 'search' button is clicked:
//    call a function to first validate the zipcode typed in by the user
// in other words:
//    call searchQuery() and pass it zipcode's value
button.addEventListener('click', function(){
    searchQuery(input.value)
});