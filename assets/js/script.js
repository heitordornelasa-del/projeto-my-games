const CHAVE_JOGADORES = "mygames_jogadores_v3";
const CHAVE_SESSAO = "mygames_sessao_v3";
const DIAS = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
const HORARIOS = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00"];

const jogadoresIniciais = [
    { id: "seed-joao", nome: "João", email: "joao@mygames.com", senha: "123456", discord: "joao123", jogos: ["Valorant", "Minecraft"], plataformas: ["PC"], disponibilidade: { "Terça-feira": "18:00 - 22:00", "Quinta-feira": "18:00 - 22:00", "Sábado": "14:00 - 20:00" }, sobre: "Gosto de jogar competitivo e conhecer novas pessoas para fechar equipe.", publico: true, criadoEm: 1 },
    { id: "seed-lucas", nome: "Lucas", email: "lucas@mygames.com", senha: "123456", discord: "lucas123", jogos: ["Rocket League", "Terraria"], plataformas: ["PlayStation"], disponibilidade: { "Sexta-feira": "18:00 - 22:00", "Sábado": "14:00 - 20:00", "Domingo": "16:00 - 20:00" }, sobre: "Curto jogos cooperativos, exploração e partidas casuais.", publico: true, criadoEm: 2 },
    { id: "seed-marina", nome: "Marina", email: "marina@mygames.com", senha: "123456", discord: "marina.gg", jogos: ["The Sims 4", "Minecraft", "Stardew Valley"], plataformas: ["PC"], disponibilidade: { "Segunda-feira": "18:00 - 22:00", "Quarta-feira": "18:00 - 22:00", "Domingo": "14:00 - 18:00" }, sobre: "Jogos de simulação, construção e aventura.", publico: true, criadoEm: 3 },
    { id: "seed-pedro", nome: "Pedro", email: "pedro@mygames.com", senha: "123456", discord: "pedraoFPS", jogos: ["Counter-Strike 2", "Valorant"], plataformas: ["PC"], disponibilidade: { "Terça-feira": "20:00 - 00:00", "Quinta-feira": "20:00 - 00:00", "Sábado": "18:00 - 22:00" }, sobre: "Foco em FPS e partidas ranqueadas.", publico: true, criadoEm: 4 },
    { id: "seed-ana", nome: "Ana", email: "ana@mygames.com", senha: "123456", discord: "anaplay", jogos: ["Fortnite", "Overwatch 2"], plataformas: ["Xbox", "PC"], disponibilidade: { "Quarta-feira": "14:00 - 18:00", "Sexta-feira": "18:00 - 22:00", "Domingo": "18:00 - 22:00" }, sobre: "Gosto de jogos em equipe e partidas divertidas.", publico: true, criadoEm: 5 },
    { id: "seed-gabriel", nome: "Gabriel", email: "gabriel@mygames.com", senha: "123456", discord: "gabrielcraft", jogos: ["Minecraft", "Terraria"], plataformas: ["Nintendo Switch", "PC"], disponibilidade: { "Segunda-feira": "14:00 - 18:00", "Sábado": "10:00 - 16:00" }, sobre: "Construção, sobrevivência e exploração.", publico: true, criadoEm: 6 },
    { id: "seed-beatriz", nome: "Beatriz", email: "bia@mygames.com", senha: "123456", discord: "bia_rpg", jogos: ["Genshin Impact", "Honkai: Star Rail"], plataformas: ["PC", "PlayStation"], disponibilidade: { "Terça-feira": "18:00 - 22:00", "Sábado": "14:00 - 20:00" }, sobre: "Aventureira de RPGs e mundos fantásticos.", publico: true, criadoEm: 7 },
    { id: "seed-ricardo", nome: "Ricardo", email: "ricardo@mygames.com", senha: "123456", discord: "ricardorace", jogos: ["Forza Horizon 5", "Rocket League"], plataformas: ["Xbox"], disponibilidade: { "Quinta-feira": "18:00 - 22:00", "Domingo": "14:00 - 20:00" }, sobre: "Corridas, carros e competição amigável.", publico: true, criadoEm: 8 },
    { id: "seed-julia", nome: "Júlia", email: "julia@mygames.com", senha: "123456", discord: "juliagamer", jogos: ["Animal Crossing", "Mario Kart 8 Deluxe"], plataformas: ["Nintendo Switch"], disponibilidade: { "Sexta-feira": "14:00 - 18:00", "Domingo": "10:00 - 16:00" }, sobre: "Jogos leves, criatividade e diversão.", publico: true, criadoEm: 9 },
    { id: "seed-matheus", nome: "Matheus", email: "matheus@mygames.com", senha: "123456", discord: "mathmoba", jogos: ["League of Legends", "Dota 2"], plataformas: ["PC"], disponibilidade: { "Segunda-feira": "20:00 - 00:00", "Quarta-feira": "20:00 - 00:00", "Sábado": "18:00 - 22:00" }, sobre: "MOBA, estratégia e trabalho em equipe.", publico: true, criadoEm: 10 },
    { id: "seed-camila", nome: "Camila", email: "camila@mygames.com", senha: "123456", discord: "camilacoop", jogos: ["Overcooked! 2", "It Takes Two"], plataformas: ["PlayStation", "Xbox"], disponibilidade: { "Terça-feira": "18:00 - 22:00", "Sábado": "14:00 - 18:00" }, sobre: "Prefiro jogos cooperativos para jogar em dupla.", publico: true, criadoEm: 11 },
    { id: "seed-felipe", nome: "Felipe", email: "felipe@mygames.com", senha: "123456", discord: "felipebattle", jogos: ["Apex Legends", "Fortnite"], plataformas: ["PC", "Xbox"], disponibilidade: { "Quarta-feira": "18:00 - 22:00", "Sexta-feira": "20:00 - 00:00" }, sobre: "Battle royale e jogos de ação.", publico: true, criadoEm: 12 }
];

