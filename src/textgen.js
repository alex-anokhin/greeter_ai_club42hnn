document.getElementById("phraseForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    let phrase_area = document.getElementById('promt2video');
    phrase_area.value = "Loading";
    
    // Get the entered phrase from the form input
    let persona = document.querySelector('select[name="persona"]').value;
    let greetText = document.querySelector('input[name="greetText"]').value;
    const checkedRadioButton = document.querySelector('input[name="language"]:checked');
    // Get the value of the checked radio button
    const selectedLanguage = checkedRadioButton ? checkedRadioButton.value : null;
    // Log the selected language
    if (selectedLanguage == "en") {
        language = "english";
    } else if (selectedLanguage == "ru") {
        language = "russian";
    } else if (selectedLanguage == "fr") {
        language = "french";
    } else if (selectedLanguage == "de") {
        language = "german";
    } else if (selectedLanguage == "es") {
        language = "spanish";
    } else if (selectedLanguage == "it") {
        language = "italian";
    }

    let index = 0;
    const loader_for_phrase = setInterval(() => {
        if (index < 3) {
            index++;
            phrase_area.value += ".";
        }
        else {
            index = 0;
            phrase_area.value = "Loading";
        }
    }, 333);

    let requestData = { // for ollama server
        "model": "llama3",
        // "system":`Answer as ${persona}, response must be a plain text without: emojies, hashtags, unfinished sentances and questions; use less than 50 words.`,
        "system":`You are ${persona}, use ${language} language for answer, use less than 50 words for answer, do not use emojies or hashtags.`,
        "persona": persona,
        "language": language,
        // "stream": true,
        "prompt": greetText,
        // "options": {
        //     "stop": ["#"],
        //     "num_predict": 99,
        //     "temperature":0.9,
        //     "top_p": 0.5,
        //     "top_k": 25,
        //     "presence_penalty": 0.5
        // }
    };

    let requestData2 = { // for llama-cpp-python server
            "model": "llama3_local",
            "messages": [
              {
                "role": "system",
                "content": `You are ${persona}, use ${language} language for answer, use less than 50 words for answer, do not use emojies or hashtags.`
              },
              {
                "role": "user",
                "content": greetText
              }
            ],
            "max_tokens": 100,
            "temperature": 0.3,
            "stop": ["#"],
            "num_predict": 99,
            "top_p": 0.5,
            "top_k": 25,
            "presence_penalty": 0.5
          }
    
    // Send a request to the server with the entered phrase
    fetch('/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData2) // Stringify the object before sending
    })
    .then(response => response.json()) // Assuming the server sends a JSON response
    .then(responseJson => {
        // console.log('Response:', responseJson.choices[0].message.content.trim());
        const text = responseJson.choices[0].message.content.trim();
        const words = text.split(' '); // Split the text into individual words

        // // Clear the phrase area from Loader
        phrase_area.value = "";
        clearInterval(loader_for_phrase);

        // // Display each word with a delay
        words.forEach((word, index) => {
            setTimeout(() => {
                phrase_area.value += (index > 0 ? ' ' : '') + word; // Add space between words
            }, index * 15); // Adjust the delay as needed (currently 500ms)
        });
    })
    .catch(error => {
        console.error('Error fetching or parsing data:', error);
        clearInterval(loader_for_phrase);
        phrase_area.value = "Error fetching or parsing data from server. Please try again.";
    });
});