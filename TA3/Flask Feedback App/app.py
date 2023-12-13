from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

feedback_data = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    feedback_text = request.form.get('feedback')
    name = request.form.get('name')
    email = request.form.get('email')


    feedback_data.append([name, email, feedback_text])

    return render_template('feedback.html')

@app.route('/get_feedback')
def get_feedback():
    return jsonify(feedback_data)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=1000,debug=True)
