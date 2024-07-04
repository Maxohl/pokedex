const pokemonOl = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
                <li class="pokemon ${pokemon.type}" onclick="viewPokemonDetail(${pokemon.number})">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.sprite}" alt="${pokemon.name}">
                    </div>
                </li>
            `
        ).join('');
        pokemonOl.innerHTML += newHtml;
    });
}

function viewPokemonDetail(id) {
    window.location.href = `pokemon-detail.html?id=${id}`;
}

loadPokemon(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecord = offset + limit;

    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemon(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemon(offset, limit);
    }
});
