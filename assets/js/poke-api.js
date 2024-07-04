const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.sprite = pokeDetail.sprites.other["official-artwork"].front_default;

    return pokemon;
}

function convertPokeApiDetailToPokemonDetail(pokeDetail) {
    const pokemonDetail = new PokemonDetail();
    pokemonDetail.number = pokeDetail.id;
    pokemonDetail.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemonDetail.types = types;
    pokemonDetail.type = type;

    pokemonDetail.sprite = pokeDetail.sprites.other["official-artwork"].front_default;

    // Extract stats
    pokeDetail.stats.forEach(stat => {
        switch(stat.stat.name) {
            case "hp":
                pokemonDetail.hp = stat.base_stat;
                break;
            case "attack":
                pokemonDetail.attack = stat.base_stat;
                break;
            case "defense":
                pokemonDetail.defense = stat.base_stat;
                break;
            case "special-attack":
                pokemonDetail.specialAttack = stat.base_stat;
                break;
            case "special-defense":
                pokemonDetail.specialDefense = stat.base_stat;
                break;
            case "speed":
                pokemonDetail.speed = stat.base_stat;
                break;
        }
    });

    return pokemonDetail;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemonFullDetail = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonDetail)
        .catch((error) => console.error(error));
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error));
};
