from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def first():
    return "Hello..!"


if __name__ =="__main__":
    app.run(debug=True)

