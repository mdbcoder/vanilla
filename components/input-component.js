class CustomInput extends HTMLElement {
  constructor() {
    super();

    const label = this.getAttribute("label") || "Label";
    const type = this.getAttribute("type") || "text";
    const placeholder = this.getAttribute("placeholder") || "";
    const className = this.getAttribute("className") || "";
    const classNameLabel = this.getAttribute("classNameLabel") || "";
    const classNameInput = this.getAttribute("classNameInput") || "";
    const inputId =
      this.getAttribute("input-id") || `inp-${crypto.randomUUID()}`;
    const required = this.hasAttribute("required") ? "required" : "";

    this.innerHTML = `
      <div class="${className}">
        <label class="${classNameLabel}" for="${inputId}">${label}</label>
        <input class="${classNameInput}" id="${inputId}" type="${type}" placeholder="${placeholder}" ${required} />
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
