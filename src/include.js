async function includeFragment(el) {
  // Client-Side Include
  // el - data-include atributiga ega element
  const url = el.getAttribute("data-include");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    el.outerHTML = await res.text(); // elementni o'rnini HTML bilan almashtiradi
  } catch (e) {
    el.outerHTML = `<!-- include failed: ${url} -->`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(includeFragment);
});
