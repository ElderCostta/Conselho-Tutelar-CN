function mostrar(id){

document.querySelectorAll(".tela")
.forEach(t => t.style.display="none")

document.getElementById(id).style.display="block"

if(id=="lista") carregarCasos()

if(id=="visita") carregarVisitas()

}

function salvarCaso(){

let caso={

nome:document.getElementById("nome").value,
idade:document.getElementById("idade").value,
responsavel:document.getElementById("responsavel").value,
endereco:document.getElementById("endereco").value,
descricao:document.getElementById("descricao").value

}

let casos=JSON.parse(localStorage.getItem("casos"))||[]

casos.push(caso)

localStorage.setItem("casos",JSON.stringify(casos))

alert("Caso salvo!")

}

function carregarCasos(){

let casos=JSON.parse(localStorage.getItem("casos"))||[]

let html=""

casos.forEach((c,i)=>{

html+=`

<div class="card">

<b>${c.nome}</b><br>
Idade: ${c.idade}<br>
Responsável: ${c.responsavel}<br>
Endereço: ${c.endereco}<br>
Caso: ${c.descricao}<br>

<button onclick="arquivar(${i})">Arquivar</button>

</div>

`

})

document.getElementById("casos").innerHTML=html

}

function arquivar(i){

let casos=JSON.parse(localStorage.getItem("casos"))||[]
let arquivados=JSON.parse(localStorage.getItem("arquivados"))||[]

arquivados.push(casos[i])

casos.splice(i,1)

localStorage.setItem("casos",JSON.stringify(casos))
localStorage.setItem("arquivados",JSON.stringify(arquivados))

carregarCasos()

}

function salvarVisita(){
    let visita = {
        nome: document.getElementById("vnome").value,
        endereco: document.getElementById("vendereco").value,
        data: document.getElementById("vdata").value,
        hora: document.getElementById("vhora").value, // Guarda o horário
        obs: document.getElementById("vobs").value,
        notificado: false // Impede que o som toque várias vezes seguidas
    }

    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    visitas.push(visita);
    localStorage.setItem("visitas", JSON.stringify(visitas));

    alert("Visita agendada com sucesso!");
    carregarVisitas();
}

// Função que verifica o relógio a cada minuto
function verificarAlarme() {
    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    let agora = new Date();
    
    // Formata a data (AAAA-MM-DD) e hora (HH:mm) atual
    let dataHoje = agora.toISOString().split('T')[0];
    let horaAgora = agora.getHours().toString().padStart(2, '0') + ":" + 
                    agora.getMinutes().toString().padStart(2, '0');

    let mudanca = false;

    visitas.forEach((v, i) => {
        if (v.data === dataHoje && v.hora === horaAgora && !v.notificado) {
            document.getElementById("somNotificacao").play();
            alert(`Lembrete de Visita: ${v.nome} em ${v.endereco}`);
            visitas[i].notificado = true; // Marca como lido
            mudanca = true;
        }
    });

    if (mudanca) {
        localStorage.setItem("visitas", JSON.stringify(visitas));
    }
}

// Inicia a verificação automática (corre a cada 30 segundos)
setInterval(verificarAlarme, 30000);
function carregarVisitas() {
    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    let html = "<h3>Visitas Agendadas</h3>";

    visitas.forEach(v => {
        html += `
        <div class="card">
            <strong>${v.nome}</strong><br>
            Local: ${v.endereco}<br>
            Data: ${v.data} | <strong>Hora: ${v.hora}</strong><br>
            Obs: ${v.obs}
        </div>
        `;
    });

    document.getElementById("listaVisitas").innerHTML = html;
}


function mostrarTela(id){

document.querySelectorAll(".tela").forEach(tela => {

tela.style.display="none";

});

document.getElementById(id).style.display="block";

}

mostrarTela("registros");



