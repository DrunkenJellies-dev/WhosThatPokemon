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
    console.log(difficulty);
    console.log(pokemonId);
    getPokemon(pokemonId);
}

async function getPokemon(pokemonId){
    let pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId.toString();
    
    let res = await fetch(pokeApiUrl);
    let pokemon = await res.json();

}