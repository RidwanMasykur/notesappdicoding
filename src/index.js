import "./app.js";
import "./components/note-form.js";
import "./components/note-item.js";
import "./components/note-list.js";
import './style.css';
import { deleteNote } from "./app.js";

const noteListEl = document.querySelector("note-list");
noteListEl.addEventListener("note-deleted", async (event) => {
  const id = event.detail.id;
  await deleteNote(id);
  await fetchNotes();
});

const loadingEl = document.querySelector(".loading");

function showLoading() {
  loadingEl.style.display = "block";
}

function hideLoading() {
  loadingEl.style.display = "none";
}

async function fetchNotes() {
  showLoading();
  try {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const result = await response.json();
    noteListEl.notes = result.data;
  } catch (error) {
    alert("Gagal memuat catatan");
  } finally {
    hideLoading();
  }
}

document.querySelector("note-form").addEventListener("note-added", async (event) => {
  const { title, body } = event.detail;

  showLoading();
  try {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const result = await response.json();
    alert(result.message);
    await fetchNotes();
  } catch (error) {
    alert("Gagal menambahkan catatan");
  } finally {
    hideLoading();
  }
});

fetchNotes();
