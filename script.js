const receitas = [
  {
    id: 1,
    titulo: "Hambúrguer Artesanal",
    categoria: "Lanches",
    descricao: "Pão brioche, carne de 180g selada no ponto, queijo cheddar derretido e bacon crocante.",
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    ingredientes: [
      "200g de carne moída (acém ou picanha)",
      "1 pão de hambúrguer (brioche)",
      "2 fatias de queijo cheddar",
      "2 fatias de bacon crocante",
      "Sal e pimenta-do-reino a gosto",
      "1 colher de sopa de manteiga"
    ],
    preparo: [
      "Molde a carne no formato de hambúrguer, temperando apenas a superfície com sal e pimenta.",
      "Aqueça bem uma frigideira ou chapa e sele o bacon até ficar crocante. Reserve.",
      "Na mesma frigideira, doure o pão selado com um pouco de manteiga.",
      "Coloque o hambúrguer na frigideira bem quente. Deixe grelhar por cerca de 3 minutos de cada lado.",
      "Coloque o queijo cheddar por cima da carne nos últimos instantes para derreter.",
      "Monte o lanche: pão, carne com queijo, bacon e a outra metade do pão. Sirva bem quente!"
    ]
  },
  {
    id: 2,
    titulo: "Frango Grelhado com Legumes",
    categoria: "Fitness",
    descricao: "Peito de frango temperado com ervas finas, acompanhado de brócolis e batata-doce assada.",
    imagem: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500",
    ingredientes: [
      "200g de peito de frango em bifes",
      "1 batata-doce média cortada em rodelas",
      "1 xícara de brócolis em floretes",
      "1 dente de alho picado",
      "Azeite, sal, orégano e páprica a gosto"
    ],
    preparo: [
      "Tempere os bifes de frango com alho, sal, páprica e um fio de azeite.",
      "Cozinhe a batata-doce e o brócolis no vapor por cerca de 8 a 10 minutos até ficarem macios.",
      "Aqueça uma frigideira com azeite e grelhe os bifes de frango até dourarem de ambos os lados.",
      "Em uma assadeira ou frigideira, sele a batata-doce e o brócolis com um fio de azeite e orégano.",
      "Sirva o frango acompanhado dos legumes bem aquecidos."
    ]
  },
  {
    id: 3,
    titulo: "Omelete Proteico de Queijo",
    categoria: "Café da Manhã",
    descricao: "3 ovos, queijo branco, orégano e tomate picado. Rápido, leve e fácil de fazer.",
    imagem: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500",
    ingredientes: [
      "3 ovos inteiros",
      "50g de queijo branco (ou muçarela) em cubos",
      "1/2 tomate picado sem sementes",
      "1 colher de chá de azeite ou manteiga",
      "Sal, pimenta e orégano a gosto"
    ],
    preparo: [
      "Em uma tigela, bata bem os 3 ovos com um garfo e tempere com sal e pimenta.",
      "Aqueça uma frigideira antiaderente com o azeite ou a manteiga em fogo baixo.",
      "Despeje os ovos batidos e deixe cozinhar levemente nas bordas.",
      "Adicione o queijo branco, o tomate picado e o orégano em uma das metades da omelete.",
      "Dobre a omelete ao meio com a ajuda de uma espátula, espere o queijo derreter e sirva!"
    ]
  }
];

function renderizarReceitas(lista) {
  const container = document.getElementById('receitas-container');
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">Nenhuma receita encontrada.</p>';
    return;
  }

  lista.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.onclick = () => abrirModal(item.id);
    card.innerHTML = `
      <img src="${item.imagem}" alt="${item.titulo}">
      <div class="card-content">
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
        <span class="tag">${item.categoria}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function filtrarReceitas() {
  const texto = document.getElementById('search-input').value.toLowerCase();
  const filtradas = receitas.filter(r => 
    r.titulo.toLowerCase().includes(texto) || 
    r.categoria.toLowerCase().includes(texto) ||
    r.descricao.toLowerCase().includes(texto)
  );
  renderizarReceitas(filtradas);
}

function abrirModal(id) {
  const receita = receitas.find(r => r.id === id);
  if (!receita) return;

  document.getElementById('modal-titulo').innerText = receita.titulo;
  document.getElementById('modal-imagem').src = receita.imagem;
  
  const listaIngredientes = document.getElementById('modal-ingredientes');
  listaIngredientes.innerHTML = receita.ingredientes.map(i => `<li>${i}</li>`).join('');

  const listaPreparo = document.getElementById('modal-preparo');
  listaPreparo.innerHTML = receita.preparo.map(p => `<li>${p}</li>`).join('');

  document.getElementById('modal-container').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal-container').style.display = 'none';
}

// Fechar modal ao clicar fora da caixa
window.onclick = function(event) {
  const modal = document.getElementById('modal-container');
  if (event.target === modal) {
    fecharModal();
  }
};

// Renderizar ao carregar a página
renderizarReceitas(receitas);