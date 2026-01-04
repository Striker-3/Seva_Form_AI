from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import os
from datetime import datetime
import uuid

router = APIRouter(prefix="/api", tags=["Submit"])

SUBMISSIONS_DIR = "app/data/submissions"
os.makedirs(SUBMISSIONS_DIR, exist_ok=True)


class FormSubmission(BaseModel):
    name: str | None = None
    pan: str | None = None
    dob: str | None = None
    address: str | None = None

    class Config:
        extra = "allow"


@router.post("/submit-form")
async def submit_form(submission: FormSubmission):
    """
    Accept form submission and save to JSON file
    """
    try:
        # Generate unique ID for this submission
        submission_id = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        
        # Create submission record
        submission_data = {
            "id": submission_id,
            "timestamp": timestamp,
            "data": {
                "name": submission.name,
                "pan": submission.pan,
                "dob": submission.dob,
                "address": submission.address
            }
        }
        
        # Save to JSON file
        filename = f"{submission_id}.json"
        filepath = os.path.join(SUBMISSIONS_DIR, filename)
        
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(submission_data, f, indent=2, ensure_ascii=False)
        
        return {
            "success": True,
            "message": "Form submitted successfully!",
            "submission_id": submission_id,
            "timestamp": timestamp
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit form: {str(e)}"
        )
