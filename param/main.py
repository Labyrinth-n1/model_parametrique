from fastapi import FastAPI, UploadFile, File
import tempfile
import json
from fastapi.middleware.cors import CORSMiddleware

from blocs import bloc1_analyse_contrat, bloc2_meteo, bloc3_decision
from config import GEMINI_API_KEY, OPENWEATHER_API_KEY

app = FastAPI(
    title="API Assurance Paramétrique – République du Bénin",
    version="1.0"
)

origins = [
    "http://localhost:8080",
    "http://localhost:8081", 
    "http://127.0.0.1:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/contrat/analyser")
async def analyser_contrat(file: UploadFile = File(...)):
    print("📄 Fichier reçu :", file.filename, file.content_type)
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        pdf_path = tmp.name

    contrat_json_str = bloc1_analyse_contrat(pdf_path, GEMINI_API_KEY)
    clean_output = contrat_json_str.replace("```json", "").replace("```", "").strip()
    
    contrat = json.loads(clean_output)
    print("📝 Contrat analysé :", contrat)

    return contrat


@app.post("/meteo")
def observer_meteo(contrat: dict):
    return bloc2_meteo(contrat, OPENWEATHER_API_KEY)


@app.post("/decision")
def decision_parametrique(contrat: dict, meteo: dict):
    return bloc3_decision(contrat, meteo)
