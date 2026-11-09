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