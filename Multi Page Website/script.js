// =========================
// MOBILE NAVBAR
// =========================

var menuBtn = document.getElementById("menuBtn");
var navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", function() {
        navLinks.classList.toggle("show");
    });
}


// =========================
// PROJECTS
// =========================

var projects = [
    {
        title: "Todo App",
        description: "A task management application where users can add, edit, complete and delete tasks.",
        technologies: "HTML, CSS, JavaScript"
    },

    {
        title: "Weather Dashboard",
        description: "A weather application that fetches and displays live weather information using an API.",
        technologies: "HTML, CSS, JavaScript, API"
    },

    {
        title: "Notes App",
        description: "A notes application with create, edit, delete, search and localStorage functionality.",
        technologies: "HTML, CSS, JavaScript"
    },

    {
        title: "Restaurant Website",
        description: "A responsive restaurant website with a clean menu and user-friendly layout.",
        technologies: "HTML, CSS"
    }
];


// Find project container
var projectsContainer = document.getElementById("projectsContainer");


// Display projects only if the container exists
if (projectsContainer) {

    for (var i = 0; i < projects.length; i++) {

        var project = projects[i];

        // Create card
        var projectCard = document.createElement("div");
        projectCard.className = "project-card";


        // Project title
        var projectTitle = document.createElement("h2");
        projectTitle.innerText = project.title;


        // Project description
        var projectDescription = document.createElement("p");
        projectDescription.innerText = project.description;


        // Technologies
        var projectTech = document.createElement("span");
        projectTech.innerText = project.technologies;


        // Add everything to card
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDescription);
        projectCard.appendChild(projectTech);


        // Add card to container
        projectsContainer.appendChild(projectCard);
    }
}


// =========================
// CONTACT FORM
// =========================

var contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(e) {

        e.preventDefault();


        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var message = document.getElementById("message");

        var nameError = document.getElementById("nameError");
        var emailError = document.getElementById("emailError");
        var messageError = document.getElementById("messageError");

        var successMessage = document.getElementById("successMessage");


        // Clear previous errors
        nameError.innerText = "";
        emailError.innerText = "";
        messageError.innerText = "";
        successMessage.innerText = "";


        var valid = true;


        // Name validation
        if (name.value.trim() === "") {

            nameError.innerText = "Please enter your name.";

            valid = false;
        }


        // Email validation
        if (email.value.trim() === "") {

            emailError.innerText = "Please enter your email.";

            valid = false;

        } else if (!email.value.includes("@")) {

            emailError.innerText = "Please enter a valid email.";

            valid = false;
        }


        // Message validation
        if (message.value.trim() === "") {

            messageError.innerText = "Please enter your message.";

            valid = false;
        }


        // Stop if validation fails
        if (!valid) {
            return;
        }


        // Success
        successMessage.innerText =
            "Your message has been submitted successfully!";

        contactForm.reset();
    });
}