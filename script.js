// Your script here.
  const synth = window.speechSynthesis;

    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voice-select');
    const rate = document.getElementById('rate');
    const pitch = document.getElementById('pitch');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');

    let voices = [];
    let utterance;

    // Populate voice options
    function populateVoices() {
      voices = synth.getVoices();
      voiceSelect.innerHTML = voices
        .map(
          (voice) =>
            `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
        )
        .join('');
    }

    synth.addEventListener('voiceschanged', populateVoices);

    // Set up utterance and start speaking
    function startSpeaking() {
      if (synth.speaking) {
        synth.cancel(); // Stop any ongoing speech
      }

      utterance = new SpeechSynthesisUtterance(textInput.value);
      const selectedVoice = voices.find(
        (voice) => voice.name === voiceSelect.value
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = rate.value;
      utterance.pitch = pitch.value;

      synth.speak(utterance);
    }

    // Stop speaking
    function stopSpeaking() {
      synth.cancel();
    }

    // Event listeners
    startButton.addEventListener('click', startSpeaking);
    stopButton.addEventListener('click', stopSpeaking);

    // Populate voices when page loads
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoices;
    }