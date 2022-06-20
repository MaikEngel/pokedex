
function searchNames() {
    let search = document.getElementById('search');
    search.value = search.value.toLowerCase();
    console.log(search.value);
    let pokemonList = document.getElementById('pokemonList');
    searching = true;

    if (search.value.length >= 3) {

        pokemonList.innerHTML = "";

        for (let i = 0; i < allPokemonSpecies.length; i++) {
            let pokemonName = allPokemonSpecies[i]['name'];
            let pokemonImg = allPokemonData[i]['sprites']['other']['home']['front_default'];
            let pokemonId = allPokemonSpecies[i]['id'];
            if (pokemonName.toLowerCase().includes(search.value)) {
                pokemonList.innerHTML += loadLayout(i, pokemonName, pokemonImg, pokemonId);
                renderType(i);
            }
        }
    }

    if (search.value.length == 0) {
        pokemonList.innerHTML = "";
        newPokemon = 0;
        searching = false;
        init()
    }
}



/*
#################################################################################
Local Variable
#################################################################################
*/

let allPokemonSpecies = [];
let allPokemonData = [];

let evolutionChain = [];
let loaded = false;
let apis = false;
let count;

let searching = false;

let currentElement;
let url;
let pokemonUrl;
let response;
let currentPokemon;
let evolutionUrl;
let responseEvolution;
let currentEvolution;
let pokemonNames;
let currentSpecies;
let speciesUrl;
let evolutionItemUrl;
let responseEvolutionItem;
let currentEvolutionItem;
let useItemUrl;
let firstEvolutionLevel;
let happiness;
let evolutionTrigger;
let firstEvolutionTrigger;
let secondEvolutionTrigger;
let typeUrl;
let responseType;
let currentType;
let statNameGermanUrl;
let responseStatName;
let currentStatName;
let currentAbility;
let abilityUrl;
let responseAbility;
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
    pokemonList.innerHTML = "";
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
    let titleScreen = document.getElementById('titleScreen')
    loadingScreen.classList.remove('dNone')
    titleScreen.classList.add('dNone')
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

async function loadApis() {
    url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count}`
    response = await fetch(url);
    currentElement = await response.json();
    count = currentElement['count'];

    allSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/`
    responseAllSpecies = await fetch(allSpeciesUrl);
    currentAllSpecies = await responseAllSpecies.json();

    count = currentAllSpecies['count'];

    loadAll();
}


