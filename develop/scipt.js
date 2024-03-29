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
//Create a way to create a shoe size. For loop, and multiply the total deck size by 4
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
const dealerHandContainer = document.getElementById("dealerHandCount");
const userBtns = document.querySelectorAll(".userBtns");
const standBtn = document.getElementById("stand");
const hitBtn = document.getElementById("hit");
const doubleBtn = document.getElementById("double");
const splitBtn = document.getElementById("split");
const closeBtn = document.getElementById("closeButton");
const closeWonBtn = document.getElementById("closeWonButton");
const lostMessage = document.getElementById("lostMessage")
const wonMessage = document.getElementById("wonMessage")


let dealerHandArray = [];
let userHandArray = [];
//created a second array for better concatenating logic between the two arrays
let userHandAfterHit = [];
let dealerHandAfterStand = [];

//Grabbing the users and dealers card containers
const dealersFirstCardContainer = document.getElementById("dealersFirstHand");
const dealersSecondCardContainer = document.getElementById("dealersSecondHand");
const usersFirstCardContainer = document.getElementById("playersFirstHand");
const usersSecondCardContainer = document.getElementById("playersSecondHand");
const totalCount = document.getElementById("totalCount");

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

  return [
    deck[dealerHandIndex1],
    deck[dealerHandIndex2],
    deck[userHandIndex1],
    deck[userHandIndex2],
  ];
}

dealHandBtn.addEventListener("click", function () {
  var audio = document.getElementById("soundEffect");
  audio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
  audio.play();

  let randomValues = dealCards();
  let dealerFirstCard = randomValues[0];
  let dealerSecondCard = randomValues[1];
  let usersFirstCard = randomValues[2];
  let usersSecondCard = randomValues[3];

  //set the dealers first card only
  dealersFirstCardContainer.innerHTML = dealerFirstCard;
  //set the values for the users hand
  usersFirstCardContainer.innerHTML = usersFirstCard;
  usersSecondCardContainer.innerHTML = usersSecondCard;

  //Show the first value in the dealers hand
  dealerHandContainer.innerHTML = "Dealer Has: " + dealerFirstCard;

  //Check if the two cards delt to the user are the same, if so, enable the split button
  if (usersFirstCard === usersSecondCard) {
    splitBtn.classList.remove("disabled");
    splitBtn.disabled = false;

    splitBtn.addEventListener("click", function () {
      console.log("nested split button is pressed");
    });
  }

  compareValues(
    usersFirstCard,
    usersSecondCard,
    dealerFirstCard,
    dealerSecondCard
  );
});

function compareValues(
  usersFirstCard,
  usersSecondCard,
  dealerFirstCard,
  dealerSecondCard
) {
  //Set the values of the first 2 cards
  //Pass the values to the calculateCardValue function
  let value1 = calculateCardValue(usersFirstCard);
  let value2 = calculateCardValue(usersSecondCard);

  let DealerValue = calculateCardValue(dealerFirstCard);
  let DealerValue2 = calculateCardValue(dealerSecondCard);

  //Push the inital cards that were dealt to the user into their hand array
  userHandArray.push(value1, value2);

  dealerHandArray.push(DealerValue, DealerValue2);

  //Again, pass the user hand into the calculateHandValue function for cleaner code
  let initalHandValue = calculateHandValue(userHandArray);

  totalCount.innerHTML = "Total Value: " + initalHandValue;

  //Show black jack alert if 21 is drawn
  if (initalHandValue === 21) {
    setTimeout(showBlackJack, 500);
  }
  function showBlackJack() {
    var blackjackVoice = document.getElementById("blackjack");
    blackjackVoice.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
    blackjackVoice.play();
    setTimeout(function () {
      alert("Black Jack!");
      location.reload(true);
    }, 800);
  }
}

function calculateCardValue(card) {
  switch (card) {
    case "J":
    case "Q":
    case "K":
      return 10;
    case "Ace":
      return 11;
    default:
      return parseInt(card); // Convert numeric strings to numbers
  }
}

function calculateHandValue(hand) {
  return hand.reduce((total, card) => total + card, 0);
}

