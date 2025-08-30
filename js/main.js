import { setupCounter } from "../components/Counter.js";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  setupCounter(btn);
});
