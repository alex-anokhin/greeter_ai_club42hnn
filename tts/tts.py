import torch
from TTS.api import TTS
from flask import Flask, request

# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Init TTS
tts = TTS("tts_models/en/ljspeech/tacotron2-DDC")

app = Flask('tts-server')

@app.route('/tts', methods=['POST'])
def generate_audio():
    # Get text from request
    text = request.form.get('text')

    if text:
        # Run TTS
        tts.tts_with_vc_to_file(
            text,
            speaker_wav="target/speaker.wav",
            file_path="output/output.wav"
        )
        return "Audio generated successfully!"
    else:
        return "Text not provided in request.", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5053, debug=True)
