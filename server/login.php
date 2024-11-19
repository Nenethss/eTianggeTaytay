<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username'], $data['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid input data."
    ]);
    exit();
}

$username = $conn->real_escape_string($data['username']);
$password = $data['password'];

// Query to check if the user exists
$sql = "SELECT * FROM usertb WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify password directly (if no hashing is implemented)
    if ($password === $user['password']) {  // Correct password check
        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "data" => [ // Fixing the returned structure
                "userid" => $user['userid'],
                "username" => $user['username'],
                "role" => $user['role']
            ]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid password."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "User not found."
    ]);
}

$conn->close();
?>
