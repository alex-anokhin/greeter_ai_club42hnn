from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
import tempfile
from TTS.api import TTS
import torch
from TTS.utils.generic_utils import get_user_data_dir

app = Flask('tts-server')
CORS(app)  # Enable CORS for all routes

# Initialize TTS
device = "cuda" if torch.cuda.is_available() else "cpu"
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
# tts = TTS("tts_models/multilingual/multi-dataset/bark").to(device)
# get_user_data_dir("tts")

@app.route('/tts', methods=['POST'])
def generate_audio():
    # reference_voice = "frozen_-_let_it_go_Vocals.mp3"
    # reference_voice = "frozen_-_let_it_go_(z3.fm).mp3"
    data = request.get_json()
    if 'text' in data and 'persona' in data:
        try:
            text = data['text']
            persona = data['persona']
            reference_voice = persona + ".wav"
            # Generate audio
            output_dir = tempfile.mkdtemp()
            file_path = os.path.join(output_dir, "output_en.wav")
            tts.tts_to_file(text, speaker_wav=f"target/{reference_voice}", language="en", file_path=file_path)
            return send_file(file_path, mimetype='audio/wav', as_attachment=True, conditional=True)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Text not provided in request."}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5053, debug=True)


# try:
#         # Get JSON data from incoming request
#         data = request.get_json()
#         if 'text' in data:
#         #if 'persona' in data and 'phrase' in data and 'language' in data:
#             text = data['text']
#             reference_voice = "frozen_-_let_it_go_Vocals.mp3"
#             persona = data['persona'] if 'persona' in data else None
#             phrase = data['phrase'] if 'phrase' in data else text
#             language = data['language'] if 'language' in data else 'en'

#             output_dir = tempfile.mkdtemp()
#             file_path = os.path.join(output_dir, "output_en.wav")
#             tts.tts_to_file(phrase, sample_rate=44100, frame_shift_ms=-5, frame_length_ms=-5, speaker_wav=f'target/{reference_voice}', language=language, file_path=file_path)
#             return send_file(file_path, mimetype='audio/wav', as_attachment=True, conditional=True)
#         else:
#             return jsonify({"error": "Missing required parameters"}), 400
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500