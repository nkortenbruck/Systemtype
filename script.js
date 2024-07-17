// Globale Variablen für die Animation
let animationInterval;
let isAnimating = false;

// Funktion zur Anwendung des Schriftgewichts
function applyFontWeight(fontWeight) {
    const textField = document.getElementById('textfeld');
    textField.style.fontVariationSettings = `'wght' ${fontWeight}`;
    textField.style.transition = 'font-variation-settings 0.1s ease-in-out';
}

// Event Listener für die Änderung der Schriftgröße
document.getElementById('fontSize').addEventListener('input', function() {
    const fontSize = this.value + 'px';
    document.getElementById('textfeld').style.fontSize = fontSize;
});

// Event Listener für die Änderung der Schriftfamilie
document.querySelectorAll('.font-button').forEach(button => {
    button.addEventListener('click', function() {
        const selectedFont = this.getAttribute('data-font');
        document.getElementById('textfeld').style.fontFamily = selectedFont;
        document.querySelectorAll('.font-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

// Event Listener für die Änderung der Textfarbe
document.getElementById('textColor').addEventListener('input', function() {
    const textColor = this.value;
    document.getElementById('textfeld').style.color = textColor;
});

// Event Listener für die Änderung der Hintergrundfarbe
document.getElementById('bgColor').addEventListener('input', function() {
    const bgColor = this.value;
    document.getElementById('textfeld').style.backgroundColor = bgColor;
});

// Event Listener für die Änderung des Optical-size Wertes
document.getElementById('fontWeight').addEventListener('input', function() {
    const opticalSize = this.value; // Wert von 100 bis 900
    applyOpticalSize(opticalSize);
});
// Event Listener für die Änderung des Letter Spacing
document.getElementById('letterSpacing').addEventListener('input', function() {
    var value = this.value;
    document.getElementById('textfeld').style.letterSpacing = value + 'px';
});

// Event Listener für die Änderung des Line Height
document.getElementById('lineHeight').addEventListener('input', function() {
    var value = this.value;
    document.getElementById('textfeld').style.lineHeight = value;
});
// Funktion zur Anwendung des Optical-size Wertes
function applyOpticalSize(opticalSize) {
    const textField = document.getElementById('textfeld');
    textField.style.fontVariationSettings = `'opsz' ${opticalSize}`;
    textField.style.transition = 'font-variation-settings 0.1s ease-in-out';
}

// Animation für das Optical-size
document.getElementById('playButton').addEventListener('click', function() {
    if (isAnimating) {
        clearInterval(animationInterval);
        isAnimating = false;
        this.style.clipPath = 'polygon(0% 0%, 100% 50%, 0% 100%)'; // Dreieck nach rechts zeigen
    } else {
        let currentOpticalSize = parseInt(document.getElementById('fontWeight').value); // Startwert
        let direction = 1; // Richtung der Animation
        const speed = parseInt(document.getElementById('animationSpeed').value); // Geschwindigkeit der Animation
        const step = 10; // Schrittweite der Animation

        animationInterval = setInterval(() => {
            currentOpticalSize += direction * step;

            // Richtung umkehren, wenn Grenzen erreicht werden
            if (currentOpticalSize >= 900 || currentOpticalSize <= 100) {
                direction *= -1;
            }

            applyOpticalSize(currentOpticalSize); // Optical-size anwenden
            document.getElementById('fontWeight').value = currentOpticalSize; // Wert des Reglers aktualisieren
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

// Event Listener für die Stylistic Sets
document.querySelectorAll('.set-button').forEach(button => {
    button.addEventListener('click', function() {
        const selectedSet = this.getAttribute('data-set');
        applyStylisticSet(selectedSet);
    });
});

// Funktion zur Anwendung des Stylistic Sets
function applyStylisticSet(set) {
    const textField = document.getElementById('textfeld');
    let featureSetting;

    switch (set) {
      case '1':
            featureSetting = "normal"; // Setzt die Feature-Settings auf die Standardwerte zurück
            break;
        case '2':
            featureSetting = "'ss01' 1"; // Aktiviert ss01
            break;
        case '3':
            featureSetting = "'ss02' 1"; // Aktiviert ss02
            break;
        case '4':
            featureSetting = "'ss03' 1"; // Aktiviert ss03
            break;
        case '5':
            featureSetting = "'ss04' 1"; // Aktiviert ss04
            break;
        default:
            featureSetting = ""; // Keine Änderungen
    }

    textField.style.fontFeatureSettings = featureSetting; // CSS für die OpenType-Features
    textField.style.transition = 'font-feature-settings 0.1s ease-in-out';
}

document.addEventListener("DOMContentLoaded", function() {
    // Definiere das komplette Glyphen-Set mit Zeilenumbrüchen
    var glyphs = "AÄBCDEFGHIJKLMNOÖPQRSTUÜVWXYZ\naäbcdefghijklmnoöpqrstuüvwxyzß\n" +
                 "ÀÁÂÃÄÅÇĆČÈÉÊËĚÌÍÎÏÑŃÒÓÔÕÖÙÚÛÜŸÝŽŹ\n" +
                 "àáâãåçćčèéêëěìíîïñńòóôõùúûÿýžź\n" +
                 "0123456789\n@©#$€¢¥%&*\n()_+[]|;:',./?!\"«»‹›\n×+−÷%=≠←↑→↓↔↕↖↗↘↙";
    
    // Setze den Glyphen-Set als data-placeholder
    document.getElementById("textfeld").setAttribute("data-placeholder", glyphs);
});

document.addEventListener("DOMContentLoaded", function() {
    var popupBtn = document.getElementById("popupBtn");
    var popup = document.getElementById("popup");
    var closeBtn = document.querySelector(".close");

    popupBtn.onclick = function() {
        popup.style.display = "flex";
    }

    closeBtn.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
});