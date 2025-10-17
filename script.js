// === Modal Control ===
function openSignUp() { document.getElementById("signup-modal").style.display = "block"; }
function openLogin() { document.getElementById("login-modal").style.display = "block"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }

// === Quiz Logic for Answer Buttons ===
function checkAnswer(button, type) {
  const siblings = button.parentNode.querySelectorAll('button');
  siblings.forEach(btn => btn.disabled = true);

  if (type === 'correct') {
    button.classList.add('correct');
    button.innerText = "✅ Correct!";
  } else {
    button.classList.add('wrong');
    button.innerText = "❌ Try again!";
  }
}

// === Welcome Quiz Logic ===
function nextQuestion(answer) {
  let quizData = JSON.parse(localStorage.getItem('welcomeQuiz')) || [];
  quizData.push(answer);
  localStorage.setItem('welcomeQuiz', JSON.stringify(quizData));

  const current = document.querySelector('.quiz-question.active');
  current.classList.remove('active');
  const next = current.nextElementSibling;
  if (next) next.classList.add('active');
}

// === Login / Signup Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  const authButtons = document.querySelector(".auth-buttons");
  const greeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");

  // Sign Up
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const year = document.getElementById("signup-year").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    localStorage.setItem("user", JSON.stringify({ name, year, email, password }));
    closeModal("signup-modal");
    openModal("welcome-quiz-modal");
  });

  // Log In
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("login-name").value;
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
      closeModal("login-modal");
      showUserGreeting();
    } else {
      alert("❌ Invalid login details.");
    }
  });

  showUserGreeting();
});

// Show greeting + hide/show buttons
function showUserGreeting() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const greeting = document.getElementById("user-greeting");
  const authButtons = document.querySelector(".auth-buttons");
  const logoutBtn = document.getElementById("logout-btn");

  if (loggedInUser) {
    if (greeting) greeting.innerText = `👋 Hello, ${loggedInUser.name} (${loggedInUser.year})`;
    if (authButtons) authButtons.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (greeting) greeting.innerText = "";
    if (authButtons) authButtons.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

// Logout function
function logout() {
  localStorage.removeItem("loggedInUser");
  showUserGreeting();
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modals = ["signup-modal", "login-modal", "welcome-quiz-modal"];
  modals.forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) modal.style.display = "none";
  });
}

// Open any modal by ID
function openModal(id) { document.getElementById(id).style.display = 'block'; }
