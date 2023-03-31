from flask import Flask, request
from flask_mongoengine import MongoEngine

app = Flask(__name__)


@app.route("/")
def sample():
    return "Hello Get Request..!!"

@app.route("/testpost", methods=["POST"])
def testpost():
    if request.method == "POST":
        data = request.json
        return {"status": "success", "message":"Data Received"}, 200
    else:
        return {"status": "error", "message": "Invalid request method..!"}

if __name__ =="__main__":
    app.run(debug=True)

