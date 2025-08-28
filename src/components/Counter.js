export function setupCounter(buttonEl) {
  let c = 0;
  buttonEl.addEventListener("click", () => {
    buttonEl.textContent = String(++c);
    console.log(buttonEl);
  });
}
