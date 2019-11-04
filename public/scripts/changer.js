function showLogin() {
  document.getElementById("changerButton").innerHTML = "Sign Up";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document
    .getElementById("changerButton")
    .setAttribute("onclick", "showRegis()");
}

function showRegis() {
  document.getElementById("changerButton").innerHTML = "Login";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
  document
    .getElementById("changerButton")
    .setAttribute("onclick", "showLogin()");
}
