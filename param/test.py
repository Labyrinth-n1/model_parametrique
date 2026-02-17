import time
from google.genai import Client
from google.genai._interactions import RateLimitError

client = Client(api_key="AIzaSyDfJ0Bnmvk4tpuR8j1oyg0aQeHG-oLAGFw")

for _ in range(3):  # retry max 3 fois
    try:
        interaction = client.interactions.create(
            model="gemini-3-flash-preview",
            input=[
                {"type": "text", "text": "Test rapide"}
            ]
        )
        print(interaction.outputs[-1].text)
        break
    except RateLimitError:
        print("Quota dépassé, attente 5s...")
        time.sleep(5)
