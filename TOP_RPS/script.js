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

const buttons = document.querySelectorAll('button');
let winCount = 0;
let loseCount = 0;

buttons.forEach((button) => {

    button.addEventListener('click', () => {

        const resultText = playRound(button.id, computerPlay());
        console.log(resultText);

        if (resultText.includes('Win')) {
            winCount ++;
            console.log("wins= " + winCount);
        } else if (resultText.includes('Lose')) {
            loseCount ++;
            console.log("loses = " + loseCount);
        };

        const results = document.querySelector('#gameresults');
        const counter = document.querySelector('#gamecount');
        const announcer = document.querySelector('#announce')

        const content = document.createElement('div');
        const winContentCount = document.createElement('div');
        const loseContentCount = document.createElement('div');
        const announceText = document.createElement('div');


        content.textContent = resultText;
        winContentCount.textContent = "Your Wins: " + winCount;
        loseContentCount.textContent = "Computer Wins: " + loseCount;

        results.innerHTML = "";
        results.appendChild(content);

        counter.innerHTML = "";
        counter.appendChild(winContentCount);
        counter.appendChild(loseContentCount);

        if (winCount === 5) {
            announceText.textContent = "YOU WIN!"
            winCount = 0;
            loseCount = 0;
        } else if (loseCount === 5) {
            announceText.textContent = "YOU LOSE!"
            winCount = 0;
            loseCount = 0;
        }

        announcer.innerHTML = '';
        announcer.appendChild(announceText);

    });

});





