from fastapi import APIRouter, UploadFile, File, Form
import shutil
import os

from ai.voice_form_pipeline import process_voice_form
from ai.processor import process_document

router = APIRouter(prefix="/api")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/voice-fill-form")
async def voice_fill_form(
    audio: UploadFile = File(...),
    language_mode: str = Form("transcribe")
):
    audio_path = f"{UPLOAD_DIR}/{audio.filename}"

    with open(audio_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)

    result = process_voice_form(
        audio_path=audio_path,
        form_path="forms/seva_form.json",
        language_mode=language_mode
    )

    return result


@router.post("/upload-document")
async def upload_document(
    document: UploadFile = File(...)
):
    doc_path = f"{UPLOAD_DIR}/{document.filename}"

    with open(doc_path, "wb") as buffer:
        shutil.copyfileobj(document.file, buffer)

    result = process_document(doc_path)
    return result
