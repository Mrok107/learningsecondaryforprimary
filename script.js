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

// Store multi-choice answers
let quizAnswers = {
  liked: [],
  disliked: [],
  more: []
};

// GCSE question
function nextQuestionGCSE(answer) {
  knowsGCSE = answer === "Yes";

  let savedQuiz = JSON.parse(localStorage.getItem("welcomeQuiz")) || [];
  savedQuiz.push({ question: "Do you know GCSEs?", answer });
  localStorage.setItem("welcomeQuiz", JSON.stringify(savedQuiz));

  document.getElementById("gcse-question").classList.remove("active");

  if (!knowsGCSE) {
    document.getElementById("gcse-explanation").classList.add("active");
  } else {
    document.getElementById("subjects-like").classList.add("active");
  }
}

function nextAfterGCSE() {
  document.getElementById("gcse-explanation").classList.remove("active");
  document.getElementById("subjects-like").classList.add("active");
}

// Handle multi-choice questions
function nextMultiChoice(type) {
  let container, answers;
  switch(type) {
    case 'Subjects you like':
      container = document.getElementById("subjects-like");
      answers = quizAnswers.liked;
      break;
    case 'Subjects you dislike':
      container = document.getElementById("subjects-dislike");
      answers = quizAnswers.disliked;
      break;
    case 'Subjects to study more':
      container = document.getElementById("subjects-more");
      answers = quizAnswers.more;
      break;
    default:
      return;
  }

  const checkboxes = container.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(cb => {
    if (cb.checked && !answers.includes(cb.value)) {
      answers.push(cb.value);
    }
  });

  // Save to localStorage
  let savedQuiz = JSON.parse(localStorage.getItem("welcomeQuiz")) || [];
  savedQuiz.push({ question: type, answer: answers });
  localStorage.setItem("welcomeQuiz", JSON.stringify(savedQuiz));

  container.classList.remove("active");

  // Move to next section
  if (type === "Subjects you like") {
    document.getElementById("subjects-dislike").classList.add("active");
  } else if (type === "Subjects you dislike") {
    document.getElementById("subjects-more").classList.add("active");
  } else if (type === "Subjects to study more") {
    document.getElementById("finish-quiz").classList.add("active");
  }
}
