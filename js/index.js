// Select landing page element
let lpage = document.querySelector(".landing");
const backrandom = document.querySelectorAll(".boxes span");

// Get images array
let landingimages = ["01.jpeg", "02.jpg", "03.webp"];

let backoption = true;

// Change background
// var to control interval
let interval;

let baclocalitem = localStorage.getItem("background_option");

if (baclocalitem !== null) {
    backoption = (baclocalitem === 'true');

    backrandom.forEach(span => {
        span.classList.remove("active");
    });

    if (baclocalitem === 'true') {
        document.querySelector(".boxes .yes").classList.add("active");
    } else {
        document.querySelector(".boxes .no").classList.add("active");
    }
}

// Skills selector
let skills = document.querySelector(".skills");

window.onscroll = function() {
    if (skills) {
        // Skills offset top
        let skillstop = skills.offsetTop;
        // Outer height
        let outerheight = skills.offsetHeight;
        // Window height
        let windowheight = this.innerHeight;
        // Scroll top
        let windowscrolltop = this.pageYOffset;

        if (windowscrolltop >= (skillstop + outerheight - windowheight)) {
            let allskills = document.querySelectorAll(".skills .skill-prog span");

            allskills.forEach(skill => {
                skill.style.width = skill.dataset.prog; // Use dataset.prog
            });
        }
    }
};

// Function to randomize images
function randomimage() {
    if (backoption === true) {
        interval = setInterval(() => {
            let random = Math.floor(Math.random() * landingimages.length);
            lpage.style.backgroundImage = 'url("images/' + landingimages[random] + '")';
        }, 1000);
    }
}

if (backoption) {
    randomimage();
}

let gear = document.querySelector(".gear");
let settings = document.querySelector(".settings");
gear.onclick = function() {
    this.classList.toggle("fa-spin");
    settings.classList.toggle("open");
}









// Switch colors
// Check if color exists in localstorage
let maincolors = localStorage.getItem("color-option");

const colorsli = document.querySelectorAll(".colors-list li");
colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        // Set this color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set color on localstorage
        localStorage.setItem("color-option", e.target.dataset.color);

        handleactive(e);
    });
});

if (maincolors !== null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"));

    document.querySelectorAll(".colors-list li").forEach(li => {
        li.classList.remove("active");

        if (li.dataset.color === maincolors) {
            li.classList.add("active");
        }
    });
}

// Switch background
// Loop on spans
backrandom.forEach(span => {
    span.addEventListener("click", (e) => {
        backrandom.forEach(el => {
            el.classList.remove("active");
        });
        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {
            backoption = true;
            randomimage();
            localStorage.setItem("background_option", true);
        } else {
            backoption = false;
            clearInterval(interval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Choose background
let imagesoption = document.querySelectorAll(".images img");

let saveback = localStorage.getItem("backsrc");
if (saveback) {
    lpage.style.backgroundImage = `url(${saveback})`;
}

imagesoption.forEach(img => {
    img.addEventListener("click", (e) => {
        let imgsrc = e.target.src;
        lpage.style.backgroundImage = `url(${imgsrc})`;

        localStorage.setItem("backsrc", imgsrc);
    });
});

// Create popup with image
let gallary = document.querySelectorAll(".gallary img");

gallary.forEach(img => {
    img.addEventListener("click", (e) => {
        // Create overlay element
        let overlayimg = document.createElement("div");
        // Add class to overlay
        overlayimg.className = 'popup-overlay';

        // Add overlay to body
        document.body.appendChild(overlayimg);

        // Create popup for each image
        let popupbox = document.createElement("div");
        // Add class to box
        popupbox.className = 'popup-box';

        if (img.alt !== null) {
            // Create heading
            let heading = document.createElement("h3");
            // Create text for h3
            let text = document.createTextNode(img.alt);

            heading.appendChild(text);

            popupbox.appendChild(heading);
        }

        // Create the image
        let popupimg = document.createElement("img");
        popupimg.src = img.src;

        let close = document.createElement("i")
        close.className = 'fas fa-times-circle';

        popupbox.appendChild(popupimg);
        popupbox.appendChild(close);
        document.body.appendChild(popupbox);

        close.addEventListener("click", (e) => {
            e.target.parentNode.remove();
            document.querySelector(".popup-overlay").remove();
        });
    });
});

// Select all bullets
const bullets = document.querySelectorAll(".bullets .bullet");

// Select all links
const links = document.querySelectorAll(".links a");

function scroll(els) {
    els.forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scroll(bullets);
scroll(links);

// Handle active statement
function handleactive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(el => {
        el.classList.remove("active");
    });
    ev.target.classList.add("active");
}

// Show bullets
let bulletspan = document.querySelectorAll(".bullets-option span");
let bulletcontainer = document.querySelector(".bullets");
let bulletlocal = localStorage.getItem("bullets-options");

if (bulletlocal !== null) {
    bulletspan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletlocal === 'block') {
        bulletcontainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletcontainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletspan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (e.target.dataset.display === 'show') {
            bulletcontainer.style.display = 'block';
            localStorage.setItem("bullets-options", 'block');
        } else {
            bulletcontainer.style.display = 'none';
            localStorage.setItem("bullets-options", 'none');
        }
        handleactive(e);
    });
});

//rest btn
document.querySelector(".rest").onclick=function(){

    // localStorage.clear();
   localStorage.removeItem("bullets_options");
   localStorage.removeItem("background_option");
   localStorage.removeItem("color-option");

   window.location.reload();
}


//media 
let toggle=document.querySelector(".bars");
var activebar = document.querySelector(".bars "); // Replace 'activebar' with the actual ID of the element
var headlinks = document.querySelector(".links"); // Replace 'headlinks' with the actual ID of the element

toggle.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle("active");
    headlinks.classList.toggle("open");
}

//click anywhere close menu


document.addEventListener("click",(e)=>{
   if(e.target !== toggle && e.target!== headlinks){
    
    if(headlinks.classList.contains("open")){

        toggle.classList.toggle("active");
        headlinks.classList.toggle("open");
    }
   }
});

// Ensure elements are not null before accessing their properties


if (headlinks) {
    headlinks.onclick = function(e) {
        e.stopPropagation();
    };
}


