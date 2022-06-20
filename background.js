function loadDetailBackground(i) {
    let detailsBackgroundColor = document.getElementById('detailsBackgroundColor' + i)
    let firstType = allPokemonData[i]['types'][0]['type']['name'];
    if (firstType == 'normal') {
        detailsBackgroundColor.classList.add('pokemonBackgroundNormalView')
    }
    if (firstType == 'fighting') {
        detailsBackgroundColor.classList.add('pokemonBackgroundFightView')
    }
    if (firstType == 'flying') {
        detailsBackgroundColor.classList.add('pokemonBackgroundFlyingView')
    }
    if (firstType == 'poison') {
        detailsBackgroundColor.classList.add('pokemonBackgroundPoisonView')
    }
    if (firstType == 'ground') {
        detailsBackgroundColor.classList.add('pokemonBackgroundGroundView')
    }
    if (firstType == 'rock') {
        detailsBackgroundColor.classList.add('pokemonBackgroundRockView')
    }
    if (firstType == 'bug') {
        detailsBackgroundColor.classList.add('pokemonBackgroundBugView')
    }
    if (firstType == 'ghost') {
        detailsBackgroundColor.classList.add('pokemonBackgroundGhostView')
    }
    if (firstType == 'steel') {
        detailsBackgroundColor.classList.add('pokemonBackgroundSteelView')
    }
    if (firstType == 'fire') {
        detailsBackgroundColor.classList.add('pokemonBackgroundFireView')
    }
    if (firstType == 'water') {
        detailsBackgroundColor.classList.add('pokemonBackgroundWaterView')
    }
    if (firstType == 'grass') {
        detailsBackgroundColor.classList.add('pokemonBackgroundGrassView')
    }
    if (firstType == 'electric') {
        detailsBackgroundColor.classList.add('pokemonBackgroundElectricView')
    }
    if (firstType == 'psychic') {
        detailsBackgroundColor.classList.add('pokemonBackgroundPsychicView')
    }
    if (firstType == 'ice') {
        detailsBackgroundColor.classList.add('pokemonBackgroundIceView')
    }
    if (firstType == 'dragon') {
        detailsBackgroundColor.classList.add('pokemonBackgroundDragonView')
    }
    if (firstType == 'dark') {
        detailsBackgroundColor.classList.add('pokemonBackgroundDarkView')
    }
    if (firstType == 'fairy') {
        detailsBackgroundColor.classList.add('pokemonBackgroundFairyView')
    }
    return;
};


function renderFullscreenBackground(i) {
    let detailsBackgroundColor = document.getElementById('pokemonDetails' + i)
    let firstType = allPokemonData[i]['types'][0]['type']['name'];

    if (firstType == 'normal') {
        detailsBackgroundColor.classList.add('pokemonBackgroundNormalDetails')
    }
    if (firstType == 'fighting') {
        detailsBackgroundColor.classList.add('pokemonBackgroundFightDetails')
    }
    if (firstType == 'flying') {
        detailsBackgroundColor.classList.add('pokemonBackgroundFlyingDetails')
    }
    if (firstType == 'poison') {
        detailsBackgroundColor.classList.add('pokemonBackgroundPoisonDetails')
    }
    if (firstType == 'ground') {
        detailsBackgroundColor.classList.add('pokemonBackgroundGroundDetails')
    }
    if (firstType == 'rock') {
        detailsBackgroundColor.classList.add('pokemonBackgroundRockDetails')
    }
    if (firstType == 'bug') {
        detailsBackgroundColor.classList.add('pokemonBackgroundBugDetails')
    }
    if (firstType == 'ghost') {
        detailsBackgroundColor.classList.add('pokemonBackgroundGhostDetails')
    }
    if (firstType == 'steel') {
        detailsBackgroundColor.classList.add('pokemonBackgroundSteelDetails')
    }
    if (firstType == 'fire') {
        detailsBackgroundColor.classList.add('pokemonBackgroundFireDetails')
    }
    if (firstType == 'water') {
        detailsBackgroundColor.classList.add('pokemonBackgroundWaterDetails')
    }
    if (firstType == 'grass') {
        detailsBackgroundColor.classList.add('pokemonBackgroundGrassDetails')
    }
    if (firstType == 'electric') {
        detailsBackgroundColor.classList.add('pokemonBackgroundElectricDetails')
    }
    if (firstType == 'psychic') {
        detailsBackgroundColor.classList.add('pokemonBackgroundPsychicDetails')
    }
    if (firstType == 'ice') {
        detailsBackgroundColor.classList.add('pokemonBackgroundIceDetails')
    }
    if (firstType == 'dragon') {
        detailsBackgroundColor.classList.add('pokemonBackgroundDragonDetails')
    }
    if (firstType == 'dark') {
        detailsBackgroundColor.classList.add('pokemonBackgroundDarkDetails')
    }
    if (firstType == 'fairy') {
        detailsBackgroundColor.classList.add('pokemonBackgroundFairyDetails')
    }
    return;
};

function loadPokemonBackground(i) {
    let backgroundColor = document.getElementById('background' + i);
    let firstType = allPokemonData[i]['types'][0]['type']['name'];
    if (firstType == 'normal') {
        backgroundColor.classList.add('pokemonBackgroundNormal')
    }
    if (firstType == 'fighting') {
        backgroundColor.classList.add('pokemonBackgroundFight')
    }
    if (firstType == 'flying') {
        backgroundColor.classList.add('pokemonBackgroundFlying')
    }
    if (firstType == 'poison') {
        backgroundColor.classList.add('pokemonBackgroundPoison')
    }
    if (firstType == 'ground') {
        backgroundColor.classList.add('pokemonBackgroundGround')
    }
    if (firstType == 'rock') {
        backgroundColor.classList.add('pokemonBackgroundRock')
    }
    if (firstType == 'bug') {
        backgroundColor.classList.add('pokemonBackgroundBug')
    }
    if (firstType == 'ghost') {
        backgroundColor.classList.add('pokemonBackgroundGhost')
    }
    if (firstType == 'steel') {
        backgroundColor.classList.add('pokemonBackgroundSteel')
    }
    if (firstType == 'fire') {
        backgroundColor.classList.add('pokemonBackgroundFire')
    }
    if (firstType == 'water') {
        backgroundColor.classList.add('pokemonBackgroundWater')
    }
    if (firstType == 'grass') {
        backgroundColor.classList.add('pokemonBackgroundGrass')
    }
    if (firstType == 'electric') {
        backgroundColor.classList.add('pokemonBackgroundElectric')
    }
    if (firstType == 'psychic') {
        backgroundColor.classList.add('pokemonBackgroundPsychic')
    }
    if (firstType == 'ice') {
        backgroundColor.classList.add('pokemonBackgroundIce')
    }
    if (firstType == 'dragon') {
        backgroundColor.classList.add('pokemonBackgroundDragon')
    }
    if (firstType == 'dark') {
        backgroundColor.classList.add('pokemonBackgroundDark')
    }
    if (firstType == 'fairy') {
        backgroundColor.classList.add('pokemonBackgroundFairy')
    }
    return;
}