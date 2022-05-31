const list = document.getElementById('cardsList');

chamarAPI().then((data) => {
  // console.log(data)
  const dadosLimpos = limparDados(data);

  dadosLimpos.forEach((foguete) => list.appendChild(templateCard(foguete)));
  dadosLimpos.forEach((foguete) => list.appendChild(templateCard(foguete)));
  //const dadosOrdenados = ordenarDados(dadosLimpos);
  //const foguetesAtivos = filtrar(dadosOrdenados, true);
  //const foguetesInativos = filtrar(dadosOrdenados, false);
});

function limparDados(dadosFoguetes) {
  return dadosFoguetes.map((elem, index, array) => {
    const {
      id,
      active,
      cost_per_launch,
      description,
      first_flight,
      rocket_name,
      success_rate_pct,
      wikipedia,
      stages,
      flickr_images,
      company,
      boosters,
    } = elem;

    const resultado = {
      id,
      active,
      cost_per_launch,
      description,
      first_flight,
      rocket_name,
      success_rate_pct,
      wikipedia,
      stages,
      flickr_images,
      company,
      boosters,
    };

    return resultado;
  });
}

function ordenarDados(dadosFoguetes) {
  return dadosFoguetes.sort(
    (foguete1, foguete2) => foguete1.cost_per_launch - foguete2.cost_per_launch
  );
}

function filtrar(dadosFoguetes, ativo) {
  // return dadosFoguetes.filter(({ active }) => active === ativo);
  return dadosFoguetes.filter((foguete) => foguete.active === ativo);
}

function templateCard(foguete) {
  const cardBox = document.createElement('div');
  cardBox.className = 'card box__card';

  const cardContent = document.createElement('div');
  cardContent.className = 'card__content';

  cardBox.appendChild(cardContent);

  const cardImage = document.createElement('img');
  cardImage.src = foguete.flickr_images[1];

  const cardListContainer = document.createElement('div');

  const infoList = cardInfoTemplate(foguete);

  cardListContainer.appendChild(infoList);

  const cardButton = document.createElement('button');
  cardButton.className = 'card__button';

  const cardLink = document.createElement('a');
  cardLink.className = 'card__link';
  cardLink.innerText = 'MAIS DETALHES';
  cardLink.href = foguete.wikipedia;
  cardLink.target = '_blank';

  cardButton.appendChild(cardLink);

  cardContent.appendChild(cardImage);

  cardContent.append(cardImage, cardListContainer, cardButton);

  return cardBox;
}

function cardInfoTemplate(foguete) {
  const cardInfoList = document.createElement('ul');
  cardInfoList.className = 'card__list list';

  const { id, wikipedia, flickr_images, description, ...restanteFoguete } =
    foguete;

  for (const chave in restanteFoguete) {
    const linha = document.createElement('li');
    linha.className = 'card__info--item';

    const p = document.createElement('p');
    const span = document.createElement('span');
    span.className = 'list__value';

    p.innerText = chave;
    span.innerText = restanteFoguete[chave];

    linha.append(p, span);
    cardInfoList.appendChild(linha);
  }
  console.log(cardInfoList);
  return cardInfoList;
}
