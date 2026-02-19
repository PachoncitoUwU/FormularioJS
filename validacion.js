let usuario = document.getElementById("usuario");
let mensaje = document.getElementById("mensaje");

usuario.addEventListener("input", function(e) {
    //let valorLimpio = this.value.replace(/[^a-zA-Z0-9_.-]/g, "");
    
    if (/[^a-zA-Z0-9_.-]/.test(this.value)) {
        mensaje.textContent = "Carácter no válido (solo letras, numeros, -, _, .)";
        mensaje.style.color = "orange";
        this.style.borderColor = "orange";
    } else if (this.value.length > 3) {
        mensaje.textContent = "Correcto";
        mensaje.style.color = "green";
        this.style.borderColor = "green";
    } else {
        mensaje.textContent = "minimo 3 caracteres";
        mensaje.style.color = "red";
        this.style.borderColor = "red";
        
        
    }

    this.value = valorLimpio;
});



let password = document.getElementById("password");
let mensajePassword = document.getElementById("mensajePassword");

password.addEventListener("input", function() {
    if (this.value.length === 0) {
        mensajePassword.textContent = "Campo requerido";
        mensajePassword.style.color = "red";
        this.style.borderColor = "red";

    } else if (this.value.length < 10) {
        mensajePassword.textContent = "Debe tener minimo 10 caracteres";
        mensajePassword.style.color = "orange";
        this.style.borderColor = "orange";
        
    } else {
        mensajePassword.textContent = "Contraseña válida";
        mensajePassword.style.color = "green";
        this.style.borderColor = "green"; 
    }
});





function cambiarIcono() {
    let inputPass = document.getElementById("password");
    let icono = document.querySelector("#Ojito i");

    if (inputPass.type === "password") {
        inputPass.type = "text";
        
        icono.classList.remove("bi-eye");
        icono.classList.add("bi-eye-slash");
    } else {
        inputPass.type = "password";
        
        icono.classList.remove("bi-eye-slash");
        icono.classList.add("bi-eye");
    }
}




let contador = document.getElementById("ContadorCaracteres"); 

    password.addEventListener("input", function() {
    let total = this.value.length;
    contador.textContent = `Caracteres: ${total}`;
    
    if (total === 0) {
        contador.style.color = "red";
    } 
    else if (total < 10) {
        contador.style.color = "orange";
    } 
    else {
        contador.style.color = "green";
    } 
});


// 1. Definimos la función que calcula los puntos (fuera del evento)
function calcularPuntos(password) {
    let puntos = 0;
    if (password.length > 9) puntos++;              // Punto por longitud
    if (/[A-Z]/.test(password)) puntos++;            // Punto por Mayúscula
    if (/[0-9]/.test(password)) puntos++;            // Punto por Número
    if (/[^a-zA-Z0-9]/.test(password)) puntos++;     // Punto por Especial (!@#$...)
    return puntos;
}

// 2. El evento principal de la contraseña
password.addEventListener("input", function() {
    let valor = this.value;
    let total = valor.length;
    
    if (total > 0) {
        let nivel = calcularPuntos(valor);
        
        if (nivel <= 1) {
            seguridadContraseña.textContent = "Fortaleza: Débil ⚠️ incluye Mayusculas, Numeros, caracter especial";
            seguridadContraseña.style.color = "red";
        } else if (nivel <= 3) {
            seguridadContraseña.textContent = "Fortaleza: Media ⚡incluye Mayusculas, Numeros, caracter especial";
            seguridadContraseña.style.color = "orange";
        } else {
            seguridadContraseña.textContent = "Fortaleza: Muy Fuerte 💪";
            seguridadContraseña.style.color = "green";
        }
    }
});





let intentosFallidos = 0;
const btnEnviar = document.getElementById("Enviar");
const formulario = document.querySelector("form");

function bloquearFormulario() {
    const inputs = formulario.querySelectorAll("input");
    const alertaSistema = document.getElementById("alertaSistema"); // Referencia al nuevo div
    
    inputs.forEach(input => input.disabled = true);
    btnEnviar.disabled = true;

    let segundos = 30;

    const intervalo = setInterval(() => {
        alertaSistema.textContent = `FORMULARIO BLOQUEADO. Reintenta en: ${segundos}s`;
        alertaSistema.style.color = "red";
        segundos--;
        
        if (segundos < 0) {
            clearInterval(intervalo);
            inputs.forEach(input => input.disabled = false);
            btnEnviar.disabled = false;
            alertaSistema.textContent = ""; // Limpiamos al terminar
            intentosFallidos = 0;
        }
    }, 1000);
}



formulario.addEventListener("submit", function(e) {
    e.preventDefault(); 

    // 1. Definimos los requisitos de seguridad de la contraseña
    let nivelSeguridad = calcularPuntos(password.value);
    const esSegura = nivelSeguridad > 1; 

    // 2. Validación Extra del Usuario (RegEx)
    // Esta expresión permite: a-z, A-Z, 0-9, puntos (.), guiones (-) y guiones bajos (_)
    const regexUsuario = /^[a-zA-Z0-9._-]+$/;
    const usuarioValidoPorCaracteres = regexUsuario.test(usuario.value);

    // 3. Verificamos los mensajes de texto (longitud y éxito previo)
    const esUsuarioCorrecto = mensaje.textContent === "Correcto";
    const esPasswordValido = mensajePassword.textContent === "Contraseña válida";

    // CONDICIÓN FINAL PARA EL ÉXITO
    if (esUsuarioCorrecto && esPasswordValido && esSegura && usuarioValidoPorCaracteres) {
        // --- CASO ÉXITO TOTAL ---
        const alertaSistema = document.getElementById("alertaSistema");
        
        // El mensaje de celebración
        alert("USUARIOOO VALIDOOO"); // Para que se vea centrado y pro
        
        // Limpiamos el formulario para que quede listo para otro usuario
        formulario.reset();
        intentosFallidos = 0;

        // Limpiamos los colores de los bordes y mensajes pequeños
        usuario.style.borderColor = "";
        password.style.borderColor = "";
        mensaje.textContent = "";
        mensajePassword.textContent = "";
        seguridadContraseña.textContent = "";
        ContadorCaracteres.textContent = "";

        // (Opcional) Hacer que el mensaje de felicitación desaparezca después de 5 segundos
        setTimeout(() => {
            alertaSistema.innerHTML = "";
        }, 5000);
} else {
    intentosFallidos++;
    const alertaSistema = document.getElementById("alertaSistema");

    if (intentosFallidos >= 3) {
        bloquearFormulario();
    } else {
        // Aquí mostramos el mensaje de intentos en el HTML
        alertaSistema.textContent = `Intento fallido ${intentosFallidos} de 3. Revisa tus datos.`;
        alertaSistema.style.color = "orange";
    }
}
});

// Ejemplo básico



