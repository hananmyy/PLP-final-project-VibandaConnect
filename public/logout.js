document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById("logout");

    if (logoutLink) {
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("token");
            window.location.href = "/";
        });
    } else {
        console.error("Logout link element not found!");
    }
});
