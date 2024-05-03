# Импорт необходимых модулей из Flask и Llama
from flask import Flask, request, jsonify
from llama_cpp import Llama
import os

# Создание объекта Flask приложения с названием "Llama server"
app = Flask("llm-server")

# Инициализация переменной модели как None
model = None

# Определение маршрута /llama с методом POST
@app.route('/mistral', methods=['POST'])
def generate_response():
    global model

    try:
        # Получение JSON данных из входящего запроса
        data = request.get_json()

        # Проверка наличия обязательных полей в данных запроса
        if 'system_message' in data and 'user_message' in data and 'max_tokens' in data and 'temperature' in data:
            system_message = data['system_message']
            user_message = data['user_message']
            max_tokens = int(data['max_tokens'])
            temperature = float(data['temperature'])

            # Формирование строки запроса к модели с учетом температуры
            prompt = f"""<s>[INST] <<SYS>>
            {system_message}
            <</SYS>>
            {user_message} [/INST]"""

            # Создание экземпляра модели, если она еще не создана
            if model is None:
                # Получение пути к файлу модели из переменной окружения MODEL_PATH
                model_path = os.environ.get('MODEL_PATH')
                
                # Инициализация модели
                model = Llama(model_path=model_path)

            # Выполнение модели с использованием строки запроса, максимального количества токенов и температуры
            output = model(prompt, max_tokens=max_tokens, temperature=temperature, echo=True)

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
    app.run(host='0.0.0.0', port=5052, debug=True)
