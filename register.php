<?php
require_once "db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  echo json_encode(["ok" => false, "message" => "Invalid request method."]);
  exit;
}

$name     = trim($_POST["fullName"] ?? "");
$email    = trim($_POST["regEmail"] ?? "");
$password = $_POST["regPassword"] ?? "";
$roleId   = trim($_POST["roleId"] ?? "");

// Basic validation
if ($name === "" || $email === "" || $password === "" || $roleId === "") {
  echo json_encode(["ok" => false, "message" => "All fields are required."]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["ok" => false, "message" => "Invalid email address."]);
  exit;
}

if (!ctype_digit($roleId)) {
  echo json_encode(["ok" => false, "message" => "Role_ID must be a number."]);
  exit;
}

// Check if email already exists
$check = $conn->prepare("SELECT User_Id FROM `user` WHERE Email = ? LIMIT 1");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
  echo json_encode(["ok" => false, "message" => "Email already registered."]);
  $check->close();
  exit;
}
$check->close();

// Hash password (IMPORTANT)
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$stmt = $conn->prepare("INSERT INTO `user` (Name, Email, Password, Role_Id) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $name, $email, $hashed, $roleId);

if ($stmt->execute()) {
  echo json_encode(["ok" => true, "message" => "Registration successful!"]);
} else {
  echo json_encode(["ok" => false, "message" => "Error: " . $conn->error]);
}

$stmt->close();
$conn->close();
