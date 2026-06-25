// // =============================================
// //  CAREER COMPANION — Dashboard JS (Final Fix)
// // =============================================

// const API = 'http://localhost:5000/api';
// let allJobs = [];
// let currentJobId = null;
// let currentFilter = 'all';

// // AUTH CHECK
// const token = localStorage.getItem('token');
// if (!token) window.location.href = '/';

// const HEADERS = {
//   'Content-Type': 'application/json',
//   'Authorization': 'Bearer ' + token
// };

// // =============================================
// //  DOM READY
// // =============================================
// document.addEventListener('DOMContentLoaded', function() {

//   // User name
//   var name = localStorage.getItem('userName') || 'User';
//   document.getElementById('navUser').textContent = '👤 ' + name;
//   document.getElementById('mobileUser').textContent = '👤 ' + name;

//   // Logout
//   document.getElementById('logoutBtn').addEventListener('click', logout);
//   document.getElementById('mobileLogoutBtn').addEventListener('click', logout);

//   // Hamburger
//   document.getElementById('hamburger').addEventListener('click', toggleNav);

//   // Toggle Add Form
//   document.getElementById('toggleFormBtn').addEventListener('click', function() {
//     var form = document.getElementById('addJobForm');
//     if (form.style.display === 'none' || form.style.display === '') {
//       form.style.display = 'block';
//       document.getElementById('companyName').focus();
//     } else {
//       form.style.display = 'none';
//     }
//   });

//   // Cancel Form
//   document.getElementById('cancelFormBtn').addEventListener('click', function() {
//     document.getElementById('addJobForm').style.display = 'none';
//   });

//   // Save Job
//   document.getElementById('saveJobBtn').addEventListener('click', addJob);

//   // Filter buttons
//   document.getElementById('filterAll').addEventListener('click', function() { filterJobs('all', this); });
//   document.getElementById('filterApplied').addEventListener('click', function() { filterJobs('Applied', this); });
//   document.getElementById('filterInterview').addEventListener('click', function() { filterJobs('Interview', this); });
//   document.getElementById('filterOffer').addEventListener('click', function() { filterJobs('Offer', this); });
//   document.getElementById('filterRejected').addEventListener('click', function() { filterJobs('Rejected', this); });

//   // Modal buttons
//   document.getElementById('updateStatusBtn').addEventListener('click', updateStatus);
//   document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
//   document.getElementById('statusModal').addEventListener('click', function(e) {
//     if (e.target === this) closeModal();
//   });

//   // Load data
//   loadJobs();
//   loadStats();
// });

// // =============================================
// //  LOGOUT
// // =============================================
// function logout() {
//   localStorage.removeItem('token');
//   localStorage.removeItem('userName');
//   window.location.href = '/';
// }

// // =============================================
// //  TOGGLE NAV
// // =============================================
// function toggleNav() {
//   var menu = document.getElementById('mobileMenu');
//   menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
// }

// // =============================================
// //  LOAD JOBS
// // =============================================
// function loadJobs() {
//   document.getElementById('loadingJobs').style.display = 'block';
//   document.getElementById('emptyJobs').style.display = 'none';
//   document.getElementById('jobsGrid').innerHTML = '';

//   fetch(API + '/jobs?limit=100', { headers: HEADERS })
//     .then(function(res) {
//       if (res.status === 401) { logout(); return; }
//       if (!res.ok) throw new Error('Failed');
//       return res.json();
//     })
//     .then(function(data) {
//       allJobs = (data && data.data && data.data.jobs) ? data.data.jobs : [];
//       renderJobs(allJobs);
//     })
//     .catch(function() {
//       document.getElementById('loadingJobs').textContent = '⚠️ Backend se connect nahi ho pa raha!';
//     });
// }

// // =============================================
// //  RENDER JOBS
// // =============================================
// function renderJobs(jobs) {
//   document.getElementById('loadingJobs').style.display = 'none';
//   var grid = document.getElementById('jobsGrid');
//   var empty = document.getElementById('emptyJobs');

//   if (!jobs || jobs.length === 0) {
//     empty.style.display = 'block';
//     grid.innerHTML = '';
//     return;
//   }

