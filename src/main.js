
const phrase_area = document.getElementById('promt2video');

document.getElementById("phraseForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    phrase_area.innerText = "Loading";
    
    // Get the entered phrase from the form input
    const persona = document.querySelector('input[name="persona"]').value;
    const greetText = document.querySelector('input[name="greetText"]').value;
    let index = 0;
    const loader_for_phrase = setInterval(() => {
        if (index < 3) {
            index++;
            phrase_area.innerHTML += ".";
        }
        else {
            index = 0;
            phrase_area.innerText = "Loading";
        }
    }, 333);

    const requestData = {
        "model": "mistral",
        "system":`Answer as ${persona}; response text must be a plain text without: emojies, hashtags, unfinished sentances or questions.`,
        "prompt": greetText,
        "temperature":0.9,
        "stream": true,
        "max_token": 99
    };
    
    
    // Send a request to the server with the entered phrase
    fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData) // Stringify the object before sending
    })
    .then(response => response.text())
    .then(responseText => {
        // Split the response text by newline characters
        const responses = responseText.trim().split('\n');
        
        // Parse each JSON object separately
        let words = [];
        responses.forEach(jsonString => {
            const jsonObject = JSON.parse(jsonString);
            const text = jsonObject.response;
            words.push(text);
        });
        // Clear the phrase area from Loader
        phrase_area.innerText = "";
        clearInterval(loader_for_phrase);
        // Display the response text in the phrase area
        words.forEach((word, id) => {
            setTimeout(() => {
                phrase_area.innerHTML += word;
            }, id * 10);
        });
    })
    .catch(error => {
        console.error('Error fetching or parsing data:', error);
        clearInterval(loader_for_phrase);
        phrase_area.innerText = "Error fetching or parsing data from server. Please try again.";
    });
});