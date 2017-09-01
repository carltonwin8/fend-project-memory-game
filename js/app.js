/*
 * Create a list that holds all of your cards
 */

let cards = [
  'anchor', 'anchor',
  'bicycle', 'bicycle',
  'bolt', 'bolt',
  'bomb', 'bomb',
  'cube', 'cube',
  'diamond', 'diamond',
  'leaf', 'leaf',
  'paper-plane-o', 'paper-plane-o',
]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deckE = document.getElementsByClassName("deck");
const cardEs = document.getElementsByClassName("card");
const movesE = document.getElementsByClassName("moves");
const score = document.getElementsByClassName("score-panel");
const restartE = document.getElementsByClassName("restart");
const starEs = document.getElementsByClassName("fa-star");
const gameEnd = document.getElementById("gameEnd");
const moves = document.getElementById("moves");
const stars = document.getElementById("stars");
const playAgain = document.getElementById("playAgain");
const timeE = document.getElementById("time");
const timerE = document.getElementsByClassName("timer");
const selected = [];
const CARD_OPEN = "card open";
const CARD_MATCHED = "card matched";
const CARD_CLOSED = "card closed";
let startTime;

/* Attach event listeners to the cards to take the correct action when clicked */
function attachEventListener() {
  for (let i=0; i < cardEs.length; i++) {
      cardEs[i].addEventListener("click", function (e) {
        let target = e.target;
        // line below selects li if either the li or i is clicked
        if (target.nodeName === "I") target = e.target.parentElement;
        const cardState = getCardState(target);
        if (selected.length === 0) {
          if (cardState === CARD_OPEN) return; // should never really happen
          if (cardState === CARD_MATCHED) return;
          target.classList.add("open");
          target.classList.add("show");
          selected.push(target);
        } else {
          if (cardState === CARD_OPEN) return;
          if (cardState === CARD_MATCHED) return;
          target.classList.add("open");
          target.classList.add("show");
          if (matchedCard(target)) {
            target.classList.value = "card match";
            selected[0].classList.value = "card match";
            selected.pop();
            incrementMoves();
            decrementStars();
            if (document.getElementsByClassName("card match").length === 16)
              showEndStats();
          } else {
            setTimeout(function() {
              target.classList.value = "card";
              selected[0].classList.value = "card";
              selected.pop();
              incrementMoves();
              decrementStars();
            },500);
          }
        }
      })
  }
}

/* determines if the card state is open, closed or matched */
function getCardState(target) {
  if (getState(target, "open")) return CARD_OPEN;
  if (getState(target, "match")) return CARD_MATCHED;
  return CARD_CLOSED;
}

/* general route for determining card state */
function getState(target, state) {
  const classes = target.classList;
  for (let i=0; i < classes.length; i++) if (classes[i] === state) return true;
  return false;
}

/* determines if the two clicked cards are a match */
function matchedCard(target) {
  if (target.children[0].className === selected[0].children[0].className)
    return true;
  return false;
}

function incrementMoves() {
  movesE[0].innerText = parseInt(movesE[0].innerText) + 1;
}

function decStarCount() {
  stars.innerText = parseInt(stars.innerText) - 1;
}

function decrementStars() {
  const moves = parseInt(movesE[0].innerText);
  if (moves === 9) { starEs[0].style.display = "none"; decStarCount(); }
  if (moves === 13) { starEs[1].style.display = "none"; decStarCount(); }
}

function resetStars() {
  for (let i=0; i<starEs.length; i++) starEs[i].style.display = "";
  stars.innerText = "3";
}

restartE[0].addEventListener("click", restartGame);
playAgain.addEventListener("click", restartGame);

/* display user stats on completion of the game */
function showEndStats() {
  timeE.innerText = getTimeDelta();
  score[0].style.display = "none";
  deckE[0].style.display="none";
  gameEnd.style.display="";
  moves.innerText = movesE[0].innerText;
}

/* creates a string representation of the time from the game start to now */
function getTimeDelta() {
  const timeDiff = new Date().getTime() - startTime;
  let sec = Math.floor(timeDiff/1000);
  let min = Math.floor(sec/60);
  const hours = Math.floor(min/60);
  sec = sec % 60;
  min = min % 60;
  return hours + ":" + ("0"+min).slice(-2) + ":" + ("0"+sec).slice(-2);
}

function updateTime() {
  timerE[0].innerText = getTimeDelta();
  setTimeout(updateTime, 1000);
}

/* on game restart displays the game board/DOM with all the settings reset */
function restartGame() {
  score[0].style.display = "";
  deckE[0].style.display="";
  gameEnd.style.display="none";
  resetStars();
  movesE[0].innerText = "0";
  setupCards();
  attachEventListener();
  startTime = new Date().getTime();
  updateTime();
}

/* puts the cards on the game board/DOM */
function setupCards() {
  const shuffled = shuffle(cards)
  deckE[0].innerHTML = "";
  const newDeck = [];
  for (let i=0; i<shuffled.length; i++) {
    newDeck.push('<li class="card">');
    newDeck.push('<i class="fa fa-' + shuffled[i] +'"></i>');
    newDeck.push('</li>');
  }
  deckE[0].innerHTML = newDeck.join("\n");
}

restartGame();