//   empty.style.display = 'none';
//   var html = '';
//   for (var i = 0; i < jobs.length; i++) {
//     var job = jobs[i];
//     html += '<div class="job-card status-' + job.status + '">';
//     html += '<div class="job-card-header">';
//     html += '<div class="company-name">' + esc(job.companyName) + '</div>';
//     html += '<span class="status-badge badge-' + job.status + '">' + job.status + '</span>';
//     html += '</div>';
//     html += '<div class="job-title">💼 ' + esc(job.jobTitle) + '</div>';
//     html += '<div class="job-meta">';
//     if (job.location) html += '<span>📍 ' + esc(job.location) + '</span>';
//     if (job.salary) html += '<span>💰 ' + esc(job.salary) + '</span>';
//     html += '<span>📅 ' + formatDate(job.createdAt) + '</span>';
//     html += '</div>';
//     if (job.notes) html += '<div class="job-notes">📝 ' + esc(job.notes) + '</div>';
//     html += '<div class="job-card-actions">';
//     if (job.jobUrl) html += '<button class="btn-action" onclick="window.open(\'' + job.jobUrl + '\',\'_blank\')">🔗 View</button>';
//     html += '<button class="btn-action" onclick="openStatusModal(\'' + job._id + '\',\'' + esc(job.companyName) + '\',\'' + job.status + '\')">✏️ Status</button>';
//     html += '<button class="btn-action danger" onclick="deleteJob(\'' + job._id + '\')">🗑️ Delete</button>';
//     html += '</div></div>';
//   }
//   grid.innerHTML = html;
// }

// // =============================================
// //  FILTER
// // =============================================
// function filterJobs(status, btn) {
//   currentFilter = status;
//   document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
//   btn.classList.add('active');
//   if (status === 'all') {
//     renderJobs(allJobs);
//   } else {
//     renderJobs(allJobs.filter(function(j) { return j.status === status; }));
//   }
// }

// // =============================================
// //  LOAD STATS
// // =============================================
// function loadStats() {
//   fetch(API + '/dashboard', { headers: HEADERS })
//     .then(function(res) { return res.json(); })
//     .then(function(data) {
//       var s = data.data;
//       document.getElementById('totalApps').textContent = s.totalApplications || 0;
//       document.getElementById('interviewCount').textContent = (s.byStatus && s.byStatus.Interview) || 0;
//       document.getElementById('offerCount').textContent = (s.byStatus && s.byStatus.Offer) || 0;
//       document.getElementById('rejectedCount').textContent = (s.byStatus && s.byStatus.Rejected) || 0;
//     })
//     .catch(function() {
//       document.getElementById('totalApps').textContent = allJobs.length;
//       document.getElementById('interviewCount').textContent = allJobs.filter(function(j){return j.status==='Interview';}).length;
//       document.getElementById('offerCount').textContent = allJobs.filter(function(j){return j.status==='Offer';}).length;
//       document.getElementById('rejectedCount').textContent = allJobs.filter(function(j){return j.status==='Rejected';}).length;
//     });
// }

// // =============================================
// //  ADD JOB
// // =============================================
// function addJob() {
//   var companyName = document.getElementById('companyName').value.trim();
//   var jobTitle = document.getElementById('jobTitle').value.trim();
//   var jobUrl = document.getElementById('jobUrl').value.trim();
//   var location = document.getElementById('jobLocation').value.trim();
//   var status = document.getElementById('jobStatus').value;
//   var salary = document.getElementById('jobSalary').value.trim();
//   var notes = document.getElementById('jobNotes').value.trim();

//   document.getElementById('jobError').style.display = 'none';
//   document.getElementById('jobSuccess').style.display = 'none';

//   if (!companyName || !jobTitle) {
//     document.getElementById('jobError').textContent = '❌ Company name aur Job title zaroori hai!';
//     document.getElementById('jobError').style.display = 'block';
//     return;
//   }

//   var btn = document.getElementById('saveJobBtn');
//   btn.textContent = 'Saving...';
//   btn.disabled = true;

//   fetch(API + '/jobs', {
//     method: 'POST',
//     headers: HEADERS,
//     body: JSON.stringify({ companyName: companyName, jobTitle: jobTitle, jobUrl: jobUrl, location: location, status: status, salary: salary, notes: notes })
//   })
//   .then(function(res) { return res.json(); })
//   .then(function(data) {
//     if (data.success === false) throw new Error(data.message || 'Failed');

//     document.getElementById('jobSuccess').textContent = '✅ Job saved successfully!';
//     document.getElementById('jobSuccess').style.display = 'block';

