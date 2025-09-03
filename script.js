// Facilities Carousel - Infinite Loop
const slides = document.querySelector('.slides');
let images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 1;
let interval;

// Clone first and last image
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slides.appendChild(firstClone);
slides.insertBefore(lastClone, slides.firstChild);

// Update images list after cloning
images = document.querySelectorAll('.slides img');

// Set initial position
let size = images[0].clientWidth;

// update size on window resize
window.addEventListener("resize", () => {
  size = images[0].clientWidth;
  slides.style.transition = "none"; // prevent jump animation
  slides.style.transform = `translateX(${-size * index}px)`;
});


slides.style.transform = `translateX(${-size * index}px)`;

// Function to slide
function moveToSlide() {
  slides.style.transition = "transform 0.5s ease-in-out";
  slides.style.transform = `translateX(${-size * index}px)`;
}

// Handle infinite looping
slides.addEventListener("transitionend", () => {
  if (images[index].id === "last-clone") {
    slides.style.transition = "none";
    index = images.length - 2;
    slides.style.transform = `translateX(${-size * index}px)`;
  }
  if (images[index].id === "first-clone") {
    slides.style.transition = "none";
    index = 1;
    slides.style.transform = `translateX(${-size * index}px)`;
  }
});

// Buttons
nextBtn.addEventListener('click', () => {
  if (index >= images.length - 1) return;
  index++;
  moveToSlide();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  if (index <= 0) return;
  index--;
  moveToSlide();
  resetInterval();
});

// Auto-play
function startAutoPlay() {
  interval = setInterval(() => {
    if (index >= images.length - 1) return;
    index++;
    moveToSlide();
  }, 3000);
}

function resetInterval() {
  clearInterval(interval);
  startAutoPlay();
}

startAutoPlay();

