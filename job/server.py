import os
from flask import Flask, request, render_template, send_file
from flask_cors import CORS

from models.predictor import predictor

UPLOAD_FOLDER = './build/imgs'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'webp'])
template_dir = os.path.abspath('./build')
static_folder='./build/static'

app = Flask(__name__, template_folder=template_dir, static_folder=static_folder)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template("index.html")

@app.route('/signup')
def signup():
    return render_template("index.html")

@app.route('/predict', methods=['POST',])
def predict():
    if request.method == 'POST':
        text = request.form['text'].strip()
        role = predictor(text=text)
        data = {
           "role":role
        }
        return data, 200
    
app.run(debug=True, port=80)