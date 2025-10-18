// === Modal Control ===
function openSignUp() {
  document.getElementById("signup-modal").style.display = "block";
}

function openLogin() {
  document.getElementById("login-modal").style.display = "block";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

// === Logout Function ===
function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

// === User Greeting Logic ===
function showUserGreeting() {
  const greeting = document.getElementById("user-greeting");
  const authButtons = document.querySelector(".auth-buttons");
  const logoutBtn = document.getElementById("logout-btn");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser && greeting) {
    greeting.innerText = `👋 Hello, ${loggedInUser.name} (${loggedInUser.year})`;
    if (authButtons) authButtons.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";
  }
}

// === Signup & Login ===
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const year = document.getElementById("signup-year").value;

      const user = { name, email, password, year };
      localStorage.setItem("user", JSON.stringify(user));

      alert("✅ Sign-up successful!");
      closeModal("signup-modal");

      // Open Welcome Quiz
      const welcomeQuiz = document.getElementById("welcome-quiz-modal");
      if (welcomeQuiz) welcomeQuiz.style.display = "block";
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
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) modal.style.display = "none";
  });
};

// === Welcome Quiz Logic ===
let knowsGCSE = true;
let quizAnswers = { liked: [], disliked: [], more: [] };

// GCSE Question
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

// Multi-choice questions
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
    default: return;
  }

  const checkboxes = container.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(cb => {
    if (cb.checked && !answers.includes(cb.value)) answers.push(cb.value);
  });

  let savedQuiz = JSON.parse(localStorage.getItem("welcomeQuiz")) || [];
  savedQuiz.push({ question: type, answer: answers });
  localStorage.setItem("welcomeQuiz", JSON.stringify(savedQuiz));

  container.classList.remove("active");

  if (type === "Subjects you like") {
    document.getElementById("subjects-dislike").classList.add("active");
  } else if (type === "Subjects you dislike") {
    document.getElementById("subjects-more").classList.add("active");
  } else if (type === "Subjects to study more") {
    document.getElementById("finish-quiz").classList.add("active");

    // Trigger extra quizzes based on liked subjects
    triggerExtraQuizzes();
  }
}

// === Trigger Extra Quizzes ===
function triggerExtraQuizzes() {
  if (quizAnswers.liked.includes("Foreign Language")) {
    setTimeout(() => {
      const flModal = document.getElementById("foreign-language-quiz-modal");
      if (flModal) flModal.style.display = "block";
    }, 500);
  }

  if (quizAnswers.liked.includes("Computing")) {
    setTimeout(() => {
      const compModal = document.getElementById("computing-quiz-modal");
      if (compModal) compModal.style.display = "block";
    }, 500);
  }
}

// === Foreign Language Quiz ===
function nextFLQuestion(button, answer) {
  let flQuiz = JSON.parse(localStorage.getItem('foreignLanguageQuiz')) || [];
  flQuiz.push(answer);
  localStorage.setItem('foreignLanguageQuiz', JSON.stringify(flQuiz));

  const current = button.closest('.quiz-question');
  current.classList.remove('active');

  const next = current.nextElementSibling;
  if (next) next.classList.add('active');
}

// === Computing Quiz ===
function nextCompQuestion(button, answer) {
  let compQuiz = JSON.parse(localStorage.getItem('computingQuiz')) || [];
  compQuiz.push(answer);
  localStorage.setItem('computingQuiz', JSON.stringify(compQuiz));

  const current = button.closest('.quiz-question');
  current.classList.remove('active');

  const next = current.nextElementSibling;
  if (next) next.classList.add('active');
}

// === General Answer Checker for other subjects ===
function checkAnswer(button, type) {
  button.disabled = true;
  if (type === "correct") {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }
}
