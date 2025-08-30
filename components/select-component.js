class CustomSelect extends HTMLElement {
  constructor() {
    super();

    const label = this.getAttribute("label") || "Select";
    const options = JSON.parse(this.getAttribute("options") || "[]");

    this.innerHTML = `
      <style>
        .select-container {
          margin: 10px 0;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        select {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }
      </style>
      <div class="select-container">
        <label>${label}</label>
        <select>
          ${options
            .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
            .join("")}
        </select>
      </div>
    `;
  }

  connectedCallback() {
    this.select = this.shadowRoot.querySelector("select");
  }

  get value() {
    return this.select.value;
  }

  set value(val) {
    this.select.value = val;
  }
}

customElements.define("custom-select", CustomSelect);
