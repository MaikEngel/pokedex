function baby() {
    return currentEvolution['chain']['is_baby'] == true;
}

function noEvolution() {
    return currentEvolution['chain']['evolves_to'][0] == undefined;
}

function firstEvolutionByLevelUp() {
    return currentEvolution['chain']['evolves_to'][0]['evolution_details'][0]['trigger']['name'] == 'level-up';
}

function secondEvolutionByLevelUp() {
    return currentEvolution['chain']['evolves_to'][0]['evolves_to'][0]['evolution_details'][0]['trigger']['name'] == 'level-up';
}

function firstEvolutionByItem() {
    return currentEvolution['chain']['evolves_to'][0]['evolution_details'][0]['trigger']['name'] == 'use-item';
}

function secondEvolutionByItem() {
    return currentEvolution['chain']['evolves_to'][0]['evolves_to'][0]['evolution_details'][0]['trigger']['name'] == 'use-item';
}

function firstEvolutionByTrade() {
    return currentEvolution['chain']['evolves_to'][0]['evolution_details'][0]['trigger']['name'] == 'trade';
}

function secondEvolutionByTrade() {
    return currentEvolution['chain']['evolves_to'][0]['evolves_to'][0]['evolution_details'][0]['trigger']['name'] == 'trade';
}

function moreEvolutions() {
    return currentEvolution['chain']['evolves_to'].length > 1;
}

function firstEvolutionLenght() {
    return currentEvolution['chain']['evolves_to'].length
}

/*
#################################################################################
Evolution
#################################################################################
*/

function babyPokemon(i) {
    if (baby()) {
        if (firstEvolutionByLevelUp) {
            basePokemon()
        }
    } else {
        basePokemon(i)
    }
}

function basePokemon(i) {
    if (noEvolution()) {
        let detailsRightSide = document.getElementById('detailsRightSide');
        let pokemonImg = allPokemonData[i]['sprites']['other']['home']['front_default']
        detailsRightSide.innerHTML = `<img style="height: 200px;"src="${pokemonImg}">`;
    } else {
        if (firstEvolutionByLevelUp()) {
            oneEvolution()

            firstEvolution()
        } if (firstEvolutionByItem()) {
            oneEvolution()
            firstEvolution()
        } if (firstEvolutionByTrade()) {
            oneEvolution()
            firstEvolution()
        } if (moreEvolutions()) {
            moreFirstEvolution()
        }
    }
}

async function firstEvolution() {
    if (currentEvolution['chain']['evolves_to'][0]['evolves_to'][0] == undefined) {

    } else {
        if (secondEvolutionByLevelUp()) {
            twoEvolution() 
        } if (secondEvolutionByItem()) {
            twoEvolution() 
        } if (secondEvolutionByTrade()) {
            twoEvolution() 
        }
    }
}

