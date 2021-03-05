'use strict';

// dom elements
const scoreZero = document.querySelector('#score--0');
const scoreOne = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const player1Score = document.querySelector('#current--0');
const player2Score = document.querySelector('#current--1');
const player1Box = document.querySelector('.player--0');
const player2Box = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

// sets up the initial game
const init = () => {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	player1Score.textContent = 0;
	player2Score.textContent = 0;
	scoreZero.textContent = 0;
	scoreOne.textContent = 0;

	dice.classList.add('hidden');
	player1Score.classList.remove('player--winner');
	player1Score.classList.add('player--active');
	player2Score.classList.remove('player--winner', 'player--active');
};

init();

// game play

const switchPlayer = () => {
	document.querySelector(`#current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player1Box.classList.toggle('player--active');
	player2Box.classList.toggle('player--active');
};

// roll dice event listener
buttonRoll.addEventListener('click', () => {
	if (playing) {
		// generate a random number for dice
		const diceNum = Math.floor(Math.random() * 6) + 1;

		// display the dice
		dice.classList.remove('hidden');
		dice.src = `dice-${diceNum}.png`;

		// check for 1: if true, switch player

		if (diceNum != 1) {
			currentScore += diceNum;
			document.querySelector(
				`#current--${activePlayer}`
			).textContent = currentScore;
			// player1Score.textContent = currentScore;
		} else {
			switchPlayer();
		}
	}
});

// hold score
buttonHold.addEventListener('click', () => {
	if (playing) {
		// add current score to active players score
		scores[activePlayer] += currentScore;
		document.querySelector(`#score--${activePlayer}`).textContent =
			scores[activePlayer];

		// check if players score is >= 100
		if (scores[activePlayer] >= 100) {
			// finish the game
			playing = false;
			dice.classList.add('hidden');

			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
		}

		//switch to next player
		switchPlayer();
	}
});

// reset game event listener
buttonNew.addEventListener('click', init);
