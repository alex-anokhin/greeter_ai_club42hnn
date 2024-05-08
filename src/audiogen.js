document.getElementById("promt2videoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    let audioPlayerDiv = document.getElementById("audioPlayer");
    let audioLoader = document.createElement("div");
    audioLoader.innerHTML = "Loading";
    audioPlayerDiv.appendChild(audioLoader);

    let index = 0;
    const loader_for_audio = setInterval(() => {
        if (index < 4) {
            index++;
            audioLoader.innerHTML += ".";
        } else {
            index = 0;
            audioLoader.innerHTML = "Loading";
        }
    }, 333);

    function createAudioPlayer(audioUrl) {
        let audio = document.createElement("audio");
        audio.controls = true;
        audio.src = audioUrl;
        audioPlayerDiv.appendChild(audio);
    }

    phrase = document.getElementById("promt2video").value;
    persona = document.querySelector('select[name="persona"]').value.toLowerCase();

    fetch('http://localhost:5053/tts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: phrase,
            persona: persona
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob(); // Convert response to Blob object
    })
    .then(blob => {
        clearInterval(loader_for_audio); // Clear loader interval
        audioLoader.innerHTML = ""; // Clear loader
        let audioUrl = URL.createObjectURL(blob);
        // console.log('Received audio URL:', audioUrl);
        createAudioPlayer(audioUrl);
    })
    .catch(error => console.error('Error:', error));
});
