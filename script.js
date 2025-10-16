/// ===== Modals =====
function openSignUp() {
  document.getElementById('signup-modal').style.display = 'block';
}

function openLogin() {
  document.getElementById('login-modal').style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// ===== Update Greeting =====
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
    document.querySelector('.auth-buttons').style.display = 'none';
  }
}

// ===== Sign Up =====
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const year = document.getElementById('signup-year').value;

  if (!year) {
    alert('Please select your year!');
    return;
  }

  localStorage.setItem('userName', name);
  localStorage.setItem('userYear', year);

  updateGreeting();
  closeModal('signup-modal');
  alert(`Sign Up Successful! Welcome, ${name} (${year})!`);
});

// ===== Log In =====
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('login-name').value;

  localStorage.setItem('userName', name);

  if (!localStorage.getItem('userYear')) {
    const year = prompt('Enter your year of school:');
    if (year) localStorage.setItem('userYear', year);
  }

  updateGreeting();
  closeModal('login-modal');
  alert(`Logged In Successfully! Welcome back, ${name}!`);
});

// ===== Close modals when clicking outside =====
window.onclick = function(event) {
  const signupModal = document.getElementById('signup-modal');
  const loginModal = document.getElementById('login-modal');
  if (event.target === signupModal) signupModal.style.display = 'none';
  if (event.target === loginModal) loginModal.style.display = 'none';
}

// ===== On Page Load =====
window.onload = function() {
  updateGreeting();
}
