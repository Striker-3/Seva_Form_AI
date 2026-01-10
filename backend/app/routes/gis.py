from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import json
import math
import os

router = APIRouter()

OFFICES_FILE = os.path.join(os.path.dirname(__file__), "../data/offices.json")

class LocationRequest(BaseModel):
    lat: float
    lng: float
    radius_km: float = 10.0

class Office(BaseModel):
    id: int
    name: str
    type: str
    address: str
    lat: float
    lng: float
    contact: str
    distance_km: float = 0.0

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of earth in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) * math.sin(dlon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

@router.post("/gis/nearby", response_model=List[Office])
async def get_nearby_offices(location: LocationRequest):
    if not os.path.exists(OFFICES_FILE):
        return []
    
    with open(OFFICES_FILE, "r") as f:
        offices_data = json.load(f)
    
    nearby_offices = []
    for office in offices_data:
        dist = haversine(location.lat, location.lng, office["lat"], office["lng"])
        if dist <= location.radius_km:
            office_obj = office.copy()
            office_obj["distance_km"] = round(dist, 2)
            nearby_offices.append(office_obj)
    
    # Sort by distance
    nearby_offices.sort(key=lambda x: x["distance_km"])
    
    return nearby_offices
