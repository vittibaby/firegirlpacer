// Pacing Calculator
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePace);
    }

    const calculateTrackBtn = document.getElementById('calculate-track');
    if (calculateTrackBtn) {
        calculateTrackBtn.addEventListener('click', calculateTrackTimes);
    }
});

function calculatePace() {
    const distance = parseFloat(document.getElementById('distance').value);
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Convert time to total seconds
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    if (totalSeconds === 0) {
        alert('Please enter a valid time');
        return;
    }

    // Calculate pace in seconds per kilometer
    const paceSecondsPerKm = totalSeconds / distance;
    
    // Convert to minutes and seconds
    const paceMinutes = Math.floor(paceSecondsPerKm / 60);
    const paceSeconds = Math.round(paceSecondsPerKm % 60);

    // Format the result
    const result = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} min/km`;
    document.getElementById('pace-result').textContent = result;
}

function calculateTrackTimes() {
    const paceMinutes = parseInt(document.getElementById('pace-minutes').value) || 0;
    const paceSeconds = parseFloat(document.getElementById('pace-seconds').value) || 0;

    if (paceMinutes === 0 && paceSeconds === 0) {
        alert('Please enter a valid pace');
        return;
    }

    // Convert pace to seconds per kilometer
    const paceSecondsPerKm = (paceMinutes * 60) + paceSeconds;

    // Calculate times for different track segments
    const time100m = (paceSecondsPerKm * 0.1).toFixed(1);
    const time200m = (paceSecondsPerKm * 0.2).toFixed(1);
    const time400m = (paceSecondsPerKm * 0.4).toFixed(1);

    // Format the results
    document.getElementById('time-100m').textContent = formatTrackTime(time100m);
    document.getElementById('time-200m').textContent = formatTrackTime(time200m);
    document.getElementById('time-400m').textContent = formatTrackTime(time400m);
}

function formatTrackTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(1);
    return `${minutes}:${remainingSeconds.toString().padStart(4, '0')}`;
} 