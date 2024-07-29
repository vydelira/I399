/*
   Valeria De Lira
   I399 Web Design 2
   Project 1
   2/3/2020
 */    

//IN-CLASS CHALLENGE
const colors = ['#e5051b','#f6e06a', '#f1a432', '#a9b724', '#458a92', '#aa0c90', '#301196', '#f2b8a2', '#fdbb2f', '#27d193'];

//Target button, text, and body
let button = document.querySelector('.button');
let colorCode = document.querySelector('.colorName');
let bg = document.querySelector('body');

function changeColor() {
    //Select random color from array
    const randomColor = colors[Math.floor(Math.random()*colors.length)];

    //Assign new bg color hex code
    colorCode.textContent = `${randomColor};`;

    //Target background color
    bg.style.backgroundColor = `${randomColor}`;
}
button.addEventListener('click', changeColor);


//CHALLENGE #1
//Create color array
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
//Hex code starts with #
const hash = '#';

//Everytime the button is clicked, generate a hex code
function generateHex() 
{
    let hexColor = `${hash}`;
    for (let i = 0; i < 6; i++) {
        //Append random character from array
        hexColor += hex[Math.floor(Math.random()*hex.length)];
    }

    //Assign new bg color hex code 
    colorCode.textContent = `${hexColor}`;  

    //Change background color
    bg.style.backgroundColor = `${hexColor}`;
}
button.addEventListener('click', generateHex);


//CHALLENGE 2
function generateHsl() {
    //Assign hue to random num between 1-360
    let h = Math.floor(Math.random() * 360) + 1;
    //Assign saturation to random num between 0 -100
    let s = Math.floor(Math.random() * 101);
    //Assign lightness to random num between 0 -100 
    let l= Math.floor(Math.random() * 101);

    //if color is too dark
    if(l < 36) {
        //Change the text color to white
        bg.style.color = 'white';
    }
    else {
        //if color is light, text becomes black
        bg.style.color = 'black';
    } 

    let hslColor= `hsl(${h}, ${s}%, ${l}%)`;
    //Change text on the webpage
    let h2 = document.querySelector('h2');
    h2.textContent = 'HSL Color Code: ';
    //Assign new bg color hex code 
    colorCode.textContent = hslColor;
    //Change background color
    bg.style.backgroundColor = hslColor;
}
button.addEventListener('click', generateHsl);
 