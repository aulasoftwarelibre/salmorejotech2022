const texts = ["Cordobés...", "Tecnológico...", "Salmorejo..."]
const textDisplay = document.getElementById('typingText')

/**
 * Control TypingEffect Vars
 */
let textsIterator = 0;
let wordIterator = 0;
let isErasing = false;
let currentPhrase = [];

const TypingEffect = () => {
  /**
   * Random timing
   */
  const speed = 250; 
  const MinimumTimeMs = speed * 0.50;
  const MaximumTimeMs = speed * 1.50;
  const diff = MaximumTimeMs - MinimumTimeMs
  const timing = MinimumTimeMs + Math.floor(Math.random() * diff)

  /** Behaviour */
  textDisplay.textContent = currentPhrase.join('')
  if (textsIterator < texts.length) {
    if (!isErasing) {
      currentPhrase.push(texts[textsIterator][wordIterator])
      if (wordIterator === texts[textsIterator].length) {
        isErasing = true
      }
      else wordIterator++;
    }
    if (isErasing) {
      currentPhrase.pop()
      if (wordIterator === 0) {
        isErasing = false;
        textsIterator++;
      }
      else wordIterator--;
    }
  }
  else textsIterator = 0;
  
  setTimeout(TypingEffect, timing);
}

TypingEffect();