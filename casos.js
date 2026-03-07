
function salvarCaso(){

let crianca = document.getElementById("crianca").value
let responsavel = document.getElementById("responsavel").value
let endereco = document.getElementById("endereco").value
let tipo = document.getElementById("tipo").value
let descricao = document.getElementById("descricao").value

let caso = {
id: Date.now(),
crianca: crianca,
responsavel: responsavel,
endereco: endereco,
tipo: tipo,
descricao: descricao,
status: "Em acompanhamento"
}

let casos = JSON.parse(localStorage.getItem("casos")) || []
casos.push(caso)

localStorage.setItem("casos", JSON.stringify(casos))

alert("Caso salvo com sucesso!")
window.location.href = "dashboard.html"
}
