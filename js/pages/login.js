import { $ } from "../../utils/dom.js";

const togglePassword = $("#togglePassword");
const passwordInput = $('custom-input[type="password"]');
togglePassword.addEventListener("click", function () {
  const type =
    passwordInput?.input?.getAttribute("type") === "password"
      ? "text"
      : "password";
  passwordInput?.input?.setAttribute("type", type);
  this.classList.toggle("show-password");
});