function lerJogadores() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_JOGADORES));
        if (Array.isArray(dados)) {
            const ids = new Set(dados.map(jogador => jogador.id));
            const complementares = jogadoresIniciais.filter(jogador => !ids.has(jogador.id));
            if (complementares.length) {
                const atualizados = [...dados, ...complementares];
                localStorage.setItem(CHAVE_JOGADORES, JSON.stringify(atualizados));
                return atualizados;
            }
            return dados;
        }
    } catch (erro) {
        console.error("Não foi possível recuperar os jogadores.", erro);
    }
    localStorage.setItem(CHAVE_JOGADORES, JSON.stringify(jogadoresIniciais));
    return [...jogadoresIniciais];
}

let jogadores = lerJogadores();

function salvarJogadores() {
    localStorage.setItem(CHAVE_JOGADORES, JSON.stringify(jogadores));
}

function obterSessao() {
    return localStorage.getItem(CHAVE_SESSAO);
}

function jogadorLogado() {
    const id = obterSessao();
    return jogadores.find(jogador => jogador.id === id) || null;
}

function escaparHTML(valor = "") {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[caractere]);
}

function mostrarMensagem(elemento, texto, tipo = "sucesso") {
    if (!elemento) return;
    elemento.textContent = texto;
    elemento.className = `mensagem ${tipo}`;
}

function normalizarLista(texto) {
    return [...new Set(texto.split(",").map(item => item.trim()).filter(Boolean))];
}

function formatarDisponibilidade(disponibilidade = {}) {
    const entradas = Object.entries(disponibilidade).filter(([, horario]) => horario);
    return entradas.length ? entradas.map(([dia, horario]) => `${dia}: ${horario}`).join(" · ") : "Não informou horários";
}

