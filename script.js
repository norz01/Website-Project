// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector(".mobile-nav-toggle");
const mainNav = document.querySelector("#main-nav-menu");
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !isExpanded);
  mainNav.classList.toggle("active");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// --- Scroll Animations (Intersection Observer) ---
const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
};
const scrollObserver = new IntersectionObserver(
  observerCallback,
  observerOptions
);
const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
elementsToAnimate.forEach((el) => scrollObserver.observe(el));

// --- Basic Carousel Logic ---
const carouselTrack = document.querySelector(".carousel-track");
if (carouselTrack) {
  const slides = Array.from(carouselTrack.children);
  const nextButton = document.querySelector(".carousel-button.next");
  const prevButton = document.querySelector(".carousel-button.prev");

  if (slides.length > 0) {
    const slideWidth = slides[0].getBoundingClientRect().width; // Although not used directly here, good to have if needed later
    let currentIndex = 0;

    const moveToSlide = (track, currentSlide, targetSlide) => {
      if (targetSlide) {
        track.style.transform = "translateX(-" + targetSlide.offsetLeft + "px)";
        if (currentSlide) currentSlide.classList.remove("active"); // Remove active from previous
        targetSlide.classList.add("active"); // Add active to current
      }
    };

    const updateButtons = () => {
      if (prevButton && nextButton) {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
      }
    };

    // Initialize first slide as active
    if (slides[currentIndex]) slides[currentIndex].classList.add("active");
    updateButtons(); // Initial button state

    if (nextButton) {
      nextButton.addEventListener("click", (e) => {
        if (currentIndex < slides.length - 1) {
          const currentSlide = slides[currentIndex];
          currentIndex++;
          const nextSlide = slides[currentIndex];
          moveToSlide(carouselTrack, currentSlide, nextSlide);
          updateButtons();
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", (e) => {
        if (currentIndex > 0) {
          const currentSlide = slides[currentIndex];
          currentIndex--;
          const prevSlide = slides[currentIndex];
          moveToSlide(carouselTrack, currentSlide, prevSlide);
          updateButtons();
        }
      });
    }
  } else {
    console.log("No slides found in the carousel track.");
    // Optionally disable buttons if no slides
    if (prevButton) prevButton.style.display = "none";
    if (nextButton) nextButton.style.display = "none";
  }
} else {
  console.log("Carousel track element not found.");
}
