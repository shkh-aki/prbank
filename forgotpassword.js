form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  if (!email) return;

  const otp = generateOTP();

  localStorage.setItem(
    "prb_reset_otp",
    JSON.stringify({
      email,
      otp,
      createdAt: Date.now(),
      expires: Date.now() + 5 * 60 * 1000
    })
  );

  // Redirect to OTP page
  window.location.href = "OTP.html";
});
