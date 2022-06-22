

/*
#################################################################################
Local Variable
#################################################################################
*/
let allPokemonSpecies = [];
let allPokemonData = [];

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


/*
#################################################################################
Clear the pokemonlist
#################################################################################
*/

async function clearPage() {
    let pokemonList = document.getElementById('pokemonList');
    let titleScreen = document.getElementById('titleScreen')
    pokemonList.innerHTML = "";
    titleScreen.classList.add('dNone');
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

/*
#################################################################################
Load pokemon with name, type, id, image and layout
#################################################################################
*/


async function loadAll() {
    let speciesUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=898`
    let responseSpecies = await fetch(speciesUrl);
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

