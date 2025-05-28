<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "escuela";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $password_usuario = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre = ?");
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        echo "El nombre de usuario ya está en uso.";
    } else {
        $stmt_insert = $conn->prepare("INSERT INTO usuarios (nombre, password) VALUES (?, ?)");
        $stmt_insert->bind_param("ss", $nombre, $password_usuario);
        
        if ($stmt_insert->execute()) {
            echo "Usuario registrado exitosamente.";
        } else {
            echo "Error al registrar el usuario.";
        }

        $stmt_insert->close();
    }

    $stmt->close();
}

$conn->close();
?>
