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

// === Quiz Logic ===
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

// === Login / Signup Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const authButtons = document.querySelector(".auth-buttons");
  const greeting = document.getElementById("user-greeting");

  // Handle Sign Up
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
    });
  }

  // Handle Log In
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

  // Keep user logged in
  showUserGreeting();

  function showUserGreeting() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && greeting) {
      greeting.innerText = `👋 Hello, ${loggedInUser.name} (${loggedInUser.year})`;
      if (authButtons) authButtons.style.display = "none";
    }
  }
});

// === Close modal when clicking outside ===
window.onclick = function (event) {
  const signup = document.getElementById("signup-modal");
  const login = document.getElementById("login-modal");
  if (event.target === signup) signup.style.display = "none";
  if (event.target === login) login.style.display = "none";
};
