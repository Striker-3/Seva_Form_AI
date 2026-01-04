# ai/ocr.py
import cv2
import pytesseract
import numpy as np
from PIL import Image
import os

# If Windows + Tesseract path issue, uncomment and set path
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def preprocess_image(image_path: str):
    """
    Image preprocessing for Indian Govt IDs
    """
    img = cv2.imread(image_path)

    if img is None:
        raise ValueError("Image not readable")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Noise removal
    gray = cv2.bilateralFilter(gray, 11, 17, 17)

    # Adaptive threshold
    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        2
    )

    return thresh


def extract_text(image_path: str):
    """
    OCR main function
    """
    processed = preprocess_image(image_path)

    custom_config = r"""
        --oem 3
        --psm 6
        -c preserve_interword_spaces=1
    """

    text = pytesseract.image_to_string(
        processed,
        lang="eng",
        config=custom_config
    )

    clean_text = " ".join(text.split())
    return clean_text
