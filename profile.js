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

// Create table
const table = document.createElement("table");
table.border = "1"; 
table.style.borderCollapse = "collapse";
table.style.width = "100%";
table.style.textAlign = "left";
table.style.padding = "5px";

// Table headers
table.innerHTML = `
    <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Stats</th>
        <th>Specialty</th>
        <th>Username</th>
        <th>Password</th>
    </tr>
`;

// Function to convert specialty object to vertical HTML
function formatSpecialty(specialty) {
    if (!specialty) return "";
    return Object.entries(specialty)
        .map(([course, grade]) => `<div>${course}: ${grade}</div>`)
        .join('');
}

// Populate table rows
if (currentUser) {
    if (currentUser.username === "admin") {
        // Admin sees all users
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.stats}</td>
                <td>${formatSpecialty(user.specialty)}</td>
                <td>${user.username}</td>
                <td>${user.password}</td>
            `;
            table.appendChild(row);
        });
    } else {
        // Normal user sees only their own row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${currentUser.fullName}</td>
            <td>${currentUser.email}</td>
            <td>${currentUser.phone}</td>
            <td>${currentUser.stats}</td>
            <td>${formatSpecialty(currentUser.specialty)}</td>
            <td>${currentUser.username}</td>
            <td>${currentUser.password}</td>
        `;
        table.appendChild(row);
    }
}

userInfo.appendChild(table);

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
