let startTime;
let timeInterval;
let running = false;
let rounds = 0;

const timerDisplay = document.getElementById('timer');
const startStopButton = document.getElementById('startStop');
const roundsDisplay = document.getElementById('roundsDisplay');

function updateDisplay(minutes, seconds) {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startStopButton.addEventListener('click', function() {
    if (running) {
        clearInterval(timeInterval);
        running = false;
        startStopButton.textContent = "Start";
    } else {
        if (!startTime) {
            startTime = Date.now();
        } else {
            // Adjust start time for the pause duration
            const elapsedTime = (25 * 60) - (parseInt(timerDisplay.textContent.split(":")[0]) * 60 + parseInt(timerDisplay.textContent.split(":")[1]));
            startTime = Date.now() - elapsedTime * 1000;
        }

        timeInterval = setInterval(function() {
            const totalSeconds = (25 * 60) - Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            updateDisplay(minutes, seconds);

            if (minutes === 0 && seconds === 0) {
                rounds++;
                roundsDisplay.textContent = `Rounds: ${rounds}`;
                clearInterval(timeInterval);
                alert('Time is up!');
                running = false;
                startStopButton.textContent = "Start";
                updateDisplay(25, 0);
                startTime = null;  // Reset for next round
            }
        }, 1000);

        running = true;
        startStopButton.textContent = "Pause";
    }
});
