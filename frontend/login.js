document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (email === "" || password === "") {
        document.getElementById("loginMessage").innerText =
            "Please enter email and password.";
        return;
    }

    // Simple login for frontend testing
    if (role === "admin") {
        localStorage.setItem("role", "admin");
    } else {
        localStorage.setItem("role", "customer");
    }

    localStorage.setItem("email", email);

    window.location.href = "index.html";
});