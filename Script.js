// --- FUNÇÃO DE ACESSO (LOGIN) ---
function fazerLogin() {
    const usuarioCorreto = "CONSELHO TUTELAR/CN";
    const senhaCorreta = "12345";

    const usuarioInserido = document.getElementById("usuarioLogin").value;
    const senhaInserida = document.getElementById("senhaLogin").value;
    const erro = document.getElementById("erroLogin");

    if (usuarioInserido.toUpperCase() === usuarioCorreto && senhaInserida === senhaCorreta) {
        // Esconde a tela de login
        document.getElementById("telaLogin").style.display = "none";
        
        // Seleciona o conteúdo principal do sistema
        const conteudo = document.getElementById("conteudoSistema");
        conteudo.style.display = "block";
        
        // Adiciona a classe de animação para o conteúdo surgir suavemente
        conteudo.classList.add("animar-entrada");
        
        mostrar('cadastro'); // Inicia na tela de cadastro após logar
    } else {
        erro.style.display = "block";
    }
}

// --- NAVEGAÇÃO E ATUALIZAÇÃO ---
function mostrar(id) {
    document.querySelectorAll(".tela").forEach(t => t.style.display = "none");
    const telaAlvo = document.getElementById(id);
    if (telaAlvo) telaAlvo.style.display = "block";

    // Lógicas específicas
    if (id === "dashboard") atualizarDashboard();
    if (id === "lista") carregarCasos();
    if (id === "visita") carregarVisitas();
    if (id === "arquivados") carregarArquivados();
    if (id === "registros") renderizarTabela();
}

// --- FUNÇÃO DO DASHBOARD (FEEDBACK VISUAL) ---
function atualizarDashboard() {
    const casos = JSON.parse(localStorage.getItem("casos")) || [];
    const visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    const arquivados = JSON.parse(localStorage.getItem("arquivados")) || [];
    
    const hoje = new Date().toISOString().split('T')[0];
    const visitasHoje = visitas.filter(v => v.data === hoje).length;

    document.getElementById("countAtivos").innerText = casos.length;
    document.getElementById("countVisitas").innerText = visitasHoje;
    document.getElementById("countArquivados").innerText = arquivados.length;
}

// ... (Mantenha aqui suas funções salvarCaso, carregarCasos, arquivar, salvarVisita, etc., do seu script original) ...

// Apenas certifique-se de que renderizarTabela e verificarRelogio continuem rodando
setInterval(verificarRelogio, 30000);

// --- GESTÃO DE CASOS ATIVOS ---
function salvarCaso() {
    let caso = {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        responsavel: document.getElementById("responsavel").value,
        endereco: document.getElementById("endereco").value,
        descricao: document.getElementById("descricao").value
    };

    if (!caso.nome) { alert("Digite ao menos o nome!"); return; }

    let casos = JSON.parse(localStorage.getItem("casos")) || [];
    casos.push(caso);
    localStorage.setItem("casos", JSON.stringify(casos));

    alert("Caso salvo com sucesso!");
    
    // Limpa os campos
    ["nome", "idade", "responsavel", "endereco", "descricao"].forEach(id => {
        document.getElementById(id).value = "";
    });
}

function carregarCasos() {
    let casos = JSON.parse(localStorage.getItem("casos")) || [];
    let html = "";

    casos.forEach((c, i) => {
        html += `
        <div class="card">
            <b>${c.nome}</b><br>
            Idade: ${c.idade} | Responsável: ${c.responsavel}<br>
            Endereço: ${c.endereco}<br>
            Caso: ${c.descricao}<br>
            <button onclick="arquivar(${i})" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer; margin-top:10px;">
                Arquivar Caso
            </button>
        </div>`;
    });

    document.getElementById("casos").innerHTML = html || "<p>Nenhum caso encontrado.</p>";
}

// --- ARQUIVAMENTO ---
function arquivar(i) {
    let casos = JSON.parse(localStorage.getItem("casos")) || [];
    let arquivados = JSON.parse(localStorage.getItem("arquivados")) || [];

    arquivados.push(casos[i]);
    casos.splice(i, 1);

    localStorage.setItem("casos", JSON.stringify(casos));
    localStorage.setItem("arquivados", JSON.stringify(arquivados));

    carregarCasos();
    alert("Caso movido para arquivados!");
}

