let loadFullscreen = false;

/*
#################################################################################
Fetch api for fullscreen view
#################################################################################
*/
async function fetchApi(i) {
    let aboutUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let responseAbout = await fetch(aboutUrl);
    currentAbout = await responseAbout.json();
    openFullscreen(i)
}

/*
#################################################################################
Open & close fullscreen | Hide & show scrollbar
#################################################################################
*/

function openFullscreen(i) {
    statNames = [];
    baseStats = [];
    let pokemonDetails = document.getElementById('fullscreen');
    pokemonDetails.classList.remove('dNone');
    document.getElementById('body').classList.add('hideScrollbar');
    renderFullscreenLayout(i)
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
    let type = currentAbout['types'][0]['type']['name']
    pokemonDetails.innerHTML = ``;
    pokemonDetails.innerHTML = fullscreenLayout(i);
    loadDetailBackground(i, type)
    renderFullscreenImage(i)
}

function fullscreenLayout(i) {
    return `
            <div class="pokemonDetailsLayout" id="pokemonDetails${i}">
            <div class="pokemonDetailsLayoutFullsscreen">
                <div class="fullscreenArrow">
                    <img src="img/arrow_back.png" onclick="showLast(${i - 1})">
                </div>
                <div id="detailsImg">
                    <div id="details">
                    </div>
                </div>
                <div id="detailsBackgroundColor${i}" class="pokemonDetails">
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
                <div style="margin: 16px;" class="fullscreenArrow">
                    <img src="img/arrow_forward.png" onclick="showNext(${i + 1})">
                </div>
                <div class="closeButton">
                    <img src="img/close.png" onclick="closeFullscreen()" >
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
    let pokemonImg = currentAbout['sprites']['other']['home']['front_default']
    let detailsImg = document.getElementById('detailsImg');
    detailsImg.innerHTML = "";
    detailsImg.innerHTML = `
    <img class="detailsImg" src="${pokemonImg}">`
    await renderFullscreenName(i)
    await renderFullscreenSections(i);
}


/*
#################################################################################
Render name, type, id & menubar
#################################################################################
*/


async function renderFullscreenName(i) {
    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`
    let responseSpecies = await fetch(speciesUrl);
    currentSpecies = await responseSpecies.json();
    let pokemonName = document.getElementById('pokemonName')
    pokemonNames = currentSpecies['name'];
    pokemonName.innerHTML = "";
    pokemonName.innerHTML = `
    <h2>${pokemonNames}</h2>
    `;
    await renderFullscreenID(pokemonName, i)
    await renderFullscreenType(pokemonName, i)
    await renderMenu(i)
}

function renderFullscreenType(pokemonName, i) {
    pokemonName.innerHTML += `
    <div class="typeContainerDetails" id="typesDetail${i}"></div>
    `
    loadType(i)
}

function loadType(i) {
    let pokemonType = document.getElementById('typesDetail' + i);
    for (let j = 0; j < currentAbout['types'].length; j++) {
        let types = currentAbout['types'][j]['type']['name'];
        pokemonType.innerHTML += `<h4 class="typeDesign">${types}</h4>`
    }
    ;
}

function renderFullscreenID(pokemonName) {
    let pokemonId = currentSpecies['id'];
    pokemonName.innerHTML += `<h3 style="order: 1;">#${pokemonId}</h3>`;
}

async function renderMenu() {
    detailsInfos.innerHTML = `
        <a class="infoButtonsDetails" href="#aboutSection">About</a>
        <p>|</p> 
        <a class="infoButtonsDetails" href="#baseValueSection">Base value</a> 
        <p>|</p>             
        <a class="infoButtonsDetails" href="#evolutionSection">Evolution</a>
        <p>|</p>             
        <a class="infoButtonsDetails" href="#shinySection">Shiny</a>
    `
}


/*
#################################################################################
Load abilities and render the current about, abilities...
#################################################################################
*/

async function renderFullscreenSections(i) {
    detailsRightSide = document.getElementById('detailsRightSide')
    detailsRightSide.innerHTML = ``;
    detailsRightSide.innerHTML = `
    <div style="margin-bottom: 16px;">
        <h2>About</h2>
        <table class="detailsRightSideSections statsTable" id="aboutSection"></table>
    </div>
    <div style="margin-bottom: 16px;">
        <h2>Description</h2>
        <table class="detailsRightSideSections statsTable" id="descriptionSection"></table>
    </div>
    <div style="margin-bottom: 16px;">
        <h2>Base Value</h2>
        <div class="detailsRightSideSections statsTable" id="baseValueSection"></div>
    </div>
    <div style="margin-bottom: 16px;">
        <h2>Evolution</h2>
        <div class="detailsRightSideSections displayFlexJustifyContent" id="evolutionSection"></div>
    </div>
    <div style="margin-bottom: 16px;">
    <h2>Shiny</h2>
        <div class="detailsRightSideSections displayFlexJustifyContent" id="shinySection"></div>
    </div>

    `;
    await renderAbout(i);
    await renderDescription(i);
    await renderBaseValue();
    await loadShiny()
    await loadEvolution(i);
}

function renderAbout(i) {

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

function renderDescription(i){
    let descriptionSection = document.getElementById('descriptionSection');
    let description = currentSpecies['genera'][7]['genus'];
    descriptionSection.innerHTML = `<h4>${description}</h4>`;
}

function loadAbilities(i) {
    let firstAbilities = document.getElementById('firstAbilitiesDetails' + i)
    for (let j = 0; j < currentAbout['abilities'].length; j++) {
        let ability = currentAbout['abilities'][j]['ability']['name'];
        firstAbilities.innerHTML += `<p class="information">${ability}</p>`
    }
}

/*
#################################################################################
Load stats and render the current base value
#################################################################################
*/

function renderBaseValue() {
    let baseValueSection = document.getElementById('baseValueSection');
    baseValueSection.innerHTML = ``;
    loadBaseValue(baseValueSection)
}

function loadBaseValue(baseValueSection) {
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
    ;
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


function loadShiny() {
    let shinySection = document.getElementById('shinySection');
    let shinyImg = currentAbout['sprites']['other']['home']['front_shiny']
    shinySection.innerHTML = `<img style="height: 220px" src="${shinyImg}" class="shinyPokemon">`;
}

/*
#################################################################################
Load stats and render the current base value
#################################################################################
*/

async function showLast(i) {
    if (!loadFullscreen) {
        loadFullscreen = true;
        if (i == -1) {
            await fetchApi(897)
        } else {
            await fetchApi(i)
        }
    }
}

async function showNext(i) {
    if (!loadFullscreen) {
        loadFullscreen = true;
        if (i == 898) {
            await fetchApi(0)
        } else {
            await fetchApi(i)
        }
    }

}