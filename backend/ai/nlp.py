import spacy

nlp = spacy.load("en_core_web_sm")

def enhance_entities(text, entities):
    doc = nlp(text)

    for ent in doc.ents:
        if ent.label_ == "PERSON" and "name" not in entities:
            entities["name"] = ent.text
        if ent.label_ == "DATE" and "dob" not in entities:
            entities["dob"] = ent.text

    return entities

def get_chat_response(text: str) -> str:
    """
    Simple keyword-based intent recognition for support queries.
    """
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc]
    text_lower = text.lower()

    # Define simple intents
    intents = {
        "apply_pan": ["pan", "apply", "card"],
        "apply_aadhaar": ["aadhaar", "adhar", "update", "apply"],
        "status": ["status", "check", "track"],
        "documents_income": ["income", "certificate", "document"],
        "documents_caste": ["caste", "certificate", "document"],
        "time": ["time", "long", "days"],
        "greeting": ["hello", "hi", "hey", "greetings"],
        "thanks": ["thank", "thanks", "helpful"]
    }

    # Responses
    # Responses
    responses = {
        "apply_pan": "To apply for a PAN card, you need:\n\n1. Aadhaar Card\n2. Passport size photo\n\nVisit our center or fill the form online.",
        "apply_aadhaar": "For Aadhaar update/enrollment, please visit the center with your:\n\n1. Proof of Identity\n2. Proof of Address.",
        "status": "You can check your application status by navigating to the 'Track Application' section on the dashboard.",
        "documents_income": "For Income Certificate, you need:\n\n1. Aadhaar Card\n2. Ration Card\n3. Income Proof/Salary Slip\n4. Passport Photo.",
        "documents_caste": "For Caste Certificate, you need:\n\n1. Aadhaar Card\n2. School Leaving Certificate\n3. Father's Caste Proof\n4. Ration Card.",
        "time": "Most certificates are processed within 7-15 working days.",
        "greeting": "Hello! How can I help you with your Seva Kendra application today?",
        "thanks": "You're welcome! Let me know if you need anything else.",
        "default": "I'm not sure about that. Please visit the Seva Kendra center or contact us at +91-1234567890."
    }

    # Match intents
    score = {}
    for intent, keywords in intents.items():
        match_count = sum(1 for k in keywords if k in text_lower or k in tokens)
        if match_count > 0:
            score[intent] = match_count
    
    if not score:
        return responses["default"]
    
    # Get best match
    best_intent = max(score, key=score.get)
    return responses[best_intent]
