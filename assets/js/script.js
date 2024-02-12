// The number 151 was chosen as thats the amount of unique pokemon that are found in generation 1
const pokemonCount = 151;
var correctPokemon

document.addEventListener("DOMContentLoaded", async function(){
    var buttons = document.getElementsByTagName("button");

    for(let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit"){
                checkAnswer();
            } else {
                let difficulty = this.getAttribute("data-type")
                runGame(difficulty);
            }
        })
    }

    runGame("easy");
})

async function runGame(difficulty){
    let pokemonId = Math.floor((Math.random() * pokemonCount) + 1);
    correctPokemon = await getPokemon(pokemonId);

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

    displayPokemon();
}

async function getPokemon(pokemonId){
    let pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId.toString();
    
    let res = await fetch(pokeApiUrl);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["other"]["official-artwork"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    pokemonDesc = pokemonDesc["flavor_text_entries"][11]["flavor_text"];

    return {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc}
}

function displayPokemon(){
    document.getElementById("pokemon-image").src = correctPokemon["img"]
}

function displayEasyDifficulty(){

}

function displayMediumDifficulty(){
    
}

function displayHardDifficulty(){
    
}

function checkAnswer(){
    let userAnswer = document.getElementById('answer-box').value;
    let pokemonNameAnswer = correctPokemon['name'];

    console.log(userAnswer)
    console.log(pokemonNameAnswer)

    if (userAnswer == pokemonNameAnswer){
        alert(`Correct Answer`);
    } else {
        alert('Incorrect answer')
    }
}

