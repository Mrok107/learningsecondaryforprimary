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

// === Quiz Logic ===
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

  function showUserArea(user) {
    if (user) {
      greeting.innerText = `👋 Hello, ${user.name} (${user.year})`;
      logoutBtn.style.display = "inline-block";
      authButtons.style.display = "none";
    } else {
      greeting.innerText = "";
      logoutBtn.style.display = "none";
      authButtons.style.display = "block";
    }
  }

  // On page load, show logged-in user if exists
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  showUserArea(loggedInUser);

  if (signupForm) {
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
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (savedUser && savedUser.email === email && savedUser.password === password) {
        localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
        closeModal("login-modal");
        showUserArea(savedUser);
      } else {
        alert("❌ Invalid login details.");
      }
    });
  }

  // Logout button
  logoutBtn.addEventListener("click", logout);

  function logout() {
    localStorage.removeItem("loggedInUser");
    showUserArea(null);
  }
});

// === Close modal when clicking outside ===
window.onclick = function (event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) modal.style.display = "none";
  });
};
