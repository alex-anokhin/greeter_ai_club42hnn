# GREETER AI
## AI student club in 42Heilbronn
### generative-ai-app
Generative AI project (webapp) for creating personalized video greetings (lipsync videos) implemented with react and flask arcitecture

COMMANDS for LINUX/MAC_OS

#### project structure
- project/
    - copy_to_Lip_Wise/
    - frontend/
    - my_tts/
    - .gitignore
    - README.md

#### How to Run the Service

1. Make sure you have CLI ollama, npm, miniconda installed.
2. Pull llama3 and aya models from ollama with:
    ```
    ollama pull llama3
    ollama pull aya
    ```

3. Clone this repository:

    ```
    git clone https://github.com/alex-anokhin/greeter_ai_club42hnn.git
    ```

4. Navigate to the project directory:

    ```
    cd greeter_ai_club42hnn && git clone https://github.com/pawansharmaaaa/Lip_Wise.git
    ```

5. copy all from copy_to_Lip_Wise to Lip_Wise:

    ```
    cp -r copy_to_Lip_Wise/* Lip_Wise/
    ```
## RUN THE FRONTEND
6. Run the react-app:
    ```
    cd frontend
    npm i
    npm run dev
    ```

Now you can check frontend on http://localhost:5173/

## RUN THE TTS
7. Open new terminal or split it in vs code
8. Run the tts (start enter commands from greeter_ai_club42hnn folder)

    ```
	cd my_tts
    conda create -n greeterai_tts_p311 python=3.11 -y && conda activate greeterai_tts_p311
    pip install -r requirements.txt
    python tts.py
    ```

Now you can go to http://localhost:8084 and see if success:

    ```
    {
        "message": "TTS is available!"
    }
    ```

## RUN THE LIP_WISE
9. Open new terminal or split it in vs code
10. Run the Lip_Wise (start enter commands from greeter_ai_club42hnn folder)

    ```
	cd Lip_Wise/
    conda create -n greeterai_lw_p311 python=3.11 -y && conda activate greeterai_lw_p311
    pip install -r requirements.txt
    cd basicsr
    nano __init.py__
    # from .test import * comment this line and save
    cd ..
    python infer_server_lw.py
    ```
Now you can go to http://localhost:8081 and see if success:

    ```
    {
        "message": "Lip Wise server is available!"
    }
    ```

Now you can use app on: http://localhost:5173/

11. extra commands:

to disable environment

    ```
	conda deactivate
    ```

to stop the server press ^C (ctrl + C)