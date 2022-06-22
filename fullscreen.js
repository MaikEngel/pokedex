/*
#################################################################################
Open & close fullscreen | Hide & show scrollbar
#################################################################################
*/

function openFullscreen(i) {
    statNames = [];
    baseStats = [];
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

async function renderFullscreenImage(i) {
    let pokemonImgUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let responsePokemon = await fetch(pokemonImgUrl);
    let currentPokemonImg = await responsePokemon.json();

    let aboutUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let responseAbout = await fetch(aboutUrl);
    currentAbout = await responseAbout.json();

    let pokemonImg = currentPokemonImg['sprites']['other']['home']['front_default']
    let detailsImg = document.getElementById('detailsImg');
    detailsImg.innerHTML = "";
    detailsImg.innerHTML = `
    <img class="detailsImg" src="${pokemonImg}">
`
    renderFullscreenSections(i, currentAbout);
    renderFullscreenName(i, currentAbout)
}


/*
#################################################################################
Render name, type, id & menubar
#################################################################################
*/


async function renderFullscreenName(i, currentAbout) {
    speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`
    responseSpecies = await fetch(speciesUrl);
    currentSpecies = await responseSpecies.json();
    let pokemonName = document.getElementById('pokemonName')
    pokemonNames = currentSpecies['name'];
    pokemonName.innerHTML = "";
    pokemonName.innerHTML = `
    <h2>${pokemonNames}</h2>
    `;
    renderFullscreenID(pokemonName, i, currentAbout)
    renderFullscreenType(pokemonName, i, currentAbout)
    renderMenu(i)
}

function renderFullscreenType(pokemonName, i, currentAbout) {
    let type = currentAbout['types'][0]['type']['name']
    pokemonName.innerHTML += `
    <div class="typeContainerDetails" id="typesDetail${i}"></div>
    `
    loadDetailBackground(i, type)
    renderFullscreenBackground(i, type)
    loadType(i, currentAbout)

}

function loadType(i, currentAbout) {
    let pokemonType = document.getElementById('typesDetail' + i);
    for (let j = 0; j < currentAbout['types'].length; j++) {
        let types = currentAbout['types'][j]['type']['name'];
        pokemonType.innerHTML += `<h4 class="typeDesign">${types}</h4>`
    }
    return;
}

function renderFullscreenID(pokemonName,) {
    let pokemonId = currentSpecies['id'];
    pokemonName.innerHTML += `<h3 style="order: 1;">#${pokemonId}</h3>`;
}

function renderMenu() {
    let detailsInfos = document.getElementById('detailsInfos')
    detailsInfos.innerHTML = `
    <a class="infoButtonsDetails" href="#aboutSection">About</a>    
    <a class="infoButtonsDetails" href="#baseValueSection">Base value</a>              
    <a class="infoButtonsDetails" href="#evolutionSection">Evolution</a>
    `
}


/*
#################################################################################
Load abilities and render the current about and abilities
#################################################################################
*/

async function renderFullscreenSections(i, currentAbout) {
    detailsRightSide = document.getElementById('detailsRightSide')
    detailsRightSide.innerHTML = ``;
    detailsRightSide.innerHTML = `
    </div>
    <table class="detailsRightSideSections statsTable" id="aboutSection"><h2>About</h2></table>
    <table class="detailsRightSideSections statsTable" id="baseValueSection"><h2>Base Value</h2></table>
    <div>
    <h2>Evolution</h2>
    <div class="detailsRightSideSections displayFlexJustifyContent" id="evolutionSection"></div>
    `;
    await renderAbout(i, currentAbout);
    await renderBaseValue(currentAbout);
    await loadEvolution(i, currentAbout);
}

function renderAbout(i, currentAbout) {

    let aboutSection = document.getElementById('aboutSection');
    let height = currentAbout['height'] / 10;
    let weight = currentAbout['weight'] / 10
    let base_experience = currentAbout['base_experience']
    aboutSection.innerHTML = loadAbout(i, height, weight, base_experience);
    loadAbilities(i, currentAbout)
}

function loadAbout(i, height, weight, base_experience) {
    return `
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
`;
}

function loadAbilities(i, currentAbout) {
    let firstAbilities = document.getElementById('firstAbilitiesDetails' + i)
    for (let j = 0; j < currentAbout['abilities'].length; j++) {
        let ability = currentAbout['abilities'][j]['ability']['name'];
        firstAbilities.innerHTML += `<p class="information">${ability}</p>`
    } currentAbout
}

/*
#################################################################################
Load stats and render the current base value
#################################################################################
*/

function renderBaseValue(currentAbout) {
    let baseValueSection = document.getElementById('baseValueSection');
    baseValueSection.innerHTML = ``;
    loadBaseValue(baseValueSection, currentAbout)
}

function loadBaseValue(baseValueSection, currentAbout) {
    for (let j = 0; j < currentAbout['stats'].length; j++) {

        let baseStat = currentAbout['stats'][j]['base_stat'];
        let statName = currentAbout['stats'][j]['stat']['name'];
        baseStats.push(baseStat);
        statNames.push(statName);
    }
    baseValueSection.innerHTML += `
    <div >
        <canvas id="myChart" style="background-color: rgba(255, 255, 255, 0.5); border-radius: 30px;"></canvas>
    </div>
    `;
    loadChart()
    return;
}

function loadChart() {

    const data = {
        labels: [
            'HP',
            'ATK',
            'DEF',
            'SP-ATK',
            'SP-DEF',
            'SPD',
        ],
        datasets: [{
            label: 'Base Value',
            data: baseStats,
            fill: true,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: '#0d6efd',
            pointBackgroundColor: 'rgb(255, 255, 255)',
            pointBorderColor: '#0d6efd',
            pointHoverBackgroundColor: '#0d6efd',
            pointHoverBorderColor: 'rgb(255, 255, 255)'
        },]
    };

    const config = {
        type: 'radar',
        data: data,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        },
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}