function atualizarTopo() {
    const area = document.getElementById("usuario-topo");
    const usuario = jogadorLogado();
    if (area) {
        area.innerHTML = usuario
            ? `Olá, ${escaparHTML(usuario.nome)} · <a class="link-destaque" href="perfil.html">Minha conta</a>`
            : `Você ainda não entrou · <a class="link-destaque" href="login.html">Fazer login</a>`;
    }
}
function renderizarJogadores() {
    const container = document.getElementById("jogadores");
    if (!container) return;

    const pesquisa = (document.getElementById("pesquisa")?.value || "").trim().toLocaleLowerCase("pt-BR");
    const plataforma = document.getElementById("plataforma")?.value || "";
    const jogo = document.getElementById("jogo")?.value || "";
    const ordenacao = document.getElementById("ordenacao")?.value || "nome-asc";
    const usuario = jogadorLogado();

    let lista = jogadores.filter(jogador => jogador.publico !== false);
    if (pesquisa) {
        lista = lista.filter(jogador => [jogador.nome, jogador.discord, ...(jogador.jogos || []), ...(jogador.plataformas || [])].join(" ").toLocaleLowerCase("pt-BR").includes(pesquisa));
    }
    if (plataforma) lista = lista.filter(jogador => (jogador.plataformas || []).includes(plataforma));
    if (jogo) lista = lista.filter(jogador => (jogador.jogos || []).some(item => item.toLocaleLowerCase("pt-BR") === jogo.toLocaleLowerCase("pt-BR")));

    lista.sort((a, b) => {
        if (ordenacao === "nome-desc") return b.nome.localeCompare(a.nome, "pt-BR");
        if (ordenacao === "jogo-asc") return (a.jogos?.[0] || "").localeCompare(b.jogos?.[0] || "", "pt-BR");
        if (ordenacao === "plataforma-asc") return (a.plataformas?.[0] || "").localeCompare(b.plataformas?.[0] || "", "pt-BR");
        if (ordenacao === "recentes") return (b.criadoEm || 0) - (a.criadoEm || 0);
        return a.nome.localeCompare(b.nome, "pt-BR");
    });

    container.innerHTML = lista.map(jogador => {
        const proprio = usuario && usuario.id === jogador.id;
        const jogos = (jogador.jogos || []).map(item => `<span>${escaparHTML(item)}</span>`).join("");
        return `<article class="cartao-jogador">
            <div class="cartao-topo"><div><h3>${escaparHTML(jogador.nome)}</h3><span class="etiqueta">${escaparHTML((jogador.plataformas || []).join(", ") || "Plataforma não informada")}</span></div>${proprio ? '<span class="etiqueta etiqueta-proprio">Você</span>' : ""}</div>
            <p><strong>Jogos:</strong></p><div class="jogos-tags">${jogos || "<span>Não informado</span>"}</div>
            <p><strong>Disponibilidade:</strong> ${escaparHTML(formatarDisponibilidade(jogador.disponibilidade))}</p>
            <p><strong>Discord:</strong> ${escaparHTML(jogador.discord || "Não informado")}</p>
            <div class="acoes"><button type="button" class="botao-detalhes" data-id="${escaparHTML(jogador.id)}">Ver detalhes</button>${jogador.discord ? `<a class="botao botao-secundario" href="https://discord.com/" target="_blank" rel="noopener noreferrer">Abrir Discord</a>` : ""}${proprio ? '<a class="botao botao-secundario" href="perfil.html">Editar meu perfil</a>' : ""}</div>
            <div class="detalhe-inline" id="detalhe-${escaparHTML(jogador.id)}" hidden></div>
        </article>`;
    }).join("");

    const vazio = document.getElementById("estado-vazio");
    if (vazio) vazio.hidden = lista.length > 0;
    const contagem = document.getElementById("resultado-contagem");
    if (contagem) contagem.textContent = `${lista.length} ${lista.length === 1 ? "jogador encontrado" : "jogadores encontrados"}.`;

    container.querySelectorAll(".botao-detalhes").forEach(botao => {
        botao.addEventListener("click", () => alternarDetalhes(botao.dataset.id));
    });
    atualizarEstatisticas(lista);
}

