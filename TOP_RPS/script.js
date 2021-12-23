function computerPlay() {

    let rand = Math.random();
    
    if (rand < 0.334) {
        return "Rock";
    } else if (rand > 0.666) {
        return "Scissors"
    } else {
        return "Paper"
    }

}

function playRound(playerSelection, computerSelection) {

    if (playerSelection.toLowerCase()==="rock") {
        if (computerSelection==="Scissors") {
            return "You Win! Rock beats Scissors";
        } else if (computerSelection==="Paper") {
            return "You Lose! Paper beats Rock";
        } else if (computerSelection==="Rock") {
            return "It's a Draw! Rock draws with Rock";
        }
    } else if (playerSelection.toLowerCase()==="paper") {
        if (computerSelection==="Scissors") {
            return "You Lose! Scissors beats Paper";
        } else if (computerSelection==="Rock") {
            return "You Win! Paper beats Rock";
        } else if (computerSelection==="Paper") {
            return "It's a Draw! Paper draws with Paper";
        }
    } else if (playerSelection.toLowerCase()==="scissors") {
        if (computerSelection==="Rock") {
            return "You Lose! Rock beats Scissors";
        } else if (computerSelection==="Paper") {
            return "You Win! Scissors beats Paper";
        } else if (computerSelection==="Scissors") {
            return "It's a Draw! Scissors draws with Scissors";
        }
    } else {
        return playerSelection + " is not playable";
    }
       
}

function game() {
    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("Please enter Rock, Paper or Scissors");
        const computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
    }
}

game();