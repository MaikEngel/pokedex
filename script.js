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



/*
#################################################################################
Local Variable
#################################################################################
*/

let statNames = [];
let baseStats = [];

let currentAbout;
let currentBaseValue;
let allPokemonSpecies = [];
let allPokemonImg = []
let allPokemonData = [];
let evolutionChain = [];
let loaded = false;
let apis = false;
let searching = false;
let url;
let response;
let currentPokemon;
let evolutionUrl;
let responseEvolution;
let currentEvolution;
let pokemonNames;
let currentSpecies;
let speciesUrl;
let evolutionTrigger;
let firstEvolutionTrigger;
let secondEvolutionTrigger;
let typeUrl;
/* for loadMore function */
let counter = 0;
let newPokemon = 0;
let request = true;


/*
#################################################################################
Clear the pokemonlist
#################################################################################
*/

async function clearPage() {
    let pokemonList = document.getElementById('pokemonList');
    let titleScreen = document.getElementById('titleScreen')
    pokemonList.innerHTML = "";
    titleScreen.classList.add('dNone')
    loadSearchBar()
    init();
}

/*
#################################################################################
Starts loading screen
#################################################################################
*/

function loadingScreen() {
    let loadingScreen = document.getElementById('loadingScreen')
    loadingScreen.classList.remove('dNone')
    setTimeout(clearPage, 2500)
    loaded = true;
}

function stopLoadingScreen() {
    let loadingScreen = document.getElementById('loadingScreen')
    loadingScreen.classList.add('dNone')
}

/*
#################################################################################
Load pokemon with name, type, id, image and layout
#################################################################################
*/

function loadSearchBar() {
    if (loaded == true && apis == true) {
        let progressBar = document.getElementById('progressBar');
        let searchBar = document.getElementById('search')
        progressBar.classList.add('dNone');
        searchBar.classList.remove('dNone')
    }
}

/*
#################################################################################
Load pokemon with name, type, id, image and layout
#################################################################################
*/


async function loadAll() {
    speciesUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=898`
    responseSpecies = await fetch(speciesUrl);
    currentSpecies = await responseSpecies.json();
    allPokemonSpecies.push(currentSpecies['results']);
}

async function init() {
    if (counter <= 898) {
        stopLoadingScreen()
        let pokemonList = document.getElementById('pokemonList');
        for (let i = newPokemon; i < newPokemon + 20; i++) {
            let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
            let responsePokemon = await fetch(pokemonUrl);
            currentPokemon = await responsePokemon.json();
            allPokemonData.push(currentPokemon)

            counter++;
            let pokemonName = currentPokemon['name'];
            let pokemonImg = currentPokemon['sprites']['other']['home']['front_default'];
            let pokemonId = currentPokemon['id'];
            pokemonList.innerHTML += loadLayout(i, pokemonName, pokemonImg, pokemonId);
            renderType(i)
        }
        request = true;
        return;
    }
}

async function renderType(i) {
    let pokemonType = document.getElementById('types' + i);
    let typeUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let responsePokemon = await fetch(typeUrl);
    let currentPokemonType = await responsePokemon.json();
    for (let j = 0; j < allPokemonData[i]['types'].length; j++) {
        let types = currentPokemonType['types'][j]['type']['name'];
        pokemonType.innerHTML += `<h4 class="typeDesign">${types}</h4>`
        loadPokemonBackground(i)
    }
}



function loadLayout(i, pokemonName, pokemonImg, pokemonId) {
    return `

        <div onclick="openFullscreen(${i})" id="background${i}" class="pokemonBackground" loading="lazy" style="border-style: inset;">
            <h2>${pokemonName}</h2>
            <div class="typeContainer " id="types${i}"></div>
            <p class="pokemonId">#${pokemonId}</p>
            <img src="${pokemonImg}">
        </div>

    `
}


/*
#################################################################################
Load more pokemon if the scroll bar hits the bottom
#################################################################################
*/

window.onscroll = function () {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        setTimeout(loadMore, 100);
    }
}

function loadMore() {
    if (counter <= 898) {
        if (request == true) {
            request = false;

            newPokemon = counter;

            init()
        }
    }
}

