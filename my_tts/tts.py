from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
# import tempfile
from TTS.api import TTS
import torch
# from TTS.utils.io import ModelManager

app = Flask('tts-server')
CORS(app)  # Enable CORS for all routes

# Initialize TTS
# check if we have a GPU available
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
print("TTS model loaded")
torch.backends.cudnn.enabled = False

@app.route('/')
def index():
    response = {"message": "TTS is available!"}
    return jsonify(response)

@app.route('/tts', methods=['POST'])
def generate_audio():
    data = request.get_json()
    if 'text' in data and 'persona' in data and 'language' in data:
        try:
            text = data['text']
            persona = data['persona']
            language = data['language']
            reference_voice = persona.lower() + ".wav"
            # set output directory
            output_dir = "output/"
            file_path = os.path.join(output_dir, "output_tmp.wav")
            # Generate audio
            tts.tts_to_file(text, language=language, speaker_wav=f"target/{reference_voice}", emotion="Positive", speed="1.1", file_path=file_path, split_sentences=False)
            return send_file(file_path, mimetype='audio/wav', as_attachment=True, conditional=True), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "all input values not provided in request."}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8084, debug=True)