//     // Clear fields
//     ['companyName','jobTitle','jobUrl','jobLocation','jobSalary','jobNotes'].forEach(function(id) {
//       document.getElementById(id).value = '';
//     });

//     loadJobs();
//     loadStats();

//     setTimeout(function() {
//       document.getElementById('addJobForm').style.display = 'none';
//       document.getElementById('jobSuccess').style.display = 'none';
//     }, 1500);
//   })
//   .catch(function(err) {
//     document.getElementById('jobError').textContent = '❌ ' + err.message;
//     document.getElementById('jobError').style.display = 'block';
//   })
//   .finally(function() {
//     btn.textContent = 'Save Application';
//     btn.disabled = false;
//   });
// }

// // =============================================
// //  DELETE JOB
// // =============================================
// function deleteJob(jobId) {
//   if (!confirm('Delete this application?')) return;

//   fetch(API + '/jobs/' + jobId, { method: 'DELETE', headers: HEADERS })
//     .then(function(res) {
//       if (!res.ok) throw new Error('Delete failed');
//       allJobs = allJobs.filter(function(j) { return j._id !== jobId; });
//       renderJobs(currentFilter === 'all' ? allJobs : allJobs.filter(function(j) { return j.status === currentFilter; }));
//       loadStats();
//     })
//     .catch(function(err) { alert('Delete nahi hua: ' + err.message); });
// }

// // =============================================
// //  STATUS MODAL
// // =============================================
// function openStatusModal(jobId, companyName, currentStatus) {
//   currentJobId = jobId;
//   document.getElementById('modalCompany').textContent = companyName;
//   document.getElementById('newStatus').value = currentStatus;
//   document.getElementById('statusModal').style.display = 'flex';
// }

// function closeModal() {
//   document.getElementById('statusModal').style.display = 'none';
//   currentJobId = null;
// }

// function updateStatus() {
//   if (!currentJobId) return;
//   var newStatus = document.getElementById('newStatus').value;

//   fetch(API + '/jobs/' + currentJobId + '/status', {
//     method: 'PATCH',
//     headers: HEADERS,
//     body: JSON.stringify({ status: newStatus })
//   })
//   .then(function(res) {
//     if (!res.ok) throw new Error('Update failed');
//     var job = allJobs.find(function(j) { return j._id === currentJobId; });
//     if (job) job.status = newStatus;
//     closeModal();
//     renderJobs(currentFilter === 'all' ? allJobs : allJobs.filter(function(j) { return j.status === currentFilter; }));
//     loadStats();
//   })
//   .catch(function(err) { alert('Update nahi hua: ' + err.message); });
// }

// // =============================================
// //  HELPERS
// // =============================================
// function esc(str) {
//   if (!str) return '';
//   return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
// }

// function formatDate(dateStr) {
//   if (!dateStr) return '';
//   return new Date(dateStr).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
// }

// =============================================
//  CAREER COMPANION — Dashboard JS (Final Fix)
// =============================================

const API = 'http://localhost:5000/api';
let allJobs = [];
let currentJobId = null;
let currentFilter = 'all';

// AUTH CHECK
const token = localStorage.getItem('token');
if (!token) window.location.href = '/';

const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token
};

// =============================================
//  DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', function() {

  // User name
  var name = localStorage.getItem('userName') || 'User';
  document.getElementById('navUser').textContent = '👤 ' + name;
  document.getElementById('mobileUser').textContent = '👤 ' + name;

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', logout);
  document.getElementById('mobileLogoutBtn').addEventListener('click', logout);

  // Hamburger
  document.getElementById('hamburger').addEventListener('click', toggleNav);

  // Toggle Add Form
  document.getElementById('toggleFormBtn').addEventListener('click', function() {
    var form = document.getElementById('addJobForm');
    if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block';
      document.getElementById('companyName').focus();
    } else {
      form.style.display = 'none';
    }
  });

  // Cancel Form
  document.getElementById('cancelFormBtn').addEventListener('click', function() {
    document.getElementById('addJobForm').style.display = 'none';
  });

  // Save Job
  document.getElementById('saveJobBtn').addEventListener('click', addJob);

  // Filter buttons
  document.getElementById('filterAll').addEventListener('click', function() { filterJobs('all', this); });
  document.getElementById('filterApplied').addEventListener('click', function() { filterJobs('Applied', this); });
  document.getElementById('filterInterview').addEventListener('click', function() { filterJobs('Interview', this); });
  document.getElementById('filterOffer').addEventListener('click', function() { filterJobs('Offer', this); });
  document.getElementById('filterRejected').addEventListener('click', function() { filterJobs('Rejected', this); });

  // Modal buttons
  document.getElementById('updateStatusBtn').addEventListener('click', updateStatus);
  document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
  document.getElementById('statusModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // Load data
  loadJobs();
  loadStats();
});

