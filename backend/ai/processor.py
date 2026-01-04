from ai.ocr import extract_text
from ai.entity_extractor import extract_entities

def process_document(image_path):
    """
    Government-grade processing logic.
    PAN follows assisted verification as per KYC norms.
    """

    try:
        # OCR
        text = extract_text(image_path)

        # Extract entities
        entities = extract_entities(text)

        # PAN handling (MANDATORY for Gov systems)
        pan_value = entities.get("pan")
        pan_required = (pan_value == "NOT_CONFIDENT")
        if pan_required:
            pan_message = "Please enter PAN manually for verification"
        else:
            pan_message = "PAN auto-extracted; please verify before submission"

        return {
            "status": "success",
            "raw_text": text,
            "entities": entities,
            "pan_required": pan_required,
            "message": pan_message
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
