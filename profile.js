// Load current user from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const welcomeMessage = document.getElementById("welcomeMessage");
const userInfo = document.getElementById("userInfo");

// Update welcome message dynamically
if (currentUser) {
    welcomeMessage.textContent = `Welcome, ${currentUser.username}`;
} else {
    welcomeMessage.textContent = "Welcome, Guest";
    userInfo.textContent = "No user is currently logged in.";
}

// Create table (use classes instead of inline styles)
const table = document.createElement("table");
table.className = "user-table";

// Build header with explicit classes for sensitive columns
table.innerHTML = `
  <thead>
    <tr>
      <th>Full Name</th>
      <th class="col-email">Email</th>
      <th class="col-phone">Phone</th>
      <th class="col-stats">Stats</th>
      <th class="col-specialty">Specialty</th>
      <th class="col-username">Username</th>
      <th class="col-password">Password</th>
    </tr>
  </thead>
  <tbody></tbody>
`;

// Function to convert specialty object to vertical HTML (add class to each item)
function formatSpecialty(specialty) {
  if (!specialty) return "";
  return Object.entries(specialty)
    .map(([course, grade]) => `<div class="special-item">${course}: ${grade}</div>`)
    .join('');
}

// Populate table rows into tbody
const tbody = table.querySelector("tbody");

if (currentUser) {
  if (currentUser.username === "admin") {
    // Admin sees all users
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="fullName">${user.fullName}</td>
        <td class="email">${user.email}</td>
        <td class="phone">${user.phone}</td>
        <td class="stats">${user.stats}</td>
        <td class="specialty">${formatSpecialty(user.specialty)}</td>
        <td class="username">${user.username}</td>
        <td class="password">${user.password}</td>
      `;
      tbody.appendChild(row);
    });
  } else {
    // Normal user sees only their own row (mask password visually)
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="fullName">${currentUser.fullName}</td>
      <td class="email">${currentUser.email}</td>
      <td class="phone">${currentUser.phone}</td>
      <td class="stats">${currentUser.stats}</td>
      <td class="specialty">${formatSpecialty(currentUser.specialty)}</td>
      <td class="username">${currentUser.username}</td>
      <td class="password">••••••</td>  <!-- masked for normal users -->
    `;
    tbody.appendChild(row);
  }
}

//// wrap the table to make it responsive ////
const wrap = document.createElement("div");
wrap.className = "table-wrap";
wrap.appendChild(table);
userInfo.appendChild(wrap);

// Logout button functionality
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

// ---------------- ADMIN "CLEAR USERS" BUTTON ----------------
if (currentUser && currentUser.username === "admin") {
    const adminControls = document.getElementById("adminControls");

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.id = "clearUsersBtn";
    clearBtn.textContent = "Clear Registered Users";
    clearBtn.style.marginTop = "10px";
    clearBtn.style.padding = "8px 12px";
    clearBtn.style.cursor = "pointer";

    adminControls.appendChild(clearBtn);

    clearBtn.addEventListener("click", function() {
        if (confirm("⚠ Are you sure you want to clear all registered users?")) {
            let users = JSON.parse(localStorage.getItem("users") || "[]");

            // Keep only the admin account
            const adminAccount = users.find(user => user.username === "admin");
            users = [];
            if (adminAccount) users.push(adminAccount);

            localStorage.setItem("users", JSON.stringify(users));

            alert("✅ All registered users cleared except admin.");
            console.log("All users cleared from localStorage and memory, admin preserved.");

            // Refresh the table
            location.reload();
        }
    });
}