function alternarDetalhes(id) {
    const jogador = jogadores.find(item => item.id === id);
    const painel = document.getElementById(`detalhe-${id}`);
    if (!jogador || !painel) return;
    const aberto = !painel.hidden;
    document.querySelectorAll(".detalhe-inline").forEach(item => item.hidden = true);
    if (aberto) return;
    painel.innerHTML = `<div class="conteudo-detalhes">
        <p><strong>Nome:</strong> ${escaparHTML(jogador.nome)}</p>
        <p><strong>E-mail:</strong> ${escaparHTML(jogador.email)}</p>
        <p><strong>Jogos:</strong> ${escaparHTML((jogador.jogos || []).join(", ") || "Não informado")}</p>
        <p><strong>Plataformas:</strong> ${escaparHTML((jogador.plataformas || []).join(", ") || "Não informado")}</p>
        <p><strong>Disponibilidade:</strong> ${escaparHTML(formatarDisponibilidade(jogador.disponibilidade))}</p>
        <p><strong>Sobre:</strong> ${escaparHTML(jogador.sobre || "Este jogador ainda não adicionou uma descrição.")}</p>
    </div>`;
    painel.hidden = false;
}

function atualizarEstatisticas(lista = jogadores) {
    const totalJogadores = document.getElementById("total-jogadores");
    const totalJogos = document.getElementById("total-jogos");
    const totalPlataformas = document.getElementById("total-plataformas");
    if (totalJogadores) totalJogadores.textContent = lista.length;
    if (totalJogos) totalJogos.textContent = new Set(lista.flatMap(jogador => jogador.jogos || [])).size;
    if (totalPlataformas) totalPlataformas.textContent = new Set(lista.flatMap(jogador => jogador.plataformas || [])).size;
}