async function loadAll() {
    for (let i = 0; i < count; i++) {
        speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`
        responseSpecies = await fetch(speciesUrl);
        currentSpecies = await responseSpecies.json();
        allPokemonSpecies.push(currentSpecies);

        pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let responsePokemon = await fetch(pokemonUrl);
        currentPokemon = await responsePokemon.json();
        allPokemonData.push(currentPokemon);
    }
    apis = true;
    loadSearchBar()
}

async function init() {
    if (counter <= 898) {
        stopLoadingScreen()
        let pokemonList = document.getElementById('pokemonList');
        for (let i = newPokemon; i < newPokemon + 20; i++) {
            counter++;
            let pokemonName = allPokemonData[i]['name'];
            let pokemonImg = allPokemonData[i]['sprites']['other']['home']['front_default']
            let pokemonId = allPokemonSpecies[i]['id']
            pokemonList.innerHTML += loadLayout(i, pokemonName, pokemonImg, pokemonId);


            renderType(i)

        }
        request = true;
        return;
    }
}

function renderType(i) {
    let pokemonType = document.getElementById('types' + i);
    for (let j = 0; j < allPokemonData[i]['types'].length; j++) {

        let types = allPokemonData[i]['types'][j]['type']['name'];
        pokemonType.innerHTML += `<h4 class="typeDesign">${types}</h4>`
        loadPokemonBackground(i)
    }
}



function loadLayout(i, pokemonName, pokemonImg, pokemonId) {
    return `

        <div onclick="openFullscreen(${i})" id="background${i}" class="pokemonBackground" loading="lazy">
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
    if (searching == false) {
        if (counter <= 898) {
            if (request == true) {
                request = false;

                newPokemon = counter;

                init()
            }
        }
    }
}

/*
#################################################################################
Open & close fullscreen | Hide & show scrollbar
#################################################################################
*/

function openFullscreen(i) {
    let pokemonDetails = document.getElementById('fullscreen')
    pokemonDetails.classList.remove('dNone')

    renderFullscreenLayout(i)
    renderFullscreenImage(i)
    document.getElementById('body').classList.add('hideScrollbar');
}

function closeFullscreen() {
    let pokemonDetails = document.getElementById('fullscreen')
    pokemonDetails.classList.add('dNone')
    evolutionTrigger = []
    document.getElementById('body').classList.remove('hideScrollbar');
}

function doNotClose(event) {
    event.stopPropagation();
}

/*
#################################################################################
Render the layout in fullscreen view
#################################################################################
*/

function renderFullscreenLayout(i) {
    let pokemonDetails = document.getElementById('fullscreen')
    pokemonDetails.innerHTML = ``;
    pokemonDetails.innerHTML = fullscreenLayout(i);
}

function fullscreenLayout(i) {
    return `
    <div class="pokemonDetailsLayout" id="pokemonDetails${i}" onclick="closeFullscreen()">
        <div id="detailsImg">
            <div id="details">
            </div>
        </div>
        <div id="detailsBackgroundColor${i}" class="pokemonDetails" onclick="doNotClose(event)">
            <div class="pokemonDetailsLayoutRight">
                <div class="pokemonName" id="pokemonName">
                </div>
                <div id="detailsInfos" class="detailsInfo">
                </div>
                <div id="detailsRightSide" class="detailsRightSide">
                    <div id="firstEvolutionTrigger"></div>
                    <div id="secondEvolutionTrigger"></div>
                </div>
            </div>
        </div>
    </div>
    `;
}

/*
#################################################################################
Render the current image
#################################################################################
*/

function renderFullscreenImage(i) {
    let pokemonImg = allPokemonData[i]['sprites']['other']['home']['front_default']
    let detailsImg = document.getElementById('detailsImg');
    detailsImg.innerHTML = "";
    detailsImg.innerHTML = `
    <img class="detailsImg" src="${pokemonImg}">
`
    renderAbout(i);
    renderFullscreenName(i)
}


/*
#################################################################################
Render name, type, id & menubar
#################################################################################
*/


function renderFullscreenName(i) {
    let pokemonName = document.getElementById('pokemonName')
    pokemonNames = allPokemonSpecies[i]['name'];
    pokemonName.innerHTML = "";
    pokemonName.innerHTML = `
    <h2>${pokemonNames}</h2>
    `;
    renderFullscreenID(pokemonName, i)
    renderFullscreenType(pokemonName, i)
    renderMenu(i)
}

function renderFullscreenType(pokemonName, i) {
    pokemonName.innerHTML += `
    <div class="typeContainerDetails" id="typesDetail${i}"></div>
    `
    loadDetailBackground(i)
    renderFullscreenBackground(i)
    loadType(i)

}

function loadType(i) {
    let pokemonType = document.getElementById('typesDetail' + i);
    for (let j = 0; j < allPokemonData[i]['types'].length; j++) {
        let types = allPokemonData[i]['types'][j]['type']['name'];
        pokemonType.innerHTML += `<h4 class="typeDesign">${types}</h4>`
    }
    return;
}

function renderFullscreenID(pokemonName, i) {
    let pokemonId = allPokemonSpecies[i]['id'];
    pokemonName.innerHTML += `<h3 style="order: 1;">#${pokemonId}</h3>`;
}

function renderMenu(i) {
    let detailsInfos = document.getElementById('detailsInfos')
    detailsInfos.innerHTML = `
    <button class="infoButtonsDetails" onclick="renderAbout(${i})">About</button>    
    <button class="infoButtonsDetails" onclick="renderBaseValue(${i})">Base value</button>              
    <button class="infoButtonsDetails" onclick="loadEvolution(${i})">Evolution</button>
    `
}


/*
#################################################################################
Load abilities and render the current about and abilities
#################################################################################
*/

function renderAbout(i) {
    let pokemonAbout = document.getElementById('detailsRightSide');
    let height = allPokemonData[i]['height'] / 10;
    let weight = allPokemonData[i]['weight'] / 10
    let base_experience = currentPokemon['base_experience']
    pokemonAbout.innerHTML = loadAbout(i, height, weight, base_experience);
    loadAbilities(i)
}

function loadAbout(i, height, weight, base_experience) {
    return `
    <table class="statsTable">
    <tr>
        <td class="statsName">
            <h4>Base experience:</h4>
        </td>
        <td>
            <p class="information">${base_experience} exp</p>
        </td>
    </tr>
    <tr>
        <td class="statsName">
            <h4>Height:</h4>
        </td>
        <td>
            <p class="information">${height} m</p>
        </td>
    </tr>
    <tr>
        <td class="statsName">
            <h4>Weight:</h4>
        </td>
        <td>
            <p class="information">${weight} kg</p>
        </td>
    </tr>
    <tr>
        <td class="statsName" style="padding-bottom: 13px;">
            <h4>Abilities:</h4>
        </td>
        <td id=firstAbilitiesDetails${i} class="abilitiesLayout" style="flex-direction: column;">
        </td>
    </tr>
    </table>
`;
}

function loadAbilities(i) {
    let firstAbilities = document.getElementById('firstAbilitiesDetails' + i)
    for (let j = 0; j < allPokemonData[i]['abilities'].length; j++) {
        let ability = allPokemonData[i]['abilities'][j]['ability']['name'];
        firstAbilities.innerHTML += `<p class="information">${ability}</p>`
    }
}

/*
#################################################################################
Load stats and render the current base value
#################################################################################
*/

function renderBaseValue(i) {
    let pokemonStats = document.getElementById('detailsRightSide');
    pokemonStats.innerHTML = ``;
    loadBaseValue(i, pokemonStats)
}

function loadBaseValue(i, pokemonStats) {
    for (let j = 0; j < allPokemonData[i]['stats'].length; j++) {
        let baseStat = allPokemonData[i]['stats'][j]['base_stat'];
        let statName = allPokemonData[i]['stats'][j]['stat']['name'];
        let baseStatResult = baseStat / 255 * 100;
        pokemonStats.innerHTML += loadStats(statName, baseStat, baseStatResult);
    }
    return;
}



function loadStats(statName, baseStat, baseStatResult) {
    return `
    <table class="statsTable">
    <tr style="display: flex; align-items: center; justify-content: space-between;">
        <td class="statsName">
            <h4>${statName}:</h4>
        </td>
        <td>
        <p class="information" style="margin-right: 8px !important;">${baseStat}</p>
            <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${baseStatResult}%;" aria-valuenow="25" aria-valuemin="0"
                aria-valuemax="255"></div>
        </div>
        </td>
    </tr>
    </table>
    `;
}