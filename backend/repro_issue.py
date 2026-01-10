
import sys
import os

# Add backend directory to sys.path
sys.path.append(os.getcwd())

from ai.processor import process_document

# Path to the uploaded image (verified from metadata)
image_path = "test_ocr.pdf"

if not os.path.exists(image_path):
    print(f"Error: Image not found at {image_path}")
    sys.exit(1)

print(f"Processing image: {image_path}")
result = process_document(image_path)
print("Result:")
print(result)

if result.get("status") == "error":
    print("FAILURE DETECTED")
else:
    print("SUCCESS")
