from flask import Flask, request, render_template, url_for, jsonify
# from conversation import qa

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]
    
    # Run langchain
    result = qa({"question": "message"})
    
    # Get the chatbot's response
    bot_response = result['answer']

    # Create the response 
    response = jsonify({"response": bot_response})

    return response

# if __name__ == "__main__":
#     app.run(host="ht", port=5000)