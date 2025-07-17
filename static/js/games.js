// Games functionality for Li Shy Website

document.addEventListener('DOMContentLoaded', function () {
    initializeGames();
});

// Game data and state
const memoryGameData = {
    questions: [
        {
            question: "What was the first movie we watched together?",
            options: ["The Princess Bride", "Titanic", "The Notebook", "Your favorite movie"],
            correct: 3,
            explanation: "It was your favorite movie! I loved watching it with you and seeing your reactions."
        },
        {
            question: "What's our favorite song to dance to?",
            options: ["Perfect by Ed Sheeran", "All of Me by John Legend", "Our special song", "Can't Help Myself"],
            correct: 2,
            explanation: "It's our special song that always makes us both smile and dance together!"
        },
        {
            question: "What's my favorite thing about you?",
            options: ["Your smile", "Your laugh", "Your kindness", "Everything about you"],
            correct: 3,
            explanation: "It's everything about you! I couldn't choose just one thing because you're perfect in every way."
        },
        {
            question: "What's our favorite date activity?",
            options: ["Going to movies", "Cooking together", "Long walks", "All of the above"],
            correct: 3,
            explanation: "All of the above! Every moment with you is my favorite, no matter what we're doing."
        },
        {
            question: "What do I miss most about you?",
            options: ["Your hugs", "Your voice", "Your presence", "Everything"],
            correct: 3,
            explanation: "I miss everything about you! Your hugs, your voice, your presence - you complete me."
        }
    ],
    currentQuestion: 0,
    score: 0,
    gameActive: false
};

let drawingBoard = null;
let drawingContext = null;
let isDrawing = false;
let currentColor = '#ff6b9d';
let currentSize = 5;

