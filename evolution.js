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
Loaded the evolutionsection and fetch the evolutionchain api
#################################################################################
*/

async function loadEvolution(i) {
        loadFullscreen = true;
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

/*
#################################################################################
Render the evolutionsection 
#################################################################################
*/

function renderEvolutionSection() {
    let evolutionSection = document.getElementById('evolutionSection');
    evolutionSection.innerHTML = `
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="pokemonOne"></div>
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="firstEvolutionTrigger"></div>
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="pokemonTwo" class="evolutionImg"></div>
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="secondEvolutionTrigger"></div>
    <div class="displayFlexJustifyContent" style="flex-direction: column;" id="pokemonThree" class="evolutionImg"></div>
    `
    showFirstEvolution()
}

/*
#################################################################################
Request how much evolutions and render the evolution 
#################################################################################
*/

async function showFirstEvolution() {
    let pokemonFirstEvolution = currentEvolution['chain']['species']['name'];
    let firstEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonFirstEvolution}/`
    let firstEvolutionImg = firstEvolutionImgUrl
    let responseFirstEvolution = await fetch(firstEvolutionImg);
    let currentFirstEvolution = await responseFirstEvolution.json();
    let evolutionFirstImg = currentFirstEvolution['sprites']['other']['home']['front_default'];
    let pokemonOne = document.getElementById('pokemonOne');
    pokemonOne.innerHTML = `
    <img class="evolutionImg" src="${evolutionFirstImg}">
    `
    await showSecondEvolution()
}


async function showSecondEvolution() {
    if (!noEvolution()) {
        for (let i = 0; i < firstEvolutionLenght(); i++) {
            let pokemonSecondEvolution = currentEvolution['chain']['evolves_to'][i]['species']['name'];
            let secondEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonSecondEvolution}/`
            let secondEvolutionImg = secondEvolutionImgUrl
            let responseSecondEvolution = await fetch(secondEvolutionImg);
            let currentSecondEvolution = await responseSecondEvolution.json();
            let evolutionSecondImg = currentSecondEvolution['sprites']['other']['home']['front_default'];
            let firstEvolutionTrigger = document.getElementById('firstEvolutionTrigger');
            let pokemonTwo = document.getElementById('pokemonTwo');
            firstEvolutionTrigger.innerHTML += `
                <img src="img/aarrow.png" class="evolutionArrow" >
                    `
            pokemonTwo.innerHTML += `
                <img class="evolutionImg" src="${evolutionSecondImg}">
        `;
        await showThirdEvolution()
        loadFullscreen = false;
        }
    }else{
        loadFullscreen = false;
    }
}


async function showThirdEvolution() {
    if (!noSecondEvolution()) {
        for (let j = 0; j < secondEvolutionLenght(); j++) {
            let pokemonThirdEvolution = currentEvolution['chain']['evolves_to'][0]['evolves_to'][j]['species']['name'];
            let thirdEvolutionImgUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonThirdEvolution}/`
            let thirdEvolutionImg = thirdEvolutionImgUrl
            let responseThirdEvolution = await fetch(thirdEvolutionImg);
            let currentThirdEvolution = await responseThirdEvolution.json();
            let evolutionThirdImg = currentThirdEvolution['sprites']['other']['home']['front_default'];
            let secondEvolutionTrigger = document.getElementById('secondEvolutionTrigger');
            let pokemonThree = document.getElementById('pokemonThree');
            secondEvolutionTrigger.innerHTML += `
                <img src="img/aarrow.png" class="evolutionArrow" >
                    `
            pokemonThree.innerHTML += `
                <img class="evolutionImg" src="${evolutionThirdImg}">
        `
        loadFullscreen = false;;
        }
    }else{
        loadFullscreen = false;
    }
}


// function babyPokemon(i) {
//     if (baby()) {
//         if (moreEvolutions()) {
//             moreFirstEvolution()
//         }
//         if (firstEvolutionByLevelUp && !moreEvolutions()) {
//             basePokemon()
//         }
//     } else {
//         basePokemon(i)
//     }
// }

// function basePokemon(i) {
//     if (noEvolution()) {
//         let evolutionSection = document.getElementById('evolutionSection');

//         let pokemonImg = allPokemonData[i]['sprites']['other']['home']['front_default']
//         evolutionSection.innerHTML = `<img style="height: 80px;"src="${pokemonImg}">`;
//     } else {
//         if (firstEvolutionByLevelUp() && !moreEvolutions()) {
//             oneEvolution()

//             firstEvolution()
//         } if (firstEvolutionByItem() && !moreEvolutions()) {
//             oneEvolution()
//             firstEvolution()
//         } if (firstEvolutionByTrade() && !moreEvolutions()) {
//             oneEvolution()
//             firstEvolution()
//         } if (moreEvolutions()) {
//             moreFirstEvolution()
//         }
//     }
// }

// async function firstEvolution() {
//     if (currentEvolution['chain']['evolves_to'][0]['evolves_to'][0] == undefined) {

//     } else {
//         if (moreEvolutionsTwo()) {
//             moreSecondEvolution()
//         }
//         if (secondEvolutionByLevelUp() && !moreEvolutionsTwo()) {
//             twoEvolution()
//         } if (secondEvolutionByItem() && !moreEvolutionsTwo()) {
//             twoEvolution()
//         } if (secondEvolutionByTrade() && !moreEvolutionsTwo()) {
//             twoEvolution()
//         }
//     }
// }


