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

// === Logout Function ===
function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

// === Login / Signup Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const authButtons = document.querySelector(".auth-buttons");
  const greeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");

  function showUserGreeting() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && greeting) {
      greeting.innerText = `👋 Hello, ${loggedInUser.name} (${loggedInUser.year})`;
      authButtons.style.display = "none";
      logoutBtn.style.display = "block";
    }
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value;
      const year = document.getElementById("signup-year").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      localStorage.setItem("user", JSON.stringify({ name, year, email, password }));
      alert("✅ Sign-up successful! You can now log in.");
      closeModal("signup-modal");

      // Open welcome quiz
      document.getElementById("welcome-quiz-modal").style.display = "block";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
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

  showUserGreeting();
});

// === Close modal when clicking outside ===
window.onclick = function (event) {
  const signup = document.getElementById("signup-modal");
  const login = document.getElementById("login-modal");
  const quiz = document.getElementById("welcome-quiz-modal");
  if (event.target === signup) signup.style.display = "none";
  if (event.target === login) login.style.display = "none";
  if (event.target === quiz) quiz.style.display = "none";
};

// === Welcome Quiz Logic ===
let knowsGCSE = true;

function nextQuestion(answer, type = "") {
  // Save answer in localStorage
  let quizData = JSON.parse(localStorage.getItem('welcomeQuiz')) || [];
  quizData.push(answer);
  localStorage.setItem('welcomeQuiz', JSON.stringify(quizData));

  if (type === "gcse") {
    knowsGCSE = answer === "Yes";
  }

  const current = document.querySelector('.quiz-question.active');
  current.classList.remove('active');

  let next;
  if (!knowsGCSE && current.nextElementSibling.id !== "gcse-explanation") {
    next = document.getElementById("gcse-explanation");
  } else if (current.nextElementSibling) {
    next = current.nextElementSibling;
  } else {
    next = document.getElementById("finish-quiz");
  }

  if (next) {
    next.classList.add('active');
  }
}
