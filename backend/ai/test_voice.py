from ai.voice_form_pipeline import process_voice_form

result = process_voice_form(
    audio_path="voice_hi_02.m4a",
    form_path="forms/seva_form.json",
    language_mode="transcribe"  # Hindi stays Hindi
)

print(result)
