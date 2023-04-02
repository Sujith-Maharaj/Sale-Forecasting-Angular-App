from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/api/login", methods=['POST'])
def login():
    username: request.json.get('username')
    password: request.json.get('password')

    if username == 'admin' and password == 'admin':
        return jsonify({'success': True}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401


if __name__ =="__main__":
    app.run(debug=True)

