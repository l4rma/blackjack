//Card object
function Card(value, suit, img) {
    this.value = value;
    this.suit = suit;
    this.img = img;
    this.name = value + " of " + suit;
    this.cardValue;
    this.checkValue = function () {
        switch (this.value) {
            case "two": return 2;
            case "three": return 3;
            case "four": return 4;
            case "five": return 5;
            case "six": return 6;
            case "seven": return 7;
            case "eight": return 8;
            case "nine": return 9;
            case "ten": return 10;
            case "jack": return 10;
            case "queen": return 10;
            case "king": return 10;
            case "ace": return 1;
        }
    }
    this.checkValueHTML = function () {
        switch (this.value) {
            case "two": return 2;
            case "three": return 3;
            case "four": return 4;
            case "five": return 5;
            case "six": return 6;
            case "seven": return 7;
            case "eight": return 8;
            case "nine": return 9;
            case "ten": return 10;
            case "jack": return "J";
            case "queen": return "Q";
            case "king": return "K";
            case "ace": return "A";
        }
    }
    this.checkSuit = function () {
        switch (this.suit) {
            case "clubs": return "&#9827;";
            case "hearts": return "&#9825;";
            case "diamonds": return "&#9826;";
            case "spades": return "&#9824;";
        }
    }

}

let values = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];

let suits = ["clubs", "hearts", "diamonds", "spades"];

// Deck object
function Deck() {
    this.cards = [];
    //Method for filling the deck with 52 different cards
    this.fillDeck = function () {
        for (var i = 0; i < suits.length; i++) {
            for (var j = 0; j < values.length; j++) {
                this.cards.push(new Card(values[j], suits[i], "NN"));
            }
        }
    }
    //Method for drawing a card from an other deck
    this.drawCard = function (fromDeck) {
        this.cards.push(fromDeck.cards[0]);
        fromDeck.cards.splice(0, 1);
    }

    //Method for shuffling the deck
    this.shuffleDeck = function () {
        const originalDeckSize = this.cards.length;
        let tempDeck = [];
        for (var i = 0; i < originalDeckSize; i++) {
            let rndNum = Math.floor(Math.random() * this.cards.length);
            tempDeck.push(this.cards[rndNum]);
            this.cards.splice(rndNum, 1);
        }
        this.cards = tempDeck;
    }

    this.returnCardsToDeck = function (fromDeck) {
        for (var i = 0; i < fromDeck.cards.length; i++) {
            this.cards.push(fromDeck.cards[i]);
        }
        fromDeck.cards.splice(0, i);
    }
}

function getHandValue(fromDeck) {
    let deckValue = 0;
    let aceCounter = 0;
    for (var i = 0; i < fromDeck.cards.length; i++) {
        deckValue += fromDeck.cards[i].checkValue();
    }
    for (var i = 0; i < fromDeck.cards.length; i++) {
        if (fromDeck.cards[i].value === "ace") {
            aceCounter++;
        }
    }
    if (deckValue + 10 <= 21 && aceCounter > 0) {
        deckValue += 10;
    }    
    return deckValue;
}

//Get elements for DOM
let playerHandDiv = document.getElementById("playerHandDiv");
let dealerHandDiv = document.getElementById("dealerHandDiv");
let messageDiv = document.getElementById("messageDiv");
let playerHandValueDiv = document.getElementById("playerHandValueDiv");
let hitBtn = document.getElementById("hit-btn");
let dealerHandValueDiv = document.getElementById("dealerHandValueDiv");
let standBtn = document.getElementById("stand-btn");
let newHandBtn = document.getElementById("newHand-btn");
let betInput = document.getElementById("betInput");

let playerNameDiv = document.getElementById("playerNameDiv");
let atmMsgDiv = document.getElementById("atmMsgDiv");
let startBtn = document.getElementById("start-btn");
let balanceSpan = document.getElementById("balance-span");
let cashSpan = document.getElementById("cash-span");
let atmInput = document.getElementById("atmInput");
let withdrawBtn = document.getElementById("withdraw-btn");
let depositBtn = document.getElementById("deposit-btn");
let atmInfoDiv = document.getElementById("atmInfoDiv");

function updateHandstoUI() {
    dealerHandDiv.innerHTML = "";
    boardPlayerHandDiv.innerHTML = "";
    boardDealerHandDiv.innerHTML = "<div class='card'>" +
        "<div class='value'></div>" +
        "<div class='suit'></div>" +
        "</div>" +
        "<div class='card'>" +
        "<div class='value'>" + dealerHand.cards[1].checkValueHTML() + "</div>" +
        "<div class='suit'>" + dealerHand.cards[1].checkSuit() + "</div>" +
        "</div>";

    for (var i = 0; i < playerHand.cards.length; i++) {
        boardPlayerHandDiv.innerHTML += "<div class='card'>" +
            "<div class='value'>" + playerHand.cards[i].checkValueHTML() + "</div>" +
            "<div class='suit'>" + playerHand.cards[i].checkSuit() + "</div>" +
            "</div>";
    }
    dealerHandValueDiv.innerHTML = "(Value: [Hidden] + " + dealerHand.cards[1].checkValue() + ")";
    playerHandValueDiv.innerHTML = "(value: " + getHandValue(playerHand) + ")";

}

