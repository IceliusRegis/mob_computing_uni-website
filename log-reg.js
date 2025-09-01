// === Load users from localStorage or create empty array ===
let users = JSON.parse(localStorage.getItem("users") || "[]");

// ---------------- REGISTRATION ----------------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function(event){
        event.preventDefault();

        let fullName = document.getElementById("fullName").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let stats = document.getElementById("stats").value;
        let specialty = document.getElementById("specialty").value;
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let message = document.getElementById("message");

        message.style.color = "red";

        // Check all fields
        if (!fullName || !email || !phone || !stats || !specialty || !username || !password || !confirmPassword) {
            message.textContent = "⚠ Please fill in all fields.";
            alert("⚠ Please fill in all fields.");
            return;
        }

        // Password check
        if (password !== confirmPassword) {
            message.textContent = "⚠ Passwords do not match.";
            alert("⚠ Passwords do not match.");
            return;
        }

        // Check if username/email exists
        if (users.some(user => user.username === username || user.email === email)) {
            message.textContent = "⚠ Username or Email already exists.";
            alert("⚠ Username or Email already exists.");
            return;
        }

        // Save new user
        let newUser = { fullName, email, phone, stats, specialty, username, password };
        users.push(newUser);

        // Save users array to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        message.style.color = "green";
        message.textContent = "✅ Registration successful!";
        alert(`✅ Welcome ${fullName}! Registration successful.`);
        registerForm.reset();
        console.log("All Registered Users:", users);
    });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event){
        event.preventDefault();

        let stats = document.getElementById("stats").value;
        let specialty = document.getElementById("specialty").value;
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value;
        let message = document.getElementById("loginMessage");

        message.style.color = "red";

        if (!stats || !specialty || !username || !password) {
            message.textContent = "⚠ Please fill in all fields.";
            alert("⚠ Please fill in all fields.");
            return;
        }

        // Load users from localStorage
        users = JSON.parse(localStorage.getItem("users") || "[]");

        // Find matching user
        let matchedUser = users.find(user =>
            user.username === username &&
            user.password === password &&
            user.stats === stats &&
            user.specialty === specialty
        );

        if (!matchedUser) {
            message.textContent = "⚠ Invalid login details!";
            alert("⚠ Invalid login details!");
            console.warn("Login failed: incorrect info");
            return;
        }

        // Login successful
        message.style.color = "green";
        message.textContent = "✅ Login successful!";
        alert(`✅ Welcome ${matchedUser.fullName}! Login successful.`);
        loginForm.reset();
        console.log("Login successful:", matchedUser);
    });
}
