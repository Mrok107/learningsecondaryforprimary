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

function submitSignUp(e) {
  e.preventDefault();
  alert('Sign Up Successful! Welcome ' + document.getElementById('signup-name').value);
  closeModal('signup-modal');
}

function submitLogin(e) {
  e.preventDefault();
  alert('Logged In Successfully! Welcome back!');
  closeModal('login-modal');
}

/* Close modal if clicking outside content */
window.onclick = function(event) {
  const signupModal = document.getElementById('signup-modal');
  const loginModal = document.getElementById('login-modal');
  if (event.target == signupModal) signupModal.style.display = "none";
  if (event.target == loginModal) loginModal.style.display = "none";
}
