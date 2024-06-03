document.getElementById("promt2videoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    let videoPlayerDiv = document.getElementById("videoPlayer");

    function createVideoPlayer(videoUrl) {
        let video = document.createElement("video");
        video.src = videoUrl;
        video.controls = true;
        video.autoplay = true;
        video.id = "heroVideo";
        videoPlayerDiv.innerHTML = ""; // Clear the video player div
        videoPlayerDiv.appendChild(video);
    }

    const phrase = document.getElementById("promt2video").value;
    const persona = document.querySelector('select[name="persona"]').value.toLowerCase();

    // Get the checked radio button
    const lang = document.querySelector('input[name="language"]:checked').value;

    // Get the value of the checked radio button
    // const selectedLanguage = checkedRadioButton ? checkedRadioButton.value : null;

    // Log the selected language
    console.log(lang);
    startLoader(); // Start loader before fetch
    // let url = `http://localhost:5052/infer_image?frame_path=/Users/alexanokhin/Documents/ai42club/greeter_ai_club42hnn/Lip_Wise/target/batman.jpg&audio_path=/Users/alexanokhin/Documents/ai42club/greeter_ai_club42hnn/Lip_Wise/target/thor.mp3&pad=0&align_3d=false&face_restorer=None&fps=25&mel_step_size=16&weight=0.5&upscale_bg=false&bgupscaler=RealESRGAN_x4plus&gan=true`;
    fetch('http://localhost:5052/w2l_image', {
    // fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "*/*"
        },
        body: JSON.stringify({
            "text": phrase,
            "persona": persona,
            "language": lang,
            "face_restorer": "None",
        })
    })
    .then(response => {
        // console.log('Response:', response);
        if (!response.ok) {
            stopLoader(); // Stop loader on error
            throw new Error('Network response was not ok');
        }
        return response.blob(); // Convert response to Blob object
    })
    .then(blob => {
        stopLoader(); // Stop loader on success
        heroImg = document.getElementById("heroImage");
        if (heroImg) {
            heroImg.remove();
        }
        let videoUrl = URL.createObjectURL(blob);
        // console.log('Received video URL:', audioUrl);
        createVideoPlayer(videoUrl);
    })
    .catch(error => {
        stopLoader(); // Stop loader on catch
        console.error('Error:', error);
    });
});
