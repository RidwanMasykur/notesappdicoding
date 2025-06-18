let notes = [];

async function fetchNotes() {
  showLoading();
  try {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const result = await response.json();
    notes = result.data;
  } catch (error) {
    alert("Gagal memuat catatan");
  } finally {
    hideLoading();
  }
}

async function addNote({ title, body }) {
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
    fetchNotes();
  } catch (error) {
    alert("Gagal menambahkan catatan");
  } finally {
    hideLoading();
  }
}

export async function deleteNote(id) {
  showLoading();
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`,
      {
        method: "DELETE",
      },
    );
    const result = await response.json();
    alert(result.message);
    fetchNotes();
  } catch (error) {
    alert("Gagal menghapus catatan");
  } finally {
    hideLoading();
  }
}

function showLoading() {
  document.querySelector(".loading").style.display = "block";
}

function hideLoading() {
  document.querySelector(".loading").style.display = "none";
}