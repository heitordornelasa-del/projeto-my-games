
document.addEventListener("DOMContentLoaded", function () {

    const pagina = window.location.pathname.split("/").pop();

    console.log("Página atual:", pagina);

});

(function () {
    function iniciarCadastro() {
        const formulario = document.querySelector("main form");
        const campoJogos = document.querySelector("#jogos");

        if (!formulario || !campoJogos) {
            return;
        }

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const nome = document.querySelector("#nome").value.trim();
            const email = document.querySelector("#email").value.trim().toLowerCase();
            const discord = document.querySelector("#discord").value.trim();

            const diasSemana = [
                "segunda",
                "terca",
                "quarta",
                "quinta",
                "sexta",
                "sabado",
                "domingo"
            ];

            const disponibilidade = diasSemana
                .filter(function (dia) {
                    return document.querySelector("#" + dia).checked;
                })
                .map(function (dia) {
                    return {
                        dia: dia,
                        inicio: document.querySelector("#" + dia + "-inicio").value,
                        fim: document.querySelector("#" + dia + "-fim").value
                    };
                });

            const jogos = campoJogos.value
                .split(",")
                .map(function (jogo) {
                    return jogo.trim();
                })
                .filter(function (jogo) {
                    return jogo !== "";
                });

            const plataformas = Array.from(
                document.querySelectorAll('input[name="plataforma"]:checked')
            ).map(function (plataforma) {
                return plataforma.value;
            });

            let jogadores = [];

            try {
                jogadores = JSON.parse(
                    localStorage.getItem("mygames_jogadores")
                ) || [];
            } catch (erro) {
                jogadores = [];
            }

            const emailExistente = jogadores.some(function (jogador) {
                return jogador.email === email;
            });

            if (emailExistente) {
                alert("Já existe um cadastro com esse email.");
                return;
            }

            const novoJogador = {
                id: Date.now(),
                nome: nome,
                email: email,
                discord: discord,
                jogos: jogos,
                plataformas: plataformas,
                disponibilidade: disponibilidade
            };

            jogadores.push(novoJogador);

            localStorage.setItem(
                "mygames_jogadores",
                JSON.stringify(jogadores)
            );

            alert("Cadastro realizado com sucesso!");

            formulario.reset();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarCadastro);
    } else {
        iniciarCadastro();
    }
})();

(function () {
    function carregarJogadores() {
        const areaJogadores = document.querySelector("#jogadores");
        const areaDetalhes = document.querySelector(".detalhes-jogadores");

        if (!areaJogadores || !areaDetalhes) return;

        let jogadores = [];

        try {
            jogadores = JSON.parse(localStorage.getItem("mygames_jogadores")) || [];
        } catch (erro) {
            jogadores = [];
        }

        areaJogadores.querySelectorAll(".cartao-jogador").forEach(cartao => cartao.remove());
        areaDetalhes.querySelectorAll("details").forEach(detalhe => detalhe.remove());

        if (jogadores.length === 0) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Ainda não existem jogadores cadastrados.";
            areaJogadores.appendChild(mensagem);
            return;
        }

        jogadores.forEach(function (jogador) {
            const cartao = document.createElement("article");
            cartao.classList.add("cartao-jogador");

            const titulo = document.createElement("h3");
            titulo.textContent = jogador.nome;

            const jogos = document.createElement("p");
            jogos.textContent = "Jogos: " + jogador.jogos.join(", ");

            const plataformas = document.createElement("p");
            plataformas.textContent = "Plataforma: " + jogador.plataformas.join(", ");

            const horarios = document.createElement("p");

            if (jogador.disponibilidade.length > 0) {
                const dias = jogador.disponibilidade.map(horario => horario.dia);
                horarios.textContent = "Horários disponíveis: " + dias.join(", ");
            } else {
                horarios.textContent = "Horários disponíveis: Não informado";
            }

            const discord = document.createElement("p");
            discord.textContent = "Discord: " + (jogador.discord || "Não informado");

            const acoes = document.createElement("div");
            acoes.classList.add("acoes");

            const linkDetalhes = document.createElement("a");
            linkDetalhes.classList.add("botao");
            linkDetalhes.href = "#detalhes-" + jogador.id;
            linkDetalhes.textContent = "Ver detalhes";

            const linkDiscord = document.createElement("a");
            linkDiscord.classList.add("botao", "botao-secundario");
            linkDiscord.href = "https://discord.com/";
            linkDiscord.target = "_blank";
            linkDiscord.rel = "noopener noreferrer";
            linkDiscord.textContent = "Chamar no Discord";

            acoes.append(linkDetalhes, linkDiscord);
            cartao.append(titulo, jogos, plataformas, horarios, discord, acoes);
            areaJogadores.appendChild(cartao);

            const detalhes = document.createElement("details");
            detalhes.id = "detalhes-" + jogador.id;

            const resumo = document.createElement("summary");
            resumo.textContent = "Perfil de " + jogador.nome;

            const conteudo = document.createElement("div");
            conteudo.classList.add("conteudo-detalhes");

            const email = document.createElement("p");
            email.innerHTML = "<strong>Email:</strong> ";
            email.appendChild(document.createTextNode(jogador.email));

            const jogosDetalhes = document.createElement("p");
            jogosDetalhes.innerHTML = "<strong>Jogos:</strong> ";
            jogosDetalhes.appendChild(document.createTextNode(jogador.jogos.join(", ")));

            const plataformasDetalhes = document.createElement("p");
            plataformasDetalhes.innerHTML = "<strong>Plataforma:</strong> ";
            plataformasDetalhes.appendChild(document.createTextNode(jogador.plataformas.join(", ")));

            const discordDetalhes = document.createElement("p");
            discordDetalhes.innerHTML = "<strong>Discord:</strong> ";
            discordDetalhes.appendChild(document.createTextNode(jogador.discord || "Não informado"));

            const tituloDisponibilidade = document.createElement("p");
            tituloDisponibilidade.innerHTML = "<strong>Disponibilidade:</strong>";

            conteudo.append(email, jogosDetalhes, plataformasDetalhes, discordDetalhes, tituloDisponibilidade);

            if (jogador.disponibilidade.length > 0) {
                jogador.disponibilidade.forEach(function (horario) {
                    const item = document.createElement("p");
                    item.textContent = horario.dia + ": " + horario.inicio + " às " + horario.fim;
                    conteudo.appendChild(item);
                });
            } else {
                const item = document.createElement("p");
                item.textContent = "Nenhum horário informado.";
                conteudo.appendChild(item);
            }

            detalhes.append(resumo, conteudo);
            areaDetalhes.appendChild(detalhes);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", carregarJogadores);
    } else {
        carregarJogadores();
    }
})();