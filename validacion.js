let usuario = document.getElementById("usuario");
let mensaje = document.getElementById('mensaje')

usuario.addEventListener("input", function(evento){
    this.value = this.value.toLowerCase()

    if(/[^a-z]/g.test(this.value)){
        mensaje.textContent = "Esta tratando de ingresar un valor NO valido"
        this.style.borderColor = "red"
        this.borderColor = "2px solid"
    }
    else if(!this.value){
        mensaje.textContent = "Campo Requerido"
    }
    else{
        mensaje.textContent = "Usuario correcto"
        this.style.borderColor = "green"
        this.borderColor = "3px solid"
    }
    this.value = this.value.replace(/[^a-z]/g,"")
})
 