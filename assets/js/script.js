// The number 151 was chosen as thats the amount of unique pokemon that are found in generation 1
const pokemonCount = 151;

document.addEventListener("DOMContentLoaded", async function(){
    var buttons = document.getElementsByTagName("button");

    for(let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit"){
                // checkAnswer();
            } else {
                let difficulty = this.getAttribute("data-type")
                runGame(difficulty);
            }
        })
    }

    runGame("easy");
})

function runGame(difficulty){
    let pokemonId = Math.floor((Math.random() * 151) + 1);
    getPokemon(pokemonId);

    if (difficulty === "easy"){
        displayEasyDifficulty()
    } else if(difficulty === "medium"){
        displayMediumDifficulty()
    } else if(difficulty === "hard"){
        displayHardDifficulty()
    } else{
        alert(`Unknown difficulty: ${difficulty}.`);
        throw `Unknown difficulty: ${difficulty}.`;
    }
}

async function getPokemon(pokemonId){
    let pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId.toString();
    
    let res = await fetch(pokeApiUrl);
    let pokemon = await res.json();
    console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["other"]["official-artwork"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    pokemonDesc = pokemonDesc["flavor_text_entries"][11]["flavor_text"];
}

function displayEasyDifficulty(){

}

function displayMediumDifficulty(){
    
}

function displayHardDifficulty(){
    
}