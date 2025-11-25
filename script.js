let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar dados:", error);
            return; // Interrompe a execução se houver erro
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.historia.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");

        const tagsHTML = dado.tags.map(tag => `<span class="tag">${tag}</span>`).join(''); //Ajuste feito pela IA para adicionar as Tags na exibição do card

        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.data_nascimento}</p>
        <p>${dado.historia}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        <div class="tags-container"> 
            ${tagsHTML}
        </div>
        `
        cardContainer.appendChild(article);
    }
}