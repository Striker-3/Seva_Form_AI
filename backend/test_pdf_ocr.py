
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import pytesseract
import os

# Create a PDF
pdf_path = "test_ocr.pdf"
c = canvas.Canvas(pdf_path, pagesize=A4)
c.drawString(100, 750, "This is a test PDF for OCR.")
c.drawString(100, 700, "PAN NUMBER: ABCDE1234F")
c.save()

print(f"Created {pdf_path}")

try:
    print("Attempting OCR on PDF...")
    # Tesseract 3.03+ supports PDF if input is PDF
    text = pytesseract.image_to_string(pdf_path, lang='eng')
    print("OCR Result:")
    print(text)
    if "PAN NUMBER" in text:
        print("SUCCESS: OCR read the PDF")
    else:
        print("FAILURE: OCR ran but did not find text")
except Exception as e:
    print(f"FAILURE: OCR raised exception: {e}")
