// Define the phrases array
let phrases = [
    "adjusting the lighting",
    "positioning the camera",
    "tidying the background",
    "choosing the outfit",
    "practicing posture and body language",
    "calming the nerves",
    "setting up the microphone",
    "applying the makeup",
    "doing the hair"
];

// Function to get a random phrase from the phrases array
function getRandomPhrase(phrases) {
    let randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

// Variables to manage the loader intervals
let phraseInterval;
let dotInterval;

// Function to start the loader
function startLoader() {
    let videoPlayerDiv = document.getElementById("videoPlayer");

    let loaderText = document.createElement("div");
    loaderText.id = "loaderText";

    let loaderPersona = document.createElement("span");
    loaderPersona.id = "loaderPersona";
    let persona = document.querySelector('select[name="persona"]').value;
    loaderPersona.innerHTML = persona + " is ";

    let loaderPhrase = document.createElement("span");
    loaderPhrase.id = "loaderPhrase";
    loaderPhrase.innerHTML = getRandomPhrase(phrases);

    let loadingDots = document.createElement("span");
    loadingDots.id = "loadingDots";
    loadingDots.innerHTML = "";

    // Append elements to the DOM
    loaderText.appendChild(loaderPersona);
    loaderText.appendChild(loaderPhrase);
    loaderText.appendChild(loadingDots);
    videoPlayerDiv.appendChild(loaderText);

    // Update the random phrase every 3 seconds
    phraseInterval = setInterval(() => {
        loaderPhrase.innerHTML = getRandomPhrase(phrases);
    }, 3000);

    // Update the loading dots every 0.25 seconds
    let dotIndex = 0;
    dotInterval = setInterval(() => {
        dotIndex = (dotIndex + 1) % 5; // cycle through 0, 1, 2, 3, 4
        loadingDots.innerHTML = ".".repeat(dotIndex);
    }, 330);
}

// Function to stop the loader
function stopLoader() {
    clearInterval(phraseInterval); // Clear the phrase interval
    clearInterval(dotInterval); // Clear the dot interval

    // Remove the loader from the DOM
    let loaderText = document.getElementById("loaderText");
    if (loaderText) {
        loaderText.remove();
    }
}
