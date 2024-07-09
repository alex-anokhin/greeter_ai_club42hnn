from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import os
from PIL import Image
import cv2
import torch
import subprocess
import numpy as np
from concurrent.futures import ThreadPoolExecutor
from WeTransferTool import We
import re

# Import helper functions
from helpers import audio, file_check, preprocess_mp as pmp, model_loaders, batch_processors

app = Flask('infer-server')
CORS(app)  # Enable CORS for all routes

# Global Variables
TEMP_DIRECTORY = file_check.TEMP_DIR
MEDIA_DIRECTORY = file_check.MEDIA_DIR
OUTPUT_DIRECTORY = file_check.OUTPUT_DIR
CURRENT_DIRECTORY = os.getcwd()
max_threads = 6


def clear_cuda_cache():
    torch.cuda.empty_cache()
    # torch.cuda.reset_peak_memory_stats()

# Clear the CUDA cache
clear_cuda_cache()

@app.route('/api')
def index():
    response = {"message": "Lip Wise server is available!"}
    return jsonify(response)

@app.route('/api/infer_text', methods=['GET', 'POST', 'OPTIONS'])
def infer_text():
    if request.method == 'OPTIONS':
        # Respond to CORS preflight request
        return '', 200
    if request.method == 'GET':
        return jsonify({'message': 'This is the Lip Wise API. Please send a POST request to this endpoint with the required data.'}), 200
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        # Validate required fields
        required_fields = [
            'messages',
            'stream',
            # 'persona',
            # 'language',
            'model']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        try:
            print("Performing LLM inference...")
            llm_response = requests.post('http://localhost:11434/api/chat', json=data)
            if llm_response.ok:
                llm_data = llm_response.json()
                text = llm_data.get('message', {}).get('content')
                print(text)
                return jsonify({'text': text}), 200
            else:
                # Handle the case where the response is not successful
                print("Error: LLM Network response was not ok")
                print(llm_response.text)
                text = "Can you repeat your question?"
                return jsonify({'error': 'Could not generate text'}), 400
        except Exception as e:
            print(f"Error: Could not generate text: {e}")
            text = "Can you repeat your question?"
            return jsonify({'error': str(e)}), 400

@app.route('/api/infer_image', methods=['GET', 'POST', 'OPTIONS'])
# @app.route('/w2l_image', methods=['POST'])
def infer_image():
    if request.method == 'OPTIONS':
        # Respond to CORS preflight request
        return '', 200
    if request.method == 'GET':
        return jsonify({'message': 'This is the Lip Wise API. Please send a POST request to this endpoint with the required data.'}), 200
    if request.method == 'POST':
        # Get JSON data from request
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        # Extract required parameters from JSON
        # Validate required fields
        required_fields = ['text', 'persona', 'language']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        # frame_path = data.get('frame_path')
        # audio_path = data.get('audio_path')
        text = data.get('text')
        persona = data.get('persona')
        language = data.get('language')
        # # Remove signs and symbols from text
        # if language != 'en':
        #     text = remove_signs_and_symbols(text)
        # Perform TTS
        try:
            print("Performing TTS...")
            audio_file = requests.post('http://localhost:8084/tts', json={'text': text, 'persona': persona, 'language': language})
            if audio_file.ok:
                # save the audio file to the media directory
                audio_path = os.path.join(MEDIA_DIRECTORY, 'output_audio.wav')
                with open(audio_path, 'wb') as f:
                    f.write(audio_file.content)
            else:
                # Handle the case where the response is not successful
                print("Error: TTS Network response was not ok")
        except Exception as e:
            print(f"Error: Could not generate audio file: {e}")
            print("Using previos audio.")
            audio_path = os.path.join(MEDIA_DIRECTORY, 'output_audio.wav')
        persona = persona.lower()
        # print(text, persona)
        input_image_path = os.path.join(CURRENT_DIRECTORY, "target", f"{persona}" + ".jpeg")
        output_image_path = os.path.join(MEDIA_DIRECTORY, 'resized_image.jpeg')

        # Resize the image
        width = 720
        frame_path = resize_image(input_image_path, output_image_path, width)
        # frame_path = input_image_path

        # print(frame_path)
        pad = 0
        align_3d = False
        # face_restorer = 'CodeFormer'
        # face_restorer = 'GFPGAN'
        # face_restorer = 'RestoreFormer'
        face_restorer = 'None'
        fps = 50
        mel_step_size = 16
        weight = 0.5
        upscale_bg = False
        bgupscaler = 'RealESRGAN_x2plus'
        gan = True
        # gan = False

        try:
            # Perform inference
            print("Performing inference...")
            file_path = infer_image_helper(frame_path, audio_path, pad, align_3d, face_restorer, fps, mel_step_size, weight, upscale_bg, bgupscaler, gan, persona)
            print(file_path)
            # wet = We()
            # metadata = wet.upload(file_path, f"{persona}.mp4", f"Generated video for {persona}.")
            # video_url = metadata['shortened_url']
            # print(video_url)
            return send_file(file_path, mimetype='video/mp4', as_attachment=True, conditional=True), 200
        except Exception as e:
            print(f"Error during inference: {e}")
            return jsonify({'error': str(e)}), 400

