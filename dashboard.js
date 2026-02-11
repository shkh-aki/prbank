const session = JSON.parse(localStorage.getItem("prb_session_user") || "null");
const userInfo = document.getElementById("userInfo");

if (!session) {
  window.location.href = "index.html";
} else if (userInfo) {
  userInfo.textContent = `Logged in as: ${session.fullName} (${session.email}) | Role: ${session.roleId}`;
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("prb_session_user");
    window.location.href = "index.html";
  });
}
