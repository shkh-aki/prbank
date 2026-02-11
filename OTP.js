document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("otpForm");
  const otpInput = document.getElementById("otp");
  const msg = document.getElementById("msg");

  // Load saved OTP from forgot page
  const saved = JSON.parse(localStorage.getItem("prb_reset_otp") || "null");

  // If no OTP was generated first, go back
  if (!saved) {
    window.location.href = "forgot.html";
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const otp = otpInput.value.trim();

    // Basic checks
    if (!/^\d{6}$/.test(otp)) {
      msg.textContent = "Please enter a valid 6-digit OTP.";
      return;
    }

    // Expiration check
    if (Date.now() > saved.expires) {
      msg.textContent = "OTP expired. Please generate a new OTP.";
      return;
    }

    // Match check
    if (otp !== saved.otp) {
      msg.textContent = "Incorrect OTP. Please try again.";
      return;
    }

    // Success: mark OTP verified, then redirect to reset password page
    localStorage.setItem("prb_reset_verified", "true");
    localStorage.setItem("prb_reset_email", saved.email);

    window.location.href = "reset-password.html";
  });
});
