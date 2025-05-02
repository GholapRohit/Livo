const filtersContainer = document.querySelector(".filter-slideshow");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// Calculate the width of a single filter item
const filterWidth = document.querySelector(".filter").offsetWidth + 10; // Add gap

// Scroll to the previous set of filters
prevButton.addEventListener("click", () => {
  filtersContainer.scrollBy({
    left: -filterWidth * 3, // Adjust the number of slides to scroll
    behavior: "smooth",
  });
});

// Scroll to the next set of filters
nextButton.addEventListener("click", () => {
  filtersContainer.scrollBy({
    left: filterWidth * 3, // Adjust the number of slides to scroll
    behavior: "smooth",
  });
});
