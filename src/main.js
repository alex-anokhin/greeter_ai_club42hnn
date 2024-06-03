document.addEventListener("DOMContentLoaded", function() {
    let personaDropdown = document.getElementById("personaDropdown");
    let videoPlayerDiv = document.getElementById("videoPlayer");
    let heroImg;
    
    function updateHeroImage(persona) {
        heroVideo = document.getElementById("heroVideo");
        if (heroVideo) {
            heroVideo.remove();
            heroImg = document.createElement("img");
            videoPlayerDiv.appendChild(heroImg);
        }
        if (!heroImg) {
            // videoPlayerDiv.innerHTML = ""; // Clear the video player div
            heroImg = document.createElement("img");
            videoPlayerDiv.appendChild(heroImg);
        }
        heroImg.src = `img/${persona.toLowerCase()}.jpeg`;
        heroImg.alt = persona;
        // heroImg.id = "heroImage";
    }
    
    // Initialize with the selected persona
    updateHeroImage(personaDropdown.value);
    
    // Event listener to change the image on persona change
    personaDropdown.addEventListener("change", function() {
        updateHeroImage(this.value);
    });
});
