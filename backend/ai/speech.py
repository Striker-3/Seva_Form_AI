import whisper

# Load model once
model = whisper.load_model("base")

def speech_to_text(audio_path, mode="transcribe"):
    """
    mode:
    - 'transcribe' → keep original language
    - 'translate'  → convert to English
    """

    result = model.transcribe(
        audio_path,
        task=mode
    )

    return result["text"]