@app.route('/api/upload_video', methods=['GET', 'POST', 'OPTIONS'])
def upload_video():
    if request.method == 'OPTIONS':
        # Respond to CORS preflight request
        return '', 200
    if request.method == 'GET':
        return jsonify({'message': 'This is the Lip Wise API. Please send a POST request to this endpoint with the required data.'}), 200
    if request.method == 'POST':
        # Get JSON data from request
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        # Validate required fields
        if 'persona' not in data and 'text' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        # Extract data
        persona = data.get('persona')
        text = data.get('text')
        # print(persona, text)
        # Save the video
        wet = We()
        file_path = os.path.join(OUTPUT_DIRECTORY, f"{persona.lower()}.mp4")
        # print(file_path)
        try:
            metadata = wet.upload(file_path, f"{persona.lower()}.mp4", f"{persona}: {text}.")
            video_url = metadata['shortened_url']
            print(video_url)
            return jsonify({'video_url': video_url}), 200
        except Exception as e:
            print(f"Error during upload: {e}")
            return jsonify({'error': str(e)}), 500

def infer_image_helper(frame_path, audio_path, pad, align_3d, face_restorer, fps, mel_step_size, weight, upscale_bg, bgupscaler, gan, persona):
    # Perform checks to ensure that all required files are present
    file_check.perform_check(bg_model_name=bgupscaler, restorer=face_restorer, use_gan_version=gan)
    # Set device
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    if device == 'cuda':
        free_memory = torch.cuda.mem_get_info()[0]
        print(f"Initial Free Memory: {free_memory/1024**3:.2f} GB")

        # Limiting the number of threads to avoid vram issues
        max_threads = free_memory // 2e9
        # max_threads = torch.get_num_threads()
        print(f"Max Threads: {max_threads}")

    # Get input type
    input_type, img_ext = file_check.get_file_type(frame_path)
    if input_type != "image":
        raise Exception("Input file is not an image. Try again with an image file.")

    # Get audio type
    audio_type, aud_ext = file_check.get_file_type(audio_path)
    if audio_type != "audio":
        raise Exception("Input file is not an audio.")
    if aud_ext != "wav":
        # Convert audio to wav
        command = 'ffmpeg -y -i {} -strict -2 {}'.format(audio_path, os.path.join(MEDIA_DIRECTORY, 'aud_input.wav'))
        subprocess.call(command, shell=True)
        audio_path = os.path.join(MEDIA_DIRECTORY, 'aud_input.wav')

    # Generate audio spectrogram
    wav = audio.load_wav(audio_path, 16000)
    mel = audio.melspectrogram(wav)

    mel_chunks = []
    #The mel_idx_multiplier aligns audio chunks with video frames for consistent processing and analysis.
    mel_idx_multiplier = 80./fps
    i = 0
    while 1:
        start_idx = int(i * mel_idx_multiplier)
        if start_idx + mel_step_size > len(mel[0]):
            mel_chunks.append(mel[:, len(mel[0]) - mel_step_size:])
            break
        mel_chunks.append(mel[:, start_idx : start_idx + mel_step_size])
        i += 1

    # Create media_preprocess object and helper object
    processor = pmp.ModelProcessor(padding=pad)

    # Read image
    if align_3d:
        frame = cv2.imread(frame_path)
        frame = processor.align_3d(frame)
    else:
        frame = cv2.imread(frame_path)
    height, width, _ = frame.shape

    # Get face landmarks
    processor.detect_for_image(frame.copy())

    # Create face helper object from landmarks
    helper = pmp.FaceHelpers(image_mode=True)

    # extract face from image
    extracted_face, mask, inv_mask, center, bbox = helper.extract_face(original_img=frame)

    # Warp, Crop and Align face
    cropped_face, aligned_bbox, rotation_matrix = helper.align_crop_face(extracted_face=extracted_face)
    cropped_face_height, cropped_face_width, _ = cropped_face.shape

    total = pmp.Total_stat()
    # Generate data for inference
    gen = helper.gen_data_image_mode(cropped_face, mel_chunks, total)

    # Create model loader object
    ml = model_loaders.ModelLoader(face_restorer, weight)

    # Load wav2lip model
    w2l_model = ml.load_wav2lip_model(gan=gan)

    # Initialize video writer
    out = cv2.VideoWriter(os.path.join(MEDIA_DIRECTORY, 'temp.mp4'), cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))

    # frame = cv2.GaussianBlur(frame, (5, 5), 3)
    # frame = cv2.resize(frame, (512, 512))
    frames = len(mel_chunks)
    print(f"Total frames: {frames}")
    frame_counter = 0
    # Feed to model:
    for (img_batch, mel_batch) in gen:
        # print(f"\r{frame_counter + 1}/{frames} frames processed", end='', flush=True)
        # Calculate progress
        progress = frame_counter / frames
        progress_percent = progress * 100

        # Print progress bar
        bar_length = 15
        progress_bar = '[' + '=' * int(progress * bar_length) + ' ' * (bar_length - int(progress * bar_length)) + ']'
        print(f'\rProgress: {progress_bar} {progress_percent:.1f}%, {frame_counter + 1}/{frames} frames', end='', flush=True)

        img_batch = torch.FloatTensor(np.transpose(img_batch, (0, 3, 1, 2))).to(device)
        mel_batch = torch.FloatTensor(np.transpose(mel_batch, (0, 3, 1, 2))).to(device)

        with torch.no_grad():
            dubbed_faces = w2l_model(mel_batch, img_batch)
        
        dubbed_faces = dubbed_faces.cpu().numpy().transpose(0, 2, 3, 1) * 255.

        if face_restorer == 'CodeFormer':
            with ThreadPoolExecutor(max_workers=max_threads) as executor:
                restored_faces = list(executor.map(ml.restore_wCodeFormer, dubbed_faces))
        elif face_restorer == 'GFPGAN':
            with ThreadPoolExecutor(max_workers=max_threads) as executor:
                restored_faces = list(executor.map(ml.restore_wGFPGAN, dubbed_faces))
        elif face_restorer == 'RestoreFormer':
            with ThreadPoolExecutor(max_workers=max_threads) as executor:
                restored_faces = list(executor.map(ml.restore_wRF, dubbed_faces))
        elif face_restorer == "None":
            restored_faces = dubbed_faces
        else:
            raise Exception("Invalid face restorer model. Please check the model name and try again.")
        # total_faces = len(restored_faces)
        for idx, face in enumerate(restored_faces):
            frame_counter += 1

            processed_face = cv2.resize(face, (cropped_face_width, cropped_face_height), interpolation=cv2.INTER_LANCZOS4)
            processed_ready = helper.paste_back_black_bg(processed_face, aligned_bbox, frame, ml)
            ready_to_paste = helper.unwarp_align(processed_ready, rotation_matrix)

            # Apply the median filter to catch and smooth burnt-out pixels
            filtered_image = cv2.medianBlur(ready_to_paste, ksize=5)
            # Apply sharpening
            sharpen_image = apply_sharpening(filtered_image, sharpen_kernel_5x5, alpha=0.75)
            # Increase saturation
            saturated_image = increase_saturation(sharpen_image, saturation_scale=1.125)
            # Paste the face back to the frame
            final = helper.paste_back(saturated_image, frame, mask, inv_mask, center)
            # final = increase_saturation(final, saturation_scale=1.0625)

            #without median filter
            # final = helper.paste_back(ready_to_paste, frame, mask, inv_mask, center)

            if upscale_bg:
                final = ml.restore_background(final, bgupscaler, tile=400, outscale=1.0, half=False)
            # final = ready_to_paste
            # final = sharpen_image
            out.write(final)
    print("All frames processed.")
    out.release()
    del gen
    
    # Merge audio and video
    output_path = os.path.join(OUTPUT_DIRECTORY, f"{persona}.mp4")
    # command = f"ffmpeg -y -i {audio_path} -i {os.path.join(MEDIA_DIRECTORY, 'temp.mp4')} -strict -2 -q:v 1 {os.path.join(OUTPUT_DIRECTORY, 'output.mp4')}"
    command = f"ffmpeg -y -i {audio_path} -i {os.path.join(MEDIA_DIRECTORY, 'temp.mp4')} -strict -2 -q:v 1 {output_path}"
    subprocess.call(command, shell=True)

    return output_path
    # return os.path.join(OUTPUT_DIRECTORY, f"{persona}.mp4")

