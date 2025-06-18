class NoteItem extends HTMLElement {
  set note(value) {
    this._note = value;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note-card">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <small>Dibuat: ${new Date(this._note.createdAt).toLocaleString()}</small>
        <button class="delete-btn">🗑 Hapus</button>
      </div>
    `;

    const deleteBtn = this.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      if (confirm("Yakin ingin menghapus catatan ini?")) {
        this.dispatchEvent(
          new CustomEvent("note-deleted", {
            detail: { id: this._note.id },
            bubbles: true,
          })
        );
      }
    });
  }
}

customElements.define("note-item", NoteItem);
