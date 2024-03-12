//Boilderplate logic
//Create an array with all the values in a deck
//From the array, create a random number generator that will select an index value from the deck array.length
//Once selected, remove that index value from the array
//Every time a user selects, "hit", select another random index value from the array and display the string value.

//Create a function that will add up all the values selected from the array and display the number at the bottom of the "playing cards"
//If the value from the array is "J, Q, K" assign 10 to the total count
//If the value is "ace", add 11 to the count only if the total value is less than 21. In that case, make ace a value of 1
//If the total value is 21, show the notificaton "BlackJack!"

//If the dealer and player has the same values after the user "Stands", show a notification "Push"
//If the dealer has 17, don't draw anymore cards for the dealer and compare values

//For each of the user buttons, there will be logic to allow certain buttons to be clicked based on the values on the table
//If the users two inital cards are the same value, split will be allowed
//Similarily, the double button will only be available before the 3rd card is delt

//Displaying the total deck values. Suites aren't included as it doesn't matter when playing traditional blackjack.
let deck = [
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  9,
  9,
  9,
  9,
  10,
  10,
  10,
  10,
  "J",
  "J",
  "J",
  "J",
  "Q",
  "Q",
  "Q",
  "Q",
  "K",
  "K",
  "K",
  "K",
  "Ace",
  "Ace",
  "Ace",
  "Ace",
];

//Grab the buttons for each choice
const dealHandBtn = document.querySelector(".dealHandBtn");
const userBtns = document.querySelectorAll(".userBtns");
const standBtn = document.getElementById("stand")
const hitBtn = document.getElementById("hit")
const doubleBtn = document.getElementById("double")
const splitBtn = document.getElementById("split")

let dealerArray = [];
let userArray = [];

//Grabbing the users and dealers card containers
const dealersFirstCardContainer = document.getElementById("dealersFirstHand")
const dealersSecondCardContainer = document.getElementById("dealersSecondHand")
const usersFirstCardContainer = document.getElementById("playersFirstHand");
const usersSecondCardContainer = document.getElementById("playersSecondHand");
const totalCount = document.getElementById("totalCount")

function dealCards() {
  // Hide the "Deal Cards" button and show the user buttons
  dealHandBtn.classList.add("hidden");
  userBtns.forEach((btn) => btn.classList.remove("hidden"));

  // Pick two random indices from the deck array
  let dealerHandIndex1 = Math.floor(Math.random() * deck.length);
  let dealerHandIndex2;
  let userHandIndex1;
  let userHandIndex2;

  do {
    dealerHandIndex2 = Math.floor(Math.random() * deck.length);
    userHandIndex1 = Math.floor(Math.random() * deck.length);
    userHandIndex2 = Math.floor(Math.random() * deck.length);
  } while (dealerHandIndex2 === dealerHandIndex1);

  console.log("Dealer index is: " + dealerHandIndex1)
  // Return the values at the random indices
  return [
    deck[dealerHandIndex1],
    deck[dealerHandIndex2],
    deck[userHandIndex1],
    deck[userHandIndex2],
  ];
}

dealHandBtn.addEventListener("click", function () {
  let randomValues = dealCards();
  let dealerFirstCard = randomValues[0]
  let usersFirstCard = randomValues[2]
  let usersSecondCard = randomValues[3]

  //set the dealers first card only
  dealersFirstCardContainer.innerHTML = dealerFirstCard
  //set the values for the users hand
  usersFirstCardContainer.innerHTML = usersFirstCard
  usersSecondCardContainer.innerHTML = usersSecondCard


  //Check if the two cards delt to the user are the same, if so, enable the split button
  if (usersFirstCard === usersSecondCard){
    splitBtn.classList.remove("disabled")
    splitBtn.disabled = false
  } else {
    splitBtn.disabled = true
  }
  
  compareValues(usersFirstCard, usersSecondCard)

});

function compareValues(usersFirstCard, usersSecondCard){
  //Set the values of the first 2 cards
  let value1 = usersFirstCard
  let value2 = usersSecondCard

  switch (value1) {
    case "J":
    case "Q":
    case "K":
      value1 = 10;
      break;
    case "Ace":
      value1 = 11;
      break;
  }

  switch (value2) {
    case "J":
    case "Q":
    case "K":
      value2 = 10;
      break;
    case "Ace":
      value2 = 11;
      break;
  }

  console.log("Value 1: " + value1 + " Value 2: " + value2)
  console.log(value1 + value2)
  totalHandValue = value1 + value2
  totalCount.innerHTML = "Total Value: " + totalHandValue

  if (totalHandValue = 21){
    alert("Black Jack!")
  }
}

function stand() {
  let randomValues = dealCards();
  let dealerSecondCard = randomValues[1]
  dealersSecondCardContainer.innerHTML = dealerSecondCard
}

function hit() {

}

function double() {}

function split() {
  

}
