// ===============================
// BUTTON COMPONENT
// ===============================

function createButton({ text, variant = "primary", onClick }) {

    var button = document.createElement("button");

    button.innerText = text;

    button.className = "ui-button btn-" + variant;

    if (onClick) {
        button.addEventListener("click", onClick);
    }

    return button;
}


// ===============================
// CARD COMPONENT
// ===============================

function createCard({ title, content, variant = "blue" }) {

    var card = document.createElement("div");

    card.className = "ui-card card-" + variant;

    var cardTitle = document.createElement("h3");
    cardTitle.innerText = title;

    var cardContent = document.createElement("p");
    cardContent.innerText = content;

    card.appendChild(cardTitle);
    card.appendChild(cardContent);

    return card;
}


// ===============================
// MODAL COMPONENT
// ===============================

function createModal({ title, content }) {

    var overlay = document.getElementById("modalOverlay");

    // Clear previous modal
    overlay.innerHTML = "";

    var modal = document.createElement("div");
    modal.className = "modal";


    // Title
    var modalTitle = document.createElement("h2");
    modalTitle.innerText = title;


    // Content
    var modalContent = document.createElement("p");
    modalContent.innerText = content;


    // Close button
    var closeButton = document.createElement("button");

    closeButton.innerText = "Close";
    closeButton.className = "modal-close";


    // Close function
    function closeModal() {
        overlay.classList.remove("show");
    }


    closeButton.addEventListener("click", closeModal);


    // Close when clicking outside modal
    overlay.addEventListener("click", function(e) {

        if (e.target === overlay) {
            closeModal();
        }

    });


    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    modal.appendChild(closeButton);

    overlay.appendChild(modal);


    // Open modal
    function openModal() {
        overlay.classList.add("show");
    }


    return {
        open: openModal,
        close: closeModal
    };
}


// ===============================
// TOAST COMPONENT
// ===============================

function createToast({
    message,
    type = "info",
    duration = 3000
}) {

    var toastArea = document.getElementById("toastArea");

    var toast = document.createElement("div");

    toast.className = "toast toast-" + type;


    // Message
    var toastMessage = document.createElement("span");

    toastMessage.className = "toast-message";
    toastMessage.innerText = message;


    // Close button
    var closeButton = document.createElement("button");

    closeButton.className = "toast-close";
    closeButton.innerText = "×";


    // Remove toast
    function removeToast() {

        toast.remove();

    }


    closeButton.addEventListener("click", removeToast);


    toast.appendChild(toastMessage);
    toast.appendChild(closeButton);

    toastArea.appendChild(toast);


    // Auto dismiss
    setTimeout(function() {

        removeToast();

    }, duration);
}


// ===============================
// DEMO - BUTTONS
// ===============================

var buttonContainer =
    document.getElementById("buttonContainer");


if (buttonContainer) {

    var primaryButton = createButton({
        text: "Primary",
        variant: "primary",
        onClick: function() {

            createToast({
                message: "Primary button clicked!",
                type: "success"
            });

        }
    });


    var secondaryButton = createButton({
        text: "Secondary",
        variant: "secondary",
        onClick: function() {

            createToast({
                message: "Secondary button clicked!",
                type: "info"
            });

        }
    });


    var successButton = createButton({
        text: "Success",
        variant: "success",
        onClick: function() {

            createToast({
                message: "Success action completed!",
                type: "success"
            });

        }
    });


    var dangerButton = createButton({
        text: "Delete",
        variant: "danger",
        onClick: function() {

            createToast({
                message: "Delete action triggered!",
                type: "error"
            });

        }
    });


    buttonContainer.appendChild(primaryButton);
    buttonContainer.appendChild(secondaryButton);
    buttonContainer.appendChild(successButton);
    buttonContainer.appendChild(dangerButton);
}


// ===============================
// DEMO - CARDS
// ===============================

var cardContainer =
    document.getElementById("cardContainer");


if (cardContainer) {

    var card1 = createCard({
        title: "Web Development",
        content: "Building responsive and interactive websites.",
        variant: "blue"
    });


    var card2 = createCard({
        title: "JavaScript",
        content: "Creating dynamic interfaces with reusable functions.",
        variant: "green"
    });


    var card3 = createCard({
        title: "UI Design",
        content: "Creating simple and user-friendly interfaces.",
        variant: "purple"
    });


    cardContainer.appendChild(card1);
    cardContainer.appendChild(card2);
    cardContainer.appendChild(card3);
}


// ===============================
// DEMO - MODAL
// ===============================

var modal = createModal({
    title: "Welcome to the UI Kit",
    content:
        "This modal was created completely with JavaScript. " +
        "The same createModal function can be reused with different content."
});


var modalContainer =
    document.getElementById("modalContainer");


if (modalContainer) {

    var openModalButton = createButton({

        text: "Open Modal",

        variant: "primary",

        onClick: function() {

            modal.open();

        }

    });


    modalContainer.appendChild(openModalButton);
}


// ===============================
// DEMO - TOASTS
// ===============================

var toastContainer =
    document.getElementById("toastContainer");


if (toastContainer) {

    var successToastButton = createButton({

        text: "Success Toast",

        variant: "success",

        onClick: function() {

            createToast({
                message: "Everything went successfully!",
                type: "success",
                duration: 3000
            });

        }

    });


    var errorToastButton = createButton({

        text: "Error Toast",

        variant: "danger",

        onClick: function() {

            createToast({
                message: "Something went wrong.",
                type: "error",
                duration: 4000
            });

        }

    });


    var infoToastButton = createButton({

        text: "Info Toast",

        variant: "primary",

        onClick: function() {

            createToast({
                message: "Here is some useful information.",
                type: "info",
                duration: 3000
            });

        }

    });


    var stackingButton = createButton({

        text: "Show 3 Toasts",

        variant: "secondary",

        onClick: function() {

            createToast({
                message: "First notification",
                type: "info",
                duration: 5000
            });

            createToast({
                message: "Second notification",
                type: "success",
                duration: 5000
            });

            createToast({
                message: "Third notification",
                type: "warning",
                duration: 5000
            });

        }

    });


    toastContainer.appendChild(successToastButton);
    toastContainer.appendChild(errorToastButton);
    toastContainer.appendChild(infoToastButton);
    toastContainer.appendChild(stackingButton);
}