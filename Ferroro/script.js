// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector(".mobile-nav-toggle");
const mainNav = document.querySelector("#main-nav-menu");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", !isExpanded);

    menuToggle.classList.toggle("is-active");

    mainNav.classList.toggle("active");
  });
} else {
  console.error(
    "Mobile menu toggle button or main navigation menu not found. Check classes and IDs."
  );
}

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
    // const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    const moveToSlide = (track, currentSlide, targetSlide) => {
      if (targetSlide) {
        track.style.transform = `translateX(-${targetSlide.offsetLeft}px)`;
        if (currentSlide) currentSlide.classList.remove("active");
        targetSlide.classList.add("active");
      }
    };

    const updateButtons = () => {
      if (prevButton && nextButton) {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
      }
    };

    // Initialize first slide as active
    if (slides[currentIndex]) {
      slides[currentIndex].classList.add("active");
      // moveToSlide(carouselTrack, null, slides[currentIndex]);
    }
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

    window.addEventListener("resize", () => {
      if (slides.length > 0 && slides[currentIndex]) {
        moveToSlide(carouselTrack, slides[currentIndex], slides[currentIndex]);
      }
    });
  } else {
    console.log("No slides found in the carousel track.");
    if (prevButton) prevButton.style.display = "none";
    if (nextButton) nextButton.style.display = "none";
  }
} else {
  console.log("Carousel track element not found.");
}