def resize_image(input_image_path, output_image_path, width):
    # Open the image file
    with Image.open(input_image_path) as image:
        # Calculate the height based on the aspect ratio
        height = int((width / float(image.width)) * float(image.height))
        # Resize the image
        resized_image = image.resize((width, height))
        # Save the resized image
        resized_image.save(output_image_path)
        return output_image_path

def apply_sharpening(image, kernel, alpha=1.0):
            sharpened_image = cv2.filter2D(image, -1, kernel)
            output_image = cv2.addWeighted(image, 1.0 - alpha, sharpened_image, alpha, 0)
            return output_image

def increase_saturation(image, saturation_scale=1.5):
    """
    Increase the saturation of an image.
    
    Args:
        image: The input image in BGR format.
        saturation_scale: The factor by which to increase the saturation. Default is 1.5.

    Returns:
        The image with increased saturation.
    """
    # Convert the image from BGR to HSV
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Split the HSV channels
    h, s, v = cv2.split(hsv_image)

    # Increase the saturation
    s = cv2.multiply(s, saturation_scale)
    
    # Clip the values to be in the valid range [0, 255]
    s = np.clip(s, 0, 255).astype(hsv_image.dtype)

    # Merge the channels back
    hsv_image = cv2.merge([h, s, v])

    # Convert the image back to BGR
    saturated_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)
    
    return saturated_image

