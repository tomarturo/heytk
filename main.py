import sys
import os
import openai
import boto3
import json
import re
from flask import Flask, request, jsonify, render_template
from flask_flatpages import FlatPages, pygments_style_defs
from flask_frozen import Freezer
from datetime import datetime
from zoneinfo import ZoneInfo
from botocore.exceptions import ClientError

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'
POST_DIR = 'posts'

app = Flask(__name__)
flatpages = FlatPages(app)
freezer = Freezer(app)
app.config.from_object(__name__)

# AWS S3 configuration
S3_BUCKET = os.getenv('S3_BUCKET', 'heytk')
COUNTER_FILE = 'visitor_counter.json' 
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION', 'us-west-2')

# Set your OpenAI API key here
openai.api_key = os.getenv("OPENAI_API_KEY")

def read_svg(filename, color=None):
    with open(f"static/icons/{filename}", 'r') as file:
        svg_content = file.read()
        
        # If a color is provided, replace the fill attribute in path tags
        if color:
            # Replace fill attribute values in path tags
            svg_content = re.sub(r'(<path\b[^>]*?)fill="[^"]*"([^>]*?>)', 
                                r'\1fill="' + color + r'"\2', 
                                svg_content)
            
        return svg_content

# data
worknav = [
	{"name": "Solutions Marketing", 
	"path": "solutions",
	"icon": read_svg("puzzle.svg", "#FB923C"),
    "color": "bg-orange-400"},
	{"name": "Brand Kit",
	"path": "brand_kit",
	"icon": read_svg("color-swatch.svg", "#86EFAC"),
    "color": "bg-green-300"},
	{"name": "S'mores", 
	"path": "smores", 
	"icon": read_svg("template.svg", "#60A5FA"),
    "color": "bg-blue-400"},
	{"name": "Field Reports", 
	"path": "field_reports", 
	"icon": read_svg("map.svg", "#F472B6"),
    "color": "bg-pink-400"},
]

personalnav = [
     {"name": "ChatTK",
     "path": "chat_tk",
     "icon": read_svg("chat.svg", "#A3E635"),
     "color": "bg-lime-400"},
	{"name": "Melodicus",
	"path": "melodicus",
	"icon": read_svg("music-note.svg", "#2DD4BF"),
    "color": "bg-teal-400"},
    {"name": "The Tom Blog",
	"path": "blog",
	"icon": read_svg("rss.svg", "#C084FC"),
    "color": "bg-purple-400"},
	{"name": "PooPal",
	"path": "poo_pal",
	"icon": read_svg("map-pin.svg","#EA580C"),
    "color": "bg-orange-600"},
]

miscnav = [
     {"name": "Home",
      "path": "home",
      "icon": read_svg("home.svg", "#D946EF"),
      "color": "bg-fuchsia-500"},
	#  {"name": "About",
 	# "path": "about",
	# "icon": "book-open.svg",
    # "color": "bg-green-500"},
]

contactnav = [
    {"name": "Email me",
    # "path": "mailto:tom.kurzeka@gmail.com",
    "icon": "email.svg",},
    {"name": "@tomarturo",
    "path": "www.github.com/tomarturo",
    "icon": "github-mark.svg"},
    {"name": "Friend me",
    "path": "www.linkedin.com/in/tomkurzeka",
    "icon": "linked-in.svg"}
]

projectheader = {
    "overview": {
        "title": " ",
        "company": "Welcome",
		"year": " "
    },
    "solutions": {
        "title": "Solutions Marketing",
        "tag": ["b2b", "a/b testing", "strategy"],
        "company": "VistaPrint",
        "companyURL": "www.vistaprint.com",
		"year": "2023 • "
    },
    "blog": {
        "title": "The Tom Blog",
        "tag": ["creative", "quirky", "fascinating"],
		"year": "Since 2018"
    },
    "chat-tk": {
        "title": "ChatTK",
        "tag": ["generative ai", "llm's", "curiosity"],
        "year": "2023"
    },
    "brand-kit" : {
         "title": "Brand Kit",
         "tag": ["personalization", "interaction", "mvp"],
         "company": "VistaPrint",
         "companyURL": "www.vistaprint.com",
         "year": "2023 •"
    },
    "smores" : {
         "title": "S'mores Design System",
         "tag": ["systems", "visual design", "ixd"],
         "company": "The Dyrt",
         "companyURL": "www.thedyrt.com",
         "year": "2021 •"
    },
    "field-reports" : {
         "title": "Field Reports",
         "tag": ["iOS", "android", "data gathering"],
         "company": "The Dyrt",
         "companyURL": "www.thedyrt.com",
         "year": "2021 •"
    },
    "poo-pal" : {
         "title": "PooPal",
         "tag": ["swift-ui", "low-code", "everyday prblmz"],
         "company": " ",
         "companyURL": " ",
         "year": "2021"
    },
    
    "melodicus" : {
         "title": "Melodicus",
         "tag": ["react", "api", "interaction"],
         "company": " ",
         "companyURL": " ",
         "year": "2024"
    }
}

