import os

emblem_path = r"c:\Users\priyanshu\seva-form-ai\backend\emblem.txt"
form_path = r"c:\Users\priyanshu\seva-form-ai\frontend\src\components\EditableForm.jsx"

try:
    with open(emblem_path, "r") as f:
        base64_img = f.read().strip()

    with open(form_path, "r", encoding="utf-8") as f:
        content = f.read()

    target_url = 'src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"'
    new_src = f'src="{base64_img}"'

    if target_url in content:
        new_content = content.replace(target_url, new_src)
        with open(form_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Successfully patched EditableForm.jsx")
    else:
        print("Target URL not found in EditableForm.jsx")

except Exception as e:
    print(f"Error: {e}")
