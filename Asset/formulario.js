
console.log("Heeeyy!");

let form_votacion = {
    id_votacion: 0,
    nombre_apel: $('#nombre_apel'),
    alias: $('#alias'),
    rut: $('#rut'),
    email: $('#email'),
    region: $('#region'),
    comuna: $('#comuna'),
    candidato: $('#candidato')
}

$(function () {
    $(document).ready(function () {
        getRegiones();
        limpiarForm();

    });

    $(form_votacion.region).on('change', function () {
        form_votacion.region.find('option[value="0"]').remove();
        getComunas();
        form_votacion.comuna.html('<option value="0">Seleccione Comuna</option>');
        form_votacion.candidato.html('<option value="0">Seleccione Candidato</option>');
    })

    $(form_votacion.comuna).on('change', function () {
        form_votacion.comuna.find('option[value="0"]').remove();
        getCandidatos();
        form_votacion.candidato.append('<option value="0">Seleccione Candidato</option>');
    })
    $(form_votacion.candidato).on('change', function () {
        form_votacion.candidato.find('option[value="0"]').remove();
    })

    $('.fuente').on('change', function () {
        var valorFuente = $('input[name="fuente"]:checked').val();
        // console.log(valorFuente);
    });


    $('.btn').on('click', function () {
        $('#formulario').submit(function (event) {
            event.preventDefault();
        });

        if (form_votacion.nombre_apel.val() !== '' && form_votacion.rut.val() !== '' && form_votacion.email.val() !== '' && form_votacion.region.val() !== '0' && form_votacion.comuna.val() !== '0' && form_votacion.candidato.val() !== '0' && $('input[name="fuente"]:checked').val() !== undefined) {
            sendForm();

        } else {
            //  console.log("llenar todos los datos");
            $('.btn').addClass('error').text('Faltan datos para registrar su voto');

            setInterval(() => {
                $('.btn').removeClass('error').text('Votar');

            }, 3000);

        }
    });






});

function getRegiones() {
    $.ajax({
        url: 'back.php/',
        method: 'POST',
        data: { action: 'getRegiones' },
        Type: 'json',
        success: function (result) {
            result = JSON.parse(result);
            result.forEach(element => {
                //console.log(element.REGION_NOMBRE);               
                form_votacion.region.append('<option value=' + element.ID_REGION + '>' + element.REGION_NOMBRE + '</option>');
            });
        }, error: function (xhr, status, error) {
            console.log("Sin Respuesta regiones");
        }
    })
}

function getComunas() {
    $.ajax({
        url: 'back.php/',
        method: 'POST',
        data: { 'id_region': form_votacion.region.val(), action: 'getComunas' },
        Type: 'json',
        success: function (result) {
            //console.log(result);

            result = JSON.parse(result);

            result.forEach(element => {
                //console.log(element);

                form_votacion.comuna.append('<option value=' + element.ID_COMUNA + '>' + element.COMUNA_NOMBRE + '</option>');
            });

        }, error: function (xhr, status, error) {
            console.log("Sin Respuesta comunas");
        }
    })
    form_votacion.comuna.empty();
}

function getCandidatos() {
    $.ajax({
        url: 'back.php/',
        method: 'POST',
        data: { 'id_comuna': form_votacion.comuna.val(), action: 'getCandidatos' },
        Type: 'json',
        success: function (result) {

            result = JSON.parse(result);
            result.forEach(element => {
                //console.log(element);

                form_votacion.candidato.append('<option value=' + element.ID_CANDIDATO + '>' + element.NOMBRE + '</option>');
            });

        }, error: function (xhr, status, error) {
            console.log("Sin Respuesta candidatos");
        }
    })
    form_votacion.candidato.empty();
}




function sendForm() {
    $.ajax({
        url: 'back.php',
        method: 'POST',
        data: {
            'nombre_apel': form_votacion.nombre_apel.val(),
            'alias': form_votacion.alias.val(),
            'rut': form_votacion.rut.val(),
            'email': form_votacion.email.val(),
            'id_region': form_votacion.region.val(),
            'id_comuna': form_votacion.comuna.val(),
            'id_candidato': form_votacion.candidato.val(),
            'fuente': $('input[name="fuente"]:checked').val(),
            action: 'insertForm'
        },
        success: function (result) {
            console.log(result);
            $('.btn').addClass('success').text(result.replace(`"Registro de voto exitoso"` ,`Registro de voto exitoso`));
            setInterval(() => {
                $('.btn').removeClass('success').text('Votar');

            }, 3000);

        }, error: function (xhr, status, error) {
            console.log("Sin Respuesta formulario");
        }
    });


    limpiarForm();
    getRegiones();
}

function limpiarForm() {
    form_votacion.nombre_apel.val('');
    form_votacion.alias.val('');
    form_votacion.rut.val('');
    form_votacion.email.val('');
    form_votacion.region.html('<option value="0">Seleccione Región</option>');
    form_votacion.comuna.html('<option value="0">Seleccione Comuna</option>');
    form_votacion.candidato.html('<option value="0">Seleccione Candidato</option>');
    $('input[name="fuente"]:checked').prop('checked', false);

}