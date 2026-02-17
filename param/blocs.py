import base64
from google import genai
import requests


def bloc1_analyse_contrat(pdf_path, api_key):
    client = genai.Client(api_key=api_key)

    with open(pdf_path, "rb") as f:
        base64_pdf = base64.b64encode(f.read()).decode("utf-8")

    prompt = """
    Analyse ce contrat d’assurance paramétrique et retourne UNIQUEMENT
    un JSON structuré avec :
    - type_de_contrat
    - zone_geographique (Met exactement le nom de la ville)
    - parametre_meteo
    - seuil_de_declenchement
    - seuil_de_temperature (si présent)
    - unite
    - periode_d_observation {date_debut, date_fin, periode_mesure}
    - source_de_donnees
    - montant_de_l_indemnisation
    - devise
    - mode_de_paiement
    - validation_humaine
    """

    interaction = client.interactions.create(
        model="gemini-3-flash-preview",
        input=[
            {"type": "text", "text": prompt},
            {"type": "document", "data": base64_pdf, "mime_type": "application/pdf"}
        ]
    )

    return interaction.outputs[-1].text


def bloc2_meteo(contrat, api_key):
    ville = contrat["zone_geographique"]

    # Géocodage
    geo_url = (
        f"https://api.openweathermap.org/geo/1.0/direct"
        f"?q={ville},BJ&limit=1&appid={api_key}"
    )
    geo_resp = requests.get(geo_url).json()

    if not geo_resp:
        raise ValueError("Ville non reconnue par OpenWeather")

    lat, lon = geo_resp[0]["lat"], geo_resp[0]["lon"]

    # Météo courante
    meteo_url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    )
    meteo = requests.get(meteo_url).json()

    return {
        "coordonnees": {"latitude": lat, "longitude": lon},
        "temperature": meteo["main"]["temp"],
        "humidite": meteo["main"]["humidity"],
        "vent": meteo["wind"]["speed"],
        "nuages": meteo["clouds"]["all"],
        "timestamp": meteo["dt"]
    }



def bloc3_decision(contrat, meteo):
    seuil_temp = float(contrat.get("seuil_de_temperature", 999))
    temp = meteo["temperature"]

    sinistre = temp >= seuil_temp

    return {
        "sinistre": sinistre,
        "raison": "Température excessive" if sinistre else "Conditions normales",
        "temperature_observee": temp,
        "seuil_temperature": seuil_temp,
        "montant_indemnisation": (
            contrat["montant_de_l_indemnisation"] if sinistre else 0
        )
    }
