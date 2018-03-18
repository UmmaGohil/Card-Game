let cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
let card = document.getElementsByClassName("card");
const deck = $('.deck');
const modal = $('.modal');
const starRating = $('.starRating');
const timeTaken = $('.timeTaken');
const movesClass = $('.moves');
const starRatingString = "Star rating: ";
const timeTakenString = "Time taken: ";
const movesString = "Moves: ";
let move = 0;
let firstMove = 0;
let secondMove = 1;
let matched = 0;
let allMatched = 8;
let counter = 0;
let stars = "3 stars";
let seconds = 1;
let startTimer = false;

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
};

//game starts by shuffling cards in the deck - on each refresh cards shuffle 
document.onload = startGame();
function startGame() {
	const cards = shuffle(cardsList);
	deck.empty();
	for (let i = 0; i < cards.length; i++) {
		deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
	}
};

//card moves - when a user clicks two cards they are compared and matched or unmatched
$('.card').click(function() {
  if(move === firstMove) {
    $(this).addClass('open');
    cardOne = $(this);
    cardOneSym = $(this).find('i').attr('class');
    move++;
  }
  else if (move === secondMove) {
    $(this).addClass('open');
    cardTwo = $(this);
    cardTwoSym = $(this).find('i').attr('class');
    if (cardOneSym === cardTwoSym) {
      match(cardOne, cardTwo);
      if (matched === allMatched) {
        endGame();
      };
    } else if (cardOneSym !== cardTwoSym) {
      noMatch(cardOne, cardTwo);
    };
    move = 0;
  };
});


//flip cards to reavel they do not match
function flipCards(cardOne, cardTwo) {
  setTimeout(function(){
        cardOne.removeClass('unmatch open');
        cardTwo.removeClass('unmatch open');
  },1000);
}


//cards are flipped and a match is found hence matches and counter increase
function match(cardOne, cardTwo) {
  cardOne.addClass('match').unbind("click");
  cardTwo.addClass('match').unbind("click");
  numberOfMoves(counter);
  matched++;
  counter++;
}


//cards don't match so they are flipped and number of moves is updated 
function noMatch(cardOne, cardTwo) {
  cardOne.addClass('unmatch');
  cardTwo.addClass('unmatch');
  flipCards(cardOne, cardTwo);
  numberOfMoves(counter);
  counter++;
}


//counter for the number of moves made by the user 
function numberOfMoves(counter){
  if(counter > 1) {
    $('.score-panel').find('.moves').text(counter);
    $('.movesInfo').text("Moves");
  } else if (counter === 1) {
    $('.score-panel').find('.moves').text(counter);
    $('.movesInfo').text("Move");
  };

  //stars rating which takes into account the amount of moves made by the user
  if (counter === 30) {
    $('#starOne').removeClass('fa-star').addClass('fa-star-o');
    stars = "1 stars";
  } else if (counter === 22) {
    $('#starTwo').removeClass('fa-star').addClass('fa-star-o');
    stars = "2 stars";
  } else if (counter === 16) {
    $('#starThree').removeClass('fa-star').addClass('fa-star-o');
    stars = "3 stars";
  }
};


//all the cards are matched and the game ends
function endGame() {
  clearInterval(timer);
  startTime = false;
  modal.css('display', 'block');
  starRating.text(starRatingString + stars);
  timeTaken.text(timeTakenString + $('.seconds').text());
  movesClass.text(movesString + counter);	
  $('.playAgainButton').click(function() {
    restartGame();
    modal.css('display', 'none');
  });
};

//timer for how long the user takes 
$('.card').click(function() {
  if (startTimer === false) {
    cardTimer();
    startTimer = true;
  }
});


function cardTimer() {
  timer = setInterval(function() {
        $('.seconds').text(seconds + "s");
        seconds++;
    }, 1000);
};

//restart the game - the timer, star rating and moves are reset 
$('.restart').click(function() {
  restartGame();
});


function restartGame() {
  $('.card').removeClass('open match');
  moves = 0;
  matched = 0;
  clearInterval(timer);
  seconds = 0;
  $('.seconds').text(seconds + "s");
  startTimer = false;
  counter = 0;
  $('.score-panel').find('.moves').text(counter);
  $('#starOne').removeClass('fa-star-o').addClass('fa-star');
  $('#starTwo').removeClass('fa-star-o').addClass('fa-star');
  $('#starThree').removeClass('fa-star-o').addClass('fa-star');
 };