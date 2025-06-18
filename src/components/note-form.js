class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="noteForm">
        <div class="form-group">
          <label for="noteTitle">Note Title</label><br />
          <input 
            id="noteTitle"
            name="title"
            required
            minlength="3"
            pattern="^[a-zA-Z0-9 ]+$"
            aria-describedby="titleValidation"
          />
          <p id="titleValidation" class="validation-message" aria-live="polite"></p>
        </div>
        <div class="form-group">
          <label for="noteBody">Note Body</label><br />
          <textarea id="noteBody" name="body" required></textarea>
        </div>
        <button type="submit">Add Note</button>
      </form>
    `;

    const form = this.querySelector("#noteForm");
    const titleInput = form.elements["title"];

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!titleInput.checkValidity()) {
        titleInput.dispatchEvent(new Event("invalid"));
        return;
      }

      const title = titleInput.value.trim();
      const body = form.elements["body"].value.trim();

      if (title && body) {
        this.dispatchEvent(
          new CustomEvent("note-added", {
            detail: { title, body },
            bubbles: true,
          }),
        );
        form.reset();
        this.querySelector("#titleValidation").innerText = "";
      }
    });

    const handleCustomValidation = (event) => {
      const input = event.target;
      input.setCustomValidity("");

      if (input.validity.valueMissing) {
        input.setCustomValidity("Wajib diisi.");
      } else if (input.validity.tooShort) {
        input.setCustomValidity("Minimal 3 karakter.");
      } else if (input.validity.patternMismatch) {
        input.setCustomValidity("Hanya boleh huruf, angka, dan spasi.");
      }
    };

    titleInput.addEventListener("change", handleCustomValidation);
    titleInput.addEventListener("invalid", handleCustomValidation);
    titleInput.addEventListener("blur", (event) => {
      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;

      const connectedValidationId =
        event.target.getAttribute("aria-describedby");
      const connectedValidationEl = connectedValidationId
        ? document.getElementById(connectedValidationId)
        : null;

      if (connectedValidationEl && errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage;
      } else {
        connectedValidationEl.innerText = "";
      }
    });
  }
}

customElements.define("note-form", NoteForm);
