// === Modal Control ===
function openSignUp() {
  document.getElementById("signup-modal").style.display = "block";
}

function openLogin() {
  document.getElementById("login-modal").style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function openModal(id) {
  document.getElementById(id).style.display = "block";
}

// === Login / Signup / Logout Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const authButtons = document.querySelector(".auth-buttons");
  const greeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");

  // Sign Up Form
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value;
      const year = document.getElementById("signup-year").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      localStorage.setItem("user", JSON.stringify({ name, year, email, password }));

      closeModal("signup-modal");
      // Open Welcome Quiz after signup
      openModal("welcome-quiz-modal");
    });
  }

  // Login Form
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
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
  }

  // Show user greeting if logged in
  function showUserGreeting() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && greeting) {
      greeting.innerText = `👋 Hello, ${loggedInUser.name} (${loggedInUser.year})`;
      if (authButtons) authButtons.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    }
  }

  // Logout button
  window.logout = function() {
    localStorage.removeItem("loggedInUser");
    if (greeting) greeting.innerText = "";
    if (authButtons) authButtons.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";
  };

  showUserGreeting();
});

// === Close modal when clicking outside ===
window.onclick = function (event) {
  const modals = ["signup-modal", "login-modal", "welcome-quiz-modal"];
  modals.forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) modal.style.display = "none";
  });
};

// === Welcome Quiz Logic ===
function nextQuestion(answer) {
  // Save answer in localStorage
  let quizData = JSON.parse(localStorage.getItem("welcomeQuiz")) || [];
  quizData.push(answer);
  localStorage.setItem("welcomeQuiz", JSON.stringify(quizData));

  // Move to next question
  const current = document.querySelector(".quiz-question.active");
  current.classList.remove("active");
  const next = current.nextElementSibling;
  if (next) {
    next.classList.add("active");
  }
}

// === Quiz answer check (if needed for other quizzes) ===
function checkAnswer(button, type) {
  const siblings = button.parentNode.querySelectorAll("button");
  siblings.forEach(btn => btn.disabled = true);

  if (type === "correct") {
    button.classList.add("correct");
    button.innerText = "✅ Correct!";
  } else {
    button.classList.add("wrong");
    button.innerText = "❌ Try again!";
  }
}
