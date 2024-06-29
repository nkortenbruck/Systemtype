// Globale Variablen für die Animation
let animationInterval;
let isAnimating = false;

// Event Listener für die Änderung der Schriftgröße
document.getElementById('fontSize').addEventListener('input', function() {
    var fontSize = this.value + 'px';
    document.getElementById('textfeld').style.fontSize = fontSize;
});

// Event Listener für die Änderung der Schriftfamilie
document.querySelectorAll('.font-button').forEach(button => {
    button.addEventListener('click', function() {
        var selectedFont = this.getAttribute('data-font');
        document.getElementById('textfeld').style.fontFamily = selectedFont;
    });
});

// Event Listener für die Änderung der Textfarbe
document.getElementById('textColor').addEventListener('input', function() {
    var textColor = this.value;
    document.getElementById('textfeld').style.color = textColor;
});

// Event Listener für die Änderung der Hintergrundfarbe
document.getElementById('bgColor').addEventListener('input', function() {
    var bgColor = this.value;
    document.getElementById('textfeld').style.backgroundColor = bgColor;
});

// Event Listener für die Änderung des Schriftgewichts
document.getElementById('fontWeight').addEventListener('input', function() {
    var fontWeight = this.value;
    applyFontWeight(fontWeight);
});

function applyFontWeight(opszValue) {
    const textField = document.getElementById('textfeld');
    textField.style.fontVariationSettings = `'opsz' ${opszValue}, 'wght' ${opszValue}`;
    textField.style.transition = 'font-variation-settings 0.1s ease-in-out'; // "ease-in-out" Effekt hinzufügen
}

document.getElementById('playButton').addEventListener('click', function() {
    if (isAnimating) {
        clearInterval(animationInterval);
        isAnimating = false;
        this.style.clipPath = 'polygon(0% 0%, 100% 50%, 0% 100%)'; // Dreieck nach rechts zeigen
    } else {
        let currentWeight = parseInt(document.getElementById('fontWeight').value); // Startwert
        let direction = 1; // Richtung der Animation
        const speed = parseInt(document.getElementById('animationSpeed').value); // Geschwindigkeit der Animation
        const step = 10; // Schrittweite der Animation

        animationInterval = setInterval(() => {
            currentWeight += direction * step;

            // Richtung umkehren, wenn Grenzen erreicht werden
            if (currentWeight >= 900 || currentWeight <= 100) {
                direction *= -1;
            }

            applyFontWeight(currentWeight); // Font-Gewicht anwenden
            document.getElementById('fontWeight').value = currentWeight; // Wert des Reglers aktualisieren
        }, 1000 / speed);

        isAnimating = true;
        this.style.clipPath = 'polygon(0% 0%, 0% 100%, 100% 50%)'; // Dreieck nach unten zeigen
    }
});


// Platzhalter anzeigen/verbergen
const textfeld = document.getElementById('textfeld');

textfeld.addEventListener('focus', function() {
    if (this.textContent === '') {
        this.classList.remove('placeholder');
    }
});

textfeld.addEventListener('blur', function() {
    if (this.textContent === '') {
        this.classList.add('placeholder');
    }
});
