
const pesquisa = document.getElementById("pesquisa");
const botoes = document.querySelectorAll(".categoria");
const cards = document.querySelectorAll(".card-filme");
const contador = document.getElementById("contador");
const listaFavoritos = document.getElementById("lista-favoritos");

let categoriaAtual = "Todos";
let favoritos = [];

function filtrarFilmes() {
    const termo = pesquisa.value.toLowerCase();
    let quantidade = 0;

    cards.forEach(card => {
        const titulo = card.dataset.titulo.toLowerCase();
        const categoria = card.dataset.categoria;

        const correspondeCategoria =
            categoriaAtual === "Todos" || categoria === categoriaAtual;

        const correspondePesquisa = titulo.includes(termo);

        const mostrar = correspondeCategoria && correspondePesquisa;

        card.classList.toggle("escondido", !mostrar);

        if (mostrar) {
            quantidade++;
        }
    });

    document.querySelectorAll(".titulo-categoria").forEach(titulo => {
        const categoria = titulo.textContent;
        const temFilmeVisivel = [...cards].some(card =>
            card.dataset.categoria === categoria &&
            !card.classList.contains("escondido")
        );

        titulo.classList.toggle("escondido", !temFilmeVisivel);
    });

    contador.textContent = `${quantidade} filmes encontrados`;
}

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        botoes.forEach(item => item.classList.remove("ativa"));
        botao.classList.add("ativa");

        categoriaAtual = botao.dataset.categoria;
        filtrarFilmes();
    });
});

pesquisa.addEventListener("input", filtrarFilmes);

function atualizarFavoritos() {
    listaFavoritos.innerHTML = "";

    favoritos.forEach(card => {
        const copia = card.cloneNode(true);
        const botao = copia.querySelector(".favoritar");

        if (botao) {
            botao.remove();
        }

        listaFavoritos.appendChild(copia);
    });
}

cards.forEach(card => {
    const botao = card.querySelector(".favoritar");

    botao.addEventListener("click", () => {
        const titulo = card.dataset.titulo;

        if (favoritos.includes(card)) {
            favoritos = favoritos.filter(item => item !== card);
            botao.textContent = "Favoritar";
        } else {
            favoritos.push(card);
            botao.textContent = "Favoritado";
        }

        atualizarFavoritos();
    });
});

filtrarFilmes();