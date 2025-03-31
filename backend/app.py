from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from PyPDF2 import PdfMerger
import uuid
import tempfile

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

@app.route('/api/merge', methods=['POST'])
def merge_pdfs():
    if 'files' not in request.files:
        return jsonify({'error': 'No files provided'}), 400
    
    files = request.files.getlist('files')
    
    # Check if any file is selected
    if not files or files[0].filename == '':
        return jsonify({'error': 'No files selected'}), 400
    
    # Check if all files are PDFs
    for file in files:
        if not file.filename.lower().endswith('.pdf'):
            return jsonify({'error': 'All files must be PDFs'}), 400

    try:
        merger = PdfMerger()

        # Use a temporary directory that will be automatically cleaned up
        with tempfile.TemporaryDirectory() as temp_dir:
            file_paths = []

            # Save uploaded files in the temp directory
            for file in files:
                filename = secure_filename(file.filename)
                filepath = os.path.join(temp_dir, filename)
                file.save(filepath)
                file_paths.append(filepath)
                merger.append(filepath)

            # Generate a unique filename for the merged PDF
            output_filename = f"merged_{uuid.uuid4().hex}.pdf"
            output_path = os.path.join(temp_dir, output_filename)

            # Write the merged PDF
            merger.write(output_path)
            merger.close()

            # Return the merged PDF
            return send_file(
                output_path,
                as_attachment=True, 
                download_name="merged.pdf",
                mimetype='application/pdf'
            )

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
