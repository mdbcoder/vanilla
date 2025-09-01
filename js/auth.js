import { showToast } from "../components/toast-component.js";
import {
  AUTHORIZATION,
  CURRENT_USER,
  WOORKROOM,
  USERS_LOGIN,
} from "../utils/const.js";
import { $ } from "../utils/dom.js";

// Dastlabki setup: users bo'lmasa, yarat
if (!localStorage.getItem(WOORKROOM)) {
  const users = [
    {
      rememberMe: false,
      signin: { email: "admin@gmail.com", password: "12345" },
      onboarding: {
        step: 1,
        phone: {
          cc: "+998",
          number: "901234567",
          otp: "1111",
          otpExpiresAt: 90,
        },
        profile: { useCase: "work", role: "admin", newsletterOptIn: true },
        company: { name: "My Company", direction: "it", teamSize: "51-100" },
        invites: ["member@gmail.com"],
      },
    }, // Dastlabki user
  ];
  localStorage.setItem(WOORKROOM, JSON.stringify({ [USERS_LOGIN]: users }));
}

// Local storage dan users ni olish
function getUsers() {
  return (
    (JSON.parse(localStorage.getItem(WOORKROOM)) || {})?.[USERS_LOGIN] || []
  );
}

// Login funksiyasi
function login() {
  const email = $("#email").value;
  const password = $("#password").value;
  const remember = $("#remember-me").checked;
  // back end ga yuborish uchun remember
  console.log(remember);
  const users = getUsers();
  const user = users.find(
    (u) => u?.signin?.email === email && u?.signin?.password === password
  );

  if (user) {
    localStorage.setItem(AUTHORIZATION, "true"); // Login holatini saqlash
    localStorage.setItem(CURRENT_USER, email); // Joriy foydalanuvchi emailini saqlash
    window.location.href = "pages/dashboard/dashboard.html"; // Dashboard ga o'tish
  } else {
    showToast("Email or password incorrect!", "error", 4000);
  }
}

// Login ni tekshirish funksiyasi
function checkLogin() {
  const loggedIn = localStorage.getItem(AUTHORIZATION);
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (!loggedIn && currentPage !== "index.html") {
    window.location.href = "/index.html";
  } else if (loggedIn && currentPage === "/index.html") {
    window.location.href = "/pages/dashboard/dashboard.html";
  }
}

// logout funksiyasi
function logout() {
  localStorage.removeItem(AUTHORIZATION);
  localStorage.removeItem(CURRENT_USER);
  window.location.href = "../../index.html"; // Bosh sahifaga qaytish
}

const logoutBtn = $("#log-out");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

// DOM yuklanganda ishga tushirish
document.addEventListener("DOMContentLoaded", () => {
  const form = $("#loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Formani default submit dan to'xtatish
      login(); // Login funksiyasini chaqirish
    });
  }
  checkLogin(); // Sahifa ochilganda login tekshiruvi
});
