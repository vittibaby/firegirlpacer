// Pacing Calculator
document.addEventListener('DOMContentLoaded', function() {
    // Distance Calculator
    const calculateBtn = document.getElementById('calculate');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePace);
    }

    // Pace to Track Time
    const calculateTrackBtn = document.getElementById('calculate-track');
    if (calculateTrackBtn) {
        calculateTrackBtn.addEventListener('click', calculateTrackTimes);
    }
    
    // Track to Pace Time
    const calculatePaceBtn = document.getElementById('calculate-pace');
    if (calculatePaceBtn) {
        calculatePaceBtn.addEventListener('click', calculatePaceFromTrack);
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

function calculatePaceFromTrack() {
    const trackDistance = parseInt(document.getElementById('track-distance').value);
    const minutes = parseInt(document.getElementById('track-minutes').value) || 0;
    const seconds = parseFloat(document.getElementById('track-seconds').value) || 0;
    
    if (minutes === 0 && seconds === 0) {
        alert('Please enter a valid time');
        return;
    }
    
    // Convert time to total seconds
    const totalSeconds = (minutes * 60) + seconds;
    
    // Calculate pace in seconds per kilometer
    const paceSecondsPerKm = (totalSeconds * 1000) / trackDistance;
    
    // Convert to minutes and seconds
    const paceMinutes = Math.floor(paceSecondsPerKm / 60);
    const paceSeconds = (paceSecondsPerKm % 60).toFixed(1);
    
    // Format the result
    const result = `${paceMinutes}:${paceSeconds.toString().padStart(4, '0')} min/km`;
    document.getElementById('track-pace-result').textContent = result;
} 