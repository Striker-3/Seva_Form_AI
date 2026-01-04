from ai.preprocess import preprocess_image, crop_pan_region
import cv2

img=cv2.imread('pan-card.jpg')
print('img is None?', img is None)
print('img shape', None if img is None else img.shape)
if img is not None:
    img2=cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    c=crop_pan_region(img2)
    print('crop shape', c.shape)
    cv2.imwrite('debug_crop.png', c)
    th=preprocess_image('pan-card.jpg')
    print('thresh shape', th.shape)
    cv2.imwrite('debug_thresh.png', th)
