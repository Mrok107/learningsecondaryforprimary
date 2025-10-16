/* =============================
   🌟 Modals for Sign Up / Log In
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

  // Show greeting on homepage
  const greetingDiv = document.getElementById('user-greeting');
  greetingDiv.innerText = `Welcome, ${name} (${year})!`;

  alert(`Sign Up Successful! Welcome, ${name} (${year})!`);
  closeModal('signup-modal');
}

function submitLogin(event) {
  event.preventDefault();

  const name = document.getElementById('login-name').value;

  // Hide Sign Up / Log In buttons
  const authButtons = document.querySelector('.auth-buttons');
  authButtons.style.display = 'none';

  // Show greeting at top-right
  const greetingDiv = document.getElementById('user-greeting');
  greetingDiv.innerText = `Hello, ${name}!`;

  closeModal('login-modal');
  alert(`Logged In Successfully! Welcome back, ${name}!`);
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
