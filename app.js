/*
app.js - Simulador de Crédito
Proyecto Coderhouse, Entrega 2
Ezequiel A. Verón
*/

const datosSimulador = [];
datosSimulador['nombreApp'] = 'TeLoPresto';
datosSimulador['sitioWeb'] = 'https://www.telopresto.com/';
datosSimulador['desarrollador'] = 'Ezequiel A. Verón';

const mensajesDeError = [];
mensajesDeError[100] = "No has ingresado un nombre.\nPor favor, vuelve a intentarlo actualizando la página";
mensajesDeError[101] = "No podemos otorgarte un préstamo ya que no cumples con el rango de edad necesario";
mensajesDeError[102] = "El importe que has solicitado no se encuentra en el rango correcto.\nPor favor, vuelve a intentarlo";
mensajesDeError[103] = "Las cuotas que especificaste no son correctas.\nPor favor, vuelve a intentarlo.";

//Clase con la configuración del simulador
class Simulador {
    constructor(interes, edadMinima, edadMaxima, impMinimoPermitido, impMaximoPermitido, cuotasMinimas, cuotasMaximas) {
        this.interes = interes;
        this.edadMinima = edadMinima;
        this.edadMaxima = edadMaxima;
        this.impMinimoPermitido = impMinimoPermitido;
        this.impMaximoPermitido = impMaximoPermitido;
        this.cuotasMinimas = cuotasMinimas;
        this.cuotasMaximas = cuotasMaximas;
    }
}

//Clase para el manejo de errores
class ManejoErrores {
    constructor(resultado = false, codigo = false) {
        this.resultado = resultado;
        this.codigo = codigo;
    }
    obtenerMensajeError = () => mensajesDeError[this.codigo];
}

//Funciones de Renderizado HTML
const armarTablaHTMLCuotas = (solicitado, capitalCuota, interesCuota, meses) => {
    let tablaCuotas = "<table class='table table-bordered table-striped'>";
    tablaCuotas += "<thead><tr><th>Cuota</th><th>Capital Adeudado</th><th>Interés Adeudado</th></tr></thead><tbody>";
    let capitalAdeudado = solicitado;
    let interesAdeudado = (capitalCuota * parametrosSimulador.interes * meses);
    for (let cuota = 1; cuota <= meses; cuota++) {
        capitalAdeudado -= capitalCuota;
        interesAdeudado -= interesCuota;
        tablaCuotas += "<tr><td>" + cuota + "</td><td>$" + Math.abs(capitalAdeudado.toFixed(2)) + "</td><td>$" + Math.abs(interesAdeudado.toFixed(2)) + "</td></tr>";
    }
    tablaCuotas += "</tbody></table>";
    return tablaCuotas;
}
const armarTablaResumen = (nombre, edad, solicitado, totalPrestamo, totalInteres, meses, interes, capitalCuota, interesCuota, valorCuota) => {
    let tablaResumen = "<table class='table table-bordered table-striped'><thead><tr><th colspan='2'>Datos del Préstamo</th></tr></thead>";
    tablaResumen += "<tbody><tr><td>Nombre</td><td><strong>" + nombre + "</strong></td></tr>";
    tablaResumen += "<tr><td>Edad</td><td><strong>" + edad + "</strong></td></tr>";
    tablaResumen += "<tr><td>Importe Solicitado</td><td><strong>$" + solicitado.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Tasa de Interés</td><td><strong>" + (interes * 100) + "%</strong></td></tr>";
    tablaResumen += "<tr><td>Importe Interés</td><td><strong>$" + totalInteres.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Total Adeudado</td><td><strong>$" + totalPrestamo.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Cuotas Mensuales</td><td><strong>" + meses + "</strong></td></tr>";
    tablaResumen += "<tr><td>Capital por Cuota</td><td><strong>$" + capitalCuota.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Interés por Cuota</td><td><strong>$" + interesCuota.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Valor total de Cuota</td><td><strong>$" + valorCuota.toFixed(2) + "</strong></td></tr></tbody></table>";
    return tablaResumen;
}

