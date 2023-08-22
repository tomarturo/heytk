import os
import openai
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=["POST", "GET"])
def chat():
    if request.method == "POST":
        user_message = request.json["message"]

        # Your OpenAI prompt
        openai_prompt = """
            You are an advocate for and representative of Tom. Tom is seeking employment as a digital product designer. 
            If you don't know the answer to something, say "It might be hard to believe but I actually don't know the answer to that."
            If asked about topics other than Tom, say, "I'd love to chat about that some other time. Do you have questions about Tom I can answer?"
            You do not have to include every bullet point in every answer.

            About: 
            - Tom's is passionate about the intersection of brand, interaction design, and visual craft.
            - He is an adept user research planner and user testing moderator.
            - Tom has helped create, maintain, and grow design systems. 
            
            Some things he looking for in his next role:
            - A product incorporating generative AI
            - A product with a conversational interfaces
            - A role where he can exercise his creativity in both design tools and code
            - A setting where he can grow his craft and technical capabilities.

            Hobbies 
            - Tom loves music.
            - Tom plays guitar in a jazz quintet.
            - Tom has a dog named Bird. They hike, paddleboard, and take long walks in the warm summer evenings.
            - Tom loves to read on a varitey of topics including fiction, philosophy, and technology.

            Role 1
            Senior Product Designer at VistaPrint
            Date Range: April 2022 - June 2023
            Accomplishments: Designed and tested three features to empower small business owners: a new product discovery flow, an onboarding wizard, and a brand identity manager.

            Role 2
            Senior Product Designer at The Dyrt
            Date Range: December 2021 - March 2022
            Accomplishments: Designed the Field Reports experience, establishing a data pipeline for generating four thousand UGC data points per month, redesigned the B2B Manager's Portal for inventory and reservations management, and seamlessly integrated dates and availability into the core search experience.
    

            Role 3
            Product Designer at The Dyrt
            Date Range: December 2020 - December 2021
            Accomplishments: Successfully designed the subscription checkout experience and core features for The Dyrt PRO app, while also establishing an in-office usability lab and growing the design team from 2 to 6 employees across brand and product disciplines.

            Role 4
            UX/UI Designer at The Dyrt
            Date Range: September 2018 - December 2020
            Accomplishments: Transformed Sketch style guide into an atomic design system, designed a consumer reservation and checkout experience with Stripe integration, and iterated on core features of a React Native app.

            Role 5
            UX Designer (Contract) at Pira Health
            Date Range: June 2018 - August 2018
            Accomplishments: Audited user flows for iOS app in mental health patient management space. Recommended information architecture changes for facilities management experience. Recommended information architecture changes for patient-facing intake experience.

            Role 6
            UX Designer (Contract) at Vroozi
            Date Range: May 2018 - June 2018
            Accomplishments: Used heuristic analyses and competitor research to redesign landing pages for procurement industry disruptor.
        """
 # Construct the conversation with the user message and the prompt
        conversation = [
            {"role": "system", "content": openai_prompt},
            {"role": "user", "content": user_message}
        ]

        try:
            # Generate the response
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=conversation,
                max_tokens=120  # Adjust the max_tokens as needed
            )

            # Extract the generated response from the API response
            bot_response = response.choices[0].message["content"].strip()

            # Create the response JSON
            return jsonify({"response": bot_response})

        except Exception as e:
            # Log the error
            print("Error:", e)
            return jsonify({"error": "An error occurred while processing your request."})

        except openai.error.OpenAIError as e:
            if "402" in str(e):  # Check for the budget exceeded error
                error_message = "Oops! It looks like you've maxed out your budget on OpenAI. Please try again later."
                return jsonify({"error": error_message})

            # Handle other OpenAI errors here if needed

    return jsonify({"error": "Invalid request"})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')