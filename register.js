document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const msg = document.getElementById("regMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "Registering...";

    const formData = new FormData(form);

    try {
      const res = await fetch("register.php", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      msg.textContent = data.message;

      if (data.ok) {
        // optional redirect to login after success
        setTimeout(() => {
          window.location.href = "index.html";
        }, 800);
      }
    } catch (err) {
      msg.textContent = "Network error. Please try again.";
    }
  });
});
