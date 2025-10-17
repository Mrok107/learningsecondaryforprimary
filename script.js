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

// === Welcome Quiz Logic ===
function nextQuestion(answer) {
  let quizData = JSON.parse(localStorage.getItem('welcomeQuiz')) || [];
  quizData.push(answer);
  localStorage.setItem('welcomeQuiz', JSON.stringify(quizData));

  const current = document.querySelector('.quiz-question.active');
  current.classList.remove('active');

  const next = current.nextElementSibling;
  if (next) {
    next.classList.add('active');
  }
}

// === Login / Signup Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const authButtons = document.querySelector(".auth-buttons");
  const greeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");

  // Sign Up
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("signup-name").value;
      const year = document.getElementById("signup-year").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      localStorage.setItem("user", JSON.stringify({ name, year, email, password }));
      closeModal("signup-modal");

      // Show welcome quiz after sign-up
      openModal('welcome-quiz-modal');
    });
  }

  // Log In
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

  // Show greeting if already logged in
  showUserGreeting();

  function showUserGreeting() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      greeting.innerText = `👋 Hello, ${loggedInUser.name} (${loggedInUser.year})`;
      authButtons.style.display = "none";
      logoutBtn.style.display = "inline-block";
    }
  }

  // Logout
  window.logout = function() {
    localStorage.removeItem("loggedInUser");
    greeting.innerText = "";
    authButtons.style.display = "block";
    logoutBtn.style.display = "none";
  };

  // Close modals when clicking outside
  window.onclick = function(event) {
    const signup = document.getElementById("signup-modal");
    const login = document.getElementById("login-modal");
    const quiz = document.getElementById("welcome-quiz-modal");
    if (event.target === signup) signup.style.display = "none";
    if (event.target === login) login.style.display = "none";
    if (event.target === quiz) quiz.style.display = "none";
  };
});
