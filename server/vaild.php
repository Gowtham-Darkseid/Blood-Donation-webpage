<?php

$host = "localhost";
$user = "root";
$pass = "gowtham";
$db   = "lifesaver";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function clean($data) {
    return htmlspecialchars(trim($data));
}

if (isset($_POST['register-email'])) {
    $first_name = clean($_POST['first_name'] ?? '');
    $last_name  = clean($_POST['last_name'] ?? '');
    $email      = clean($_POST['register-email'] ?? '');
    $password   = $_POST['register-password'] ?? '';
    $phone      = clean($_POST['phone'] ?? '');
    $blood_type = clean($_POST['blood-type'] ?? '');
    $location   = clean($_POST['location'] ?? '');

    $errors = [];

    if (!$first_name) $errors[] = "First name is required.";
    if (!$last_name)  $errors[] = "Last name is required.";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email address.";
    if (strlen($password) < 6) $errors[] = "Password must be at least 6 characters.";
    if (!preg_match('/^[0-9+\-\s]{8,15}$/', $phone)) $errors[] = "Invalid phone number.";
    if (!$blood_type) $errors[] = "Blood type is required.";
    if (!$location)   $errors[] = "Location is required.";

    $stmt = $conn->prepare("SELECT id FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) $errors[] = "Email already registered.";
    $stmt->close();

    if ($errors) {
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO user (first_name, last_name, email, password, phone, blood_type, location) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $first_name, $last_name, $email, $password_hash, $phone, $blood_type, $location);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registration successful!']);
    } else {
        echo json_encode(['success' => false, 'errors' => ['Database error.']]);
    }
    $stmt->close();
    $conn->close();
    exit;
}

?>