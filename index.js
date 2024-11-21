/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

import GAMES_DATA from "./games.js";

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
    <img src="${games[i].img}" alt="Game Image" class="game-img"/>
    <h3>${games[i].name}</h3>
    <p>${games[i].description}</p>
    <p>Backers: ${games[i].backers}</p>
    `;

    gamesContainer.appendChild(gameCard);
  }
}

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);
let englishNumBackers = totalContributions.toLocaleString("en-US");

contributionsCard.innerHTML = `
<h3>${englishNumBackers}</h3>
`;

const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);
let englishNumPleged = totalRaised.toLocaleString("en-US");

raisedCard.innerHTML = `
  <h3>$${englishNumPleged}</h3>
  `;

const gamesCard = document.getElementById("num-games");

const gamesFound = GAMES_JSON.reduce((acc, game) => {
  return acc + 1;
}, 0);
let englishNumGames = gamesFound.toLocaleString("en-US");

gamesCard.innerHTML = `
    <h3>${englishNumGames}</h3>
    `;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  let goalNotMet = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });

  addGamesToPage(goalNotMet);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  let goalMet = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });

  addGamesToPage(goalMet);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", function () {
  filterUnfundedOnly();
});

fundedBtn.addEventListener("click", function () {
  filterFundedOnly();
});

allBtn.addEventListener("click", function () {
  showAllGames();
});
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

const descriptionContainer = document.getElementById("description-container");

let numberOfUnfundedGames = GAMES_JSON.reduce((acc, game) => {
  return acc + (game.pledged < game.goal ? 1 : 0);
}, 0);

const fundingDisplay = `A total of $${englishNumPleged} has been raised for ${englishNumGames} games. Currently, ${numberOfUnfundedGames} game remains unfunded. We need your help to fund these amazing games!`;

const paragraph = document.createElement("p");
paragraph.textContent = fundingDisplay;
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const [first, second, ...others] = sortedGames;
const topFunded = document.createElement("h3");
topFunded.textContent = `${first.name}`;
firstGameContainer.appendChild(topFunded);

const secondTopFunded = document.createElement("h3");
secondTopFunded.textContent = `${second.name}`;
secondGameContainer.appendChild(secondTopFunded);
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
