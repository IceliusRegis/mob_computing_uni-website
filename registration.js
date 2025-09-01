// Array to store registered users
let users = [];

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
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
        console.warn("Registration failed: missing fields");
        alert("⚠ Please fill in all fields.");
        return;
    }

    // Password match check
    if (password !== confirmPassword) {
        message.textContent = "⚠ Passwords do not match.";
        console.warn("Registration failed: passwords do not match");
        alert("⚠ Passwords do not match.");
        return;
    }

    // Check if username/email exists
    let userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        message.textContent = "⚠ Username or Email already exists.";
        console.warn("Registration failed: user already exists");
        alert("⚠ Username or Email already exists.");
        return;
    }

    // Save new user
    let newUser = { fullName, email, phone, stats, specialty, username, password };
    users.push(newUser);

    message.style.color = "green";
    message.textContent = "✅ Registration successful!";
    console.log("✅ Registration successful:", newUser);
    alert(`✅ Welcome ${fullName}! Registration successful.`);

    document.getElementById("registerForm").reset();
    console.log("All Registered Users:", users);
});
