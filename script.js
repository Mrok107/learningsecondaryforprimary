// ===== Modal Functions =====
function openSignUp() {
  document.getElementById("signup-modal").style.display = "block";
}
function openLogin() {
  document.getElementById("login-modal").style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// ===== Sign Up =====
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const year = document.getElementById("signup-year").value;

  if (!name || !email || !password || !year) {
    alert("Please fill in all fields!");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, password, year }));
  alert("Sign up successful! You can now log in.");
  closeModal("signup-modal");
});

// ===== Log In =====
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("login-name").value.trim();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
    alert("Incorrect credentials or no account found!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
  updateUserGreeting(storedUser.name, storedUser.year);
  closeModal("login-modal");
});

// ===== Greeting & Auth Buttons =====
function updateUserGreeting(name, year) {
  const greetingDiv = document.getElementById("user-greeting");
  greetingDiv.textContent = `👋 Welcome, ${name} (${year})!`;

  const authButtons = document.querySelector(".auth-buttons");
  if (authButtons) authButtons.style.display = "none";
}

// ===== Auto Load Greeting on Page Load =====
window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    updateUserGreeting(loggedInUser.name, loggedInUser.year);
  }
});
