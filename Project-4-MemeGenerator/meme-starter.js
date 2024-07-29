// #0 array of image choices - feel free to adjust / add
const images = ['cyber_brad.png', 'kermit_tea.jpg', 'shocked_cat.jpg'];



// #1 get elements (5 in all)
// grab containers for meme and image choices
// also two text inputs, and the button
const meme = document.querySelector('.meme');
//console.log(meme);
const choices = document.querySelector('.choices');
//console.log(choices);
const text1 = document.querySelector('#msg1');
//console.log(text1);
const text2 = document.querySelector('#msg2');
//console.log(text2);
const button = document.querySelector('.meme-button');
//console.log(button);




// #2 display possible bkgs
// for each image choice in images, write a figure to hold each image
// use regex to grab the parts needed for alt and figcaption
// be clever - don't overthing - for e.g. grab once and then use string methods?

/* <figure>
      <img src="images/shocked_cat.jpg" alt="shocked_cat" class="active">
      <figcaption>shocked cat</figcaption>
    </figure> */
images.forEach(image => {
   //remove .extension from filename
   let alt = image.replace(/\.\w+/, " ");
   //console.log(alt);
   //replace underscore with a string
   let name = alt.replace(/_/, " ");
   //console.log(name);
   const fig = 
      `<figure>
      <img src="images/${image}" alt="${alt}" class="active">
      <figcaption>${name}<figcaption>
      </figure>
      `
      choices.insertAdjacentHTML('afterbegin', fig);
});


// #3 add event listener to each image choice
// grab all the images (select these elements)
const imgs = document.querySelectorAll('img');
//console.log(imgs);


// choose one image to be the default
// set this for you, you are welcome to mix it up
let selectedImg = 'kermit_tea.jpg';

// for each of the images, on click, make the clicked image active
// remember you can get event.target to find which button was clicked
// first remove the active class from all images
// then add active class to the current image clicked on
// don't forget to set the current image as your new selectedImg
imgs.forEach(event => {
   //remove class 'active' from all images
   event.classList.remove('active');
   //add 'active' class to clicked image
   event.addEventListener('click', ()=>{
      event.classList.add('active');
      //select filename from filepath, helpt from Blair Wadman
      selectedImg = event.src.substring(event.src.lastIndexOf('/')+1);
      //console.log(selectedImg);
   })
});


// #4 add event listener to button
// clear the meme element of any previous HTML content
// set the selectedImg as a background image in .meme element (set a style)
// grab the values from the inputs
// construct HTML: (for example...)
/* <h2>online courses?</h2>
   <h2>info profs: no problem</h2> */
// insert HTML into meme element
// clear input values / set inputs to be empty
button.addEventListener('click',()=> {
   meme.innerHTML = '';
   meme.style.backgroundImage = `url('images/${selectedImg}')`;
   //grab user input
   let memeText = `
      <h2>${text1.value}</h2>
      <h2>${text2.value}</h2>
   `;
   meme.insertAdjacentHTML('afterbegin', memeText);
   text1.value = "";
   text2.value = "";
});