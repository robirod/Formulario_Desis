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

    //VALIDACIÓN EMAIL
    $(form_votacion.email).on('input', function () {
        var correo = form_votacion.email.val();
        if (validarCorreo(correo)) {
            form_votacion.email.css('background-color', '#68daa2');
        } else {
            form_votacion.email.css('background-color', '#f58282');
        }

        if (form_votacion.email.val() == '') {

            form_votacion.email.css('background-color', 'rgb(234, 242, 249');

        }
    });

    //VALIDACIÓN RUT
    $(form_votacion.rut).on('input', function () {
        var rut = $(this).val();
        if (formatoRut(rut)) {
            // console.log('rut valido');
            form_votacion.rut.css('background-color', '#68daa2');
        } else {
            //console.log('rut invalido');
            form_votacion.rut.css('background-color', '#f58282');
        }

        if (form_votacion.rut.val() == '') {
            form_votacion.rut.css('background-color', 'rgb(234, 242, 249');
        }

    })


    //SELECCIÓN REGIÓN - COMUNA - CANDIDATO
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


    // ENVIO DE FORMULARIO
    $('.btn').on('click', function () {
        $('#formulario').submit(function (event) {
            event.preventDefault();
        });

        if (form_votacion.nombre_apel.val() !== '' && form_votacion.rut.val() !== '' && form_votacion.email.val() !== '' && form_votacion.region.val() !== '0' && form_votacion.comuna.val() !== '0' && form_votacion.candidato.val() !== '0' && $('input[name="fuente"]:checked').val() !== undefined) {
            var correo = form_votacion.email.val();
            var rut = form_votacion.rut.val();
            //VALIDACION CORREO PREVIO ENVIO  FORMULARIO
            if (validarCorreo(correo)) {
                //VALIDACION RUT PREVIO ENVIO FORMULARIO
                if (formatoRut(rut)) {
                    sendForm();
                } else {
                    //ELSE VALIDADOR RUT
                    $('.btn').addClass('error').text('Favor de ingresar RUT valido');

                    setInterval(() => {
                        $('.btn').removeClass('error').text('Votar');

                    }, 3000);
                }

                //ELSE VALIDAOR EMAIL
            } else {
                $('.btn').addClass('error').text('Favor de ingresar email valido');

                setInterval(() => {
                    $('.btn').removeClass('error').text('Votar');

                }, 3000);
            }

            //ELSE VALIDADOR GENERAL
        } else {
            $('.btn').addClass('error').text('Faltan datos para registrar su voto');

            setInterval(() => {
                $('.btn').removeClass('error').text('Votar');

            }, 3000);
        }
    });
});


//FUNCIONES 

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

    var fuentesSelect = [];
    $('.fuente:checked').each(function () {
        fuentesSelect.push($(this).val());
    });


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
            'fuente': fuentesSelect,
            action: 'insertForm'
        },
        success: function (result) {
            console.log(result);
            $('.btn').addClass('success').text(result.replace(`"Registro de voto exitoso"`, `Registro de voto exitoso`));
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
    form_votacion.email.css('background-color', 'rgb(234, 242, 249');
    form_votacion.rut.css('background-color', 'rgb(234, 242, 249');


}

function formatoRut(rut) {
    //FORMATEAR RUT (XXXXXXXX-X / XXXXXXX-X)
    rut = form_votacion.rut.val().replace(/[^0-9kK]/g, '');
    rut = rut.replace(/^(\d{2})(\d{5,6})(\w{1})$/, '$1$2-$3');
    form_votacion.rut.val(rut);


    var splitRut = rut.split('-');
    if (splitRut.length !== 2) {
        return false; // FORMATO RUT INCORRECTO
    }

    var numRut = splitRut[0];
    var verificador = splitRut[1];

    // VALIDACIÓN DIGITO VERIFICADOR
    var suma = 0;
    var multiplo = 2;

    for (var i = numRut.length - 1; i >= 0; i--) {
        suma += parseInt(numRut.charAt(i)) * multiplo;
        if (multiplo < 7) {
            multiplo++;
        } else {
            multiplo = 2;
        }
    }

    var resto = suma % 11;
    var dv = 11 - resto;

    if (dv === 10) {
        if (verificador.toUpperCase() !== 'K') {
            return false; //DIGITO VERIFICADOR INCORRECTO
        }
    } else if (dv === 11) {
        if (verificador !== '0') {
            return false; // DIGITO VERIFICADOR INCORRECTO
        }
    } else {
        if (dv !== parseInt(verificador)) {
            return false; // DIGITO VERIFICADOR INCORRECTO
        }
    }

    return true; // RUT VALIDO

}

function validarCorreo(correo) {

    var regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (regex.test(correo)) {
        //console.log("El correo es válido");
        return true;
    } else {
        //console.log('el correo es invalido');
        return false;
    }

}