async function loadEvolution(i) {

    speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`
    responseSpecies = await fetch(speciesUrl);
    currentSpecies = await responseSpecies.json();
    evolutionUrl = currentSpecies['evolution_chain']['url'];
    responseEvolution = await fetch(evolutionUrl);
    currentEvolution = await responseEvolution.json();
    let detailsRightSide = document.getElementById('detailsRightSide');
    detailsRightSide.innerHTML = ``;
    babyPokemon(i)
}

async function oneEvolution() {
    pokemonFirstEvolution = currentEvolution['chain']['species']['name'];

    firstEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonFirstEvolution}/`
    firstEvolutionImg = firstEvolutionImgUrl

    pokemonSecondEvolution = currentEvolution['chain']['evolves_to'][0]['species']['name'];

    secondEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonSecondEvolution}/`
    secondEvolutionImg = secondEvolutionImgUrl

    responseFirstEvolution = await fetch(firstEvolutionImg);
    currentFirstEvolution = await responseFirstEvolution.json();
    let evolutionFirstImg = currentFirstEvolution['sprites']['other']['home']['front_default'];

    responseSecondEvolution = await fetch(secondEvolutionImg);
    currentSecondEvolution = await responseSecondEvolution.json();
    let evolutionSecondImg = currentSecondEvolution['sprites']['other']['home']['front_default'];

    let detailsRightSide = document.getElementById('detailsRightSide');
    detailsRightSide.innerHTML = `
                <div id="firstEvolutionTrigger"></div>
                <div id="secondEvolutionTrigger"></div>
                <img class="firstEvolutionImg" src="${evolutionFirstImg}">
                <img src="img/aarrow.png" class="evolutionFirstArrow0">
                <img class="secondEvolutionImg0" src="${evolutionSecondImg}">
                `
    return;
}

async function twoEvolution() {
    pokemonFirstEvolution = currentEvolution['chain']['species']['name'];
    pokemonSecondEvolution = currentEvolution['chain']['evolves_to'][0]['species']['name'];
    pokemonThirdEvolution = currentEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];

    firstEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonFirstEvolution}/`
    firstEvolutionImg = firstEvolutionImgUrl

    secondEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonSecondEvolution}/`
    secondEvolutionImg = secondEvolutionImgUrl

    thirdEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonThirdEvolution}/`
    thirdEvolutionImg = thirdEvolutionImgUrl

    responseFirstEvolution = await fetch(firstEvolutionImg);
    currentFirstEvolution = await responseFirstEvolution.json();
    let evolutionFirstImg = currentFirstEvolution['sprites']['other']['home']['front_default'];

    responseSecondEvolution = await fetch(secondEvolutionImg);
    currentSecondEvolution = await responseSecondEvolution.json();
    let evolutionSecondImg = currentSecondEvolution['sprites']['other']['home']['front_default'];

    responseThirdEvolution = await fetch(thirdEvolutionImg);
    currentThirdEvolution = await responseThirdEvolution.json();
    let evolutionThirdImg = currentThirdEvolution['sprites']['other']['home']['front_default'];

    let detailsRightSide = document.getElementById('detailsRightSide');
    detailsRightSide.innerHTML = `
        <div id="firstEvolutionTrigger"></div>
        <div id="secondEvolutionTrigger"></div>
        <img class="firstEvolutionImg" src="${evolutionFirstImg}">
        <img src="img/aarrow.png" class="evolutionFirstArrow0">
        <img class="secondEvolutionImg0" src="${evolutionSecondImg}">
        <img src="img/aarrow.png" class="secondEvolutionArrow0">
        <img class="thirdEvolutionImg" src="${evolutionThirdImg}">
    `
    return;
}


async function moreFirstEvolution() {
    pokemonFirstEvolution = currentEvolution['chain']['species']['name'];
    firstEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonFirstEvolution}/`
    firstEvolutionImg = firstEvolutionImgUrl
    responseFirstEvolution = await fetch(firstEvolutionImg);
    currentFirstEvolution = await responseFirstEvolution.json();
    let evolutionFirstImg = currentFirstEvolution['sprites']['other']['home']['front_default'];
   
    let detailsRightSide = document.getElementById('detailsRightSide');
    detailsRightSide.innerHTML = `
    <div id="firstEvolutionTrigger"></div>
    <div id="secondEvolutionTrigger"></div>
    <img class="firstEvolutionImg" src="${evolutionFirstImg}">`

    for (let i = 0; i < firstEvolutionLenght(); i++) {
        pokemonSecondEvolution = currentEvolution['chain']['evolves_to'][i]['species']['name'];
        secondEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonSecondEvolution}/`
        secondEvolutionImg = secondEvolutionImgUrl
        responseSecondEvolution = await fetch(secondEvolutionImg);
        currentSecondEvolution = await responseSecondEvolution.json();
        let evolutionSecondImg = currentSecondEvolution['sprites']['other']['home']['front_default'];

        detailsRightSide.innerHTML += `
                    <img src="img/aarrow.png" class="evolutionFirstArrow${i}">
                    <img class="secondEvolutionImg${i}" src="${evolutionSecondImg}">
                    `

    }

    return;
}
