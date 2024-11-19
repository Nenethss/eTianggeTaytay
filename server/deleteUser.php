<?php
header("Content-Type: application/json");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['userid'])) {
    echo json_encode(["success" => false, "message" => "User ID is missing."]);
    exit;
}

$userid = intval($data['userid']);

if ($userid <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid User ID."]);
    exit;
}

$sql = "DELETE FROM usertb WHERE userid = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("i", $userid);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete user."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Database query failed."]);
}

$conn->close();
?>