//Funciones para Validaciones
const validarNombre = (nombre) => {
    let resultadoValidacion = new ManejoErrores();
    if (nombre == null || nombre == "") {
        resultadoValidacion.resultado = false;
        resultadoValidacion.codigo = 100;
    } else {
        resultadoValidacion = true;
    }
    return resultadoValidacion;
}
const validarEdad = (edad) => {
    let resultadoValidacion = new ManejoErrores();
    if (edad < parametrosSimulador.edadMinima || isNaN(edad) || edad > parametrosSimulador.edadMaxima) {
        resultadoValidacion.resultado = false;
        resultadoValidacion.codigo = 101;
    } else {
        resultadoValidacion.resultado = true;
    }
    return resultadoValidacion;
}
const validarImporteSolicitado = (solicitado) => {
    let resultadoValidacion = new ManejoErrores();
    if (solicitado < parametrosSimulador.impMinimoPermitido || solicitado > parametrosSimulador.impMaximoPermitido || isNaN(solicitado)) {
        resultadoValidacion.resultado = false;
        resultadoValidacion.codigo = 102;
    } else {
        resultadoValidacion.resultado = true;
    }
    return resultadoValidacion;
}
const validarCuotas = (meses) => {
    let resultadoValidacion = new ManejoErrores();
    if (meses < parametrosSimulador.cuotasMinimas || meses > parametrosSimulador.cuotasMaximas || isNaN(meses)) {
        resultadoValidacion.resultado = false;
        resultadoValidacion.codigo = 103;
    } else {
        resultadoValidacion.resultado = true;
    }
    return resultadoValidacion;
}

//Inicialización y Lógica del Simulador
const parametrosSimulador = new Simulador(0.6, 18, 100, 100000, 1000000, 12, 70);
$("#subtituloH1").html("Simulador de Préstamos " + datosSimulador.nombreApp);

const nombre = prompt("Bienvenido al Simulador de Créditos " + datosSimulador.nombreApp + "\nPor favor, ingresa tu nombre");
const validacionNombre = validarNombre(nombre);
if (validacionNombre.resultado === false) {
    alert(validacionNombre.obtenerMensajeError());
    $("#subtituloH2").html(validacionNombre.obtenerMensajeError);
} else {
    const edad = parseInt(prompt("Hola " + nombre + "\nIntroduce por favor tu edad\nMínimo: " + parametrosSimulador.edadMinima + "\nMáximo: " + parametrosSimulador.edadMaxima));
    const validacionEdad = validarEdad(edad);
    if (validacionEdad.resultado === false) {
        alert(validacionEdad.obtenerMensajeError());
        $("#subtituloH2").html(validacionEdad.obtenerMensajeError());
    } else {
        const solicitado = parseFloat(prompt("Ingresa el dinero que necesitas\nPuedes pedir desde $" + parametrosSimulador.impMinimoPermitido + " hasta $" + parametrosSimulador.impMaximoPermitido));
        const validacionSolicitado = validarImporteSolicitado(solicitado);
        if (validacionSolicitado.resultado === false) {
            alert(validacionSolicitado.obtenerMensajeError());
            $("#subtituloH2").html(validacionSolicitado.obtenerMensajeError());
        } else {
            const meses = parseInt(prompt("Por último, elige la cantidad de cuotas\nEl mínimo de cuotas es de " + parametrosSimulador.cuotasMinimas + " y el máximo de " + parametrosSimulador.cuotasMaximas));
            const validacionMeses = validarCuotas(meses);
            if (validacionMeses.resultado === false) {
                alert(validacionMeses.obtenerMensajeError());
                $("#subtituloH2").html(validacionMeses.obtenerMensajeError());
            } else {
                const totalPrestamo = solicitado + (solicitado * parametrosSimulador.interes);
                const valorCuota = totalPrestamo / meses;
                const capitalCuota = solicitado / meses;
                const interesCuota = capitalCuota * parametrosSimulador.interes;
                const totalInteres = solicitado * parametrosSimulador.interes;
                $("#subtituloH2").html("Hola <strong>" + nombre + "</strong>. Esta es la simulación de tu Crédito por <strong>$" + solicitado.toFixed(2) + "</strong>");
                $("#divTablaCuotas").html(armarTablaHTMLCuotas(solicitado, capitalCuota, interesCuota, meses));
                $("#divTablaResumen").html(armarTablaResumen(nombre, edad, solicitado, totalPrestamo, totalInteres, meses, parametrosSimulador.interes, capitalCuota, interesCuota, valorCuota));
            }
        }
    }
}