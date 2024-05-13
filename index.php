<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="Asset/style.css">
    <title>Formulario</title>
</head>

<body>
    <?php
    include 'back.php';
    ?>
    <section id="formulario">
        <div class="container">
            <h1>FORMULARIO DE VOTACIÓN:</h1>
            <div class="row">
                <form method="POST" id="formulario">
                    <div class="entradas">
                        <label for="">Nombre y Apellido</label>
                        <input id="nombre_apel" type="text" placeholder="Ingresar Nombre y Apellido" required> 
                    </div>
                    <div class="entradas">
                        <label for="">Alias</label>
                        <input id="alias" type="text" placeholder="Ingresar Alias ">
                    </div>
                    <div class="entradas">
                        <label for="">RUT </label>
                        <input id="rut" type="text" placeholder="Ingresar Rut" maxlength="12"required>
                    </div>
                    <div class="entradas">
                        <label for="">e-Mail</label>
                        <input id="email" type="email" required placeholder="Ingresar Correo">
                    </div>

                    <div class="entradas">
                        <label for="">Región</label>
                        <select name="region" id="region" required>
                            <option value="0">Seleccione Región</option>
                        </select>
                    </div>

                    <div class="entradas">
                        <label for="">Comuna</label>
                        <select name="comuna" id="comuna" required>
                            <option value="0">Seleccione Comuna</option>
                        </select>
                    </div>

                    <div class="entradas">
                        <label for="">Candidato</label>
                        <select name="candidato" id="candidato" required>
                            <option value="0">Seleccione Candidato</option>
                        </select>
                    </div>

                    <div class="checks">
                        <label for="">Como se entero de nosotros</label>

                        <label for="">
                            <input type="radio" class="fuente" value="Web" name="fuente"> Web</label>
                        <label for="">
                            <input type="radio" class="fuente" value="TV" name="fuente"> TV</label>
                        <label for="">
                            <input type="radio" class="fuente" value="Redes_sociales" name="fuente"> Redes Sociales</label>
                        <label for="">
                            <input type="radio" class="fuente" value="Amigo" name="fuente"> Amigo</label>
                    </div>
                    <button class="btn">Votar</button>
                </form>

            </div>
        </div>
    </section>
    <script src="Asset/jquery-3.7.1.min.js" type="text/javascript"></script>
    <script src="Asset/formulario.js"></script>
</body>

</html>