// Function to determine the crash point
function getCrashPoint() {
    e = 2 ** 32
    h = crypto.getRandomValues(new Uint32Array(1))[0]
    // if h % (100 / desired_precentage) is 0 then the game will crash immediately
    if (h % 33 == 0) return 1
    return Math.floor((100 * e - h) / (e - h)) / 100
}

// Function to start the game
function startGame() {
    document.getElementById('winnings').innerHTML = ""
    document.getElementById('losing').innerHTML = ""
    // Get the bet value from the input field
    let bet = document.getElementById('bet').value;

    // Calculate the crash point
    let crashPoint = getCrashPoint();
    //alert(crashPoint);

    // Display a countdown from 0 to the crash point
    var countdown = 1.00;
    let interval = setInterval(function () {
        document.getElementById('crashPoint').innerHTML = countdown.toFixed(2);
        if (countdown.toFixed(2) == crashPoint) {
            clearInterval(interval);
            if (document.getElementById('winnings').innerHTML == "") { calculateWinnings(); }

        }
        countdown = countdown + 0.01;

    }, 65);

}

// takeWinnings()
// Function to take the winnings
function takeWinnings() {
    let bet = document.getElementById('bet').value;
    let crashPoint = document.getElementById('crashPoint').innerHTML;
    if (parseFloat(crashPoint) < getCrashPoint() && document.getElementById('losing').innerHTML == "") {
        let winnings = bet * crashPoint;
        document.getElementById('winnings').innerHTML = `You won ${winnings.toFixed(2)}!`;
    }
}

// Function to calculate the player's winnings
function calculateWinnings() {
    let bet = document.getElementById('bet').value;
    let crashPoint = document.getElementById('crashPoint').innerHTML;
    let winnings = bet * crashPoint;
    // alert(`The game crashed at ${crashPoint} and you won ${winnings.toFixed(2)}!`);
    document.getElementById('losing').innerHTML = `The game crashed at ${crashPoint} and you Lost.`;
}