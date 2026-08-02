// Select all feature cards
const hiddenElements = document.querySelectorAll(".hidden");

// Create the Intersection Observer
const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.2
    }
);

// Observe each hidden card
hiddenElements.forEach((element) => {

    observer.observe(element);

});