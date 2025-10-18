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

// GCSE question
function nextQuestionGCSE(answer) {
  knowsGCSE = answer === "Yes";
  let quizData = JSON.parse(localStorage.getItem('welcomeQuiz')) || [];
  quizData.push({ question: "Do you know GCSEs?", answer });
  localStorage.setItem('welcomeQuiz', JSON.stringify(quizData));

  document.getElementById("gcse-question").classList.remove("active");
  if (!knowsGCSE) {
    document.getElementById("gcse-explanation").classList.add("active");
  } else {
    document.getElementById("subjects-like").classList.add("active");
  }
}

// After GCSE explanation
function nextAfterGCSE() {
  document.getElementById("gcse-explanation").classList.remove("active");
  document.getElementById("subjects-like").classList.add("active");
}

// Multiple-choice question handler
function nextMultiChoice(questionTitle) {
  const activeDiv = document.querySelector(".quiz-question.active");
  const checkboxes = activeDiv.querySelectorAll("input[type='checkbox']");
  let selected = [];
  checkboxes.forEach(cb => {
    if (cb.checked) selected.push(cb.value);
  });

  let quizData = JSON.parse(localStorage.getItem('welcomeQuiz')) || [];
  quizData.push({ question: questionTitle, answer: selected });
  localStorage.setItem('welcomeQuiz', JSON.stringify(quizData));

  activeDiv.classList.remove("active");

  // Determine next question
  if (activeDiv.id === "subjects-like") {
    document.getElementById("subjects-dislike").classList.add("active");
  } else if (activeDiv.id === "subjects-dislike") {
    document.getElementById("subjects-more").classList.add("active");
  } else if (activeDiv.id === "subjects-more") {
    document.getElementById("finish-quiz").classList.add("active");
  }
}
