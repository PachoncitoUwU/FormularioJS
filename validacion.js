let usuario = document.getElementById("usuario");
let mensaje = document.getElementById("mensaje");

usuario.addEventListener("input", function(e) {
    let valorLimpio = this.value.replace(/[^a-zA-Z0-9_.-]/g, "");
    
    if (/[^a-zA-Z0-9_.-]/.test(this.value)) {
        mensaje.textContent = "Carácter no válido (solo letras, numeros, -, _, .)";
        mensaje.style.color = "red";
    } else if (this.value.length > 3) {
        mensaje.textContent = "Correcto";
        mensaje.style.color = "green";
    } else {
        mensaje.textContent = "minimo 3 caracteres";
        mensaje.style.color = "red"; 
    }

    this.value = valorLimpio;
});

let password = document.getElementById("password");
let mensajePassword = document.getElementById("mensajePassword");

password.addEventListener("input", function() {
    if (this.value.length === 0) {
        mensajePassword.textContent = "Campo requerido";
        mensajePassword.style.color = "orange";
        this.style.borderColor = "orange";

    } else if (this.value.length <= 10) {
        mensajePassword.textContent = "Debe tener más de 10 caracteres";
        mensajePassword.style.color = "red";
        this.style.borderColor = "red";
        
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



let contador = document.getElementById("ContadorCaracteres"); // 1. Referencia

password.addEventListener("input", function() {
    let total = this.value.length;
    contador.textContent = `Caracteres: ${total}`;
    
    if (total <= 10) {
        contador.style.color = "red";
    } else {
        contador.style.color = "green";
    }

});


function Seguridad() {
    
    let seguridadContraseña = document.getElementById("seguridadContraseña")

    if (/[0-9]/.test(seguridadContraseña)){

        seguridadContraseña.textContent = "Cwdfghjklñ"

    }
}