from flask import Flask, request, jsonify
from flask_cors import CORS
from conversation import qa

app = Flask(__name__)
CORS(app)

@app.route("/api/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]
    
    # Run langchain
    result = qa({"question": "message"})
    
    # Get the chatbot's response
    bot_response = result['answer']

    # Create the response and include the 'Access-Control-Allow-Origin' header
    response = jsonify({"response": bot_response})

    return response

if __name__ == "__main__":
    app.run(host="localhost", port=5000)