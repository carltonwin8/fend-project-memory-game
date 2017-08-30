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

const deckEs = document.getElementsByClassName("deck");
const cardEs = document.getElementsByClassName("card");
const movesE = document.getElementsByClassName("moves");
const restartE = document.getElementsByClassName("restart");
const starEs = document.getElementsByClassName("fa-star");
const selected = [];
const opened = document.getElementsByClassName("open"); // remove after debug
selected.push(opened[0]); // remove after debug
const CARD_OPEN = "card open";
const CARD_MATCHED = "card matched";
const CARD_CLOSED = "card closed";

//console.log(shuffle(cards));

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
          if (document.getElementsByClassName("card").length === 16) {

          }
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

function getCardState(target) {
  if (getState(target, "open")) return CARD_OPEN;
  if (getState(target, "match")) return CARD_MATCHED;
  return CARD_CLOSED;
}

function getState(target, state) {
  const classes = target.classList;
  for (let i=0; i < classes.length; i++) if (classes[i] === state) return true;
  return false;
}

function matchedCard(target) {
  if (target.children[0].className === selected[0].children[0].className)
    return true;
  return false;
}

function incrementMoves() {
  movesE[0].innerText = parseInt(movesE[0].innerText) + 1;
}

function decrementStars() {
  const moves = parseInt(movesE[0].innerText);
  if (moves === 8) starEs[0].style.display = "none";
  if (moves === 12) starEs[1].style.display = "none";
  if (moves === 16) starEs[2].style.display = "none";
}

function resetStars() {
  for (let i=0; i<starEs.length; i++) starEs[i].style.display = "";
}