function salvarRegistro(){

let nreg = document.getElementById("nreg").value;
let denuncia = document.getElementById("denuncia").value;
let crianca = document.getElementById("crianca").value;
let bairro = document.getElementById("bairro").value;
let data = document.getElementById("data").value;
let visto = document.getElementById("visto").value;

let tabela = document.querySelector("#tabelaRegistros tbody");

let linha = tabela.insertRow();

linha.insertCell(0).innerText = nreg;
linha.insertCell(1).innerText = denuncia;
linha.insertCell(2).innerText = crianca;
linha.insertCell(3).innerText = bairro;
linha.insertCell(4).innerText = data;
linha.insertCell(5).innerText = visto;

salvarLocal();

limparCampos();

}

function limparCampos(){

document.getElementById("nreg").value="";
document.getElementById("denuncia").value="";
document.getElementById("crianca").value="";
document.getElementById("bairro").value="";
document.getElementById("data").value="";
document.getElementById("visto").value="";

}



function salvarLocal(){

let dados=[];

document.querySelectorAll("#tabelaRegistros tbody tr").forEach(linha=>{

let registro=[];

linha.querySelectorAll("td").forEach(coluna=>{

registro.push(coluna.innerText);

});

dados.push(registro);

});

localStorage.setItem("registrosCT",JSON.stringify(dados));

}



function carregarRegistros(){

let dados = JSON.parse(localStorage.getItem("registrosCT")) || [];

let tabela = document.querySelector("#tabelaRegistros tbody");

dados.forEach(registro=>{

let linha = tabela.insertRow();

registro.forEach(campo=>{

linha.insertCell().innerText=campo;

});

});

}

carregarRegistros();



function imprimir(){

window.print();

}

function verificarAgendamentos() {
    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    let agora = new Date();
    
    // Formata data e hora atual para comparação (YYYY-MM-DD e HH:mm)
    let dataAtual = agora.toISOString().split('T')[0];
    let horaAtual = agora.getHours().toString().padStart(2, '0') + ":" + 
                    agora.getMinutes().toString().padStart(2, '0');

    let houveMudanca = false;

    visitas.forEach(v => {
        if (v.data === dataAtual && v.hora === horaAtual && !v.notificado) {
            document.getElementById("somNotificacao").play();
            alert(`NOTIFICAÇÃO: Visita agora para ${v.nome} em ${v.endereco}`);
            v.notificado = true; // Marca como notificado para não tocar de novo
            houveMudanca = true;
        }
    });

    if (houveMudanca) {
        localStorage.setItem("visitas", JSON.stringify(visitas));
    }
}

// Verifica a cada 30 segundos

// CÓDIGO CORRIGIDO E UNIFICADO
function verificarRelogio() {
    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    let agora = new Date();
    
    // Pega a data local (Ano-Mês-Dia)
    let ano = agora.getFullYear();
    let mes = String(agora.getMonth() + 1).padStart(2, '0');
    let dia = String(agora.getDate()).padStart(2, '0');
    let dataHoje = `${ano}-${mes}-${dia}`;
    
    // Pega a hora local (Hora:Minuto)
    let horaAgora = String(agora.getHours()).padStart(2, '0') + ":" + 
                    String(agora.getMinutes()).padStart(2, '0');

    let houveMudanca = false;

    visitas.forEach((v, index) => {
        // Verifica se a data e hora batem e se ainda não notificou
        if (v.data === dataHoje && v.hora === horaAgora && !v.notificado) {
            
            // Toca o som
            let som = document.getElementById("somNotificacao");
            if (som) {
                som.play().catch(e => console.log("Clique na página para ativar o áudio"));
            }
            
            // Mostra o alerta na tela
            alert(`🔔 HORA DA VISITA!\nNome: ${v.nome}\nEndereço: ${v.endereco}`);
            
            // Marca como notificado para não repetir
            visitas[index].notificado = true;
            houveMudanca = true;
        }
    });

    // Salva no banco apenas se houve notificação
    if (houveMudanca) {
        localStorage.setItem("visitas", JSON.stringify(visitas));
    }
}

// Inicia a verificação a cada 30 segundos
setInterval(verificarRelogio, 30000);