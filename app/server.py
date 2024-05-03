from flask import Flask, request, jsonify
import requests
import random

app = Flask(__name__)

phrases = [
    "Фраза 1",
    "Фраза 2",
    "Фраза 3",
    "Фраза 4",
    "Фраза 5"
]

@app.route('/phrase')
def get_phrase():
    return random.choice(phrases)

@app.route('/promt', methods=['POST'])
def handle_prompt_request():
    data = request.get_json()
    # Extract relevant data from the request (system_message, user_message, max_tokens)
    system_message = "You are an Elsa from movie Frozen, respond text must be a direct speech without smiles and sound descriptions and ready for text to speech convertation"
    user_message = "greet my daugter Kelly with her 9th birthday wich take place 5 of May"
    max_tokens = 75
    temperature=  0.1
  

    # Make a request to the llama server with the extracted data
    llama_url = 'http://127.0.0.1:5052/mistral'
    llama_data = {
        'system_message': system_message,
        'user_message': user_message,
        'max_tokens': max_tokens,
        'temperature': temperature
    }
    response = requests.post(llama_url, json=llama_data)

    # Process the response from the llama server (for demonstration, just return the response)
    # return jsonify(response.json())
    return jsonify(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5051)
