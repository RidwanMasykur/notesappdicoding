class NoteList extends HTMLElement {
  set notes(value) {
    this._notes = value;
    this.render();
  }

  connectedCallback() {
    if (!this._notes) this._notes = [];
    this.render();
  }

render() {
  console.log("Rendering Notes:", this._notes);
  this.innerHTML = "";
  this._notes.forEach((note) => {
    const item = document.createElement("note-item");
    item.note = note;
    this.appendChild(item);
  });
}

  render() {
    this.innerHTML = "";
    this._notes.forEach((note) => {
      const item = document.createElement("note-item");
      item.note = note;
      this.appendChild(item);
    });
  }
}

customElements.define("note-list", NoteList);

