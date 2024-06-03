from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
# import tempfile
from TTS.api import TTS, ModelManager
import torch

# Patch the ask_tos function to automatically accept the terms
def always_accept_tos(self, output_path):
    return True

ModelManager.ask_tos = always_accept_tos

app = Flask('tts-server')
CORS(app)  # Enable CORS for all routes

# Initialize TTS
device = "cuda" if torch.cuda.is_available() else "cpu"
# if torch.cuda.is_available():
#     device = "cuda"
# elif torch.backends.mps.is_available():
#     device = "mps"
# else:
#     device = "cpu"
# print(f"Using device: {device}")

# model_path = "/Users/alexanokhin/Documents/ai42club/greeter_ai_club42hnn/my_tts/XTTS-v2/"
# config_path = "/Users/alexanokhin/Documents/ai42club/greeter_ai_club42hnn/my_tts/XTTS-v2/config.json"
# dvae_path = "/XTTS-v2/dvae.pth"
# mel_stats_path = "/XTTS-v2/mel_stats.pth"
# speakers_path = "/XTTS-v2/speakers_xtts.pth"
# vocab_path = "/XTTS-v2/vocab.json"
# tts = TTS(
#     model_path=model_path,
#     config_path=config_path,
#     # dvae_path=dvae_path,
#     # mel_stats_path=mel_stats_path,
#     # speakers_path=speakers_path,
#     # vocab_path=vocab_path
# ).to(device)
# model_item = {"hf_url": "https://huggingface.co/coqui/XTTS-v2", "hf_hub": "coqui/XTTS-v2"}
# output_path = "/Users/alexanokhin/Documents/ai42club/greeter_ai_club42hnn/my_tts/models/"
# ModelManager.create_dir_and_download_model("tts_models/multilingual/multi-dataset/xtts_v2", model_item, output_path)
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)

@app.route('/tts', methods=['POST'])
def generate_audio():
    data = request.get_json()
    if 'text' in data and 'persona' in data:
        try:
            text = data['text']
            persona = data['persona']
            language = data['language'] if 'language' in data else 'en'
            reference_voice = persona + ".wav"
            # Generate audio
            # output_dir = tempfile.mkdtemp()
            output_dir = "output/"
            file_path = os.path.join(output_dir, "output_tmp.wav")
            tts.tts_to_file(text, speaker_wav=f"target/{reference_voice}", language=language, file_path=file_path)
            return send_file(file_path, mimetype='audio/wav', as_attachment=True, conditional=True), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Text not provided in request."}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5053, debug=True)