function atualizarOpcoesJogos() {
    const select = document.getElementById("jogo");
    if (!select) return;
    const selecionado = select.value;
    const jogos = [...new Set(jogadores.flatMap(jogador => jogador.jogos || []))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    select.innerHTML = '<option value="">Todos</option>' + jogos.map(item => `<option value="${escaparHTML(item)}">${escaparHTML(item)}</option>`).join("");
    if (jogos.includes(selecionado)) select.value = selecionado;
}

function iniciarInicio() {
    const pesquisa = document.getElementById("pesquisa");
    const plataforma = document.getElementById("plataforma");
    const jogo = document.getElementById("jogo");
    const ordenacao = document.getElementById("ordenacao");
    [pesquisa, plataforma, jogo, ordenacao].forEach(elemento => elemento?.addEventListener(elemento === pesquisa ? "input" : "change", renderizarJogadores));
    document.getElementById("limpar-filtros")?.addEventListener("click", () => {
        pesquisa.value = "";
        plataforma.value = "";
        jogo.value = "";
        ordenacao.value = "nome-asc";
        renderizarJogadores();
    });
    atualizarOpcoesJogos();
    renderizarJogadores();
}
function criarLinhasHorario(container, disponibilidade = {}) {
    if (!container) return;
    container.innerHTML = DIAS.map(dia => {
        const horario = disponibilidade[dia] || "";
        const ativo = Boolean(horario);
        const partes = horario.split(" - ");
        const inicio = partes[0] || "18:00";
        const fim = partes[1] || "22:00";
        return `<tr><td>${dia}</td><td><input type="checkbox" id="${container.id}-${DIAS.indexOf(dia)}-ativo" data-dia="${dia}" ${ativo ? "checked" : ""} aria-label="Disponível ${dia}"></td><td><select data-dia-inicio="${dia}" aria-label="Início ${dia}">${HORARIOS.filter(h => h !== "00:00").map(h => `<option ${h === inicio ? "selected" : ""}>${h}</option>`).join("")}</select></td><td><select data-dia-fim="${dia}" aria-label="Fim ${dia}">${HORARIOS.map(h => `<option ${h === fim ? "selected" : ""}>${h}</option>`).join("")}</select></td></tr>`;
    }).join("");
}

function lerLinhasHorario(container) {
    const disponibilidade = {};
    if (!container) return disponibilidade;
    container.querySelectorAll('input[type="checkbox"][data-dia]').forEach(checkbox => {
        if (checkbox.checked) {
            const dia = checkbox.dataset.dia;
            const inicio = container.querySelector(`[data-dia-inicio="${dia}"]`).value;
            const fim = container.querySelector(`[data-dia-fim="${dia}"]`).value;
            disponibilidade[dia] = `${inicio} - ${fim}`;
        }
    });
    return disponibilidade;
}

let jogosTemporarios = [];

function renderizarJogosTemporarios() {
    const area = document.getElementById("jogos-selecionados");
    if (!area) return;
    if (!jogosTemporarios.length) {
        area.innerHTML = '<p class="texto-ajuda">Nenhum jogo adicionado ainda.</p>';
        return;
    }
    area.innerHTML = jogosTemporarios.map((jogo, indice) => `<span class="jogo-selecionado">${escaparHTML(jogo.nome)}${jogo.plataforma ? ` · ${escaparHTML(jogo.plataforma)}` : ""}<button type="button" data-remover-jogo="${indice}" aria-label="Remover ${escaparHTML(jogo.nome)}">×</button></span>`).join("");
    area.querySelectorAll("[data-remover-jogo]").forEach(botao => botao.addEventListener("click", () => {
        jogosTemporarios.splice(Number(botao.dataset.removerJogo), 1);
        renderizarJogosTemporarios();
    }));
}

function adicionarJogo(nome, imagem = "", plataforma = "") {
    const limpo = nome.trim();
    if (!limpo) return;
    if (jogosTemporarios.some(jogo => jogo.nome.toLocaleLowerCase("pt-BR") === limpo.toLocaleLowerCase("pt-BR"))) {
        document.getElementById("status-api").textContent = "Esse jogo já foi adicionado.";
        return;
    }
    jogosTemporarios.push({ nome: limpo, imagem, plataforma });
    renderizarJogosTemporarios();
}

async function buscarJogosAPI() {
    const campo = document.getElementById("busca-jogo-api");
    const status = document.getElementById("status-api");
    const resultados = document.getElementById("resultados-api");
    const botao = document.getElementById("buscar-jogo");
    const termo = campo.value.trim();
    if (!termo) {
        status.textContent = "Digite o nome de um jogo para pesquisar.";
        return;
    }
    botao.disabled = true;
    status.textContent = "Consultando o catálogo público...";
    resultados.innerHTML = "";
    try {
        const resposta = await fetch(`https://www.freetogame.com/api/games?title=${encodeURIComponent(termo)}`);
        if (!resposta.ok) throw new Error("A API não respondeu corretamente.");
        const dados = await resposta.json();
        if (!Array.isArray(dados) || !dados.length) {
            status.textContent = "Nenhum resultado encontrado. Você pode adicionar o jogo manualmente.";
            return;
        }
        status.textContent = `${dados.length} resultado(s) encontrado(s). Escolha um para adicionar ao perfil.`;
        resultados.innerHTML = dados.slice(0, 6).map((jogo, indice) => `<article class="resultado-api"><img src="${escaparHTML(jogo.thumbnail || "")}" alt="Capa de ${escaparHTML(jogo.title)}" loading="lazy"><div><strong>${escaparHTML(jogo.title)}</strong><small>${escaparHTML(jogo.platform || "Plataforma não informada")} · ${escaparHTML(jogo.genre || "Gênero não informado")}</small></div><button type="button" data-api-indice="${indice}">Adicionar</button></article>`).join("");
        resultados.querySelectorAll("[data-api-indice]").forEach(botaoResultado => {
            botaoResultado.addEventListener("click", () => {
                const item = dados[Number(botaoResultado.dataset.apiIndice)];
                adicionarJogo(item.title, item.thumbnail || "", item.platform || "");
                status.textContent = `${item.title} adicionado ao seu cadastro.`;
                botaoResultado.disabled = true;
                botaoResultado.textContent = "Adicionado";
            });
        });
    } catch (erro) {
        status.textContent = "Não foi possível acessar a API agora. Verifique sua conexão ou adicione o jogo manualmente.";
    } finally {
        botao.disabled = false;
    }
}
function iniciarCadastro() {
    const formulario = document.getElementById("form-cadastro");
    if (!formulario) return;
    criarLinhasHorario(document.getElementById("corpo-horarios"));
    document.getElementById("buscar-jogo").addEventListener("click", buscarJogosAPI);
    document.getElementById("busca-jogo-api").addEventListener("keydown", evento => {
        if (evento.key === "Enter") {
            evento.preventDefault();
            buscarJogosAPI();
        }
    });
    document.getElementById("adicionar-jogo-manual").addEventListener("click", () => {
        const campo = document.getElementById("jogo-manual");
        if (!campo.value.trim()) return;
        adicionarJogo(campo.value);
        campo.value = "";
    });
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const plataformas = [...formulario.querySelectorAll('input[name="plataforma"]:checked')].map(input => input.value);
        const mensagem = document.getElementById("mensagem-cadastro");
        if (nome.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || senha.length < 6) {
            mostrarMensagem(mensagem, "Confira os campos: nome com pelo menos 2 caracteres, e-mail válido e senha com pelo menos 6 caracteres.", "erro");
            return;
        }
        if (!plataformas.length) {
            mostrarMensagem(mensagem, "Selecione pelo menos uma plataforma.", "erro");
            return;
        }
        if (!jogosTemporarios.length) {
            mostrarMensagem(mensagem, "Adicione pelo menos um jogo ao seu perfil.", "erro");
            return;
        }
        if (jogadores.some(jogador => jogador.email.toLowerCase() === email)) {
            mostrarMensagem(mensagem, "Já existe uma conta cadastrada com esse e-mail. Faça login ou utilize outro e-mail.", "erro");
            return;
        }
        const novoJogador = {
            id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            nome, email, senha,
            discord: document.getElementById("discord").value.trim(),
            jogos: jogosTemporarios.map(jogo => jogo.nome),
            jogosDetalhes: jogosTemporarios,
            plataformas,
            disponibilidade: lerLinhasHorario(document.getElementById("corpo-horarios")),
            sobre: document.getElementById("sobre").value.trim(),
            publico: true,
            criadoEm: Date.now()
        };
        jogadores.push(novoJogador);
        salvarJogadores();
        localStorage.setItem(CHAVE_SESSAO, novoJogador.id);
        jogosTemporarios = [];
        mostrarMensagem(mensagem, "Cadastro realizado com sucesso! Sua conta já aparece na página inicial.", "sucesso");
        setTimeout(() => window.location.href = "perfil.html", 900);
    });
}
function iniciarLogin() {
    const formulario = document.getElementById("form-login");
    if (!formulario) return;
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        const email = document.getElementById("email-login").value.trim().toLowerCase();
        const senha = document.getElementById("senha-login").value;
        const usuario = jogadores.find(jogador => jogador.email.toLowerCase() === email && jogador.senha === senha);
        const mensagem = document.getElementById("mensagem-login");
        if (!usuario) {
            mostrarMensagem(mensagem, "E-mail ou senha incorretos. Confira os dados e tente novamente.", "erro");
            return;
        }
        localStorage.setItem(CHAVE_SESSAO, usuario.id);
        mostrarMensagem(mensagem, `Bem-vindo de volta, ${usuario.nome}!`, "sucesso");
        setTimeout(() => window.location.href = "perfil.html", 600);
    });
}

