const slides = document.querySelectorAll(".slide");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const counter = document.getElementById("current-slide");

let currentSlide = 0;


function showSlide(index) {

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");

  counter.textContent =
    String(index + 1).padStart(2, "0");
}


nextButton.addEventListener("click", () => {

  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
});


prevButton.addEventListener("click", () => {

  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
});
// ------------------------------
// SWIPE FOR LOCATION SLIDER
// ------------------------------

const slider = document.querySelector(".location-slider");

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;

  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;

  // Kleine Fingerbewegungen ignorieren
  if (Math.abs(swipeDistance) < 50) {
    return;
  }

  // Nach links gewischt → nächstes Bild
  if (swipeDistance > 0) {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
  }

  // Nach rechts gewischt → vorheriges Bild
  else {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
  }

  showSlide(currentSlide);
}
// ------------------------------
// MOBILE MENU
// ------------------------------

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");


menuToggle.addEventListener("click", () => {

  const isOpen = navigation.classList.toggle("open");

  menuToggle.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);

});


navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    navigation.classList.remove("open");
    menuToggle.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

  });

});

// ------------------------------
// SCROLL ANIMATIONS
// ------------------------------

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }

    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});