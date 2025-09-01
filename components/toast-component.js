class CustomToast extends HTMLElement {
  static get observedAttributes() {
    return ["message", "type", "duration"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Dastlabki qiymatlar (fallback)
    this._message = "Default message";
    this._type = "info";
    this._duration = 3000;

    // Ichki DOM skeleton (style + container)
    this.shadowRoot.innerHTML = `
      <style>
        .toast {
          position: fixed;
          top: 1.25rem;
          right: 1.25rem;
          min-width: 12.5rem;
          max-width: 18.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: #fff;
          font-family: sans-serif;
          font-size: 0.875rem;
          box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.15);
          opacity: 0;
          transform: translateY(1.25rem);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 9999;
        }
        .toast.show { opacity: 1; transform: translateY(0); }
        .toast.info { background: #2196f3; }
        .toast.success { background: #4caf50; }
        .toast.error { background: #f44336; }
      </style>
      <div class="toast"></div>
    `;

    this._el = this.shadowRoot.querySelector(".toast");
    this._hideTimer = null;
  }

  connectedCallback() {
    // Atributlar (agar HTMLda berilgan bo‘lsa) – DOMga qo‘shilganda o‘qib olamiz
    if (this.hasAttribute("message"))
      this._message = this.getAttribute("message");
    if (this.hasAttribute("type"))
      this._type = this.getAttribute("type") || "info";
    if (this.hasAttribute("duration"))
      this._duration = parseInt(this.getAttribute("duration")) || 3000;

    this.render();
    // animatsiya uchun kichik delay
    requestAnimationFrame(() => this._el.classList.add("show"));

    // Avto-yopish
    this._startHideTimer();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === "message") this._message = newVal ?? "Default message";
    if (name === "type") this._type = newVal ?? "info";
    if (name === "duration") this._duration = parseInt(newVal) || 3000;

    this.render();
    this._restartHideTimer();
  }

  render() {
    this._el.className = `toast ${this._type}`;
    this._el.textContent = this._message;
  }

  _startHideTimer() {
    this._hideTimer = setTimeout(() => this.hide(), this._duration);
  }

  _restartHideTimer() {
    if (this._hideTimer) clearTimeout(this._hideTimer);
    this._startHideTimer();
  }

  hide() {
    this._el.classList.remove("show");
    setTimeout(() => this.remove(), 300);
  }
}

customElements.define("custom-toast", CustomToast);

// JS orqali chaqirish helper’i
export const showToast = (message, type = "info", duration = 3000) => {
  const toast = document.createElement("custom-toast");
  // Muhim: atribbutlarni appendChild'dan OLDIN qo‘yamiz, lekin endi baribir connectedCallback/attributeChanged ishlaydi
  toast.setAttribute("message", message);
  toast.setAttribute("type", type);
  toast.setAttribute("duration", String(duration));
  document.body.appendChild(toast);
  return toast;
};
