from flask import Flask, request, render_template, url_for, jsonify
from conversation import initialize_qa

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=["POST", "GET"])
def chat():
    user_message = request.json["message"]
    
    qa = initialize_qa()

    # Run langchain
    result = qa({"question": "message"})
    
    # Get the chatbot's response
    bot_response = result['answer']

    # Create the response 
    response = jsonify({"response": bot_response})

    return response

if __name__ == "__main__":
    app.run(debug=True)