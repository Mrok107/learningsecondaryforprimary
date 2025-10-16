/* =============================
   📝 Quiz Answer Checker
============================= */
function checkAnswer(button, type) {
  if (type === 'correct') {
    button.style.backgroundColor = '#4CAF50';
    button.innerText = '✅ Correct!';
  } else {
    button.style.backgroundColor = '#f44336';
    button.innerText = '❌ Try again';
  }

  // Disable all buttons in the same question
  const siblings = button.parentNode.querySelectorAll('button');
  siblings.forEach(btn => btn.disabled = true);
}

/* =============================
   🌈 Modals for Sign Up / Log In
============================= */
function openSignUp() {
  document.getElementById('signup-modal').style.display = 'block';
}

function openLogin() {
  document.getElementById('login-modal').style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

/* =============================
   ✨ Sign Up & Log In Functions
============================= */
function submitSignUp(event) {
  event.preventDefault();
  const name = document.getElementById('signup-name').value;
  const year = document.getElementById('signup-year').value;

  if (!year) {
    alert('Please select your year of school!');
    return;
  }

  // Show personalized greeting on homepage
  const greetingDiv = document.getElementById('user-greeting');
  greetingDiv.innerText = `Welcome, ${name} (${year})!`;

  alert(`Sign Up Successful! Welcome, ${name} (${year})!`);
  closeModal('signup-modal');
}

function submitLogin(event) {
  event.preventDefault();
  alert('Logged In Successfully! Welcome back!');
  closeModal('login-modal');
}

/* =============================
   🌟 Close modal if clicking outside content
============================= */
window.onclick = function(event) {
  const signupModal = document.getElementById('signup-modal');
  const loginModal = document.getElementById('login-modal');

  if (event.target === signupModal) signupModal.style.display = 'none';
  if (event.target === loginModal) loginModal.style.display = 'none';
}
