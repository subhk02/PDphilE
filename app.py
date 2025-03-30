from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from PyPDF2 import PdfMerger
import uuid
import tempfile

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create a temporary directory for uploaded files
UPLOAD_FOLDER = tempfile.mkdtemp()
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
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
    
    # Process the files
    try:
        merger = PdfMerger()
        
        # Save the files temporarily and add to merger
        file_paths = []
        for file in files:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            file_paths.append(filepath)
            merger.append(filepath)
        
        # Generate a unique filename for the merged PDF
        output_filename = f"merged_{uuid.uuid4().hex}.pdf"
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], output_filename)
        
        # Write the merged PDF
        merger.write(output_path)
        merger.close()
        
        # Clean up individual files
        for filepath in file_paths:
            os.remove(filepath)
        
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
    app.run(debug=True, port=5000)