function carregarArquivados() {
    let arquivados = JSON.parse(localStorage.getItem("arquivados")) || [];
    let html = "";

    if (arquivados.length === 0) {
        html = "<p style='color: gray;'>Nenhum caso arquivado.</p>";
    } else {
        arquivados.forEach((c, i) => {
            html += `
            <div class="card" style="border-left: 5px solid #6c757d;">
                <b>${c.nome}</b> (Arquivado)<br>
                Descrição: ${c.descricao}<br>
                <button onclick="excluirArquivado(${i})" style="margin-top:10px; background:#212529; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">
                    Excluir Permanentemente
                </button>
            </div>`;
        });
    }
    document.getElementById("listaArquivados").innerHTML = html;
}

function excluirArquivado(i) {
    if (confirm("Deseja excluir permanentemente este registro?")) {
        let arquivados = JSON.parse(localStorage.getItem("arquivados")) || [];
        arquivados.splice(i, 1);
        localStorage.setItem("arquivados", JSON.stringify(arquivados));
        carregarArquivados();
    }
}

// --- VISITAS E ALERTAS ---
function salvarVisita() {
    let visita = {
        nome: document.getElementById("vnome").value,
        endereco: document.getElementById("vendereco").value,
        data: document.getElementById("vdata").value,
        hora: document.getElementById("vhora").value,
        obs: document.getElementById("vobs").value,
        notificado: false
    };

    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    visitas.push(visita);
    localStorage.setItem("visitas", JSON.stringify(visitas));

    alert("Visita agendada!");
    carregarVisitas();
}

function carregarVisitas() {
    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    let html = "<h3>Visitas Agendadas</h3>";

    visitas.forEach(v => {
        html += `
        <div class="card">
            <strong>${v.nome}</strong><br>
            Local: ${v.endereco}<br>
            Data: ${v.data} | Hora: ${v.hora}<br>
            Obs: ${v.obs}
        </div>`;
    });

    document.getElementById("listaVisitas").innerHTML = html;
}

function verificarRelogio() {
    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    let agora = new Date();
    let dataHoje = agora.toISOString().split('T')[0];
    let horaAgora = agora.getHours().toString().padStart(2, '0') + ":" + 
                    agora.getMinutes().toString().padStart(2, '0');

    let houveMudanca = false;

    visitas.forEach((v, index) => {
        if (v.data === dataHoje && v.hora === horaAgora && !v.notificado) {
            let som = document.getElementById("somNotificacao");
            if (som) som.play().catch(() => {});
            alert(`🔔 HORA DA VISITA!\nNome: ${v.nome}\nEndereço: ${v.endereco}`);
            visitas[index].notificado = true;
            houveMudanca = true;
        }
    });

    if (houveMudanca) localStorage.setItem("visitas", JSON.stringify(visitas));
}

setInterval(verificarRelogio, 30000);

// --- N° DE REGISTROS ---
function salvarRegistro() {
    let registro = [
        document.getElementById("nreg").value,
        document.getElementById("denuncia").value,
        document.getElementById("crianca").value,
        document.getElementById("bairro").value,
        document.getElementById("data").value,
        document.getElementById("visto").value
    ];

    let dados = JSON.parse(localStorage.getItem("registrosCT")) || [];
    dados.push(registro);
    localStorage.setItem("registrosCT", JSON.stringify(dados));

    renderizarTabela();
    limparCamposRegistro();
}

// --- ATUALIZAÇÃO DA TABELA COM BOTÃO EXCLUIR ---
function renderizarTabela() {
    let dados = JSON.parse(localStorage.getItem("registrosCT")) || [];
    let corpoTabela = document.querySelector("#tabelaRegistros tbody");
    if(!corpoTabela) return;
    
    corpoTabela.innerHTML = "";
    
    dados.forEach((registro, index) => {
        let linha = corpoTabela.insertRow();
        
        // Insere os dados normais
        registro.forEach(campo => {
            linha.insertCell().innerText = campo;
        });

        // Insere a célula do botão de excluir
        let celulaAcoes = linha.insertCell();
        celulaAcoes.innerHTML = `
            <button onclick="excluirRegistro(${index})" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">
                Apagar
            </button>
        `;
    });
}

// --- FUNÇÃO PARA APAGAR O REGISTRO ---
function excluirRegistro(index) {
    if (confirm("Tem certeza que deseja apagar este registro permanentemente?")) {
        let dados = JSON.parse(localStorage.getItem("registrosCT")) || [];
        
        // Remove o item do array pelo índice
        dados.splice(index, 1);
        
        // Salva a lista atualizada no localStorage
        localStorage.setItem("registrosCT", JSON.stringify(dados));
        
        // Atualiza a visualização da tabela
        renderizarTabela();
    }
}

function imprimir() {
    // Garante que os dados da tabela estejam atualizados antes de imprimir
    renderizarTabela();
    // Abre a caixa de diálogo de impressão do sistema
    window.print();
}
