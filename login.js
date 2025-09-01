document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();

    let stats = document.getElementById("stats").value;
    let specialty = document.getElementById("specialty").value;
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let message = document.getElementById("loginMessage");

    message.style.color = "red";

    // Check all fields
    if(!stats || !specialty || !username || !password){
        message.textContent = "⚠ Please fill in all fields.";
        alert("⚠ Please fill in all fields.");
        console.warn("Login failed: missing fields");
        return;
    }

    // Check against registered users
    let matchedUser = users.find(user => 
        user.username === username &&
        user.password === password &&
        user.stats === stats &&
        user.specialty === specialty
    );

    if(!matchedUser){
        message.textContent = "⚠ Invalid login details!";
        alert("⚠ Invalid login details!");
        console.warn("Login failed: incorrect info");
        return;
    }

    // Login successful
    message.style.color = "green";
    message.textContent = "✅ Login successful!";
    alert(`✅ Welcome ${matchedUser.fullName}! Login successful.`);
    console.log("Login successful:", matchedUser);

    document.getElementById("loginForm").reset();
});