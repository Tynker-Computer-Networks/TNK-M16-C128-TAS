from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = []

@app.route('/')
def index():
     return render_template('index.html', data=data)

@app.route('/script')
def script():
     return send_from_directory('static', 'script.js')

@app.route('/collect_browser_data', methods=['POST', 'GET'])
def collect_browser_data():
    browserData = request.get_json()

    client_ip = request.remote_addr
    browserData['ipAddress'] = client_ip

    data.append(browserData)
    
    return jsonify({'status': 'success'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000,debug=True)
