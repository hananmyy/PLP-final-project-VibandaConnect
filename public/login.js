document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const role = document.getElementById("loginRole").value;

            try {
                
                const response = await fetch(`http://localhost:3000/${role}s/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    if (role === "customer") {
                        window.location.href = "customer-profile.html";
                    } else if (role === "vendor") {
                        window.location.href = "vendor-profile.html";
                    } else if (role === "rider") {
                        window.location.href = "rider-profile.html";
                    }
                } else {
                    alert("Login failed! Please check your credentials and role.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    } else {
        console.error("Login form element not found!");
    }
});