// =============================================
//  LOGOUT
// =============================================
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  window.location.href = '/';
}

// =============================================
//  TOGGLE NAV
// =============================================
function toggleNav() {
  var menu = document.getElementById('mobileMenu');
  menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
}

// =============================================
//  LOAD JOBS
// =============================================
function loadJobs() {
  document.getElementById('loadingJobs').style.display = 'block';
  document.getElementById('emptyJobs').style.display = 'none';
  document.getElementById('jobsGrid').innerHTML = '';

  fetch(API + '/jobs?limit=100', { headers: HEADERS })
    .then(function(res) {
      if (res.status === 401) { logout(); return; }
      if (!res.ok) throw new Error('Failed');
      return res.json();
    })
    .then(function(data) {
      allJobs = (data && data.data && data.data.jobs) ? data.data.jobs : [];
      renderJobs(allJobs);
    })
    .catch(function() {
      document.getElementById('loadingJobs').textContent = '⚠️ Backend se connect nahi ho pa raha!';
    });
}

// =============================================
//  RENDER JOBS
// =============================================
function renderJobs(jobs) {
  document.getElementById('loadingJobs').style.display = 'none';
  var grid = document.getElementById('jobsGrid');
  var empty = document.getElementById('emptyJobs');

  if (!jobs || jobs.length === 0) {
    empty.style.display = 'block';
    grid.innerHTML = '';
    return;
  }

  empty.style.display = 'none';
  var html = '';
  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i];
    html += '<div class="job-card status-' + job.status + '" data-id="' + job._id + '" data-status="' + job.status + '" data-company="' + esc(job.companyName) + '" data-url="' + (job.jobUrl || '') + '">';
    html += '<div class="job-card-header">';
    html += '<div class="company-name">' + esc(job.companyName) + '</div>';
    html += '<span class="status-badge badge-' + job.status + '">' + job.status + '</span>';
    html += '</div>';
    html += '<div class="job-title">💼 ' + esc(job.jobTitle) + '</div>';
    html += '<div class="job-meta">';
    if (job.location) html += '<span>📍 ' + esc(job.location) + '</span>';
    if (job.salary) html += '<span>💰 ' + esc(job.salary) + '</span>';
    html += '<span>📅 ' + formatDate(job.createdAt) + '</span>';
    html += '</div>';
    if (job.notes) html += '<div class="job-notes">📝 ' + esc(job.notes) + '</div>';
    html += '<div class="job-card-actions">';
    if (job.jobUrl) html += '<button class="btn-action btn-view">🔗 View</button>';
    html += '<button class="btn-action btn-status">✏️ Status</button>';
    html += '<button class="btn-action danger btn-delete">🗑️ Delete</button>';
    html += '</div></div>';
  }
  grid.innerHTML = html;

  // Event delegation — no onclick conflicts
  grid.addEventListener('click', function(e) {
    var card = e.target.closest('.job-card');
    if (!card) return;
    var id = card.dataset.id;
    var status = card.dataset.status;
    var company = card.dataset.company;
    var url = card.dataset.url;

    if (e.target.classList.contains('btn-view') && url) {
      window.open(url, '_blank');
    } else if (e.target.classList.contains('btn-status')) {
      openStatusModal(id, company, status);
    } else if (e.target.classList.contains('btn-delete')) {
      deleteJob(id);
    }
  });
}

// =============================================
//  FILTER
// =============================================
function filterJobs(status, btn) {
  currentFilter = status;
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  if (status === 'all') {
    renderJobs(allJobs);
  } else {
    renderJobs(allJobs.filter(function(j) { return j.status === status; }));
  }
}

