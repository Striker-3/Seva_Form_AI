from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from typing import List, Dict, Any
import os
import shutil
import json

from ai.processor import process_document
from ai.form_mapper import map_to_form

router = APIRouter()

UPLOAD_DIR = "app/data/uploads"
FORM_PATH = "app/data/forms/seva_form.json"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/documents/upload")
async def upload_document(
    service_id: str = Form(...),
    document_name: str = Form(...),
    file: UploadFile = File(...)
):
    filename = f"{service_id}_{document_name}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 🔥 RUN AI OCR HERE
    ai_result = process_document(file_path)

    return {
        "service_id": service_id,
        "document_name": document_name,
        "filename": file.filename,
        "ai_result": ai_result
    }


class DocumentEntitiesRequest(BaseModel):
    service_id: str
    entities_list: List[Dict[str, Any]]


@router.post("/documents/generate-form")
async def generate_form_from_documents(request: DocumentEntitiesRequest):
    """
    Combine entities from multiple uploaded documents and generate filled form
    """
    try:
        # Combine all entities from different documents
        combined_entities = {}
        for entities_dict in request.entities_list:
            if isinstance(entities_dict, dict) and "entities" in entities_dict:
                entities = entities_dict["entities"]
                # Merge entities, prioritizing non-empty values
                for key, value in entities.items():
                    if value and value != "NOT_CONFIDENT":
                        if key not in combined_entities or not combined_entities[key]:
                            combined_entities[key] = value
        
        # Load form template
        with open(FORM_PATH, "r", encoding="utf-8") as f:
            form_template = json.load(f)
        
        # Map entities to form (form_template has "fields" key)
        form_fields = form_template.get("fields", {})
        filled_form = map_to_form(combined_entities, form_fields)
        
        return {
            "status": "success",
            "entities": combined_entities,
            "filled_form": filled_form
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
