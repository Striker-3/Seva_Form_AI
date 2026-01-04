from ai.speech import speech_to_text
from ai.entity_extractor import extract_entities
from ai.nlp import enhance_entities
from ai.form_mapper import map_to_form
import json


def process_voice_form(audio_path, form_path, language_mode="transcribe", **kwargs):
    """
    Voice → Text → Entities → Auto-filled Seva Kendra form

    language_mode:
    - "transcribe" : keep original language (Hindi/Marathi/English)
    - "translate"  : convert to English
    """

    # allow alternate keyword names for compatibility
    mode = language_mode
    if not mode:
        mode = kwargs.get("language") or kwargs.get("mode") or kwargs.get("language_mode")

    # Step 1: Voice → Text
    text = speech_to_text(audio_path, mode=mode)
    print(f"DEBUG: Recognized text: {text}")

    # Step 2: Text → Entities (Regex)
    entities = extract_entities(text)
    
    # Step 2b: Enhance with NLP (SpaCy)
    entities = enhance_entities(text, entities)
    print(f"DEBUG: Extracted entities: {entities}")

    # Step 3: Load form template
    with open(form_path, "r", encoding="utf-8") as f:
        form_template = json.load(f)

    # Step 4: Auto-fill form
    filled_form = map_to_form(entities, form_template)

    return {
        "recognized_text": text,
        "entities": entities,
        "filled_form": filled_form
    }