icebreakers = [
     "Tell me about Tom's professional experience.",
     "Does Tom have experience with user research?",
     "What is Tom looking for in his next role?",
     "What is Tom's design perpsective?",
     "What is Tom's favorite design tool?",
     "What is Tom's perspective on pineapple on pizza?",
     "What is Tom's design superpower?",
     "Tell me about Tom's hobbies.",
     "What is Tom's favorite color?",
]

context = {
	"worknav": worknav,
	"personalnav": personalnav,
	"miscnav": miscnav,
    "contactnav": contactnav,
    "icebreakers": icebreakers,
}

# all routes
@app.route("/")
def home():
    blog = [p for p in flatpages if p.path.startswith(POST_DIR)]
    blog.sort(key=lambda item:item['date'], reverse=True)
    context["blog"] = blog
    selected_project = projectheader.get("home")
    context["selected_project"] = selected_project
    return render_template("home.html", **context)

@app.route("/solutions")
def solutions():
	selected_project = projectheader.get("solutions")
	context["selected_project"] = selected_project
	return render_template("solutions.html", **context)

@app.route("/chat-tk")
def chat_tk():
	selected_project = projectheader.get("chat-tk")
	context["selected_project"] = selected_project
	return render_template("chat-tk.html", **context)

@app.route("/brand-kit")
def brand_kit():
	selected_project = projectheader.get("brand-kit")
	context["selected_project"] = selected_project
	return render_template("brand-kit.html", **context)

@app.route("/smores")
def smores():
	selected_project = projectheader.get("smores")
	context["selected_project"] = selected_project
	return render_template("smores.html", **context)

@app.route("/field-reports")
def field_reports():
	selected_project = projectheader.get("field-reports")
	context["selected_project"] = selected_project
	return render_template("field-reports.html", **context)

@app.route("/poo-pal")
def poo_pal():
	selected_project = projectheader.get("poo-pal")
	context["selected_project"] = selected_project
	return render_template("poo-pal.html", **context)

@app.route("/melodicus")
def melodicus():
	selected_project = projectheader.get("melodicus")
	context["selected_project"] = selected_project
	return render_template("melodicus.html", **context)

# Blog routing
# Route for displaying all posts
@app.route("/blog")
def blog():
    selected_project = projectheader.get("blog")
    blog = [p for p in flatpages if p.path.startswith(POST_DIR)]
    blog.sort(key=lambda item:item['date'], reverse=True)
    context["blog"] = blog
    context["selected_project"] = selected_project
    return render_template('blog.html', **context)

# Creates a route for each individual post
@app.route('/blog/<name>/')
def post(name):
    path = '{}/{}'.format(POST_DIR, name)
    post = flatpages.get_or_404(path)
    selected_project = projectheader.get("blog")
    context["selected_project"] = selected_project
    context["post"] = post
    return render_template('post.html', **context)

# Creates route for chat API call
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
            - Tom's favorite design tools are an Apple Pencil + iPad and Figma.
            
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

#Visitor counter via S3 
#initialize S3 client
s3_client = boto3.client('s3')

def get_visitor_count():
      """Get the current visitor count from S3"""
      try: 
            #attempt to get the count file from S3
            response = s3_client.get_object(Bucket=S3_BUCKET, Key=COUNTER_FILE)
            data = json.loads(response['Body'].read().decode('utf-8'))
            return data.get('count', 0)
      except ClientError as e: 
            if e.response['Error']['Code'] == 'NoSuchKey':
                # File does not exist yet, initialize count
                print(f"Counter file does not exist in S3 bucket: {S3_BUCKET}")
                return 0
            else: 
                  print(f"error getting counter from S3: {e}")
                  return 0
            
def increment_visitor_count():
     """Get the current count and increment it"""
     current_count = get_visitor_count()
     new_count = current_count + 1

     try: 
          s3_client.put_object(
               Bucket=S3_BUCKET,
               Key=COUNTER_FILE,
               Body=json.dumps({'count': new_count}),
               ContentType='application/json'
          )
          return new_count
     except Exception as e:
          print(f"Error updating count in S3: {3}")
          return current_count

@app.route('/api/visitor-count', methods=['GET'])
def get_current_count():
     """API endpoint to get current visitor count without incrementing"""
     count = get_visitor_count()
     return jsonify({"visitorCount": count})

@app.route('/api/visitor-number', methods=['POST'])
def get_visitor_number():
     """API endpoint to get and increment visitor number"""
     count = increment_visitor_count()
     return jsonify({"visitorNumber": count})
     
# run app
if __name__ == "__main__":
    app.run()