hitBtn.addEventListener("click", function () {
  var audio = document.getElementById("soundEffect");
  audio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
  audio.play();

  let index = Math.floor(Math.random() * deck.length);
  let newCardValue = calculateCardValue(deck[index]);

  userHandAfterHit.push(newCardValue); // Push new card value after hitting
  console.log("Array after hit: " + userHandAfterHit);

  // Get the player's hand container
  let handContainer = document.querySelector(".playerHand");
  // Create a new div element for the card
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.textContent = newCardValue; // Set the value of the card
  // Append the new card to the hand container
  handContainer.appendChild(newCard);
  console.log(newCardValue);

  let handValueAfterHit = calculateHandValue([
    ...userHandArray,
    ...userHandAfterHit,
  ]);

  totalCount.innerHTML = "Total Value: " + handValueAfterHit;

  //TODO:Figure out a way to convert Ace to a 1 since we are returning 11 every time
  if (handValueAfterHit > 21 && newCardValue == 11) {
    userHandAfterHit.pop[0];
    newCardValueWithAce = 1;
    userHandAfterHit.push(newCardValueWithAce);
    let handValueWithAce = calculateHandValue([
      ...userHandArray,
      ...userHandAfterHit,
    ]);
    totalCount.innerHTML = "Boop " + handValueWithAce;
  }

  splitBtn.classList.add("disabled");
  splitBtn.disabled = true;

  if (handValueAfterHit > 21) {
    setTimeout(showBustAlert, 200);
  }
  function showBustAlert() {
    document.getElementById("customAlert").classList.remove("hidden");
    lostMessage.innerHTML = "Bust!"
    // Play bust sound effect
    var bustAudio = document.getElementById("bustSoundEffect");
    bustAudio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
    bustAudio.play();

    closeBtn.addEventListener("click", function () {
      document.getElementById("customAlert").classList.add("hidden");
      location.reload(true);
    });
  }
});

function stand() {
  dealersSecondCardContainer.innerHTML = dealerHandArray[1];
  dealerTotalHand = dealerHandArray[0] + dealerHandArray[1];
  dealerHandContainer.innerHTML = "Dealer Has: " + dealerTotalHand;

  // Grab the player's final hand once they are done hitting for cards
  let playersFinalHand = calculateHandValue([
    ...userHandArray,
    ...userHandAfterHit,
  ]);

  if (dealerTotalHand > playersFinalHand) {
    var playerWonAudio = document.getElementById("bustSoundEffect");
    lostMessage.innerHTML = "Dealer Won"
    playerWonAudio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
    playerWonAudio.play();
    setTimeout(function () {
      document.getElementById("customAlert").classList.remove("hidden");
    // Play bust sound effect
    var bustAudio = document.getElementById("bustSoundEffect");
    bustAudio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
    bustAudio.play();

    closeBtn.addEventListener("click", function () {
      document.getElementById("customAlert").classList.add("hidden");
      location.reload(true);
    });
    }, 800);
  } else {
    // If the dealer's hand is less than 17, keep drawing cards with a delay of 1 second
    if (dealerTotalHand < 17) {
      setTimeout(function drawCard() {
        let index = Math.floor(Math.random() * deck.length);
        let newCardForDealerValue = calculateCardValue(deck[index]);

        dealerHandAfterStand.push(newCardForDealerValue); // Push new card value after hitting

        // Get the player's hand container
        let dealerHandContainer = document.querySelector(".dealerHand");
        let dealerHandCount = document.getElementById("dealerHandCount");
        // Create a new div element for the card
        let newCardForDealer = document.createElement("div");
        newCardForDealer.classList.add("card");
        newCardForDealer.textContent = newCardForDealerValue; // Set the value of the card
        // Append the new card to the hand container
        dealerHandContainer.appendChild(newCardForDealer);

        dealerTotalHand += newCardForDealerValue;

        dealerHandCount.innerHTML = "Dealer Has: " + dealerTotalHand;

        // If the dealer's hand is still less than 17, draw another card after 1 second
        if (dealerTotalHand < 17) {
          setTimeout(drawCard, 1000); // Draw another card after 1 second
        } else {
          // Dealer's hand is now greater than or equal to 17
          setTimeout(finishDealerTurn(playersFinalHand), 500);
        }
      }, 400); // Initial delay before drawing the first card
    } else {
      // Dealer's hand is already greater than or equal to 17
      finishDealerTurn(playersFinalHand);
    }
  }
}

// Function to finish the dealer's turn and determine the winner
function finishDealerTurn(playersFinalHand) {
  if (dealerTotalHand > playersFinalHand && dealerTotalHand >= 21) {
    var playerWonAudio = document.getElementById("bustSoundEffect");
    playerWonAudio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
    playerWonAudio.play();
    setTimeout(function () {
      alert("Dealer won");
      location.reload(true);
    }, 400);
  } else if (dealerTotalHand < playersFinalHand) {
    var playerWonAudio = document.getElementById("playerWonSoundEffect1");
    playerWonAudio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
    playerWonAudio.play();
    var playerWonAudio = document.getElementById("playerWonSoundEffect2");
    playerWonAudio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
    playerWonAudio.play();
    setTimeout(function () {
      wonMessage.innerHTML = "You Won!"
      document.getElementById("customWonAlert").classList.remove("hidden");

      closeWonBtn.addEventListener("click", function () {
        document.getElementById("customWonAlert").classList.add("hidden");
        location.reload(true);
      });
    }, 400);
  } else {
    var playerWonAudio = document.getElementById("push");
    playerWonAudio.currentTime = 0; // Rewind to the beginning to allow multiple rapid plays
    playerWonAudio.play();
    setTimeout(function () {
      alert("Push");
      location.reload(true);
    }, 400);
  }
}

function double() {}