function initializeGames() {
    // Add event listeners to game buttons
    const gameButtons = document.querySelectorAll('.btn-game');
    gameButtons.forEach(button => {
        button.addEventListener('click', function () {
            const gameType = this.getAttribute('onclick').replace('()', '').replace('start', '').replace('open', '');

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Memory Game
window.startMemoryGame = function () {
    createMemoryGameModal();
    resetMemoryGame();
    showMemoryQuestion();
};

function createMemoryGameModal() {
    // Remove existing modal if present
    const existingModal = document.getElementById('memoryGameModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'memoryGameModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const gameContainer = document.createElement('div');
    gameContainer.className = 'memory-game-container';
    gameContainer.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    const gameHeader = document.createElement('div');
    gameHeader.innerHTML = `
        <h2 style="color: #ff6b9d; text-align: center; margin-bottom: 20px; font-family: 'Dancing Script', cursive; font-size: 2rem;">
            💕 Memory Game 💕
        </h2>
        <div style="text-align: center; margin-bottom: 20px;">
            <span style="background: linear-gradient(135deg, #ff6b9d, #9b59b6); color: white; padding: 5px 15px; border-radius: 20px; font-weight: 500;">
                Score: <span id="memoryScore">0</span>/<span id="memoryTotal">${memoryGameData.questions.length}</span>
            </span>
        </div>
    `;

    const gameContent = document.createElement('div');
    gameContent.id = 'memoryGameContent';

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        color: #ff6b9d;
        cursor: pointer;
        z-index: 10001;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;

    closeButton.addEventListener('click', closeMemoryGame);

    gameContainer.appendChild(closeButton);
    gameContainer.appendChild(gameHeader);
    gameContainer.appendChild(gameContent);
    modal.appendChild(gameContainer);
    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        gameContainer.style.transform = 'scale(1)';
    }, 100);

    // Close on background click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeMemoryGame();
        }
    });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function resetMemoryGame() {
    memoryGameData.currentQuestion = 0;
    memoryGameData.score = 0;
    memoryGameData.gameActive = true;
    updateMemoryScore();
}

function showMemoryQuestion() {
    const gameContent = document.getElementById('memoryGameContent');
    const question = memoryGameData.questions[memoryGameData.currentQuestion];

    gameContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="background: linear-gradient(135deg, #ffc0cb, #e8d4f0); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <h3 style="color: #9b59b6; margin-bottom: 10px; font-size: 1.3rem;">
                    Question ${memoryGameData.currentQuestion + 1}
                </h3>
                <p style="color: #6c7293; font-size: 1.1rem; line-height: 1.6;">
                    ${question.question}
                </p>
            </div>
        </div>
        <div id="memoryOptions" style="display: grid; gap: 10px;">
            ${question.options.map((option, index) => `
                <button class="memory-option" data-index="${index}" style="
                    background: white;
                    border: 2px solid #ff6b9d;
                    color: #ff6b9d;
                    padding: 15px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                    font-weight: 500;
                    text-align: left;
                ">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;

    // Add click listeners to options
    const options = document.querySelectorAll('.memory-option');
    options.forEach(option => {
        option.addEventListener('click', function () {
            selectMemoryOption(parseInt(this.dataset.index));
        });

        option.addEventListener('mouseenter', function () {
            this.style.background = '#ff6b9d';
            this.style.color = 'white';
            this.style.transform = 'translateY(-2px)';
        });

        option.addEventListener('mouseleave', function () {
            if (!this.classList.contains('selected')) {
                this.style.background = 'white';
                this.style.color = '#ff6b9d';
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

function selectMemoryOption(selectedIndex) {
    const question = memoryGameData.questions[memoryGameData.currentQuestion];
    const options = document.querySelectorAll('.memory-option');

    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // Highlight selected option
    options[selectedIndex].classList.add('selected');
    options[selectedIndex].style.background = selectedIndex === question.correct ? '#4CAF50' : '#f44336';
    options[selectedIndex].style.color = 'white';

    // Show correct answer
    options[question.correct].style.background = '#4CAF50';
    options[question.correct].style.color = 'white';

    // Update score
    if (selectedIndex === question.correct) {
        memoryGameData.score++;
        updateMemoryScore();
    }

    // Show explanation
    setTimeout(() => {
        showMemoryExplanation(question.explanation);
    }, 1000);
}

function showMemoryExplanation(explanation) {
    const gameContent = document.getElementById('memoryGameContent');

    const explanationDiv = document.createElement('div');
    explanationDiv.style.cssText = `
        margin-top: 20px;
        padding: 20px;
        background: linear-gradient(135deg, #fff8dc, #ffc0cb);
        border-radius: 15px;
        border-left: 4px solid #ff6b9d;
        animation: slideIn 0.5s ease-out;
    `;

    explanationDiv.innerHTML = `
        <p style="color: #6c7293; font-size: 1rem; line-height: 1.6; margin-bottom: 15px;">
            ${explanation}
        </p>
        <button id="nextMemoryQuestion" style="
            background: linear-gradient(135deg, #ff6b9d, #9b59b6);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        ">
            ${memoryGameData.currentQuestion < memoryGameData.questions.length - 1 ? 'Next Question 💕' : 'See Results 🎉'}
        </button>
    `;

    gameContent.appendChild(explanationDiv);

    // Add click listener to next button
    document.getElementById('nextMemoryQuestion').addEventListener('click', function () {
        memoryGameData.currentQuestion++;

        if (memoryGameData.currentQuestion < memoryGameData.questions.length) {
            showMemoryQuestion();
        } else {
            showMemoryResults();
        }
    });
}

function showMemoryResults() {
    const gameContent = document.getElementById('memoryGameContent');
    const percentage = Math.round((memoryGameData.score / memoryGameData.questions.length) * 100);

    let message = '';
    let emoji = '';

    if (percentage === 100) {
        message = "Perfect! You know me so well, Li Shy! 💕";
        emoji = "🏆";
    } else if (percentage >= 80) {
        message = "Amazing! You really pay attention to our relationship! 💖";
        emoji = "⭐";
    } else if (percentage >= 60) {
        message = "Good job! We have so many beautiful memories together! 💗";
        emoji = "👏";
    } else {
        message = "That's okay! Every day with you creates new memories! 💓";
        emoji = "💕";
    }

    gameContent.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">${emoji}</div>
            <h3 style="color: #ff6b9d; margin-bottom: 15px; font-size: 1.8rem;">
                Game Complete!
            </h3>
            <div style="background: linear-gradient(135deg, #ff6b9d, #9b59b6); color: white; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 10px;">
                    Your Score: ${memoryGameData.score}/${memoryGameData.questions.length} (${percentage}%)
                </p>
                <p style="font-size: 1.1rem; line-height: 1.6;">
                    ${message}
                </p>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button id="playAgainMemory" style="
                    background: linear-gradient(135deg, #ff6b9d, #9b59b6);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                ">
                    Play Again 🎮
                </button>
                <button id="closeMemoryGame" style="
                    background: white;
                    color: #ff6b9d;
                    border: 2px solid #ff6b9d;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                ">
                    Close Game 💕
                </button>
            </div>
        </div>
    `;

    // Add event listeners
    document.getElementById('playAgainMemory').addEventListener('click', function () {
        resetMemoryGame();
        showMemoryQuestion();
    });

    document.getElementById('closeMemoryGame').addEventListener('click', closeMemoryGame);
}

function updateMemoryScore() {
    const scoreElement = document.getElementById('memoryScore');
    if (scoreElement) {
        scoreElement.textContent = memoryGameData.score;
    }
}

function closeMemoryGame() {
    const modal = document.getElementById('memoryGameModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.memory-game-container').style.transform = 'scale(0.8)';

        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Drawing Board
window.openDrawingBoard = function () {
    createDrawingBoard();
};

function createDrawingBoard() {
    const existingModal = document.getElementById('drawingModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'drawingModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const drawingContainer = document.createElement('div');
    drawingContainer.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    drawingContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #ff6b9d; font-family: 'Dancing Script', cursive; font-size: 2rem; margin-bottom: 10px;">
                🎨 Draw Something for Me 🎨
            </h2>
            <p style="color: #6c7293; font-size: 1rem;">
                Create a little drawing that I can treasure forever! 💕
            </p>
        </div>
        
        <div style="margin-bottom: 15px; text-align: center;">
            <div style="display: inline-flex; align-items: center; gap: 15px; background: #f8f9fa; padding: 10px; border-radius: 15px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="font-size: 0.9rem; color: #6c7293;">Color:</span>
                    <input type="color" id="drawingColor" value="#ff6b9d" style="width: 30px; height: 30px; border: none; border-radius: 50%; cursor: pointer;">
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="font-size: 0.9rem; color: #6c7293;">Size:</span>
                    <input type="range" id="drawingSize" min="1" max="20" value="5" style="width: 100px;">
                </div>
                <button id="clearDrawing" style="
                    background: #f44336;
                    color: white;
                    border: none;
                    padding: 5px 15px;
                    border-radius: 15px;
                    cursor: pointer;
                    font-size: 0.9rem;
                ">Clear</button>
            </div>
        </div>
        
        <div style="text-align: center; margin-bottom: 15px;">
            <canvas id="drawingCanvas" width="500" height="300" style="
                border: 2px solid #ff6b9d;
                border-radius: 15px;
                cursor: crosshair;
                background: white;
                max-width: 100%;
                height: auto;
            "></canvas>
        </div>
        
        <div style="text-align: center; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button id="saveDrawing" style="
                background: linear-gradient(135deg, #ff6b9d, #9b59b6);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">Save Drawing 💾</button>
            <button id="closeDrawing" style="
                background: white;
                color: #ff6b9d;
                border: 2px solid #ff6b9d;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">Close 💕</button>
        </div>
    `;

    modal.appendChild(drawingContainer);
    document.body.appendChild(modal);

    // Initialize canvas
    drawingBoard = document.getElementById('drawingCanvas');
    drawingContext = drawingBoard.getContext('2d');

    // Set up drawing
    setupDrawing();

    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        drawingContainer.style.transform = 'scale(1)';
    }, 100);

    // Event listeners
    document.getElementById('closeDrawing').addEventListener('click', closeDrawingBoard);
    document.getElementById('clearDrawing').addEventListener('click', clearDrawing);
    document.getElementById('saveDrawing').addEventListener('click', saveDrawing);

    // Close on background click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeDrawingBoard();
        }
    });

    document.body.style.overflow = 'hidden';
}

function setupDrawing() {
    const colorInput = document.getElementById('drawingColor');
    const sizeInput = document.getElementById('drawingSize');

    colorInput.addEventListener('change', function () {
        currentColor = this.value;
    });

    sizeInput.addEventListener('input', function () {
        currentSize = this.value;
    });

    // Mouse events
    drawingBoard.addEventListener('mousedown', startDrawing);
    drawingBoard.addEventListener('mousemove', draw);
    drawingBoard.addEventListener('mouseup', stopDrawing);
    drawingBoard.addEventListener('mouseout', stopDrawing);

    // Touch events
    drawingBoard.addEventListener('touchstart', handleTouch);
    drawingBoard.addEventListener('touchmove', handleTouch);
    drawingBoard.addEventListener('touchend', stopDrawing);

    // Set up context
    drawingContext.lineCap = 'round';
    drawingContext.lineJoin = 'round';
}

function startDrawing(e) {
    isDrawing = true;
    const rect = drawingBoard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawingContext.beginPath();
    drawingContext.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;

    const rect = drawingBoard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawingContext.lineWidth = currentSize;
    drawingContext.strokeStyle = currentColor;
    drawingContext.lineTo(x, y);
    drawingContext.stroke();
}

function stopDrawing() {
    isDrawing = false;
    drawingContext.beginPath();
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' :
        e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    drawingBoard.dispatchEvent(mouseEvent);
}

function clearDrawing() {
    drawingContext.clearRect(0, 0, drawingBoard.width, drawingBoard.height);
}

function saveDrawing() {
    const dataURL = drawingBoard.toDataURL();
    const link = document.createElement('a');
    link.download = 'drawing-for-my-love.png';
    link.href = dataURL;
    link.click();

    // Send email with drawing
    sendDrawingEmail(dataURL);

    // Show success message
    showSuccessMessage('Drawing saved and sent! 🎨💕');
}

function sendDrawingEmail(imageData) {
    // Send email using EmailJS
    const templateParams = {
        to_email: 'calebcarhart1110@gmail.com',
        from_name: 'Li Shy',
        subject: '💕 Li Shy Drew You Something Special!',
        message: 'Li Shy just created a beautiful drawing for you! Check the attachment.',
        drawing_data: imageData,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    if (typeof emailjs !== 'undefined' && window.EMAILJS_CONFIG) {
        // Check if EmailJS is properly configured
        if (window.EMAILJS_CONFIG.SERVICE_ID === 'YOUR_ACTUAL_SERVICE_ID_HERE' ||
            window.EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_ACTUAL_TEMPLATE_ID_HERE') {
            console.warn('EmailJS not configured - please update config.js with your actual EmailJS credentials');
            showSuccessMessage('Drawing saved locally (email not configured) 🎨📝');
            return;
        }

        emailjs.send(window.EMAILJS_CONFIG.SERVICE_ID, window.EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
            .then(function (response) {
                console.log('Drawing email sent successfully!', response.status, response.text);
                showSuccessMessage('Drawing emailed to you! 🎨💌');
            }, function (error) {
                console.log('Failed to send drawing email:', error);
                showSuccessMessage('Drawing saved locally (email failed) 🎨📝');
            });
    } else {
        console.warn('EmailJS not available or not configured');
        showSuccessMessage('Drawing saved locally (email not available) 🎨📝');
    }
}

function closeDrawingBoard() {
    const modal = document.getElementById('drawingModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'scale(0.8)';

        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    document.body.style.overflow = 'auto';
}

// Love Notes
window.openLoveNotes = function () {
    createLoveNotesModal();
};

function createLoveNotesModal() {
    const existingModal = document.getElementById('loveNotesModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'loveNotesModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const notesContainer = document.createElement('div');
    notesContainer.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    notesContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #ff6b9d; font-family: 'Dancing Script', cursive; font-size: 2rem; margin-bottom: 10px;">
                💌 Love Notes 💌
            </h2>
            <p style="color: #6c7293; font-size: 1rem;">
                Leave me a sweet message that I'll treasure forever! 💕
            </p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <textarea id="loveNoteText" placeholder="Write your sweet message here..." style="
                width: 100%;
                height: 150px;
                padding: 15px;
                border: 2px solid #ff6b9d;
                border-radius: 15px;
                font-family: inherit;
                font-size: 1rem;
                resize: vertical;
                box-sizing: border-box;
            "></textarea>
        </div>
        
        <div style="text-align: center; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button id="saveLoveNote" style="
                background: linear-gradient(135deg, #ff6b9d, #9b59b6);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">Send Love Note 💕</button>
            <button id="closeLoveNotes" style="
                background: white;
                color: #ff6b9d;
                border: 2px solid #ff6b9d;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">Close 💖</button>
        </div>
        
        <div id="savedNotes" style="margin-top: 25px;">
            <h3 style="color: #9b59b6; font-size: 1.2rem; margin-bottom: 15px; text-align: center;">
                Previous Love Notes 📝
            </h3>
            <div id="notesContainer"></div>
        </div>
    `;

    modal.appendChild(notesContainer);
    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        notesContainer.style.transform = 'scale(1)';
    }, 100);

    // Event listeners
    document.getElementById('saveLoveNote').addEventListener('click', saveLoveNote);
    document.getElementById('closeLoveNotes').addEventListener('click', closeLoveNotes);

    // Load saved notes
    loadSavedNotes();

    // Close on background click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeLoveNotes();
        }
    });

    document.body.style.overflow = 'hidden';
}

function saveLoveNote() {
    const noteText = document.getElementById('loveNoteText').value.trim();

    if (!noteText) {
        alert('Please write something sweet! 💕');
        return;
    }

    const note = {
        text: noteText,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    // Save to localStorage
    const savedNotes = JSON.parse(localStorage.getItem('loveNotes') || '[]');
    savedNotes.unshift(note);
    localStorage.setItem('loveNotes', JSON.stringify(savedNotes.slice(0, 10))); // Keep only last 10

    // Send email with love note
    sendLoveNoteEmail(note);

    // Clear textarea
    document.getElementById('loveNoteText').value = '';

    // Show success message
    showSuccessMessage('Love note sent! 💌💕');

    // Reload notes
    loadSavedNotes();
}

function sendLoveNoteEmail(note) {
    // Send email using EmailJS
    const templateParams = {
        to_email: 'calebcarhart1110@gmail.com',
        from_name: 'Li Shy',
        subject: '💌 Li Shy Sent You a Love Note!',
        message: `Li Shy just wrote you a sweet love note:\n\n"${note.text}"\n\nSent with love on ${note.date} at ${note.time}`,
        love_note: note.text,
        date: note.date,
        time: note.time
    };

    if (typeof emailjs !== 'undefined' && window.EMAILJS_CONFIG) {
        // Check if EmailJS is properly configured
        if (window.EMAILJS_CONFIG.SERVICE_ID === 'YOUR_ACTUAL_SERVICE_ID_HERE' ||
            window.EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_ACTUAL_TEMPLATE_ID_HERE') {
            console.warn('EmailJS not configured - please update config.js with your actual EmailJS credentials');
            showSuccessMessage('Note saved locally (email not configured) 📝');
            return;
        }

        emailjs.send(window.EMAILJS_CONFIG.SERVICE_ID, window.EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
            .then(function (response) {
                console.log('Love note email sent successfully!', response.status, response.text);
                showSuccessMessage('Email sent to you! 💌');
            }, function (error) {
                console.log('Failed to send love note email:', error);
                console.error('EmailJS error details:', error);
                showSuccessMessage('Note saved locally (email failed) 📝');
            });
    } else {
        console.warn('EmailJS not available or not configured');
        showSuccessMessage('Note saved locally (email not available) 📝');
    }
}

function loadSavedNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('loveNotes') || '[]');
    const notesContainer = document.getElementById('notesContainer');

    if (savedNotes.length === 0) {
        notesContainer.innerHTML = '<p style="text-align: center; color: #6c7293; font-style: italic;">No love notes yet. Write the first one! 💕</p>';
        return;
    }

    notesContainer.innerHTML = savedNotes.map(note => `
        <div style="
            background: linear-gradient(135deg, #fff8dc, #ffc0cb);
            padding: 15px;
            border-radius: 15px;
            margin-bottom: 15px;
            border-left: 4px solid #ff6b9d;
        ">
            <p style="color: #6c7293; font-size: 1rem; line-height: 1.6; margin-bottom: 10px;">
                "${note.text}"
            </p>
            <small style="color: #9b59b6; font-size: 0.9rem;">
                ${note.date} at ${note.time}
            </small>
        </div>
    `).join('');
}

function closeLoveNotes() {
    const modal = document.getElementById('loveNotesModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'scale(0.8)';

        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    document.body.style.overflow = 'auto';
}

// Playlist
window.openPlaylist = function () {
    createPlaylistModal();
};

function createPlaylistModal() {
    const existingModal = document.getElementById('playlistModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'playlistModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const playlistContainer = document.createElement('div');
    playlistContainer.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    const ourSongs = [
        { title: "Perfect", artist: "Ed Sheeran", emoji: "💕", message: "This song reminds me of you every time I hear it!" },
        { title: "All of Me", artist: "John Legend", emoji: "💖", message: "You're my all, just like this song says." },
        { title: "Thinking Out Loud", artist: "Ed Sheeran", emoji: "💗", message: "I'll love you until we're 70 and beyond!" },
        { title: "Can't Help Myself", artist: "Four Tops", emoji: "💝", message: "I literally can't help myself when it comes to loving you!" },
        { title: "Make You Feel My Love", artist: "Adele", emoji: "💓", message: "I'd do anything to make you feel my love." },
        { title: "A Thousand Years", artist: "Christina Perri", emoji: "💘", message: "I've loved you for a thousand years, I'll love you for a thousand more." }
    ];

    playlistContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #ff6b9d; font-family: 'Dancing Script', cursive; font-size: 2rem; margin-bottom: 10px;">
                🎵 Our Love Playlist 🎵
            </h2>
            <p style="color: #6c7293; font-size: 1rem;">
                Songs that remind me of you and our love! 💕
            </p>
        </div>
        
        <div style="margin-bottom: 20px;">
            ${ourSongs.map(song => `
                <div style="
                    background: linear-gradient(135deg, #fff8dc, #ffc0cb);
                    padding: 20px;
                    border-radius: 15px;
                    margin-bottom: 15px;
                    border-left: 4px solid #ff6b9d;
                    transition: transform 0.3s ease;
                    cursor: pointer;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 2rem;">${song.emoji}</div>
                        <div style="flex: 1;">
                            <h4 style="color: #ff6b9d; margin-bottom: 5px; font-size: 1.2rem;">
                                ${song.title}
                            </h4>
                            <p style="color: #9b59b6; font-size: 0.9rem; margin-bottom: 8px;">
                                by ${song.artist}
                            </p>
                            <p style="color: #6c7293; font-size: 0.9rem; font-style: italic;">
                                ${song.message}
                            </p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div style="text-align: center;">
            <button id="closePlaylist" style="
                background: linear-gradient(135deg, #ff6b9d, #9b59b6);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">Close Playlist 💕</button>
        </div>
    `;

    modal.appendChild(playlistContainer);
    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        playlistContainer.style.transform = 'scale(1)';
    }, 100);

    // Event listeners
    document.getElementById('closePlaylist').addEventListener('click', closePlaylist);

    // Close on background click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closePlaylist();
        }
    });

    document.body.style.overflow = 'hidden';
}

function closePlaylist() {
    const modal = document.getElementById('playlistModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'scale(0.8)';

        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    document.body.style.overflow = 'auto';
}

// Utility function
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10001;
        animation: slideInRight 0.5s ease-out;
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Add CSS animations
if (!document.querySelector('#games-styles')) {
    const style = document.createElement('style');
    style.id = 'games-styles';
    style.textContent = `
        @keyframes slideIn {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
} 