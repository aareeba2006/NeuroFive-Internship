var noteForm = document.getElementById("noteForm");
var noteTitle = document.getElementById("noteTitle");
var noteContent = document.getElementById("noteContent");

var titleError = document.getElementById("titleError");
var contentError = document.getElementById("contentError");

var notesContainer = document.getElementById("notesContainer");
var searchInput = document.getElementById("searchInput");
var saveBtn = document.getElementById("saveBtn");

var notes = JSON.parse(localStorage.getItem("notesApp")) || [];

var editingNoteId = null;


// Display notes when page loads
displayNotes(notes);


// Form submit
noteForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var title = noteTitle.value.trim();
    var content = noteContent.value.trim();

    // Clear old errors
    titleError.innerText = "";
    contentError.innerText = "";

    var valid = true;

    // Title validation
    if (title === "") {
        titleError.innerText = "Please enter a note title.";
        valid = false;
    }

    // Content validation
    if (content === "") {
        contentError.innerText = "Please enter note content.";
        valid = false;
    }

    // Stop if validation fails
    if (!valid) {
        return;
    }


    // EDIT NOTE
    if (editingNoteId !== null) {

        for (var i = 0; i < notes.length; i++) {

            if (notes[i].id === editingNoteId) {

                notes[i].title = title;
                notes[i].content = content;
                notes[i].lastEdited = new Date().toLocaleString();

                break;
            }
        }

        editingNoteId = null;

        saveBtn.innerText = "Add Note";
    }

    // CREATE NEW NOTE
    else {

        var newNote = {
            id: Date.now(),
            title: title,
            content: content,
            lastEdited: new Date().toLocaleString()
        };

        notes.push(newNote);
    }


    // Save notes to localStorage
    localStorage.setItem("notesApp", JSON.stringify(notes));

    // Display notes
    displayNotes(notes);

    // Clear form
    noteForm.reset();
});


// Display notes
function displayNotes(notesToDisplay) {

    notesContainer.innerHTML = "";

    if (notesToDisplay.length === 0) {

        notesContainer.innerHTML = "<p>No notes found.</p>";

        return;
    }


    for (var i = 0; i < notesToDisplay.length; i++) {

        var note = notesToDisplay[i];

        var noteCard = document.createElement("div");
        noteCard.className = "note-card";

        var title = document.createElement("h2");
        title.innerText = note.title;

        var content = document.createElement("p");
        content.innerText = note.content;

        var lastEdited = document.createElement("p");
        lastEdited.className = "last-edited";
        lastEdited.innerText = "Last edited: " + note.lastEdited;


        // Buttons container
        var buttons = document.createElement("div");
        buttons.className = "note-buttons";


        // Edit button
        var editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerText = "Edit";

        editBtn.onclick = function(noteId) {

            return function() {
                editNote(noteId);
            };

        }(note.id);


        // Delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Delete";

        deleteBtn.onclick = function(noteId) {

            return function() {
                deleteNote(noteId);
            };

        }(note.id);


        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        noteCard.appendChild(title);
        noteCard.appendChild(content);
        noteCard.appendChild(lastEdited);
        noteCard.appendChild(buttons);

        notesContainer.appendChild(noteCard);
    }
}


// Edit note
function editNote(id) {

    for (var i = 0; i < notes.length; i++) {

        if (notes[i].id === id) {

            noteTitle.value = notes[i].title;
            noteContent.value = notes[i].content;

            editingNoteId = id;

            saveBtn.innerText = "Update Note";

            // Scroll to form
            noteForm.scrollIntoView({
                behavior: "smooth"
            });

            break;
        }
    }
}


// Delete note
function deleteNote(id) {

    for (var i = 0; i < notes.length; i++) {

        if (notes[i].id === id) {

            notes.splice(i, 1);

            break;
        }
    }


    // Update localStorage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Display updated notes
    displayNotes(notes);
}


// Search notes
searchInput.addEventListener("input", function() {

    var searchText = searchInput.value.toLowerCase().trim();

    var filteredNotes = [];

    for (var i = 0; i < notes.length; i++) {

        var title = notes[i].title.toLowerCase();
        var content = notes[i].content.toLowerCase();

        if (
            title.includes(searchText) ||
            content.includes(searchText)
        ) {
            filteredNotes.push(notes[i]);
        }
    }

    displayNotes(filteredNotes);
});