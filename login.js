
function login(){
let usuario = document.getElementById("usuario").value
let senha = document.getElementById("senha").value

if(usuario === "admin" && senha === "123"){
localStorage.setItem("usuario","admin")
window.location.href = "dashboard.html"
}else{
alert("Usuário ou senha inválidos")
}
}
