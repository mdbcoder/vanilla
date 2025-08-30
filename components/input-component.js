class CustomInput extends HTMLElement {
  constructor() {
    super();

    const label = this.getAttribute("label") || "Label";
    const type = this.getAttribute("type") || "text";
    const placeholder = this.getAttribute("placeholder") || "";
    const className = this.getAttribute("class") || "";
    const id = this.getAttribute("id") || "";
    const required = this.hasAttribute("required") ? "required" : "";

    this.innerHTML = `
      <div class="${className}">
        <label for="${id}" >${label}</label>
        <input id="${id}" type="${type}" placeholder="${placeholder}" ${required} />
      </div>
    `;
  }

  connectedCallback() {
    this.input = this.querySelector("input");
  }

  get value() {
    return this.input.value;
  }

  set value(val) {
    this.input.value = val;
  }
}

customElements.define("custom-input", CustomInput);
