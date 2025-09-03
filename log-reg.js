// === Load users from localStorage or create empty array ===
let users = JSON.parse(localStorage.getItem("users") || "[]");

// ---------------- ADMIN ACCOUNT ----------------
const adminAccount = {
    fullName: "Admin",
    email: "admin@university.com",
    phone: "0000000000",
    stats: "Admin University",
    specialty: "Admin",
    username: "admin",
    password: "admin123"
};

// Add admin if not already in users
if (!users.some(user => user.username === adminAccount.username)) {
    users.push(adminAccount);
    localStorage.setItem("users", JSON.stringify(users));
}

// ---------------- REGISTRATION ----------------
document.addEventListener("DOMContentLoaded", () => {
    // ✅ Target the actual form, not the container div
    const registerForm = document.getElementById("registerForm"); 

    if (registerForm && document.getElementById("fullName")) {
        const message = document.getElementById("message");

        // ✅ Use 'submit' event on form instead of click on input
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let fullName = document.getElementById("fullName").value.trim();
            let email = document.getElementById("email").value.trim();
            let phone = document.getElementById("phone").value.trim();
            let stats = document.getElementById("stats").value;
            let username = document.getElementById("username").value.trim();
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;

            // Collect all specialty dropdowns if they exist
            let specialty = {};
            document.querySelectorAll(".course-grade select").forEach(select => {
                specialty[select.id] = select.value;
            });

            message.style.color = "red";

            // ✅ Check all required fields
            if (!fullName || !email || !phone || !stats || !username || !password || !confirmPassword ||
                Object.values(specialty).some(val => val === "")) {
                message.textContent = "⚠ Please fill in all fields.";
                alert("⚠ Please fill in all fields.");
                return;
            }

            // ✅ Phone number validation
            const phoneRegex = /^09\d{8}$/; 
            if (!phoneRegex.test(phone)) {
                message.textContent = "⚠ Please enter a valid 10-digit phone number starting with 09.";
                alert("⚠ Please enter a valid 10-digit phone number starting with 09.");
                return;
            }


            // ✅ Email format validation (Gmail only)
            const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!gmailRegex.test(email)) {
                message.textContent = "⚠ Please enter a valid Gmail address.";
                alert("⚠ Please enter a valid Gmail address.");
                return;
            }

            // ✅ Password match check
            if (password !== confirmPassword) {
                message.textContent = "⚠ Passwords do not match.";
                alert("⚠ Passwords do not match.");
                return;
            }

            // ✅ Username/email uniqueness check
            if (users.some(user => user.username === username || user.email === email)) {
                message.textContent = "⚠ Username or Email already exists.";
                alert("⚠ Username or Email already exists.");
                return;
            }

            // ✅ Add new user
            let newUser = { fullName, email, phone, stats, specialty, username, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            message.style.color = "green";
            message.textContent = "✅ Registration successful!";
            alert(`✅ Welcome ${fullName}! Registration successful.`);

            // ✅ Reset all form fields
            registerForm.reset();

            // ✅ Reset all specialty dropdowns
            document.querySelectorAll(".course-grade select").forEach(select => {
                select.selectedIndex = 0;
            });

            console.log("All Registered Users:", users);
        });
    }
});



    // ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

// Only run login code if we're on login.html
if (loginForm && loginMessage) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const stats = document.getElementById("stats").value;
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        loginMessage.style.color = "red";

        // Only require stats for non-admin users
        if (username !== "admin" && !stats) {
            loginMessage.textContent = "⚠ Please select your university.";
            alert("⚠ Please select your university.");
            return;
        }

        if (!username || !password) {
            loginMessage.textContent = "⚠ Please fill in all required fields.";
            alert("⚠ Please fill in all required fields.");
            return;
        }

        users = JSON.parse(localStorage.getItem("users") || "[]");

        let matchedUser = users.find(user => {
            // Admin bypasses stats
            if (user.username === "admin" && user.password === password) return true;
            return user.username === username &&
                   user.password === password &&
                   user.stats === stats;
        });

        if (!matchedUser) {
            loginMessage.textContent = "⚠ Invalid login details!";
            alert("⚠ Invalid login details!");
            console.warn("Login failed: incorrect info");
            return;
        }

        loginMessage.style.color = "green";
        loginMessage.textContent = "✅ Login successful!";
        alert(`✅ Welcome ${matchedUser.fullName}! Login successful.`);

        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        window.location.href = "profile.html";
        loginForm.reset();
        console.log("Login successful:", matchedUser);
    });
}

