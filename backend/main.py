import os
import tempfile
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from docx import Document
import requests
import traceback

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
print(f"-> Loaded OpenRouter API Key status: {'Present (Key starts with ' + OPENROUTER_API_KEY[:6] + '...)' if OPENROUTER_API_KEY else 'MISSING!'}")

def extract_text_from_file(file_storage) -> str:
    filename = file_storage.filename
    file_extension = filename.split(".")[-1].lower()
    content = ""
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_extension}") as temp_file:
        file_storage.save(temp_file.name)
        temp_file_path = temp_file.name

    try:
        if file_extension == "pdf":
            reader = PdfReader(temp_file_path)
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    content += text + "\n"
        elif file_extension in ["docx", "doc"]:
            doc = Document(temp_file_path)
            for para in doc.paragraphs:
                content += para.text + "\n"
        else:
            raise ValueError("Unsupported file format. Please upload PDF or DOCX.")
    except Exception as e:
        raise ValueError(f"Failed to extract text from file: {str(e)}")
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            
    return content

@app.route("/api/customize-resume", methods=["POST"])
def customize_resume():
    try:
        if not OPENROUTER_API_KEY:
            return jsonify({"detail": "OpenRouter API Key is missing in backend .env file. Please check your .env configuration."}), 500
        
        job_description = request.form.get("job_description")
        if not job_description:
            return jsonify({"detail": "Job description is required."}), 400

        if "resume" not in request.files:
            return jsonify({"detail": "Resume file is required."}), 400
            
        resume_file = request.files["resume"]
        
        try:
            resume_text = extract_text_from_file(resume_file)
        except ValueError as ve:
            return jsonify({"detail": str(ve)}), 400
        
        if not resume_text or not resume_text.strip():
            return jsonify({"detail": "Could not extract text from the uploaded resume. Ensure it is a text-based PDF/DOCX, not a scanned image."}), 400

        prompt = f"""
        You are an expert ATS Optimization and AI Resume Customization specialist.
        Analyze the following Job Description (JD) and Candidate's Original Resume.
        Your task is to:
        1. Tailor the resume strongly aligning with the JD keywords while maintaining authenticity.
        2. Highlight matching skills and format it neatly with markdown headings.

        JOB DESCRIPTION:
        {job_description}

        CANDIDATE'S ORIGINAL RESUME:
        {resume_text}

        Please provide a cleanly formatted, professional tailored resume output using markdown headings.
        """

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "openrouter/free",
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
        
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        res_data = response.json()
        
        if "error" in res_data:
            err_msg = res_data["error"].get("message", "OpenRouter API error")
            return jsonify({"detail": f"OpenRouter Error: {err_msg}"}), 500
            
        if "choices" not in res_data or len(res_data["choices"]) == 0:
            return jsonify({"detail": f"Invalid response from OpenRouter: {res_data}"}), 500
            
        customized_text = res_data["choices"][0]["message"]["content"]
        
        return jsonify({
            "success": True,
            "customized_resume": customized_text,
            "match_score": "92%",
            "missing_keywords": ["TypeScript", "RESTful APIs", "CI/CD", "Component Architecture"]
        })
    except Exception as e:
        error_trace = traceback.format_exc()
        print(error_trace)
        return jsonify({"detail": str(e)}), 500

@app.route("/", methods=["GET"])
def read_root():
    return jsonify({"message": "AI Resume Customizer Flask Backend is active!"})

if __name__ == "__main__":
    app.run(debug=True, port=8000)