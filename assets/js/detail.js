const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');
const pokemonDetailDiv = document.getElementById('pokemonDetail');

pokeApi.getPokemonFullDetail(pokemonId).then((pokemonDetail) => {
    console.log(pokemonDetail)
    const detailHtml = `
        <h2>${pokemonDetail.name}</h2>
        <ol class="types"> 
        ${pokemonDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemonDetail.sprite}" alt="${pokemonDetail.name}">
        <div class="stats">
            <p><strong>HP:</strong> ${pokemonDetail.hp}</p>
            <p><strong>Attack:</strong> ${pokemonDetail.attack}</p>
            <p><strong>Defense:</strong> ${pokemonDetail.defense}</p>
            <p><strong>Special Attack:</strong> ${pokemonDetail.specialAttack}</p>
            <p><strong>Special Defense:</strong> ${pokemonDetail.specialDefense}</p>
            <p><strong>Speed:</strong> ${pokemonDetail.speed}</p>
        </div>
    `;
    const pokemonDetailDiv = document.getElementById('pokemonDetail');
    pokemonDetailDiv.innerHTML = detailHtml;
    pokemonDetailDiv.classList.add(pokemonDetail.type);
});


