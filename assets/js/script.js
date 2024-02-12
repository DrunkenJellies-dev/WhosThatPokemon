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
                let difficulty = this.getAttribute("data-type");
                runGame(difficulty);
            }
        })
    }

    runGame("easy");
})

async function runGame(difficulty){
    let pokemonId = Math.floor((Math.random() * pokemonCount) + 1);
    correctPokemon = await getPokemon(pokemonId);

    if (difficulty === "easy" || difficulty === "medium" || difficulty === "hard"){
        displayPokemon(difficulty);
    } else {
        alert(`Unknown game type: ${difficulty}`);
        throw `Unknown game type: ${difficulty}. Aborting!`;
    }

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

function displayPokemon(difficulty){
    //Updates the image of the pokemon with the correct pokemon
    document.getElementById("pokemon-image").src = correctPokemon["img"];

    //Removes previous types this is due to the fact that not all pokemon have two types 
    let typesDiv = document.getElementById('pokemon-types');
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //Adds the correct class type to correspond with css styling
    let types = correctPokemon["types"];
    for (let i = 0; i < types.length; i++){
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        typesDiv.append(type)
    }
    
    //Update Pokemon Description
    document.getElementById("pokemon-description").innerHTML = correctPokemon["desc"];
}

function checkAnswer(){
    //Gets the use input and correct name of the pokemon
    let userAnswer = document.getElementById('answer-box').value;
    let pokemonNameAnswer = correctPokemon['name'];

    console.log(userAnswer)
    console.log(pokemonNameAnswer)

    //Checks if the answer is correct
    if (userAnswer === pokemonNameAnswer){
        alert(`Correct Answer`);
    } else {
        alert('Incorrect answer')
    }
}

function checkSimilarity(){

}

