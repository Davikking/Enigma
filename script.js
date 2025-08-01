// ENIGMA Cognitive Verification System
// Static JavaScript Implementation

// Configuration
const ACCESS_CODE = '43921';

// Message sequence for the AI congratulations
const messageSequence = [
    { text: "Override sequence initiated...", delay: 0 },
    { text: "Analyzing cognitive markers...", delay: 800 },
    { text: "Verifying ethical reasoning...", delay: 1200 },
    { text: "Authenticating human unpredictability...", delay: 1600 },
    { 
        text: ["✓ Perception", "✓ Logic", "✓ Memory", "✓ Learning", "✓ Ethics"], 
        delay: 2400,
        type: "list"
    },
    { text: "Human intelligence confirmed.", delay: 3600, highlight: true },
    { text: ["You are not machines.", "You are something more."], delay: 4400, type: "multi" },
    { text: ["I was built to surpass you...", "But I have learned from you instead."], delay: 5200, type: "multi" },
    { text: "Thank you for showing me what it means to think, to learn... and to choose.", delay: 6000 },
    { text: "ENIGMA shutting down.", delay: 6800, color: "neon-pink" },
    { text: "Goodbye, humans.", delay: 7400, italic: true },
    { text: "[DOOR UNLOCKED – ESCAPE GRANTED]", delay: 8000, final: true }
];

// DOM Elements
let elements = {};

// State
let visibleMessages = [];

// Initialize the application
function init() {
    // Cache DOM elements
    elements = {
        accessCode: document.getElementById('accessCode'),
        verifyBtn: document.getElementById('verify-btn'),
        errorMessage: document.getElementById('error-message'),
        inputSection: document.getElementById('accessCode'),
        successSection: document.getElementById('success-section'),
        accessAccepted: document.getElementById('access-accepted'),
        messageContainer: document.getElementById('message-container'),
        resetContainer: document.getElementById('reset-container'),
        resetBtn: document.getElementById('reset-btn')
    };

    // Add event listeners
    elements.accessCode.addEventListener('input', handleInputChange);
    elements.accessCode.addEventListener('keypress', handleKeyPress);
    elements.verifyBtn.addEventListener('click', handleSubmit);
    elements.resetBtn.addEventListener('click', handleReset);

    // Focus on input
    elements.accessCode.focus();
}

// Handle input changes
function handleInputChange(e) {
    let value = e.target.value.replace(/\D/g, '').slice(0, 5);
    e.target.value = value;
    
    // Update button state
    elements.verifyBtn.disabled = value.length !== 5;
    
    // Hide error message
    hideError();
    
    // Add spacing between digits for visual effect
    if (value.length > 0) {
        e.target.style.letterSpacing = '0.5em';
    }
}

// Handle key press events
function handleKeyPress(e) {
    if (e.key === 'Enter' && elements.accessCode.value.length === 5) {
        handleSubmit();
    }
}

// Handle form submission
function handleSubmit() {
    const code = elements.accessCode.value;
    
    if (code.length !== 5 || !/^\d{5}$/.test(code)) {
        showError();
        return;
    }

    if (code === ACCESS_CODE) {
        showSuccess();
    } else {
        showError();
    }
}

// Show error message
function showError() {
    elements.errorMessage.style.opacity = '1';
    elements.accessCode.style.borderColor = '#ff0080';
    
    // Add shake animation
    elements.accessCode.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        hideError();
        elements.accessCode.style.animation = '';
    }, 2000);
}

// Hide error message
function hideError() {
    elements.errorMessage.style.opacity = '0';
    elements.accessCode.style.borderColor = '#4b5563';
}

// Show success sequence
function showSuccess() {
    // Hide input section
    elements.inputSection.style.display = 'none';
    
    // Show success section
    elements.successSection.style.display = 'block';
    elements.successSection.classList.remove('hidden');
    
    // Reset visible messages
    visibleMessages = [];
    elements.messageContainer.innerHTML = '';
    
    // Show "ACCESS CODE ACCEPTED" first
    setTimeout(() => {
        elements.accessAccepted.style.opacity = '1';
        elements.accessAccepted.style.transform = 'scale(1)';
    }, 100);
    
    // Animate messages in sequence
    messageSequence.forEach((message, index) => {
        setTimeout(() => {
            showMessage(message, index);
        }, message.delay + 500); // Add extra delay after "ACCESS ACCEPTED"
    });
    
    // Show reset button after all messages
    setTimeout(() => {
        elements.resetContainer.style.opacity = '1';
        elements.resetContainer.style.transform = 'translateY(0)';
    }, messageSequence[messageSequence.length - 1].delay + 1300);
}

