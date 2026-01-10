import base64
import requests

url = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/200px-Emblem_of_India.svg.png"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    b64_data = base64.b64encode(response.content).decode('utf-8')
    with open("emblem.txt", "w") as f:
        f.write(f"data:image/png;base64,{b64_data}")
    print("Success")
except Exception as e:
    print(f"Error: {e}")
