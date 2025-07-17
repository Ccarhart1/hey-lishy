// Countdown functionality for Li Shy Website

document.addEventListener('DOMContentLoaded', function () {
    initializeCountdown();
});

let countdownInterval;
let reunionDate = null;

function initializeCountdown() {
    // Set reunion date to July 20th, 2025
    reunionDate = new Date('2025-07-20T00:00:00');
    updateCountdownDisplay();
    startCountdown();

}

function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        updateCountdownDisplay();
    }, 1000);
}

function updateCountdownDisplay() {
    if (!reunionDate) return;

    const now = new Date().getTime();
    const distance = reunionDate.getTime() - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) daysElement.textContent = formatNumber(days);
    if (hoursElement) hoursElement.textContent = formatNumber(hours);
    if (minutesElement) minutesElement.textContent = formatNumber(minutes);
    if (secondsElement) secondsElement.textContent = formatNumber(seconds);

    // Add pulse animation to seconds
    if (secondsElement) {
        secondsElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            secondsElement.style.transform = 'scale(1)';
        }, 100);
    }

    // Check if countdown has ended
    if (distance < 0) {
        clearInterval(countdownInterval);
        showReunionMessage();
    } else {
        // Add special effects for milestones
        checkMilestones(days, hours, minutes, seconds);
    }
}

function formatNumber(num) {
    return num < 10 ? '0' + num : num.toString();
}

function checkMilestones(days, hours, minutes, seconds) {
    const countdownContainer = document.querySelector('.countdown-container');

    // Special effects for different milestones
    if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
        // Final countdown
        countdownContainer.classList.add('final-countdown');
        createConfetti();
    } else if (days === 0 && hours === 0 && minutes === 1 && seconds === 0) {
        // 1 minute left
        showMilestoneMessage('Just one more minute! 💕');
    } else if (days === 0 && hours === 1 && minutes === 0 && seconds === 0) {
        // 1 hour left
        showMilestoneMessage('One hour to go! 🎉');
    } else if (days === 1 && hours === 0 && minutes === 0 && seconds === 0) {
        // 1 day left
        showMilestoneMessage('Tomorrow we reunite! 💖');
    } else if (days === 7 && hours === 0 && minutes === 0 && seconds === 0) {
        // 1 week left
        showMilestoneMessage('One week left! 📅');
    }
}

function showMilestoneMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'milestone-message';
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b9d, #9b59b6);
        color: white;
        padding: 20px 40px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
        z-index: 10000;
        animation: milestone-popup 3s ease-in-out;
    `;

    document.body.appendChild(messageElement);

    // Add animation keyframes
    if (!document.querySelector('#milestone-styles')) {
        const style = document.createElement('style');
        style.id = 'milestone-styles';
        style.textContent = `
            @keyframes milestone-popup {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

function showReunionMessage() {
    const countdownContainer = document.querySelector('.countdown-container');

    // Create reunion message
    const reunionMessage = document.createElement('div');
    reunionMessage.className = 'reunion-message';
    reunionMessage.innerHTML = `
        <div class="reunion-content">
            <h2>🎉 WE'RE TOGETHER AGAIN! 🎉</h2>
            <p>The wait is over, my beautiful Li Shy! 💕</p>
            <p>I hope you're in my arms right now! 🤗</p>
            <div class="celebration-hearts">
                <span>💕</span>
                <span>💖</span>
                <span>💗</span>
                <span>💝</span>
                <span>💓</span>
            </div>
        </div>
    `;

    reunionMessage.style.cssText = `
        background: linear-gradient(135deg, #ff6b9d, #9b59b6);
        color: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 50px rgba(255, 107, 157, 0.4);
        animation: celebration 2s ease-in-out;
    `;

    countdownContainer.innerHTML = '';
    countdownContainer.appendChild(reunionMessage);

    // Add celebration animation
    if (!document.querySelector('#celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'celebration-styles';
        style.textContent = `
            @keyframes celebration {
                0% { transform: scale(0.8); opacity: 0; }
                50% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
            .celebration-hearts span {
                display: inline-block;
                font-size: 2rem;
                margin: 0 10px;
                animation: heartbeat 1s infinite;
            }
            .celebration-hearts span:nth-child(1) { animation-delay: 0s; }
            .celebration-hearts span:nth-child(2) { animation-delay: 0.2s; }
            .celebration-hearts span:nth-child(3) { animation-delay: 0.4s; }
            .celebration-hearts span:nth-child(4) { animation-delay: 0.6s; }
            .celebration-hearts span:nth-child(5) { animation-delay: 0.8s; }
        `;
        document.head.appendChild(style);
    }

    // Create confetti
    createConfetti();

    // Play celebration sound (if available)
    playCelebrationSound();
}

function createConfetti() {
    const colors = ['#ff6b9d', '#9b59b6', '#ffc0cb', '#e8d4f0', '#f1c40f'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            z-index: 9999;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear infinite;
            transform: rotate(${Math.random() * 360}deg);
        `;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    // Add confetti animation
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confetti-fall {
                0% { transform: translateY(-100vh) rotate(0deg); }
                100% { transform: translateY(100vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function playCelebrationSound() {
    // Create audio context for a simple celebration sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio not supported, silently fail
    }
}



function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💝'];

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            font-size: 24px;
            left: ${Math.random() * 100}%;
            top: 100%;
            z-index: 9999;
            animation: float-up 3s ease-out;
            pointer-events: none;
        `;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 3000);
    }

    // Add float animation
    if (!document.querySelector('#float-styles')) {
        const style = document.createElement('style');
        style.id = 'float-styles';
        style.textContent = `
            @keyframes float-up {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
            }
            @keyframes slideIn {
                0% { transform: translateX(100%); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add special countdown effects based on time of day
function addTimeBasedEffects() {
    const hour = new Date().getHours();
    const countdownContainer = document.querySelector('.countdown-container');

    if (hour >= 6 && hour < 12) {
        // Morning
        countdownContainer.classList.add('morning-theme');
    } else if (hour >= 12 && hour < 18) {
        // Afternoon
        countdownContainer.classList.add('afternoon-theme');
    } else if (hour >= 18 && hour < 22) {
        // Evening
        countdownContainer.classList.add('evening-theme');
    } else {
        // Night
        countdownContainer.classList.add('night-theme');
    }
}

// Initialize time-based effects
addTimeBasedEffects();

// Update every hour
setInterval(addTimeBasedEffects, 3600000); 