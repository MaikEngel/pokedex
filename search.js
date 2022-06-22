async function searchNames() {

    let search = document.getElementById('search');
    search.value = search.value.toLowerCase();
    console.log(search.value);
    let outputSearchPoke = document.getElementById('outputSearchPoke');
    currentPokemon = 0;

    if (search.value.length >= 3) {

        outputSearchPoke.innerHTML = "";

        for (let i = 0; i < allPokemonSpecies[0].length; i++) {
            let pokemonName = allPokemonSpecies[0][i]['name'];

            if (pokemonName.toLowerCase().startsWith(search.value)) {

                searchUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
                let responsePokemon = await fetch(searchUrl);
                currentPokemon = await responsePokemon.json();

                let type = currentPokemon['types'][0]['type']['name'];

                let pokemonId = (i + 1);
                let pokemonImg = currentPokemon['sprites']['versions']['generation-viii']['icons']['front_default'];


                outputSearchPoke.innerHTML += `<div class="displayFlexJustifyContentAlignitemsEnd searchResult" id="pokemonSearch${i}" onclick="openFullscreen(${i})">
                <img src="${pokemonImg}">
                <p>${pokemonName}</p>
                <p>#${pokemonId}</p>
                </div>`;
                renderSearchBackground(i, type)
            }
        }
    }

    if (search.value.length == 0) {
        outputSearchPoke.innerHTML = ``;
    }
}