<?php

$conexionBD = new mysqli("localhost", "root", "", "DesisCL");
if ($conexionBD->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $conexionBD->connect_errno . ") " . $conexionBD->connect_error;
}



// SELECT REGIONES

function getRegiones()
{
    global $conexionBD;
    $sql = "SELECT * FROM regiones;";
    $result = $conexionBD->query($sql);
    if ($result->num_rows > 0) {
        $regiones = array();
        while ($row = $result->fetch_assoc()) {
            $regiones[] = $row;
        }
        echo json_encode($regiones);
    } else {
        echo json_encode("No hay datos");
    }
    $conexionBD->close();
}



//SELECT COMUNAS CON ID_REGION

function getComunas($id_region)
{
    global $conexionBD;
    $sqlcomunas = "SELECT
    CO.ID_PROVINCIA AS 'ID_PROVINCIA',
    PR.ID_PROVINCIA,
    PR.PROVINCIA_NOMBRE,
    CO.COMUNA_NOMBRE AS 'COMUNA_NOMBRE',
    CO.ID_COMUNA AS 'ID_COMUNA'
    FROM
    comunas CO
    JOIN provincias PR ON
    CO.ID_PROVINCIA = PR.ID_PROVINCIA
    WHERE
    PR.ID_REGION =$id_region;";
    $resultcomunas = $conexionBD->query($sqlcomunas);

    if ($resultcomunas->num_rows > 0) {
        $comunas = array();
        while ($row = $resultcomunas->fetch_assoc()) {
            $comunas[] = $row;
        }
        echo json_encode($comunas);
    } else {
        echo json_encode("No hay datos");
    }
    $conexionBD->close();
}


//SELECT CANDIDATOS CON ID_COMUNA
function getCandidatos($id_comuna)
{
    global $conexionBD;
    $sqlcandidatos = "SELECT
    *
    FROM
    `CANDIDATOS`
    WHERE
    ID_COMUNA = $id_comuna;";

    $resultcandidatos = $conexionBD->query($sqlcandidatos);
    if ($resultcandidatos->num_rows > 0) {
        $candidatos = array();
        while ($row = $resultcandidatos->fetch_assoc()) {
            $candidatos[] = $row;
        }
        echo json_encode($candidatos);
    } else {
        echo json_encode("No hay datos");
    }
    $conexionBD->close();
}

function insertForm($nombre_apel, $alias, $rut, $email, $id_region, $id_comuna, $id_candidato, $fuente){
    global $conexionBD;
    $fecha =  date("Y-m-d H:i:s"); 
    
    $insertsql = "INSERT INTO VOTACIONES(
        `NOMBRE_APELLIDO`,
        `ALIAS`,
        `RUT`,
        `EMAIL`,
        `REGION`,
        `COMUNA`,
        `CANDIDATO`,
        `FUENTE`,
        `FECHA`
        )
        VALUES(
            '$nombre_apel',
            '$alias',
            '$rut',
            '$email',
            '$id_region',
            '$id_comuna',
            '$id_candidato',
            '$fuente',
            '$fecha'
        );";
        
    
    if($conexionBD->query($insertsql)===TRUE){
        echo json_encode("Registro de voto exitoso");
    }else{
        echo json_encode("Sin exito");
    }



   /* if (mysqli_query($conexionBD, $insertsql)){
       
    } else {
        echo json_encode("Sin exito");
    }*/

}


if (isset($_POST['action']) && $_POST['action'] == 'getComunas') {
    $id_region = $_POST['id_region'];
    $comunas = getComunas($id_region);
}


if (isset($_POST['action']) && $_POST['action'] == 'getRegiones') {
    $regiones = getRegiones();
}

if (isset($_POST['action']) && $_POST['action'] == 'getCandidatos') {
    $id_comuna = $_POST['id_comuna'];
    $candidato = getCandidatos($id_comuna);
}

if (isset($_POST['action']) && $_POST['action'] == 'insertForm') {
    $nombre_apel = $_POST['nombre_apel'];
    $alias = $_POST['alias'];
    $rut = $_POST['rut'];
    $email = $_POST['email'];
    $id_region = $_POST['id_region'];
    $id_comuna = $_POST['id_comuna'];
    $id_candidato = $_POST['id_candidato'];
    $fuente = $_POST['fuente'];
    insertForm($nombre_apel, $alias, $rut, $email, $id_region, $id_comuna, $id_candidato, $fuente);
} 
