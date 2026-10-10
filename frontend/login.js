function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    if (email === "" || password === "") {
        message.innerText = "Please enter email and password.";
        return;
    }

    // Frontend demo only — not secure authentication
    localStorage.setItem("email", email);
    localStorage.setItem("role", "customer");

    window.location.href = "index.html";
}