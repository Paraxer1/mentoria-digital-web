<?php
// Permitir acceso desde tu dominio
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Recibir los datos enviados por el Javascript
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    $file = 'datos.json';
    
    // Si el archivo ya existe, leemos el contenido actual
    if(file_exists($file)) {
        $current_data = file_get_contents($file);
        $array_data = json_decode($current_data, true);
    } else {
        $array_data = [];
    }
    
    // Agregamos la nueva respuesta
    $array_data[] = $data;
    
    // Guardamos todo de nuevo en el archivo
    if(file_put_contents($file, json_encode($array_data))) {
        echo json_encode(["status" => "success", "message" => "Guardado correctamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al escribir archivo"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No llegaron datos"]);
}
?>