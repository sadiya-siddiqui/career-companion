// =============================================
//  CAREER COMPANION — Auth JS (Project 4)
//  Connects Frontend → Backend API
// =============================================

const API = 'http://localhost:5000/api';

// --- TAB SWITCH ---
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');

  if (tab === 'login') {
    loginForm.classList.add('active-form');
    loginForm.classList.remove('hidden-form');
    registerForm.classList.add('hidden-form');
    registerForm.classList.remove('active-form');
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
  } else {
    registerForm.classList.add('active-form');
    registerForm.classList.remove('hidden-form');
    loginForm.classList.add('hidden-form');
    loginForm.classList.remove('active-form');
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}

document.getElementById('loginTab').addEventListener('click', () => switchTab('login'));
document.getElementById('registerTab').addEventListener('click', () => switchTab('register'));
document.getElementById('showRegisterLink').addEventListener('click', (e) => {
  e.preventDefault();
  switchTab('register');
});
document.getElementById('showLoginLink').addEventListener('click', (e) => {
  e.preventDefault();
  switchTab('login');
});

// --- SHOW / HIDE MESSAGES ---
function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideMsg(id) {
  document.getElementById(id).classList.add('hidden');
}

function showSuccess(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}

function setLoading(btnId, loaderId, loading) {
  document.querySelector(`#${btnId} .btn-text`).textContent = loading ? 'Please wait...' : document.querySelector(`#${btnId}`).dataset.label || '';
  document.getElementById(btnId).disabled = loading;
}

// =============================================
//  LOGIN
// =============================================
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  hideMsg('loginError');
  hideMsg('loginSuccess');

  if (!email || !password) {
    return showError('loginError', 'Please fill in all fields.');
  }

  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Logging in...';

  try {
    const response = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed. Check your credentials.');
    }

    // Save token
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('userName', data.data.user?.name || email);

    showSuccess('loginSuccess', '✅ Login successful! Redirecting...');

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);

  } catch (error) {
    showError('loginError', '❌ ' + error.message);
  } finally {
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Login';
  }
});

// =============================================
//  REGISTER
// =============================================
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  hideMsg('registerError');
  hideMsg('registerSuccess');

  if (!name || !email || !password) {
    return showError('registerError', 'Please fill in all fields.');
  }

  if (password.length < 8) {
    return showError('registerError', 'Password must be at least 8 characters.');
  }

  const btn = document.getElementById('registerBtn');
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Creating account...';

  try {
    const response = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed.');
    }

    // Save token & redirect
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('userName', name);

    showSuccess('registerSuccess', '✅ Account created! Redirecting...');

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);

  } catch (error) {
    showError('registerError', '❌ ' + error.message);
  } finally {
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Create Account';
  }
});

// Redirect if already logged in
if (localStorage.getItem('token')) {
  window.location.href = 'dashboard.html';
}
