/* =============================
   🎓 Quiz Functions
============================= */
function checkAnswer(button, type) {
  if (type === 'correct') {
    button.style.backgroundColor = '#4CAF50';
    button.innerText = '✅ Correct!';
  } else {
    button.style.backgroundColor = '#f44336';
    button.innerText = '❌ Try again';
  }
  const siblings = button.parentNode.querySelectorAll('button');
  siblings.forEach(btn => btn.disabled = true);
}

function toggleQuiz(quizId) {
  const quiz = document.getElementById(quizId);
  quiz.style.display = quiz.style.display === 'none' ? 'block' : 'none';
}

/* =============================
   🟢 Modal Functions
============================= */
function openSignUp() {
  document.getElementById('signup-modal').style.display = 'block';
}

function openLogin() {
  document.getElementById('login-modal').style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

window.addEventListener('click', function(event) {
  const signup = document.getElementById('signup-modal');
  const login = document.getElementById('login-modal');
  if (event.target === signup) signup.style.display = 'none';
  if (event.target === login) login.style.display = 'none';
});

/* =============================
   📝 Form Submissions (Demo)
============================= */
function submitSignUp(event) {
  event.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  alert(`Welcome, ${name}! 🎉 Your account (${email}) has been created.`);
  closeModal('signup-modal');
}

function submitLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  alert(`Logged in as ${email} ✅`);
  closeModal('login-modal');
}
