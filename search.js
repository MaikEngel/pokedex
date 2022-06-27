let loadscreen = false;
let timer = 500;


function resetTimer() {
    timer = 500;
}


async function searchNames() {  /* starts on input */
    let search = document.getElementById('search');
    let outputSearchPoke = document.getElementById('outputSearchPoke');
    search.value = search.value.toLowerCase();
    currentPokemon = 0;
    outputSearchPoke.innerHTML = "";
    if (search.value.length >= 3 && !loadscreen) {  /* Starts when 3 letters in the inputfield */
        await checkSearchLetter(outputSearchPoke)
    }else {
        clearSearchBar()
    }
}


async function checkSearchLetter(outputSearchPoke) {  /* Check if the first letter match with the Pokemon names */
    loadscreen = true;
    for (let i = 0; i < allPokemonSpecies[0].length; i++) {
        let pokemonName = allPokemonSpecies[0][i]['name'];
        if (pokemonName.toLowerCase().startsWith(search.value)) {
            await loadSearchPokemon(i, pokemonName, outputSearchPoke);
        }
    }
    loadscreen = false
}


async function loadSearchPokemon(i, pokemonName, outputSearchPoke) {  /* Load and render the autocomplete */
    searchUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    let responsePokemon = await fetch(searchUrl);
    currentPokemon = await responsePokemon.json();
    let type = currentPokemon['types'][0]['type']['name'];
    let pokemonId = (i + 1);
    let pokemonImg = currentPokemon['sprites']['versions']['generation-viii']['icons']['front_default'];
    loadSearchlayou(pokemonName, pokemonImg, pokemonId, outputSearchPoke, i);
    renderSearchBackground(i, type);
    ;
}


function loadSearchlayou(pokemonName, pokemonImg, pokemonId, outputSearchPoke, i) {
    outputSearchPoke.innerHTML += `<div class="displayFlexJustifyContentAlignitemsEnd searchResult" id="pokemonSearch${i}" onclick="fetchApi(${i})">
    <img src="${pokemonImg}">
    <p>${pokemonName}</p>
    <p>#${pokemonId}</p>
    </div>`;
}


function clearSearchBar() {  /* If inputfield is empty clear the autocomplete */
    if (search.value.length == 0) {
        outputSearchPoke.innerHTML = ``;
    }
    ;
}