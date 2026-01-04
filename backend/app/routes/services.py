from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter()

DATA_PATH = Path("app/data/services.json")


@router.get("/services")
def list_all_services():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


@router.get("/services/{service_id}")
def get_service(service_id: str):
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    if service_id not in data:
        return {"error": "Service not found"}

    return data[service_id]
