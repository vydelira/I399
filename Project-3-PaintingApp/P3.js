// **STEP ZERO: SET UP
// select HTML elements for canvas and clear
const canvas = document.querySelector('canvas');
const clear = document.querySelector('.clear');


// get the size of the canvas
const { width, height } = canvas;
console.log(width, height);

// initialize canvas drawing settings
// set the join, cap and width for our lines 
const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 15;


// set a default color for drawing with
// this is one place where you can mess with 
// changing the color of the line since it's a variable
let color = 'black';
ctx.strokeStyle = color;


// **STEP ONE: test out canvas
// Place cursor in the middle and make a dot
//set x and y to center of canvas
//start the path, set to x, y, then draw it
// let x = width/2;
// let y = height/2;

// ctx.beginPath();
// ctx.moveTo(x, y);
// ctx.lineTo(x, y);
// ctx.stroke();



// initialize variables
// for use in mouseDraw()
// set lastX, lastY postions
// and isDrawing boolean
let lastX = 0;
let lastY = 0;
let isDrawing = false; //mouse drawing


// set an amount of pixels to move by
// create an object to keep track of when keys are pressed
let keysPressed = {}; //keyboard draw
let moveAmount = 10;


// **STEP THREE: draw with the mouse
function mouseDraw(event) {
  // stop if not mouse down
  if (!isDrawing) return;
  
  // start the path and move to last x and y
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  // connect the line to the new x and y
  ctx.lineTo(event.offsetX * 2, event.offsetY * 2);
  // draw the line
  ctx.stroke();
  // reset lastX and lastY
  [lastX, lastY] = [event.offsetX * 2, event.offsetY * 2];
}


// **STEP TWO: add event listeners for each of the mouse movements in canvas
// on mousedown, isDrawing should be true, and lastX and lastY are reset
// on mousemove, we should draw - callback of mouseDraw 
// on mouseup, isDrawing should be false
// if we also want to stop drawing if mouse leaves the canvas (optional)
canvas.addEventListener('mouseout', () => isDrawing = false);

canvas.addEventListener('mousedown', (event) => {
  //keep track of where we are drawing
  isDrawing = true;

  //set the current x and y to be last know coordinates
  [lastX, lastY] = [event.offsetX * 2, event.offsetY * 2];
  //console.log(lastX, lastY, isDrawing);
  //console.log(event);
});

//reference mouseDraw function as a callback, 
//only call if canvas has mouse moving on it
canvas.addEventListener('mousemove', mouseDraw);

canvas.addEventListener('mouseup', () => isDrawing = false);


// **STEP FOUR: clear the screen
function clearCanvas() {
  // cool shake the canvas effect
  canvas.classList.add('shake');
  canvas.addEventListener('animationend', function() {
    canvas.classList.remove('shake');
  }, { once: true });

  // clear the screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // reset initial x and y positions
  lastX = 0;
  lastY = 0;
}
// add an event listener to clear button
// callback of clearCanvas
clear.addEventListener('click', clearCanvas);


// **STEP FIVE: draw using keyboard's arrow keys
// set an x, y and default move amount (your instructors used 10)
// on keydown event, capture any Arrow keys
// then move x and y based on that set amount
// draw a line 

document.addEventListener('keydown', (event) => {
  // prevent normal arrow functionality
  event.preventDefault();

  // keep track of keys pressed
  keysPressed[event.key] = true;
  //console.log(keysPressed);

  // if key pressed is an arrow key
   //left
   if (keysPressed.ArrowLeft) {
    //console.log('left');
    lastX -= moveAmount;
  }
  //up
  else if (keysPressed.ArrowUp) {
    //console.log('up');
    lastY -= moveAmount;
  }
  //right
  else if (keysPressed.ArrowRight) {
   // console.log('right');
    lastX += moveAmount;
  }
  //down
  else if(keysPressed.ArrowDown) {
   // console.log('down');
    lastY += moveAmount;
  }
  //handle diagonal lines
  else if(keysPressed.ArrowUp && keysPressed.ArrowLeft) {
    lastX -= moveAmount;
    lastY -= moveAmount;
   }
  else if(keysPressed.ArrowUp && keysPressed.ArrowRight) {
    lastX += moveAmount;
    lastY -= moveAmount;
  }
  else if(keysPressed.ArrowDown && keysPressed.ArrowRight) {
    lastX += moveAmount;
    lastY += moveAmount;
   }
  else if(keysPressed.ArrowDown && keysPressed.ArrowLeft) {
    lastX -= moveAmount;
    lastY += moveAmount;
  }
  //console.log(lastX, lastY);

  //set the color
  ctx.strokeStyle = setColor();

  // start the path with old x, y
  ctx.beginPath();
  // set new coordinates based on movement amount
  ctx.moveTo(lastX, lastY);
  // draw the path
  ctx.fillRect(lastX, lastY, moveAmount, moveAmount);
});


// when we are done drawing with the arrow keys
// delete the event
document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
})

//target buttons
let buttons = document.querySelectorAll('button');
let h, s, l;
let hsl = '';

// **STEP SIX: handle buttons
buttons.forEach(button => button.addEventListener('click', 
function handleButton(event) {
//console.log(event);
  //erase
  //set color to gray (background color)
  if(event.target.dataset.action === 'erase') {
    //console.log(event.target.dataset.action);
    ctx.fillStyle = 'gray';
    ctx.strokeStyle = 'gray';
  }

  //wild
  //set the color to a new hsl - random value for H
  if(event.target.dataset.action === 'wild') {
    //console.log(event.target.dataset.action);
    h = Math.floor(Math.random() * 360) + 1;
    s = Math.floor(Math.random() * 101);
    l = l= Math.floor(Math.random() * 101);
    hsl = `hsl(${h}, ${s}%, ${l}%)`;
    ctx.fillStyle = hsl;
    ctx.strokeStyle = hsl;
  }

  //random
    //set the color to a new hsl - but to a random choice that I made initially
  //figure out where to set up that random value
  if(event.target.dataset.action === 'random') {
    //console.log(event.target.dataset.action);
  }

  //rainbow
  //set the color to a new hsl - variable for H
  if(event.target.dataset.action === 'rainbow') {
    //console.log(event.target.dataset.action);

  }
}));


// option: also handle radio buttons (select all inputs)
// either directly change values or write callback
document.querySelectorAll('input').forEach(input => {
  //console.log(input);
  const value = input.getAttribute('value');
  //console.log(value);

  input.addEventListener('click', ()=> {
    //set line width
    if (input.id === 'thin') {
      ctx.lineWidth = value;
      //console.log(input.id, input.value, input.checked);
    }
    else if (input.id === 'medium') {
      ctx.lineWidth = value;
      //console.log(input.id, input.value, input.checked);
    }
    else if (input.id === 'thick') {
      ctx.lineWidth = value;
      //console.log(input.id, input.value, input.checked);
    }
  });
});



// **STEP SEVEN: handle colors
// write a helper function to assist in changing the colors
// call from wherever you need to when drawing with mouse or keyboard

// function setColor() {

// }

