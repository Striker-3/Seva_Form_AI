import cv2

def crop_pan_region(img):
    """
    Crop the region where PAN number usually appears.
    PAN number is generally located in the lower-middle area of the card.
    """
    h, w = img.shape[:2]

    # Crop bottom-middle area
    crop = img[
        int(h * 0.55):int(h * 0.80),
        int(w * 0.20):int(w * 0.80)
    ]

    return crop


def preprocess_image(image_path):
    """
    Unified preprocessing pipeline for Indian government documents
    (PAN, Aadhaar, certificates)

    Steps:
    1. Read image
    2. Resize (improves OCR)
    3. Crop PAN region (reduces noise)
    4. Convert to grayscale
    5. Contrast enhancement
    6. Noise removal
    7. Adaptive thresholding
    """

    # -------------------------
    # Read image
    # -------------------------
    img = cv2.imread(image_path)

    if img is None:
        raise ValueError("Image not found or invalid image path")

    # -------------------------
    # Resize (IMPORTANT)
    # -------------------------
    img = cv2.resize(
        img,
        None,
        fx=2,
        fy=2,
        interpolation=cv2.INTER_CUBIC
    )

    # -------------------------
    # Crop PAN region (NEW)
    # -------------------------
    img = crop_pan_region(img)

    # -------------------------
    # Convert to grayscale
    # -------------------------
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # -------------------------
    # Improve contrast
    # (Very important for blue PAN cards)
    # -------------------------
    gray = cv2.equalizeHist(gray)

    # -------------------------
    # Noise removal
    # -------------------------
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # -------------------------
    # Adaptive thresholding
    # -------------------------
    thresh = cv2.adaptiveThreshold(
        blur,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        5
    )

    return thresh
