// The number 151 was chosen as thats the amount of unique pokemon that are found in generation 1
const pokemonCount = 151;
// Stores the information for the current pokemon that is being guessed
var correctPokemon;

document.addEventListener("DOMContentLoaded", async function(){
    //Gets all the buttons elements on the page
    var buttons = document.getElementsByTagName("button");

    //Assigns Event Listeners for each button with a different action for each data-type
    for(let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit"){
                checkTextAnswer();
            } else if(this.getAttribute("data-type") === "multiple-choice-submit"){
                //checks the answer using innerText of the multiple choice button selected
                let choice = this.innerText.toLowerCase();
                checkMultipleChoiceAnswer(choice);
            } else {
                //Sets the difficulty of the current game by getting the data-type from the button clicked
                let difficulty = this.getAttribute("data-type");
                runGame(difficulty);
            }
        });
    }

    //Used to start the first game
    runGame("easy");
});


async function runGame(difficulty){
    toggleAnswerType(difficulty, document.getElementById("text-guess-container"), document.getElementById("multiple-choice-container"));

    let pokemonId = Math.floor((Math.random() * pokemonCount) + 1);
    correctPokemon = await getPokemon(pokemonId, difficulty);

    if (difficulty === "easy" || difficulty === "medium" || difficulty === "hard"){
        displayPokemon(difficulty);
    } else {
        alert(`Unknown game type: ${difficulty}`);
        throw `Unknown game type: ${difficulty}. Aborting!`;
    }
}

async function getPokemon(pokemonId, difficulty){
    let pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId.toString();
    
    let res = await fetch(pokeApiUrl);
    let pokemon = await res.json();

    let pokemonName = pokemon.name;
    let pokemonType = pokemon.types;
    let pokemonImg = pokemon["sprites"]["other"]["official-artwork"]["front_default"];

    res = await fetch(pokemon.species.url);
    let pokemonDesc = await res.json();

    pokemonDesc = pokemonDesc["flavor_text_entries"][11]["flavor_text"];

    return {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc, "diff" : difficulty}
}

function displayPokemon(difficulty){
    //Gets all of the relevant elements that needs to be updated 
    const pokemonImage = document.getElementById("pokemon-image");
    const typesDiv = document.getElementById('pokemon-types');
    const pokemonDescription = document.getElementById("pokemon-description");

    //Adds the silhouette to the Pokemon image
    toggleSilhouette(pokemonImage, true);

    //Updates the image of the pokemon with the correct pokemon
    pokemonImage.src = correctPokemon.img;
    
    if (difficulty === "medium" || difficulty === "easy"){
        //Removes previous types this is due to the fact that not all pokemon have two types 
        while (typesDiv.firstChild) {
            typesDiv.firstChild.remove();
        }

        toggleHidden(typesDiv, false)

        //Creates new span for every type available and adds the correct type class names which corresponds to the css styling 
        let types = correctPokemon.types;
        for (let i = 0; i < types.length; i++){
            let type = document.createElement("span");
            type.innerText = types[i].type.name.toUpperCase();
            type.classList.add("type-box");
            type.classList.add(types[i].type.name);
            typesDiv.append(type)
        }

        if (difficulty === "easy"){

            //Populates the correct Pokemon name along with 3 other 'fake' ones on the multiple choice buttons
            populateMultipleChoice(correctPokemon.name)

            //removes Hidden to Pokemon Description
            toggleHidden(pokemonDescription, false)

            //Update Pokemon Description and checks if the name of the pokemon is included and replaces it 
            if (correctPokemon.desc.includes(correctPokemon.name.toUpperCase())){
                pokemonDescription.innerHTML = correctPokemon.desc.replace(correctPokemon.name.toUpperCase(), "???")
            } else {
                pokemonDescription.innerHTML = correctPokemon.desc;
            }
        } else {
            toggleHidden(pokemonDescription, true)
        }
    } else {
        toggleHidden(typesDiv, true);
    }
}

async function populateMultipleChoice(correctPokemonName){
    let multipleChoiceButtons = document.getElementsByClassName('multiple-choice');
    let pokemonNames = [];

    pokemonNames[0] = correctPokemonName;
    for (let i = 1; i < multipleChoiceButtons.length; i++){
        let pokemonId = Math.floor((Math.random() * pokemonCount) + 1);
        let pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId.toString();

        let res = await fetch(pokeApiUrl);
        let pokemon = await res.json();

        pokemonNames[i] = pokemon.name;
    }

    let shuffledPokemonNames = shuffleArray(pokemonNames);

    for (let i = 0; i < multipleChoiceButtons.length; i++){
        multipleChoiceButtons[i].innerText = shuffledPokemonNames[i].toUpperCase();
    }
}

function checkTextAnswer(){
    //Gets the use input and correct name of the pokemon
    let userAnswer = document.getElementById('answer-box').value.toLowerCase();

    console.log(userAnswer)

    toggleSilhouette(document.getElementById('pokemon-image'), false);

    //Checks if the answer is correct
    differentiateAnswer(userAnswer)

    setTimeout(() => {runGame(correctPokemon.diff); }, 2000);
}

function checkMultipleChoiceAnswer(userAnswer){

    toggleSilhouette(document.getElementById('pokemon-image'), false);

    //Checks if the answer is correct
    differentiateAnswer(userAnswer)

    setTimeout(() => {runGame(correctPokemon.diff); }, 2000);
}

function differentiateAnswer(userAnswer){
    let pokemonNameAnswer = correctPokemon.name;

    console.log(pokemonNameAnswer)

    if (userAnswer === pokemonNameAnswer){
        alert(`Correct Answer`);
        incrementCorrectAnswer();
    } else {
        alert('Incorrect answer');
        incrementWrongAnswer();
    }
}

function incrementCorrectAnswer(){
    let score = parseInt(document.getElementById('score').innerText);
    let streak = parseInt(document.getElementById('current-streak').innerText);

    document.getElementById('score').innerText = ++score;
    document.getElementById('current-streak').innerText = ++streak;

    setHighestStreak(streak);
}

function incrementWrongAnswer(){
    let incorrect = parseInt(document.getElementById(`incorrect`).innerText);

    document.getElementById(`incorrect`).innerText = ++incorrect;
    document.getElementById('current-streak').innerText = 0;
}

function setHighestStreak(currentStreak){
    let highestStreak = parseInt(document.getElementById('highest-streak').innerText);

    if (currentStreak > highestStreak){
        document.getElementById('highest-streak').innerText = currentStreak;
    }
}

function toggleAnswerType(difficulty, textElement, multipleElement) {
    if (difficulty === 'easy') {
        toggleHidden(textElement, true)
        toggleHidden(multipleElement, false)
    } else {
        toggleHidden(textElement, false)
        toggleHidden(multipleElement, true)
    }
}

function toggleHidden(element, shouldBeHidden) {
    if (shouldBeHidden) {
        element.classList.add("hidden");
    } else {
        element.classList.remove("hidden");
    }
}

function toggleSilhouette(element, shouldBeSilhouette){
    if (shouldBeSilhouette) {
        element.classList.add("silhouette");
    } else {
        element.classList.remove("silhouette");
    }
}

//implemented the fisher-yates shuffle to shuffle an array for the Pokemon names within the buttons 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}