def remove_signs_and_symbols(text):
    # Replace signs and symbols with empty string
    clean_text = re.sub(r'[^\w\s]', '', text)
    return clean_text

sharpen_kernel_3x3 = np.array([
    [-1, -1, -1],
    [-1,  9, -1],
    [-1, -1, -1]
])

sharpen_kernel_5x5 = np.array([
    [-1, -1, -1, -1, -1],
    [-1,  2,  2,  2, -1],
    [-1,  2,  8,  2, -1],
    [-1,  2,  2,  2, -1],
    [-1, -1, -1, -1, -1]
]) / 8.0

sharpen_kernel_7x7 = np.array([
    [-1, -1, -1, -1, -1, -1, -1],
    [-1,  1,  1,  1,  1,  1, -1],
    [-1,  1,  2,  2,  2,  1, -1],
    [-1,  1,  2,  3,  2,  1, -1],
    [-1,  1,  2,  2,  2,  1, -1],
    [-1,  1,  1,  1,  1,  1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
]) / 16.0

sharpen_kernel_9x9 = np.array([
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1,  1,  1,  1,  1,  1,  1,  1, -1],
    [-1,  1,  2,  2,  2,  2,  2,  1, -1],
    [-1,  1,  2,  3,  3,  3,  2,  1, -1],
    [-1,  1,  2,  3,  6,  3,  2,  1, -1],
    [-1,  1,  2,  3,  3,  3,  2,  1, -1],
    [-1,  1,  2,  2,  2,  2,  2,  1, -1],
    [-1,  1,  1,  1,  1,  1,  1,  1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1]
]) / 48.0

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081, debug=True)
