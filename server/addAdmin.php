<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username'], $data['email'], $data['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid input data."
    ]);
    exit();
}

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];

$stmt = $conn->prepare("INSERT INTO usertb (username, email, password, role) VALUES (?, ?, ?, ?)");
$role = 'admin';

if ($stmt) {
    $stmt->bind_param("ssss", $username, $email, $password, $role);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Admin added successfully.",
            "admin" => [
                "userid" => $stmt->insert_id,
                "username" => $username,
                "email" => $email,
                "role" => $role
            ]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error: " . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error: Unable to prepare statement."
    ]);
}

$conn->close();
?>
