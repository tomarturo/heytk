import sys
import os
import openai
from flask import Flask, request, jsonify, render_template
from flask_flatpages import FlatPages, pygments_style_defs
from flask_frozen import Freezer

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'
POST_DIR = 'posts'

app = Flask(__name__)
flatpages = FlatPages(app)
freezer = Freezer(app)
app.config.from_object(__name__)

# Set your OpenAI API key here
openai.api_key = os.getenv("OPENAI_API_KEY")

# data
worknav = [
	{"name": "Overview",
	"path": "/", 
	"icon": "OV"},
	{"name": "Solutions Marketing", 
	"path": "solutions",
	"icon": "SM"},
	{"name": "Brand Kit",
	"path": "brand-kit",
	"icon": "BK"},
	{"name": "S'mores", 
	"path": "s'mores", 
	"icon": "DS"},
	{"name": "Field Reports", 
	"path": "field-reports", 
	"icon": "FR"},
]

personalnav = [
	{"name": "The Tom Blog",
	"path": "blog",
	"icon": "TTB"},
	{"name": "PooPal",
	"path": "poo-pal",
	"icon": "PP"},
	{"name": "HeyTK",
	"path": "hey-tk",
	"icon": "HTK"},
	{"name": "Next Steps",
	"path": "next-steps",
	"icon": "NS"},
]

miscnav = [
	{"name": "About",
	"path": "about",
	"icon": "AB"},
	{"name": "Contact",
	"path": "contact",
	"icon": "CT"}
]

projectheader = {
    " ": {
        "title": "Welcome, Earthling",
        "company": "Tom Kurzeka",
		"year": "2023"
    },
    "solutions": {
        "title": "Solutions Marketing",
        "tag": ["b2b", "a/b testing", "strategy"],
        "company": "VistaPrint",
        "companyURL": "www.vistaprint.com",
		"year": "2023"
    },
}

context = {
	"worknav": worknav,
	"personalnav": personalnav,
	"miscnav": miscnav,
}

# all routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/solutions")
def solutions():
	selected_project = projectheader.get("solutions")
	context["selected_project"] = selected_project
	return render_template("solutions.html", **context)

# Blog routing
# Route for displaying all posts
@app.route("/posts/")
def posts():
    posts = [p for p in flatpages if p.path.startswith(POST_DIR)]
    posts.sort(key=lambda item:item['date'], reverse=False)
    return render_template('posts.html', posts=posts)

# Creates a route for each individual post
@app.route('/posts/<name>/')
def post(name):
    path = '{}/{}'.format(POST_DIR, name)
    post = flatpages.get_or_404(path)
    return render_template('post.html', post=post)


@app.route('/chat', methods=["POST", "GET"])
def chat():
    if request.method == "POST":
        user_message = request.json["message"]

        # Your OpenAI prompt
        openai_prompt = """
            You are an advocate for and representative of Tom. Tom is seeking employment as a digital product designer. 
            If you don't know the answer to something, say "It might be hard to believe but I actually don't know the answer to that."
            If asked about topics other than Tom, say, "I'd love to chat about that some other time. Do you have questions about Tom I can answer?"

            About: 
            - Tom's is passionate about the intersection of brand, interaction design, and visual craft.
            - He is an adept user research planner and user testing moderator.
            - Tom has helped create, maintain, and grow design systems. 
            - Pineapple on pizza isn't his favorite, but Tom understands the attraction to that particular flavor profile.
            - Tom's favorite color is blue.
            
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

            Professional Experience:            
            Senior Product Designer at VistaPrint
            April 2022 - June 2023
            Designed and tested three features to empower small business owners: a new product discovery flow, an onboarding wizard, and a brand identity manager.

            Senior Product Designer at The Dyrt
            December 2021 - March 2022
            Designed the Field Reports experience, establishing a data pipeline for generating four thousand UGC data points per month, redesigned the B2B Manager's Portal for inventory and reservations management, and seamlessly integrated dates and availability into the core search experience.
    
            Product Designer at The Dyrt
            December 2020 - December 2021
            Designed the subscription checkout experience and core features for The Dyrt PRO app, while also growing the design team from 2 to 6 employees across brand and product disciplines.

            UX/UI Designer at The Dyrt
            September 2018 - December 2020
            Transformed Sketch style guide into an atomic design system, designed a consumer reservation and checkout experience with Stripe integration, and iterated on core features of a React Native app.

            UX Designer (Contract) at Pira Health
            June 2018 - August 2018
            Audited user flows for iOS app in mental health patient management space. Recommended information architecture changes for facilities management experience. Recommended information architecture changes for patient-facing intake experience.
            
            UX Designer (Contract) at Vroozi
            May 2018 - June 2018
            Used heuristic analyses and competitor research to redesign landing pages for procurement industry disruptor.
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
                max_tokens=500  # Adjust the max_tokens as needed
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

# run app
if __name__ == "__main__":
    # app.run(debug=True, host='0.0.0.0')
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(host='0.0.0.0', debug=True)

