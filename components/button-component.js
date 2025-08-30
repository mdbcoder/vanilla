class CustomButton extends HTMLElement {
  constructor() {
    super();

    const label = this.getAttribute("label") || "Button";
    const onclick = this.getAttribute("onclick") || "";
    const className = this.getAttribute("class") || "";
    const id = this.getAttribute("id") || "";
    const type = this.getAttribute("type") || "button";

    this.innerHTML = `
      <button id="${id}" class="${className}" onclick="${onclick}" type="${type}">${label}</button>
    `;
  }
}

customElements.define("custom-button", CustomButton);
