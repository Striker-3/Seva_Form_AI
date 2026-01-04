from fastapi import APIRouter, UploadFile, File, Form
import os
import uuid

from ai.voice_form_pipeline import process_voice_form

router = APIRouter(prefix="/api", tags=["Voice"])

UPLOAD_DIR = "app/data/uploads"
FORM_PATH = "app/data/forms/seva_form.json"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/voice-fill-form")
async def voice_fill_form(
    audio: UploadFile = File(...),
    language_mode: str = Form("transcribe")
):
    # ✅ Safe filename (Windows-proof)
    safe_name = audio.filename.replace(" ", "_")
    filename = f"{uuid.uuid4()}_{safe_name}"
    audio_path = os.path.join(UPLOAD_DIR, filename)

    # Save audio
    with open(audio_path, "wb") as f:
        f.write(await audio.read())

    # ✅ PASS form_path (THIS WAS MISSING)
    result = process_voice_form(
        audio_path=audio_path,
        form_path=FORM_PATH,
        language_mode=language_mode
    )

    return result
