<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'connect.php';

if (!$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);
    exit();
}

// Query to fetch users
$sql = "SELECT userid, username, email, role FROM usertb";
$result = $conn->query($sql);

if ($result) {
    $users = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode(["success" => true, "data" => $users]);
    } else {
        echo json_encode(["success" => false, "message" => "No users found."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Error executing query."]);
}

// Close the database connection
$conn->close();
