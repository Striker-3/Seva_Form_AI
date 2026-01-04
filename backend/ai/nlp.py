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
