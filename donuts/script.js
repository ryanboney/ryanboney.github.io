const counter = document.getElementById("counter");
const donut = document.getElementById("donut");

const multiplier = document.getElementById("multiplier");
const autoclicker = document.getElementById("autoclicker");

let donuts = 0;
let multi = 1;
let multiplierEnabled = false;
let autoclickEnabled = false;
let autoclickEngaged = false;

multiplier.style.display="none";
autoclicker.style.display="none";

function addDonut(){

    donuts += 1*multi;

    if ((autoclickEnabled === false)&&(multiplierEnabled === false)) counter.innerHTML = `Donuts: ${donuts}`;
    else if ((autoclickEnabled === true)&&(multiplierEnabled === false)) counter.innerHTML = `Donuts: ${donuts} <br> AutoClickers: ${clickers}`;
    else if ((autoclickEnabled === false)&&(multiplierEnabled === true)) counter.innerHTML = `Donuts: ${donuts} <br> Multiplier: ${multi}X`;
    else counter.innerHTML = `Donuts: ${donuts} <br> AutoClickers: ${clickers} <br> Multiplier: ${multi}X`;

    if ((donuts > 9)&&(multiplierEnabled===false)){
        multiplier.innerHTML = '<img src="./images/coin.png" alt="">UNLOCK MULTIPLIER<br>(10 Donuts)<div id="reverse"><img src="./images/coin.png" alt=""></div>';
        multiplierEnabled = true;
        multiplier.style.display="";
    }

    if ((donuts > 99)&&(autoclickEnabled===false)){
        autoclicker.innerHTML = '<img src="./images/clicker.png" alt="">UNLOCK AUTOCLICKER<br>(100 Donuts)<div id="reverse"><img src="./images/clicker.png" alt=""></div>';
        autoclickEnabled = true;
        autoclicker.style.display="";
    }
}

function dropDonut(){

    document.body.style.overflow = 'hidden'; // Prevents scrolling
    const dropDonut = document.createElement('img'); // Creates donut clone
    dropDonut.src = './images/donut2.png';
    dropDonut.style.position = 'absolute'; // Sets the position to absolute
    dropDonut.style.width = '100px'; // Sets the width of the image
    dropDonut.style.height = '100px'; // Sets the height of the image
    dropDonut.style.left = Math.random() * window.innerWidth + 'px'; // Sets a random horizontal position
    dropDonut.style.top = donut.style.objectPosition; // Sets the initial vertical position to the top of the page
    document.body.appendChild(dropDonut); //Adds new donut
    dropDonut.style.zIndex = '-1'; // Sends to back!
    
    let speed = 3; // Speed of the image
    let position = -200; // Bumps position of the image offscreen

    const animate = setInterval(() => { // Updates location every 1ms

        position += speed;
        dropDonut.style.top = position + 'px'; // Sets location per update

        if (position > window.innerHeight - dropDonut.offsetHeight) {
            clearInterval(animate);
            document.body.removeChild(dropDonut);
        } // ^ Removes once at bottom

    }, 1);
    
}

let clickers = 0;

function addClicker() {
    if (donuts >= 100) {
        donuts -= 100;
        clickers++;
        if (multiplierEnabled === false) counter.innerHTML = `Donuts: ${donuts} <br> AutoClickers: ${clickers}`;
        else counter.innerHTML = `Donuts: ${donuts} <br> AutoClickers: ${clickers} <br> Multiplier: ${multi}X`;
        
        if (autoclickEngaged === false) autoClick();
        autoclickEngaged = true;
    }
}

function autoClick() {
    if (clickers >= 1) {
    donuts += clickers*multi;
    if (multiplierEnabled === false) counter.innerHTML = `Donuts: ${donuts} <br> AutoClickers: ${clickers}`;
    else counter.innerHTML = `Donuts: ${donuts} <br> AutoClickers: ${clickers} <br> Multiplier: ${multi}X`;
    setTimeout(autoClick, 1000);
    }
}

autoclicker.addEventListener("click", addClicker);

donut.addEventListener('click', addDonut);
donut.addEventListener('click', dropDonut);





