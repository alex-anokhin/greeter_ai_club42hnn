# Импорт необходимых модулей из Flask и Llama
from flask import Flask, request, jsonify
import llama
import os

# Создание объекта Flask приложения с названием "Llama server"
app = Flask("llm-server")

model_path = "models/Meta-Llama-3-8B-Instruct.Q4_0.gguf"
# Инициализация переменной модели как None
model = llama.load_model(model_path)

# Определение маршрута /llama с методом POST
@app.route('/llama3', methods=['POST'])
def generate_response():
    global model

    try:
        # Получение JSON данных из входящего запроса
        data = request.get_json()

        # Проверка наличия обязательных полей в данных запроса
        if 'system_message' in data and 'user_message' in data: # and 'temperature' in data:
            system_message = data['system_message']
            user_message = data['user_message']
            # temperature = float(data['temperature'])
            temperature = 0.7
            max_tokens = 99
            stop_str=["Q:", "A:"]

            # Формирование строки запроса к модели с учетом температуры
            prompt = f"""<s>[INST] <<SYS>>{system_message}<</SYS>>{user_message} [/INST]"""

            # Создание экземпляра модели, если она еще не создана
            if model is None:
                # Получение пути к файлу модели из переменной окружения MODEL_PATH
                model_path = os.environ.get('MODEL_PATH')
                
                # Инициализация модели
                model = Llama(model_path=model_path)

                # tokens = model.tokenize(prompt)
                # for token in model.generate(tokens, max_tokens=max_tokens, temp=temperature):
                #     print(model.detokenize([token]))

            # Выполнение модели с использованием строки запроса, максимального количества токенов и температуры
            output = model(prompt, max_tokens=max_tokens, top_k=50, top_p=0.9, stop=stop_str, temperature=temperature, echo=False, repeat_penalty=1.1)

            # Возврат выходных данных модели в виде JSON ответа
            return jsonify(output)

        else:
            # Возврат ошибки, если какое-либо из обязательных полей отсутствует
            return jsonify({"error": "Missing required parameters"}), 400

    except Exception as e:
        # Возврат ошибки сервера в случае возникновения исключения
        return jsonify({"Error": str(e)}), 500

# Запуск Flask приложения на хосте 0.0.0.0 и порту 5052
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5051, debug=True)
