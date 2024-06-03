from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from gradio_client import Client, file

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_file_type(filename):
    image_extensions = ["jpg", "jpeg", "png", "bmp", "tiff"]
    video_extensions = ["mp4", "mov", "avi", "mkv", "flv"]
    audio_extensions = ["mp3", "wav", "flac", "ogg", "m4a"]

    extension = filename.split('.')[-1].lower()

    if extension in image_extensions:
        return "image", extension
    elif extension in video_extensions:
        return "video", extension
    elif extension in audio_extensions:
        return "audio", extension
    else:
        return "unknown", extension

@app.route('/w2l', methods=['POST'])
def handle_w2l_request():
    # data = request.get_json()
    # if not data:
    #     return jsonify({'error': 'No data provided'}), 400
    # if not data.get('persona'):
    #     return jsonify({'error': 'No persona provided'}), 400
    # if not data.get('voice'):
    #     return jsonify({'error': 'No voice provided'}), 400
    # persona = data.get('persona')
    # voice = data.get('voice')
    # frame_path = persona + 'jpg'
    # audio_path = voice
    # Make a request to the w2l server with the extracted data

    frame_path = "/target/batman.jpg"
    audio_path = "/target/thor.mp3"
    
    # Define the URL of your API endpoint
    url = "http://127.0.0.1:5052/infer_image"  # Update with your actual API endpoint

    # Define the payload data as a dictionary
    payload = {
        "frame_path": "/Users/alexanokhin/Documents/ai42club/greeter_ai_club42hnn/Lip_Wise/target/batman.jpg",
        "audio_path": "/Users/alexanokhin/Documents/ai42club/greeter_ai_club42hnn/Lip_Wise/target/thor.mp3",
        "pad": 0.1,
        "align_3d": False,
        "face_restorer": "None",
        "fps": 25,
        "mel_step_size": 16,
        "weight": 0.5,
        "upscale_bg": False,
        "bgupscaler": "RealESRGAN_x4plus",
        "gan": True
    }

    # Send an HTTP POST request with JSON payload
    response = requests.get(url, json=payload)
    print(response)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Print the response from the server
        print(response.json())
    else:
        # Print an error message if the request failed
        print("Error:", response.text)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5051)
