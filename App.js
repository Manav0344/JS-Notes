/* ================== ELEMENT REFERENCES ================== */

// Note modal
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const noteModal = document.getElementById("noteModal");

// Folder modal
const folderModal = document.getElementById("folderModal");
const openFolderModal = document.getElementById("openFolderModal");
const closeFolderModal = document.getElementById("closeFolderModal");
const cancelFolder = document.getElementById("cancelFolder");
const createFolderBtn = document.getElementById("createFolder");

// Inputs
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveNoteBtn = document.getElementById("saveNote");
const folderNameInput = document.getElementById("folderNameInput");

// Containers
const notesGrid = document.getElementById("notesGrid");
const folderGrid = document.getElementById("folderGrid");

// Filter
const filterSelect = document.getElementById("filterNotes");

// Tag
let selectedTag = "Work";
let editingNoteIndex = null;



// Default folder
const folders = {
  "All Notes": []
};

let currentFolder = "All Notes";

/* ================== NOTE MODAL ================== */

openModalBtn.addEventListener("click", () => {
  noteModal.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
  noteModal.classList.remove("active");
  resetNoteForm();
});

/* ================== FOLDER MODAL ================== */

openFolderModal.addEventListener("click", () => {
  folderModal.classList.add("active");
});

closeFolderModal.addEventListener("click", () => {
  folderModal.classList.remove("active");
});

cancelFolder.addEventListener("click", () => {
  folderModal.classList.remove("active");
});

/* ================== TAG SELECTION ================== */

document.querySelectorAll(".tags button").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedTag = btn.dataset.tag;
    document.querySelectorAll(".tags button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

/* ================== CREATE FOLDER ================== */

createFolderBtn.addEventListener("click", () => {
  const name = folderNameInput.value.trim();
  if (!name || folders[name]) return;

  folders[name] = [];
  folderNameInput.value = "";
  folderModal.classList.remove("active");

  renderFolders();
});



saveNoteBtn.addEventListener("click", () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (!title || !content) {
    alert("Please enter title and content");
    return;
  }

  const noteData = {
    title,
    content,
    tag: selectedTag,
    date: new Date().toLocaleString()
  };

  if (editingNoteIndex !== null) {
    folders[currentFolder][editingNoteIndex] = noteData;
  } else {
    folders[currentFolder].push(noteData);
  }

  noteModal.classList.remove("active");
  resetNoteForm();
  renderNotes();
});



function renderFolders() {
  folderGrid.innerHTML = `
    <div class="folder-card add-folder" id="openFolderModal">
      <div class="folder-icon">📁+</div>
      <p>New Folder</p>
    </div>
  `;

  document.getElementById("openFolderModal")
    .addEventListener("click", () => folderModal.classList.add("active"));

  Object.keys(folders).forEach(folder => {
    const div = document.createElement("div");
    div.className = "folder-card";
    if (folder === currentFolder) div.classList.add("active");

    div.innerHTML = `
      <div class="folder-icon">📁</div>
      <p>${folder}</p>
    `;

    div.onclick = () => {
      currentFolder = folder;
      editingNoteIndex = null;
      renderFolders();
      renderNotes();
    };

    folderGrid.appendChild(div);
  });
}



function renderNotes() {
  notesGrid.innerHTML = "";

  const filter = filterSelect.value;
  const notes = folders[currentFolder];

  notes.forEach((note, index) => {
    if (filter !== "All" && note.tag !== filter) return;

    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
      <span class="delete-btn">🗑</span>
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="note-footer">
        <span class="tag ${note.tag}">${note.tag}</span>
        <span>${note.date}</span>
      </div>
    `;

    // Delete
    card.querySelector(".delete-btn").onclick = (e) => {
      e.stopPropagation();
      folders[currentFolder].splice(index, 1);
      renderNotes();
    };

    // Edit
    card.onclick = () => {
      editingNoteIndex = index;
      noteTitle.value = note.title;
      noteContent.value = note.content;
      selectedTag = note.tag;
      saveNoteBtn.textContent = "Update Note";
      noteModal.classList.add("active");
    };

    notesGrid.appendChild(card);
  });
}



filterSelect.addEventListener("change", renderNotes);



function resetNoteForm() {
  noteTitle.value = "";
  noteContent.value = "";
  selectedTag = "Work";
  editingNoteIndex = null;
  saveNoteBtn.textContent = "Save Note";
}



renderFolders();
renderNotes();
