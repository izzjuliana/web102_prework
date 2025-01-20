/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        for(let x = 0; x < games.length; x++){
            const current_game = games[x];
            const card = document.createElement("div");
            card.classList.add("game-card");

            card.innerHTML = `<img class="game-img" src="${current_game.img}" />
            <h2>${current_game.name}</h2>
            <p>${current_game.description}</p>
            <p> Backers: ${current_game.backers}</p>
            `;

            gamesContainer.appendChild(card);


        }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
// set inner HTML using template literal

raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let totalGames = GAMES_JSON.length;

gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let missedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    console.log(missedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(missedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((game) =>{
        return game.pledged >= game.goal;
    });

    console.log(funded);
    addGamesToPage(funded);

    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal
}).length;

// create a string that explains the number of unfunded games using the ternary operator

let unfundedDisplayString = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. Currently, ${unfundedGames} game${unfundedGames > 1 ? "s remain" : " remains"} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
let unFundedElement = document.createElement("p");
unFundedElement.textContent = unfundedDisplayString;
unFundedElement.classList.add("description");
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame] = sortedGames;

console.log(firstGame);
console.log(secondGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGameElement = document.createElement("div");
firstGameElement.classList.add("game-card");
firstGameElement.innerHTML = `
<img class="game-img" src="${firstGame.img}"/>
<h2>${firstGame.name}</h2>
`;

firstGameContainer.appendChild(firstGameElement);

let secondGameElement = document.createElement("div");
secondGameElement.classList.add("game-card");
secondGameElement.innerHTML = `<img class="game-img" src="${secondGame.img}"/>
<h2>${secondGame.name}</h2>
`;

secondGameContainer.appendChild(secondGameElement);
// do the same for the runner up item