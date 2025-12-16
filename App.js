const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modal = document.getElementById("noteModal");

const saveNoteBtn = document.getElementById("saveNote");
const notesGrid = document.getElementById("notesGrid");

const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");

const filterSelect = document.getElementById("filterNotes");

let selectedTag = "Work";


openModalBtn.addEventListener("click", () => {
  modal.classList.add("active");
});


closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});


document.querySelectorAll(".tags button").forEach(button => {
  button.addEventListener("click", () => {
    selectedTag = button.dataset.tag;

    document.querySelectorAll(".tags button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});


saveNoteBtn.addEventListener("click", () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (title === "" || content === "") {
    alert("Please enter title and content");
    return;
  }

  const noteCard = document.createElement("div");
  noteCard.classList.add("note-card");

  noteCard.innerHTML = `
    <span class="delete-btn">🗑</span>
    <h3>${title}</h3>
    <p>${content}</p>
    <div class="note-footer">
      <span class="tag ${selectedTag}">${selectedTag}</span>
      <span>${new Date().toLocaleString()}</span>
    </div>
  `;

 
  noteCard.querySelector(".delete-btn").addEventListener("click", () => {
    noteCard.remove();
  });

  notesGrid.appendChild(noteCard);

  
  noteTitle.value = "";
  noteContent.value = "";
  selectedTag = "Work";

  modal.classList.remove("active");


  filterNotes();
});


function filterNotes() {
  const selectedFilter = filterSelect.value;
  const allNotes = document.querySelectorAll(".note-card");

  allNotes.forEach(note => {
    const noteTag = note.querySelector(".tag").textContent;

    if (selectedFilter === "All" || noteTag === selectedFilter) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
}

filterSelect.addEventListener("change", filterNotes);
