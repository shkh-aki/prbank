 // Demo storage key
  const USERS_KEY = "prb_users_v1";

  const loginForm = document.getElementById("loginForm");
  const loginMsg = document.getElementById("loginMsg");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const pass  = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const found = users.find(u => u.email === email && u.password === pass);

    if (!found) {
      loginMsg.textContent = "Invalid email or password.";
      loginMsg.className = "msg error";
      return;
    }

    // save "logged in user" (demo session)
    localStorage.setItem("prb_session_user", JSON.stringify(found));

    loginMsg.textContent = "Login successful! Redirecting...";
    loginMsg.className = "msg success";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 600);
  });