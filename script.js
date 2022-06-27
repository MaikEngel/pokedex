/*
#################################################################################
Local Variable and Arrays
#################################################################################
*/
let allPokemonSpecies = [];
let statNames = [];
let baseStats = [];
let currentAbout;
let currentPokemon;
let currentEvolution;
let pokemonNames;
let currentSpecies;
/* for loadMore function */
let counter = 0;
let newPokemon = 0;
let request = true;
let loading = true;
/* for search function */
let currentSearchedPokemon;

/*
#################################################################################
Clear the pokemonlist
#################################################################################
*/

async function clearPage() {
    let pokemonList = document.getElementById('pokemonList');
    let titleScreen = document.getElementById('titleScreen');
    let loadingScreen = document.getElementById('loadingScreen');
    pokemonList.innerHTML = "";
    titleScreen.classList.add('dNone');
    pokemonList.classList.add('dNone');
    loadingScreen.classList.remove('dNone')
    init(loadingScreen);
}

/*
#################################################################################
Push into allPokemonSpecies for search function & load the first 20 Pokemon
#################################################################################
*/

async function loadAll() {
    let speciesUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=898`;
    let responseSpecies = await fetch(speciesUrl);
    currentSpecies = await responseSpecies.json();
    allPokemonSpecies.push(currentSpecies['results']);
}


async function init(loadingScreen) {
    let pokemonList = document.getElementById('pokemonList');
    if (counter <= 898) {
        for (let i = newPokemon; i < newPokemon + 20; i++) {
            await loadPokemon(pokemonList, i)
        }
        if (loading == true) {
            loadingScreen.classList.add('dNone');
            pokemonList.classList.remove('dNone');
        }
        request = true;
        loading = false;
        ;
    }
}


async function loadPokemon(pokemonList, i) {
    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let responsePokemon = await fetch(pokemonUrl);
    currentPokemon = await responsePokemon.json();
    renderPokemonList(currentPokemon, i, pokemonList)
    renderType(i)
} 

/*
#################################################################################
Render the first 20 Pokemon
#################################################################################
*/

function renderPokemonList(currentPokemon, i, pokemonList) {
    let pokemonName = currentPokemon['name'];
    let pokemonImg = currentPokemon['sprites']['other']['home']['front_default'];
    let pokemonId = currentPokemon['id'];
    counter++;
    pokemonList.innerHTML += loadLayout(i, pokemonName, pokemonImg, pokemonId);
    return;
}


function loadLayout(i, pokemonName, pokemonImg, pokemonId) {
    return `
        <div onclick="fetchApi(${i})" id="background${i}" class="pokemonBackground" style="border-style: inset;">
            <h2>${pokemonName}</h2>
            <div class="typeContainer " id="types${i}"></div>
            <p class="pokemonId">#${pokemonId}</p>
            <img src="${pokemonImg}">
        </div>
    `
}

/*
#################################################################################
Render type and right background
#################################################################################
*/

async function renderType(i) {
    let pokemonType = document.getElementById('types' + i);
    let typeUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let responsePokemon = await fetch(typeUrl);
    let currentPokemonType = await responsePokemon.json();
    let type = currentPokemonType['types'][0]['type']['name']
    for (let j = 0; j < currentPokemonType['types'].length; j++) {
        let types = currentPokemonType['types'][j]['type']['name'];
        pokemonType.innerHTML += `<h4 class="typeDesign">${types}</h4>`
        loadPokemonBackground(i, type)
    }
}

/*
#################################################################################
Load more pokemon if the scroll bar hits the bottom
#################################################################################
*/

function hitBottom() {
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

/*
#################################################################################
Scroll to the top button
#################################################################################
*/

function scrollTopButton() {
    if (window.scrollY > 1000) {
        let goTopArrow = document.getElementById('goTopArrow');
        goTopArrow.classList.remove('dNone');
    } else {
        let goTopArrow = document.getElementById('goTopArrow');
        goTopArrow.classList.add('dNone');
    }
}
