
import sys
import os
sys.path.append(os.getcwd())

from ai.entity_extractor import extract_entities

test_phrases = [
    "My name is Rahul Kumar",
    "I am Rahul Kumar",
    "Name Rahul Kumar",
    "My father's name is Ramesh Kumar",
    "Father name Ramesh Kumar",
    "I live at Flat 101, Galaxy Apartments, Pune",
    "My address is Sector 14, Gurgaon",
    "Address: Mumbai",
    "My mobile number is 9876543210",
    "Mobile 9876543210",
    "Phone 9876543210",
    "Date of Birth is 12th Jan 1990",
    "DOB 12/01/1990",
    "Born on 1990-01-12",
    "I am Male",
    "Gender Male",
    "I am Single",
    "Marital Status Single"
]

print(f"{'PHRASE':<50} | {'EXTRACTED ENTITIES'}")
print("-" * 100)

import json

for phrase in test_phrases:
    entities = extract_entities(phrase)
    # Simplify output for readability
    output = {k: v for k, v in entities.items()}
    print(f"{phrase:<50} | {json.dumps(output)}")
