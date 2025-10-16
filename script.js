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

  // Store in localStorage
  localStorage.setItem('userName', name);
  localStorage.setItem('userYear', year);

  // Update greeting
  updateGreeting();

  alert(`Sign Up Successful! Welcome, ${name} (${year})!`);
  closeModal('signup-modal');
}

function submitLogin(event) {
  event.preventDefault();
  const name = document.getElementById('login-name').value;

  // Store in localStorage
  localStorage.setItem('userName', name);

  // If year exists from sign-up, keep it
  if (!localStorage.getItem('userYear')) {
    const year = prompt('Enter your year of school:');
    localStorage.setItem('userYear', year);
  }

  // Hide Sign Up / Log In buttons
  const authButtons = document.querySelector('.auth-buttons');
  authButtons.style.display = 'none';

  // Update greeting
  updateGreeting();

  closeModal('login-modal');
  alert(`Logged In Successfully! Welcome back, ${name}!`);
}

/* =============================
   🌟 Update Greeting
============================= */
function updateGreeting() {
  const name = localStorage.getItem('userName');
  const year = localStorage.getItem('userYear');
  const greetingDiv = document.getElementById('user-greeting');

  if (name && year) {
    greetingDiv.innerText = `Hello, ${name} (${year})!`;
  } else if (name) {
    greetingDiv.innerText = `Hello, ${name}!`;
  }

  // Hide auth buttons if logged in
  if (name) {
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.style.display = 'none';
  }
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

/* =============================
   🌟 Run on Page Load
============================= */
window.onload = function() {
  updateGreeting();
}
