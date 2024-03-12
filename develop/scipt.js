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

//Displaying the total deck values. Suites aren't included as it doesn't matter when playing traditional blackjack.
const deck = [
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
const dealHandBtn = document.querySelector(".dealHandBtn");
const userBtns = document.querySelectorAll(".userBtns");

function dealCards() {
  dealHandBtn.classList.add("hidden");
  userBtns.forEach((btn) => btn.classList.remove("hidden"));
}
