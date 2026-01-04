from ai.voice_form_pipeline import process_voice_form

# CHANGE MODE HERE
# "transcribe" → Hindi stays Hindi
# "translate"  → Hindi → English

result = process_voice_form(
    audio_path="voice_test.m4a",
    form_path="forms/seva_form.json",
    language_mode="transcribe"
)

print(result)