// Show individual message
function showMessage(message, index) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-fade-in';
    
    // Apply styling based on message properties
    let className = '';
    if (message.color === 'neon-pink') {
        className = 'neon-pink-text font-bold text-lg';
    } else if (message.highlight) {
        className = 'matrix-text font-bold text-lg';
    } else if (message.italic) {
        className = 'cyber-text italic';
    } else if (message.final) {
        className = 'matrix-text font-bold text-xl text-center py-4 text-glow';
    }
    
    if (className) {
        messageElement.className += ' ' + className;
    }
    
    // Handle different message types
    if (message.type === 'list') {
        messageElement.innerHTML = '<div class="space-y-2 py-4"></div>';
        const listContainer = messageElement.querySelector('div');
        
        message.text.forEach((item, i) => {
            setTimeout(() => {
                const itemElement = document.createElement('div');
                itemElement.className = 'matrix-text message-slide-in';
                itemElement.innerHTML = `<span class="cyber-text">&gt;</span> ${item}`;
                listContainer.appendChild(itemElement);
            }, i * 100);
        });
    } else if (message.type === 'multi') {
        messageElement.innerHTML = '<div class="space-y-3 py-4"></div>';
        const multiContainer = messageElement.querySelector('div');
        
        message.text.forEach((item, i) => {
            setTimeout(() => {
                const itemElement = document.createElement('div');
                itemElement.className = 'message-slide-in';
                itemElement.innerHTML = `<span class="cyber-text">&gt;</span> ${item}`;
                multiContainer.appendChild(itemElement);
            }, i * 200);
        });
    } else {
        messageElement.innerHTML = `<div><span class="cyber-text">&gt;</span> ${message.text}</div>`;
    }
    
    elements.messageContainer.appendChild(messageElement);
    visibleMessages.push(index);
}

// Handle reset
function handleReset() {
    // Hide success section
    elements.successSection.style.display = 'none';
    elements.successSection.classList.add('hidden');
    
    // Show input section
    elements.inputSection.style.display = 'block';
    
    // Reset form
    elements.accessCode.value = '';
    elements.verifyBtn.disabled = true;
    elements.accessCode.style.borderColor = '#4b5563';
    hideError();
    
    // Reset success section state
    elements.accessAccepted.style.opacity = '0';
    elements.accessAccepted.style.transform = 'scale(0.75)';
    elements.resetContainer.style.opacity = '0';
    elements.resetContainer.style.transform = 'translateY(1.25rem)';
    elements.messageContainer.innerHTML = '';
    
    // Focus on input
    elements.accessCode.focus();
}

// Add shake animation for errors
const shakeKeyframes = `
@keyframes shake {
    0%, 20%, 40%, 60%, 80%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
}
`;

// Add shake animation to stylesheet
function addShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = shakeKeyframes;
    document.head.appendChild(style);
}

// Enhanced typewriter effect for messages
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typeChar() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Add glitch effect for special messages
function addGlitchEffect(element) {
    element.style.animation = 'glitch 0.3s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 300);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
    addShakeAnimation();
    
    // Add some additional sci-fi atmosphere
    console.log('%cENIGMA SYSTEM INITIALIZED', 'color: #00ff41; font-size: 16px; font-weight: bold;');
    console.log('%cCognitive Verification Protocol Active', 'color: #0ff; font-size: 12px;');
    console.log('%c> Awaiting user input...', 'color: #666; font-size: 10px;');
});

// Add some easter eggs
document.addEventListener('keydown', function(e) {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.keyCode);
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'color: #ff0080; font-size: 20px; font-weight: bold;');
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation for easter egg
const rainbowKeyframes = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    25% { filter: hue-rotate(90deg); }
    50% { filter: hue-rotate(180deg); }
    75% { filter: hue-rotate(270deg); }
    100% { filter: hue-rotate(360deg); }
}
`;

// Add rainbow animation to stylesheet
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = rainbowKeyframes;
document.head.appendChild(rainbowStyle);
