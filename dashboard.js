
function carregar(){
let casos = JSON.parse(localStorage.getItem("casos")) || []
let abertos = casos.length
let fechados = casos.filter(c => c.status === "Resolvido").length

document.getElementById("casosAbertos").innerText = abertos
document.getElementById("casosFechados").innerText = fechados
document.getElementById("atendimentos").innerText = casos.length
}
carregar()