function preencherPerfil(usuario) {
    document.getElementById("conteudo-perfil").hidden = false;
    document.getElementById("perfil-sem-login").hidden = true;
    document.getElementById("avatar-perfil").textContent = usuario.nome.charAt(0).toUpperCase();
    document.getElementById("perfil-nome-cabecalho").textContent = usuario.nome;
    document.getElementById("perfil-discord-cabecalho").textContent = usuario.discord ? `Discord: ${usuario.discord}` : "Adicione seu Discord para encontrar amigos.";
    document.getElementById("editar-nome").value = usuario.nome;
    document.getElementById("editar-email").value = usuario.email;
    document.getElementById("editar-senha").value = "";
    document.getElementById("editar-discord").value = usuario.discord || "";
    document.getElementById("editar-sobre").value = usuario.sobre || "";
    document.getElementById("editar-jogos").value = (usuario.jogos || []).join(", ");
    document.getElementById("editar-plataformas").value = (usuario.plataformas || []).join(", ");
    criarLinhasHorario(document.getElementById("perfil-horarios"), usuario.disponibilidade || {});
    document.getElementById("texto-privacidade").textContent = usuario.publico ? "Seu perfil está público e pode aparecer nas pesquisas da página inicial." : "Seu perfil está privado e não aparece na listagem pública.";
    document.getElementById("status-visibilidade").textContent = usuario.publico ? "Perfil público" : "Perfil privado";
}
function iniciarPerfil() {
    const areaVazia = document.getElementById("perfil-sem-login");
    if (!areaVazia) return;
    let usuario = jogadorLogado();
    if (!usuario) {
        areaVazia.hidden = false;
        document.getElementById("conteudo-perfil").hidden = true;
        return;
    }
    preencherPerfil(usuario);

    document.getElementById("form-editar-perfil").addEventListener("submit", evento => {
        evento.preventDefault();
        const nome = document.getElementById("editar-nome").value.trim();
        const email = document.getElementById("editar-email").value.trim().toLowerCase();
        const senha = document.getElementById("editar-senha").value;
        const mensagem = document.getElementById("mensagem-perfil");
        if (nome.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (senha && senha.length < 6)) {
            mostrarMensagem(mensagem, "Verifique nome, e-mail e senha. A nova senha deve ter pelo menos 6 caracteres.", "erro");
            return;
        }
        if (jogadores.some(item => item.id !== usuario.id && item.email.toLowerCase() === email)) {
            mostrarMensagem(mensagem, "Esse e-mail já está sendo utilizado por outra conta.", "erro");
            return;
        }
        usuario.nome = nome;
        usuario.email = email;
        usuario.discord = document.getElementById("editar-discord").value.trim();
        usuario.sobre = document.getElementById("editar-sobre").value.trim();
        if (senha) usuario.senha = senha;
        salvarJogadores();
        preencherPerfil(usuario);
        atualizarTopo();
        mostrarMensagem(mensagem, "Informações atualizadas com sucesso.", "sucesso");
    });

    document.getElementById("form-editar-jogos").addEventListener("submit", evento => {
        evento.preventDefault();
        const jogos = normalizarLista(document.getElementById("editar-jogos").value);
        const plataformas = normalizarLista(document.getElementById("editar-plataformas").value);
        const mensagem = document.getElementById("mensagem-jogos");
        if (!jogos.length || !plataformas.length) {
            mostrarMensagem(mensagem, "Informe pelo menos um jogo e uma plataforma.", "erro");
            return;
        }
        usuario.jogos = jogos;
        usuario.plataformas = plataformas;
        salvarJogadores();
        atualizarOpcoesJogos();
        mostrarMensagem(mensagem, "Jogos e plataformas atualizados.", "sucesso");
    });

    document.getElementById("form-editar-horarios").addEventListener("submit", evento => {
        evento.preventDefault();
        usuario.disponibilidade = lerLinhasHorario(document.getElementById("perfil-horarios"));
        salvarJogadores();
        mostrarMensagem(document.getElementById("mensagem-horarios"), "Disponibilidade atualizada.", "sucesso");
    });

    document.getElementById("alternar-privacidade").addEventListener("click", () => {
        usuario.publico = !usuario.publico;
        salvarJogadores();
        preencherPerfil(usuario);
        mostrarMensagem(document.getElementById("mensagem-perfil"), `Perfil ${usuario.publico ? "público" : "privado"} agora.`, "sucesso");
    });

    document.getElementById("excluir-conta").addEventListener("click", () => {
        const confirmar = window.confirm("Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.");
        if (!confirmar) return;
        jogadores = jogadores.filter(item => item.id !== usuario.id);
        salvarJogadores();
        localStorage.removeItem(CHAVE_SESSAO);
        window.location.href = "index.html";
    });

    document.getElementById("sair-conta").addEventListener("click", () => {
        localStorage.removeItem(CHAVE_SESSAO);
        window.location.href = "index.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarTopo();
    const pagina = document.body.dataset.page;
    if (pagina === "inicio") iniciarInicio();
    if (pagina === "cadastro") iniciarCadastro();
    if (pagina === "login") iniciarLogin();
    if (pagina === "perfil") iniciarPerfil();
});