// === Modal Control ===
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "block";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

function openSignUp() {
  openModal("signup-modal");
}

function openLogin() {
  openModal("login-modal");
}

// === Quiz Logic ===
function checkAnswer(button, type) {
  const siblings = button.parentNode.querySelectorAll("button");
  siblings.forEach((btn) => (btn.disabled = true));

  if (type === "correct") {
    button.classList.add("correct");
    button.innerText = "✅ Correct!";
  } else {
    button.classList.add("wrong");
    button.innerText = "❌ Try again!";
  }
}

// === Welcome Quiz Logic ===
function nextQuestion(answer) {
  let quizData = JSON.parse(localStorage.getItem("welcomeQuiz")) || [];
  quizData.push(answer);
  localStorage.setItem("welcomeQuiz", JSON.stringify(quizData));

  const current = document.querySelector(".quiz-question.active");
  if (!current) return;
  current.classList.remove("active");

  const next = current.nextElementSibling;
  if (next) next.classList.add("active");
}

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const authButtons = document.querySelector(".auth-buttons");
  const greeting = document.getElementById("user-greeting");

  // --- Sign Up ---
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("signup-name").value;
      const year = document.getElementById("signup-year").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      // Save user info
      localStorage.setItem("user", JSON.stringify({ name, year, email, password }));

      // Reset Welcome Quiz
      const questions = document.querySelectorAll(".quiz-question");
      questions.forEach((q) => q.classList.remove("active"));
      if (questions[0]) questions[0].classList.add("active");
      localStorage.setItem("welcomeQuiz", JSON.stringify([]));

      // Close Sign Up modal & open Welcome Quiz
      closeModal("signup-modal");
      openModal("welcome-quiz-modal");
    });
  }

  // --- Log In ---
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("login-name").value;
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (savedUser && savedUser.email === email && savedUser.password === password) {
        closeModal("login-modal");
        localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
        showUserGreeting();
      } else {
        alert("❌ Invalid login details.");
      }
    });
  }

  // --- Show greeting if already logged in ---
  function showUserGreeting() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && greeting) {
      greeting.innerText = `👋 Hello, ${loggedInUser.name} (${loggedInUser.year})`;
      if (authButtons) authButtons.style.display = "none";
    }
  }

  showUserGreeting();

  // --- Close modal when clicking outside ---
  window.onclick = function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (event.target === modal) modal.style.display = "none";
    });
  };
});
