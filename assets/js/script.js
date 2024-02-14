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

    //Clears the Text box f the previous answer
    document.getElementById("answer-box").value = "";

    //Generates a random number and 
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
    //initializes the pokeapi url with the pokemon ID that is randomly generated 
    let pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId.toString();
    
    //Receives teh information from PokeAPI and represents it as a JSON
    let res = await fetch(pokeApiUrl);
    let pokemon = await res.json();

    //Gets the pokemon Name, types and image from the JSON
    let pokemonName = pokemon.name;
    let pokemonType = pokemon.types;
    let pokemonImg = pokemon["sprites"]["other"]["official-artwork"]["front_default"];

    //Receives the extended pokemon information and represents it as a JSON
    res = await fetch(pokemon.species.url);
    let pokemonDesc = await res.json();

    //Gets the pokemon description from the JSON
    pokemonDesc = pokemonDesc["flavor_text_entries"][11]["flavor_text"];

    //Returns all information gathered as an object
    return {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc, "diff" : difficulty};
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
            typesDiv.append(type);
        }

        if (difficulty === "easy"){

            //Populates the correct Pokemon name along with 3 other 'fake' ones on the multiple choice buttons
            populateMultipleChoice(correctPokemon.name);

            //removes Hidden to Pokemon Description
            toggleHidden(pokemonDescription, false);

            //Update Pokemon Description and checks if the name of the pokemon is included and replaces it 
            if (correctPokemon.desc.includes(correctPokemon.name.toUpperCase())){
                pokemonDescription.innerHTML = correctPokemon.desc.replace(correctPokemon.name.toUpperCase(), "???");
            } else {
                pokemonDescription.innerHTML = correctPokemon.desc;
            }
        } else {
            //Hides the pokemon description for Medium mode
            toggleHidden(pokemonDescription, true);
        }
    } else {
        //Hides both the pokemon Description and types for Hard mode
        toggleHidden(typesDiv, true);
        toggleHidden(pokemonDescription, true);
    }
}

async function populateMultipleChoice(correctPokemonName){
    //initializes the multiple choice buttons and a pokemon names array 
    let multipleChoiceButtons = document.getElementsByClassName('multiple-choice');
    let pokemonNames = [];

    //sets the correct answer in the array 
    pokemonNames[0] = correctPokemonName;

    //loops through 3 of the multiple choice buttons and enters a randomly generated pokemon name into the array
    for (let i = 1; i < multipleChoiceButtons.length; i++){
        let pokemonId = Math.floor((Math.random() * pokemonCount) + 1);
        let pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId.toString();

        let res = await fetch(pokeApiUrl);
        let pokemon = await res.json();

        pokemonNames[i] = pokemon.name;
    }

    //shuffles the array of pokemon names so that the correct answer isn't always in the same space 
    let shuffledPokemonNames = shuffleArray(pokemonNames);

    //sets the names generated in the buttons
    for (let i = 0; i < multipleChoiceButtons.length; i++){
        multipleChoiceButtons[i].innerText = shuffledPokemonNames[i].toUpperCase();
    }
}

function checkTextAnswer(){
    //Gets the use input and correct name of the pokemon
    let userAnswer = document.getElementById('answer-box').value.toLowerCase();

    //removes the silhouette from the pokemon image
    toggleSilhouette(document.getElementById('pokemon-image'), false);

    //Checks if the answer is correct
    differentiateAnswer(userAnswer);

    //lets the Program wait for 2 seconds to let the user see the pokemon without a silhouette before starting the next game
    setTimeout(() => {runGame(correctPokemon.diff); }, 2000);
}

function checkMultipleChoiceAnswer(userAnswer){

    //removes the silhouette from the pokemon image
    toggleSilhouette(document.getElementById('pokemon-image'), false);

    //Checks if the answer is correct
    differentiateAnswer(userAnswer);

    //lets the Program wait for 2 seconds to let the user see the pokemon without a silhouette before starting the next game
    setTimeout(() => {runGame(correctPokemon.diff); }, 2000);
}

function differentiateAnswer(userAnswer){
    //Gets the correct Answer
    let pokemonNameAnswer = correctPokemon.name;

    //Checks if the correct Pokemon name is the same as the pokemon Name 
    if (userAnswer === pokemonNameAnswer){
        alert(`Correct Answer`);
        incrementCorrectAnswer();
    } else {
        alert('Incorrect answer');
        incrementWrongAnswer();
    }
}

function incrementCorrectAnswer(){
    //Gets the current score and streak
    let score = parseInt(document.getElementById('score').innerText);
    let streak = parseInt(document.getElementById('current-streak').innerText);

    //Increments the score and streak by 1
    document.getElementById('score').innerText = ++score;
    document.getElementById('current-streak').innerText = ++streak;

    //checks if the current streak is bigger than the highest streak and sets it 
    setHighestStreak(streak);
}

function incrementWrongAnswer(){
    //Gets the current incorrect answer count 
    let incorrect = parseInt(document.getElementById(`incorrect`).innerText);

    //increments the incorrect answer count by one
    document.getElementById(`incorrect`).innerText = ++incorrect;

    //Sets the current streak back to 0
    document.getElementById('current-streak').innerText = 0;
}

function setHighestStreak(currentStreak){
    //Gets the current highest streak 
    let highestStreak = parseInt(document.getElementById('highest-streak').innerText);

    //Checks if the current streak is bigger than the highest streak and sets it if true
    if (currentStreak > highestStreak){
        document.getElementById('highest-streak').innerText = currentStreak;
    }
}

function toggleAnswerType(difficulty, textElement, multipleElement) {
    //Sets the answer type based on the difficulty selected
    if (difficulty === 'easy') {
        //multiple choice answering shown if it's on easy mode
        toggleHidden(textElement, true);
        toggleHidden(multipleElement, false);
    } else {
        //text answering shown if it's on easy mode
        toggleHidden(textElement, false);
        toggleHidden(multipleElement, true);
    }
}

function toggleHidden(element, shouldBeHidden) {
    if (shouldBeHidden) {
        //hides the element if true 
        element.classList.add("hidden");
    } else {
        //displays the element if true
        element.classList.remove("hidden");
    }
}

function toggleSilhouette(element, shouldBeSilhouette){
    if (shouldBeSilhouette) {
        //hides the pokemon image if true
        element.classList.add("silhouette");
    } else {
        //displays the Pokemon image if false 
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