// =============================================
//  LOAD STATS
// =============================================
function loadStats() {
  fetch(API + '/dashboard', { headers: HEADERS })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var s = data.data;
      document.getElementById('totalApps').textContent = s.totalApplications || 0;
      document.getElementById('interviewCount').textContent = (s.byStatus && s.byStatus.Interview) || 0;
      document.getElementById('offerCount').textContent = (s.byStatus && s.byStatus.Offer) || 0;
      document.getElementById('rejectedCount').textContent = (s.byStatus && s.byStatus.Rejected) || 0;
    })
    .catch(function() {
      document.getElementById('totalApps').textContent = allJobs.length;
      document.getElementById('interviewCount').textContent = allJobs.filter(function(j){return j.status==='Interview';}).length;
      document.getElementById('offerCount').textContent = allJobs.filter(function(j){return j.status==='Offer';}).length;
      document.getElementById('rejectedCount').textContent = allJobs.filter(function(j){return j.status==='Rejected';}).length;
    });
}

// =============================================
//  ADD JOB
// =============================================
function addJob() {
  var companyName = document.getElementById('companyName').value.trim();
  var jobTitle = document.getElementById('jobTitle').value.trim();
  var jobUrl = document.getElementById('jobUrl').value.trim();
  var location = document.getElementById('jobLocation').value.trim();
  var status = document.getElementById('jobStatus').value;
  var salary = document.getElementById('jobSalary').value.trim();
  var notes = document.getElementById('jobNotes').value.trim();

  document.getElementById('jobError').style.display = 'none';
  document.getElementById('jobSuccess').style.display = 'none';

  if (!companyName || !jobTitle) {
    document.getElementById('jobError').textContent = '❌ Company name aur Job title zaroori hai!';
    document.getElementById('jobError').style.display = 'block';
    return;
  }

  var btn = document.getElementById('saveJobBtn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  fetch(API + '/jobs', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ companyName: companyName, jobTitle: jobTitle, jobUrl: jobUrl, location: location, status: status, salary: salary, notes: notes })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (data.success === false) throw new Error(data.message || 'Failed');

    document.getElementById('jobSuccess').textContent = '✅ Job saved successfully!';
    document.getElementById('jobSuccess').style.display = 'block';

    // Clear fields
    ['companyName','jobTitle','jobUrl','jobLocation','jobSalary','jobNotes'].forEach(function(id) {
      document.getElementById(id).value = '';
    });

    loadJobs();
    loadStats();

    setTimeout(function() {
      document.getElementById('addJobForm').style.display = 'none';
      document.getElementById('jobSuccess').style.display = 'none';
    }, 1500);
  })
  .catch(function(err) {
    document.getElementById('jobError').textContent = '❌ ' + err.message;
    document.getElementById('jobError').style.display = 'block';
  })
  .finally(function() {
    btn.textContent = 'Save Application';
    btn.disabled = false;
  });
}

// =============================================
//  DELETE JOB
// =============================================
function deleteJob(jobId) {
  if (!confirm('Delete this application?')) return;

  fetch(API + '/jobs/' + jobId, { method: 'DELETE', headers: HEADERS })
    .then(function(res) {
      if (!res.ok) throw new Error('Delete failed');
      allJobs = allJobs.filter(function(j) { return j._id !== jobId; });
      renderJobs(currentFilter === 'all' ? allJobs : allJobs.filter(function(j) { return j.status === currentFilter; }));
      loadStats();
    })
    .catch(function(err) { alert('Delete nahi hua: ' + err.message); });
}

// =============================================
//  STATUS MODAL
// =============================================
function openStatusModal(jobId, companyName, currentStatus) {
  currentJobId = jobId;
  document.getElementById('modalCompany').textContent = companyName;
  document.getElementById('newStatus').value = currentStatus;
  document.getElementById('statusModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('statusModal').style.display = 'none';
  currentJobId = null;
}

function updateStatus() {
  if (!currentJobId) return;
  var newStatus = document.getElementById('newStatus').value;

  fetch(API + '/jobs/' + currentJobId + '/status', {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ status: newStatus })
  })
  .then(function(res) {
    if (!res.ok) throw new Error('Update failed');
    var job = allJobs.find(function(j) { return j._id === currentJobId; });
    if (job) job.status = newStatus;
    closeModal();
    renderJobs(currentFilter === 'all' ? allJobs : allJobs.filter(function(j) { return j.status === currentFilter; }));
    loadStats();
  })
  .catch(function(err) { alert('Update nahi hua: ' + err.message); });
}

// =============================================
//  HELPERS
// =============================================
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}