function standUpdateUI() {
    boardDealerHandDiv.innerHTML = "";
    for (var i = 0; i < dealerHand.cards.length; i++) {
        boardDealerHandDiv.innerHTML += "<div class='card'>" +
            "<div class='value'>" + dealerHand.cards[i].checkValueHTML() + "</div>" +
            "<div class='suit'>" + dealerHand.cards[i].checkSuit() + "</div>" +
            "</div>";
    }
    dealerHandValueDiv.innerHTML = "(Value: " + getHandValue(dealerHand) + ")";
}

/*** Money ***/
function Account(cash) {
    this.name = name;
    this.balance = 1000;
    this.cash = cash;
    this.withdraw = function (amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            this.cash += amount;
        } else {
            console.log("You dont have that much money");
            atmInfoDiv.innerHTML = "Error: Insufficient funds.";
        }
    }
    this.deposit = function (amount) {
        if (amount <= this.cash) {
            this.cash -= amount;
            this.balance += amount;
        } else {
            console.log("You dont have that much cash");
            atmInfoDiv.innerHTML = "Error: You dont have that much cash.";
        }
    }
    this.addCash = function (amount) {
        this.cash += amount;
    }
}


function hit() {
    //1. Draw a card
    playerHand.drawCard(playingDeck);
    //2. Update UI
    updateHandstoUI();
    //3. Check if bust
    if (getHandValue(playerHand) > 21) {
        hitBtn.disabled = true;
        standBtn.disabled = true;
        messageDiv.innerHTML = "Bust! You lose!";
        standUpdateUI();
    }
    //4. Check if 21
}
function stand() {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    //1. Check dealer hand (if under 17, draw)
    while (getHandValue(dealerHand) < 17) {
        dealerHand.drawCard(playingDeck);
    }
    //Update UI
    standUpdateUI();
    //2. Check if bust
    if (getHandValue(dealerHand) > 21) {
        messageDiv.innerHTML = "Dealer Bust! You win! (+$" + currentBet*2 + ")";;
        playerAccount.cash += currentBet*2;
        updateAtmUI();
    } else if (getHandValue(dealerHand) > getHandValue(playerHand)) {
        messageDiv.innerHTML = "You lose!";
    } else if (getHandValue(dealerHand) === getHandValue(playerHand)) {
        messageDiv.innerHTML = "Draw!";
        playerAccount.cash += currentBet;
        updateAtmUI();
    } else {
        messageDiv.innerHTML = "You win! (+$" + currentBet*2 + ")";
        playerAccount.cash += currentBet*2;
        updateAtmUI();
    }
}

function dealNewHand() {
    currentBet = parseInt(betInput.value);
    if (currentBet <= playerAccount.cash) {
    playerAccount.cash -= currentBet;
    updateAtmUI();
    playingDeck.returnCardsToDeck(dealerHand);
    playingDeck.returnCardsToDeck(playerHand);
    playingDeck.shuffleDeck();
    dealerHand.drawCard(playingDeck);
    playerHand.drawCard(playingDeck);
    dealerHand.drawCard(playingDeck);
    playerHand.drawCard(playingDeck);

    updateHandstoUI();
    messageDiv.innerHTML = "";
    hitBtn.disabled = false;
    standBtn.disabled = false;
    } else {
        messageDiv.innerHTML = "You don't have enough cash for that bet.";
    }
}

function makePlayer() {
    player = prompt("Enter name:");
    playerNameDiv.innerHTML = player;
    atmMsgDiv.innerHTML = "Logged in as " + player;
    startBtn.disabled = true;
    playerAccount = new Account(100);
    updateAtmUI();
    newHandBtn.disabled = false;
    withdrawBtn.disabled = false;
    depositBtn.disabled = false;

}

function updateAtmUI() {
    cashSpan.innerHTML = playerAccount.cash;
    balanceSpan.innerHTML = playerAccount.balance;
}
function withdraw() {
    playerAccount.withdraw(parseInt(atmInput.value));
    updateAtmUI();
}

function deposit() {
    playerAccount.deposit(parseInt(atmInput.value));
    updateAtmUI();
}

function nesteKort() {
    alert("Øverste kort er: " + playingDeck.cards[0].name);
}

/*********** GAME **************/

//Creat Playing Deck, dealers hand, and players hand
let player;
let playerAccount;
let currentBet = 0;

let playingDeck = new Deck();
let dealerHand = new Deck();
let playerHand = new Deck();

//Fill playing deck with cards
playingDeck.fillDeck();

//Shuffle playing deck
playingDeck.shuffleDeck();

//Deal 2 cards to player and dealer
//dealNewHand();

hitBtn.disabled = true;
standBtn.disabled = true;
newHandBtn.disabled = true;
withdrawBtn.disabled = true;
depositBtn.disabled = true;








