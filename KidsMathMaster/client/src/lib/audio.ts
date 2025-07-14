// Audio feedback system using Web Audio API
class AudioManager {
  private audioContext: AudioContext | null = null;
  private initialized = false;

  private async initialize() {
    if (this.initialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.initialized = true;
    } catch (error) {
      console.warn('Audio context not available:', error);
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  async playSuccess() {
    await this.initialize();
    if (!this.audioContext) return;

    // Success sound: ascending notes
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.createTone(note, 0.2, 'sine');
      }, index * 100);
    });
  }

  async playError() {
    await this.initialize();
    if (!this.audioContext) return;

    // Error sound: descending notes
    this.createTone(220, 0.3, 'square');
    setTimeout(() => {
      this.createTone(196, 0.3, 'square');
    }, 150);
  }

  async playInstruction() {
    await this.initialize();
    if (!this.audioContext) return;

    // Instruction sound: gentle chime
    this.createTone(440, 0.5, 'sine');
    setTimeout(() => {
      this.createTone(880, 0.3, 'sine');
    }, 200);
  }

  async playClick() {
    await this.initialize();
    if (!this.audioContext) return;

    // Click sound: short beep
    this.createTone(800, 0.1, 'sine');
  }

  async speakText(text: string, onWordHighlight?: (word: string, index: number) => void) {
    if ('speechSynthesis' in window && text && text.length > 0) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.6; // Much slower speech for kids
      utterance.pitch = 1.0; // Normal pitch for softer voice
      utterance.volume = 0.7; // Softer volume
      
      // Try to use a female voice first, then Robert as fallback
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Woman') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Allison') ||
        voice.name.includes('Susan') ||
        voice.name.includes('Zoe') ||
        voice.name.includes('Ava') ||
        voice.name.includes('Emma') ||
        (voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female'))
      ) || voices.find(voice => voice.lang.startsWith('en') && !voice.name.toLowerCase().includes('male'))
        || voices.find(voice => voice.name.includes('Robert'));
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      // Add word boundary event for highlighting
      if (onWordHighlight && text) {
        const words = text.split(' ').filter(word => word.length > 0);
        let wordIndex = 0;
        
        utterance.addEventListener('boundary', (event) => {
          if (event.name === 'word' && wordIndex < words.length) {
            onWordHighlight(words[wordIndex], wordIndex);
            wordIndex++;
          }
        });
      }
      
      speechSynthesis.speak(utterance);
    }
  }
}

const audioManager = new AudioManager();

export const playSound = async (type: 'success' | 'error' | 'instruction' | 'click') => {
  try {
    switch (type) {
      case 'success':
        await audioManager.playSuccess();
        break;
      case 'error':
        await audioManager.playError();
        break;
      case 'instruction':
        await audioManager.playInstruction();
        break;
      case 'click':
        await audioManager.playClick();
        break;
    }
  } catch (error) {
    console.warn('Audio playback failed:', error);
  }
};

export const speakText = async (text: string, onWordHighlight?: (word: string, index: number) => void) => {
  try {
    await audioManager.speakText(text, onWordHighlight);
  } catch (error) {
    console.warn('Text-to-speech failed:', error);
  }
};
