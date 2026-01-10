# ai/entity_extractor.py
import re

def extract_entities(text: str):
    entities = {}

    # Normalize text but keep case for some regexes
    text_clean = text.strip()
    
    # helper to clean overlapping spaces
    def clean_space(s):
        return re.sub(r'\s+', ' ', s).strip()

    # =========================
    # EMAIL EXTRACTION
    # =========================
    email_match = re.search(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", text_clean)
    if email_match:
        entities["email"] = email_match.group(0).lower()

    # =========================
    # PHONE NUMBER EXTRACTION
    # =========================
    # Matches +91 9999999999, 9999999999, 999 999 9999
    phone_match = re.search(r"\b(?:\+91[\-\s]?)?[6-9]\d{4}\s?\d{5}\b", text_clean)
    if phone_match:
        entities["mobile"] = phone_match.group(0).replace(" ", "").replace("-", "")

    # =========================
    # GENDER EXTRACTION
    # =========================
    # Extended to catch "Man"/"Woman" in conversation
    gender_match = re.search(r"\b(Male|Female|Transgender|Man|Woman)\b", text_clean, re.IGNORECASE)
    if gender_match:
        val = gender_match.group(0).capitalize()
        if val == "Man": val = "Male"
        if val == "Woman": val = "Female"
        entities["gender"] = val

    # =========================
    # CASTE EXTRACTION
    # =========================
    # SC, ST, OBC, GEN, General
    caste_match = re.search(r"\b(SC|ST|OBC|GEN|General)\b", text_clean, re.IGNORECASE)
    if caste_match:
        val = caste_match.group(0).upper()
        if val == "GENERAL":
            val = "GEN"
        entities["caste"] = val

    # =========================
    # MARITAL STATUS EXTRACTION
    # =========================
    # Single, Married, Divorced, Widowed
    marital_match = re.search(r"\b(Single|Married|Divorced|Widowed)\b", text_clean, re.IGNORECASE)
    if marital_match:
        entities["marital_status"] = marital_match.group(0).capitalize()

    # =========================
    # AADHAAR NUMBER (Robust)
    # =========================
    # 12 digits, potentially spaced: 1234 5678 9012 or 123456789012
    # Using [\s-]* to allow any amount of spacing
    aadhaar_match = re.search(r"\b\d{4}[\s-]*\d{4}[\s-]*\d{4}\b", text_clean)
    if aadhaar_match:
        entities["aadhaar"] = aadhaar_match.group(0).replace(" ", "").replace("-", "")

    # =========================
    # PAN NUMBER
    # =========================
    # Combined regex to handle both compact (ABCDE1234F) and spaced (A B C D E 1 2 3 4 F) formats
    # The spaced version is a superset, but we ensure boundaries.
    pan_match = re.search(
        r"\b([A-Z]\s*){5}([0-9]\s*){4}([A-Z])\b", 
        text_clean, 
        re.IGNORECASE
    )
    if pan_match:
        entities["pan"] = pan_match.group(0).replace(" ", "").upper()

    # =========================
    # DATE OF BIRTH
    # =========================
    # "DOB: 12/05/1990" or just date 
    # Prioritize if explicitly labeled "DOB" or "Date of Birth"
    dob_labeled = re.search(r"(?:DOB|Date of Birth|born on)[\s:]*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{4})", text_clean, re.IGNORECASE)
    if dob_labeled:
        entities["dob"] = dob_labeled.group(1)
    else:
        # Spoken dates: "5th January 1990" or "January 5th 1990"
        spoken_dob = re.search(
            r"\b(\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\b",
            text_clean,
            re.IGNORECASE
        )
        if spoken_dob:
             entities["dob"] = spoken_dob.group(1)
        else:
            # Fallback to standard date regex
            dob_match = re.search(
                r"\b(0?[1-9]|[12][0-9]|3[01])[/\-\.](0?[1-9]|1[012])[/\-\.](19|20)\d{2}\b",
                text_clean
            )
            if dob_match:
                entities["dob"] = dob_match.group(0)

    # =========================
    # NAME EXTRACTION
    # =========================
    # 1. Look for "Name is", "Name" labels. Support lowercase names.
    # Regex structure: (Label) (optional 'is') (Name)
    name_label_match = re.search(r"(?:Name|I am|My name)(?:\s+is)?[\s:]+([A-Za-z]+(?:\s[A-Za-z]+)+)", text_clean, re.IGNORECASE)
    if name_label_match:
        candidate = name_label_match.group(1).strip()
        # Filter out common false positives
        if "student" not in candidate.lower() and "here" not in candidate.lower():
             entities["name"] = candidate
    
    # 2. Aadhaar Top Line Heuristic (Fallback)
    if "name" not in entities:
        # ... (existing fallback logic remains similar, but simplified here for robustness)
        name_candidates = re.findall(r"\b([A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)+)\b", text_clean)
        blacklist = [
            "INCOME", "TAX", "DEPARTMENT", "GOV", "INDIA", "GOVERNMENT", "MALE", "FEMALE", 
            "DOB", "YEAR", "FATHER", "PERMANENT", "ACCOUNT", "NUMBER", "CARD", "DIGITAL", 
            "SEVA", "KENDRA", "ADDRESS", "AADHAAR", "MY", "NAME", "IS", "DATE", "BIRTH",
            "PHONE", "CONTACT", "EMAIL"
        ]
        
        for candidate in name_candidates:
            upper_cand = candidate.upper()
            if not any(b in upper_cand.split() for b in blacklist) and len(candidate) > 4:
                entities["name"] = candidate
                break

    # =========================
    # ADDRESS EXTRACTION
    # =========================

    # 1. Birth Certificate Specific: "Address of Parents at the time of birth"
    bc_addr_match = re.search(r"(?:Address of Parents at the time of birth(?: of the child)?|ADDRESS OF PARENTS AT THE TIME OF BIRTH(?: OF THE CHILD)?)[\s:]+(.+?)(?=\.|Permanent|Address|$)", text_clean, re.IGNORECASE | re.DOTALL)
    if bc_addr_match:
        entities["address"] = clean_space(bc_addr_match.group(1))

    # 2. Conversational "Address is", "Live at"
    # Added (?:\s+is)? to handle "Address is..."
    conv_addr_match = re.search(r"(?:Address|Live at|Residing at)(?:\s+is)?[\s:]+(.+?)(?=\.|My|Phone|Email|Date|$)", text_clean, re.IGNORECASE)
    if conv_addr_match:
         entities["address"] = clean_space(conv_addr_match.group(1))
    
    # 2. Aadhaar Back / Standard Block (existing logic)
    if "address" not in entities:
        # capture everything from "Address" key until a pin code
        address_match = re.search(r"(?:Address|To)[\s:]+(.*?\d{6})", text_clean, re.DOTALL | re.IGNORECASE)
        if address_match:
            raw_addr = address_match.group(1)
            entities["address"] = clean_space(raw_addr)
        else:
            # Fallback: look for just a pin code and grab preceding words
            pin_match = re.search(r"([A-Za-z0-9,\s\-\/]{15,})\s(\d{6})", text_clean)
            if pin_match:
                entities["address"] = clean_space(pin_match.group(0))

    # =========================
    # BIRTH CERTIFICATE FIELDS
    # =========================
    
    # Registration Number
    # Pattern: "Registration No", "Registration Number", "B-2020: 27-90593-000017"
    reg_match = re.search(r"(?:Registration\s*(?:No|Number)|REGISTRATION\s*(?:NO|NUMBER))[\s:]+([A-Z0-9\-\/:]+)", text_clean, re.IGNORECASE)
    if reg_match:
        entities["registration_number"] = clean_space(reg_match.group(1))

    # Date of Registration
    # Pattern: "Date of Registration: 13-05-2020"
    reg_date_match = re.search(r"(?:Date of Registration|REGISTRATION DATE)[\s:]*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{4})", text_clean, re.IGNORECASE)
    if reg_date_match:
        entities["date_of_registration"] = reg_date_match.group(1)

    # Place of Birth
    # Pattern: "Place of Birth: RURAL HOSPITAL TASGAON"
    pob_match = re.search(r"(?:Place of Birth|BIRTH PLACE)[\s:]+([A-Za-z\s,]+)(?=\n|Date|Name|$)", text_clean, re.IGNORECASE)
    if pob_match:
        entities["place_of_birth"] = clean_space(pob_match.group(1))

    # Father's Name
    # Pattern: "Name of Father", "Father's Name"
    father_match = re.search(r"(?:Name of Father|Father(?:'s)? Name)(?:\s+is)?[\s:]+([A-Za-z \t\.]+)(?=\n|Name|Address|$)", text_clean, re.IGNORECASE)
    if father_match:
         entities["father_name"] = clean_space(father_match.group(1))

    # Mother's Name
    # Pattern: "Name of Mother", "Mother's Name"
    mother_match = re.search(r"(?:Name of Mother|Mother(?:'s)? Name)(?:\s+is)?[\s:]+([A-Za-z \t\.]+)(?=\n|Name|Address|$)", text_clean, re.IGNORECASE)
    if mother_match:
         entities["mother_name"] = clean_space(mother_match.group(1))

    # Permanent Address
    # Pattern: "Permanent Address", "Permanent Address of Parents"
    perm_addr_match = re.search(r"(?:Permanent Address(?: of Parents)?|PERMANENT ADDRESS(?: OF PARENTS)?)[\s:]+(.+?)(?=\.|Date|Signature|Registration|REGISTRATION|$)", text_clean, re.IGNORECASE | re.DOTALL)
    if perm_addr_match:
        entities["permanent_address"] = clean_space(perm_addr_match.group(1))


    return entities

