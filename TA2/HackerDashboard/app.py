from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = []

@app.route('/')
def index():
     return render_template('index.html', data=data)

# Create a /script route
@app.route('/script')
# Define script() function
def script():
     # Return the static.js using send_from_directory() function
     return send_from_directory('static', 'script.js')

# Create collect_browser_data route
@app.route('/collect_browser_data', methods=['POST', 'GET'])
# Define function collect_browser_data()
def collect_browser_data():
    # Get json data from request and save it in browserData variable   
    browserData = request.get_json()

    # Get client's IP address from the request
    client_ip = request.remote_addr

    # Add client IP to the collected data
    browserData['ipAddress'] = client_ip

    # Append the browserData to data
    data.append(browserData)
    
    # Return json {'status': 'success'}
    return jsonify({'status': 'success'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000,debug=True)
