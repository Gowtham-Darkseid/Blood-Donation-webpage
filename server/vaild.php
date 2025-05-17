<?php
session_start();

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'gowtham');
define('DB_NAME', 'lifesaver');

class Auth {
    private $conn;

    public function __construct() {
        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function register($data) {
        $errors = [];
        
        if (empty($data['first_name'])) {
            $errors['first_name'] = "First name is required";
        }
        
        if (empty($data['last_name'])) {
            $errors['last_name'] = "Last name is required";
        }
        
        if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "Valid email is required";
        }
        
        if (empty($data['password']) || strlen($data['password']) < 8) {
            $errors['password'] = "Password must be at least 8 characters";
        }
        
        if (empty($data['phone']) || !preg_match('/^[0-9]{10,15}$/', $data['phone'])) {
            $errors['phone'] = "Valid phone number is required";
        }
        
        if (empty($data['blood_type'])) {
            $errors['blood_type'] = "Blood type is required";
        }
        
        if (empty($data['location'])) {
            $errors['location'] = "Location is required";
        }
        
        if (empty($data['terms'])) {
            $errors['terms'] = "You must accept terms and conditions";
        }
        
        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors];
        }

        $stmt = $this->conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $data['email']);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows > 0) {
            $errors['email'] = "Email already registered";
            return ['success' => false, 'errors' => $errors];
        }
        $stmt->close();

        $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);

        $stmt = $this->conn->prepare("INSERT INTO users (first_name, last_name, email, password, phone, blood_type, location) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", 
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            $hashed_password,
            $data['phone'],
            $data['blood_type'],
            $data['location']
        );

        if ($stmt->execute()) {
            $stmt->close();
            return ['success' => true];
        } else {
            $errors['database'] = "Registration failed: " . $stmt->error;
            $stmt->close();
            return ['success' => false, 'errors' => $errors];
        }
    }

    public function login($email, $password) {
        $errors = [];
        
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "Valid email is required";
        }
        
        if (empty($password)) {
            $errors['password'] = "Password is required";
        }
        
        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors];
        }

        $stmt = $this->conn->prepare("SELECT id, email, password, first_name, last_name FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            $errors['email'] = "Invalid email or password";
            return ['success' => false, 'errors' => $errors];
        }

        $user = $result->fetch_assoc();
        $stmt->close();

        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
            return ['success' => true];
        } else {
            $errors['password'] = "Invalid email or password";
            return ['success' => false, 'errors' => $errors];
        }
    }

    public function logout() {
        session_destroy();
        return ['success' => true];
    }

    public function __destruct() {
        $this->conn->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $auth = new Auth();
    
    if (isset($_POST['login'])) {
        $result = $auth->login($_POST['email'], $_POST['password']);
        
        if ($result['success']) {
            header("Location: dashboard.php");
            exit();
        } else {
            $_SESSION['login_errors'] = $result['errors'];
            header("Location: auth.php?action=login");
            exit();
        }
    }
    elseif (isset($_POST['register'])) {
        $result = $auth->register($_POST);
        
        if ($result['success']) {
            $_SESSION['register_success'] = "Registration successful! You can now login.";
            header("Location: auth.php?action=register");
            exit();
        } else {
            $_SESSION['register_errors'] = $result['errors'];
            $_SESSION['register_data'] = $_POST;
            header("Location: auth.php?action=register");
            exit();
        }
    }
}
?>