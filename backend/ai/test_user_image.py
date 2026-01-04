import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
sys.stdout.reconfigure(encoding='utf-8')

from ai.entity_extractor import extract_entities

def test_birth_cert_from_image():
    # Transcription of the provided image
    text = """
    GOVERNMENT OF MAHARASHTRA
    DEPARTMENT OF HEALTH
    RURAL HOSPITAL TASGAON
    BIRTH CERTIFICATE
    
    NAME: ABHAYRAJ SHEKHAR THORAT   SEX: MALE
    DATE OF BIRTH: 12-05-2020
    PLACE OF BIRTH: RURAL HOSPITAL TASGAON
    
    NAME OF MOTHER: SHITAL SHEKHAR THORAT
    NAME OF FATHER: SHEKHAR GOPAL THORAT
    
    ADDRESS OF PARENTS AT THE TIME OF BIRTH OF THE CHILD:
    TASGAON (M CL), TASGAON, SANGLI
    MAHARASHTRA 416312
    
    PERMANENT ADDRESS OF PARENTS:
    TASGAON (M CL), TASGAON, SANGLI
    MAHARASHTRA 416312
    
    REGISTRATION NUMBER: B-2020: 27-90593-000017
    DATE OF REGISTRATION: 13-05-2020
    """

    print("--- Testing Extraction Logic with Provided Birth Certificate ---")
    entities = extract_entities(text)

    # Expected values based on the image
    expected = {
        "name": "ABHAYRAJ SHEKHAR THORAT",
        "gender": "Male",
        "dob": "12-05-2020",
        "place_of_birth": "RURAL HOSPITAL TASGAON",
        "mother_name": "SHITAL SHEKHAR THORAT",
        "father_name": "SHEKHAR GOPAL THORAT",
        "registration_number": "B-2020: 27-90593-000017",
        "date_of_registration": "13-05-2020",
        # Address extraction can be tricky due to multiline, checking key parts
        "permanent_address": "TASGAON (M CL), TASGAON, SANGLI\n    MAHARASHTRA 416312",
        "address": "TASGAON (M CL), TASGAON, SANGLI\n    MAHARASHTRA 416312"
    }

    # Normalize address for comparison (remove extra spaces/newlines)
    def normalize(s):
        return " ".join(s.split()) if s else ""

    print(f"\nExtracted Entities:\n{entities}\n")

    passed = True
    for key, val in expected.items():
        extracted_val = entities.get(key, "")
        
        # Special handling for address to be lenient on whitespace
        if "address" in key:
            if normalize(extracted_val) != normalize(val):
                 print(f"❌ {key} Mismatch:\n   Expected: '{normalize(val)}'\n   Got:      '{normalize(extracted_val)}'")
                 passed = False
            else:
                 print(f"✅ {key}: {extracted_val}")
        else:
            if extracted_val != val:
                print(f"❌ {key} Mismatch:\n   Expected: '{val}'\n   Got:      '{extracted_val}'")
                passed = False
            else:
                print(f"✅ {key}: {extracted_val}")

    if passed:
        print("\n🎉 SUCCESS: All fields extracted correctly matching the image!")
    else:
        print("\n⚠️ FAILURE: Some fields did not match.")

if __name__ == "__main__":
    test_birth_cert_from_image()
