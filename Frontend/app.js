const apiUrl = 'http://localhost:5000/users'; // your backend endpoint
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

let editingUserId = null;

// Load users
async function fetchUsers() {
  const res = await fetch(apiUrl);
  const users = await res.json();
  renderUsers(users);
}

// Render users
function renderUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'user-item';
    li.innerHTML = `
      <strong>${user.name}</strong><br/>
      Email: ${user.email}<br/>
      DOB: ${user.dob}<br/>
      <button onclick="editUser('${user._id}', '${user.name}', '${user.email}', '${user.dob}')">Edit</button>
      <button onclick="deleteUser('${user._id}')">Delete</button>
    `;
    userList.appendChild(li);
  });
}

// Add or Update user
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const dob = document.getElementById('dob').value;

  const userData = { name, email, dob };

  if (editingUserId) {
    await fetch(`${apiUrl}/${editingUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    editingUserId = null;
  } else {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  }

  userForm.reset();
  fetchUsers();
});

// Edit user
function editUser(id, name, email, dob) {
  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
  document.getElementById('dob').value = dob;
  editingUserId = id;
}

// Delete user
async function deleteUser(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  fetchUsers();
}

// Initial load
fetchUsers();
