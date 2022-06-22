function baby() {
    return currentEvolution['chain']['is_baby'] == true;
}

function noEvolution() {
    return currentEvolution['chain']['evolves_to'][0] == undefined;
}

function noSecondEvolution() {
    currentEvolution['chain']['evolves_to'][0]['evolves_to'][0] == undefined;
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

function moreEvolutionsTwo() {
    return currentEvolution['chain']['evolves_to'][0]['evolves_to'];
}

function firstEvolutionLenght() {
    return currentEvolution['chain']['evolves_to'].length;
}

function secondEvolutionLenght() {
    return currentEvolution['chain']['evolves_to'][0]['evolves_to'].length;
}
/*
#################################################################################
Evolution
#################################################################################
*/


function renderEvolutionSection() {
    let evolutionSection = document.getElementById('evolutionSection');
    evolutionSection.innerHTML = `
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="pokemonOne"></div>
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="firstEvolutionTrigger"></div>
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="pokemonTwo" class="secondEvolutionImg"></div>
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="secondEvolutionTrigger"></div>
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="pokemonThree" class="secondEvolutionImg"></div>
    `
    showFirstEvolution()
}

async function showFirstEvolution() {
    pokemonFirstEvolution = currentEvolution['chain']['species']['name'];
    firstEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonFirstEvolution}/`
    firstEvolutionImg = firstEvolutionImgUrl
    responseFirstEvolution = await fetch(firstEvolutionImg);
    currentFirstEvolution = await responseFirstEvolution.json();
    let evolutionFirstImg = currentFirstEvolution['sprites']['other']['home']['front_default'];

    let pokemonOne = document.getElementById('pokemonOne');
    pokemonOne.innerHTML = `
    <img class="firstEvolutionImg" src="${evolutionFirstImg}">
    `
    await showSecondEvolution()

}

async function showSecondEvolution() {
    if (!noEvolution()) {
        for (let i = 0; i < firstEvolutionLenght(); i++) {
            pokemonSecondEvolution = currentEvolution['chain']['evolves_to'][i]['species']['name'];
            secondEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonSecondEvolution}/`
            secondEvolutionImg = secondEvolutionImgUrl
            responseSecondEvolution = await fetch(secondEvolutionImg);
            currentSecondEvolution = await responseSecondEvolution.json();
            let evolutionSecondImg = currentSecondEvolution['sprites']['other']['home']['front_default'];
            let firstEvolutionTrigger = document.getElementById('firstEvolutionTrigger');
            let pokemonTwo = document.getElementById('pokemonTwo');
            firstEvolutionTrigger.innerHTML += `
                <img src="img/aarrow.png" class="evolutionFirstArrow" >
                    `
            pokemonTwo.innerHTML += `
                <img style="height: 80px;" src="${evolutionSecondImg}">
        `;
        }
        await showThirdEvolution()
    }
}

async function showThirdEvolution() {
    if (!noSecondEvolution()) {
        for (let j = 0; j < secondEvolutionLenght(); j++) {
            pokemonThirdEvolution = currentEvolution['chain']['evolves_to'][0]['evolves_to'][j]['species']['name'];
            thirdEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonThirdEvolution}/`
            thirdEvolutionImg = thirdEvolutionImgUrl
            responseThirdEvolution = await fetch(thirdEvolutionImg);
            currentThirdEvolution = await responseThirdEvolution.json();
            let evolutionThirdImg = currentThirdEvolution['sprites']['other']['home']['front_default'];
            let secondEvolutionTrigger = document.getElementById('secondEvolutionTrigger');
            let pokemonThree = document.getElementById('pokemonThree');
            secondEvolutionTrigger.innerHTML += `
                <img src="img/aarrow.png" class="evolutionFirstArrow" >
                    `
            pokemonThree.innerHTML += `
                <img style="height: 80px;" src="${evolutionThirdImg}">
        `;
        }
    }
}

function babyPokemon(i) {
    if (baby()) {
        if (moreEvolutions()) {
            moreFirstEvolution()
        }
        if (firstEvolutionByLevelUp && !moreEvolutions()) {
            basePokemon()
        }
    } else {
        basePokemon(i)
    }
}

function basePokemon(i) {
    if (noEvolution()) {
        let evolutionSection = document.getElementById('evolutionSection');

        let pokemonImg = allPokemonData[i]['sprites']['other']['home']['front_default']
        evolutionSection.innerHTML = `<img style="height: 80px;"src="${pokemonImg}">`;
    } else {
        if (firstEvolutionByLevelUp() && !moreEvolutions()) {
            oneEvolution()

            firstEvolution()
        } if (firstEvolutionByItem() && !moreEvolutions()) {
            oneEvolution()
            firstEvolution()
        } if (firstEvolutionByTrade() && !moreEvolutions()) {
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
        if (moreEvolutionsTwo()) {
            moreSecondEvolution()
        }
        if (secondEvolutionByLevelUp() && !moreEvolutionsTwo()) {
            twoEvolution()
        } if (secondEvolutionByItem() && !moreEvolutionsTwo()) {
            twoEvolution()
        } if (secondEvolutionByTrade() && !moreEvolutionsTwo()) {
            twoEvolution()
        }
    }
}

async function loadEvolution(i) {

    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`
    let responseSpecies = await fetch(speciesUrl);
    let currentSpecies = await responseSpecies.json();
    let evolutionUrl = currentSpecies['evolution_chain']['url'];
    let responseEvolution = await fetch(evolutionUrl);
    currentEvolution = await responseEvolution.json();
    let evolutionSection = document.getElementById('evolutionSection');
    evolutionSection.innerHTML = ``;
    renderEvolutionSection(i)
}
