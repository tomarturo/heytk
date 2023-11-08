date: 2023-11-07
title: A portfolio odyssey
preview: Inspired by conversational AI, I designed and built a new portfolio. Twice.

I set sail in August. It is with great relief I tell you now that my portfolio has reached its Ithaca.

Alas, it is time to share the circuitous journey that led, finally, to this wonderful website. Consider yourself warned, traveler of the information super highway, the tale is a long one. But I feel I must tell it for my work to reach to its true and proper conclusion.

## The spark 
I was laid off in June. I took a couple months to recalibrate. Then, in the heat of an Oregon August, I got around to writing a case study about a notable project from my last role. 

My plan was to add a couple case studies to my existing portfolio and start applying in earnest. How long could that take? I figured I would be submitting applications before the end of the month.

<figure>
    <video autoplay loop muted><source src="https://drive.google.com/file/d/1Sxt2QD97vUa1JxFWytBSAkiJ4yMGDr5K/view?usp=drive_link" type="video/mp4" alt="scrolling through a previous version of my portfolio">Your browser does not support the video tag.</video>
    <figcaption>My 2021-2022 portfolio. Lots of scrolling required</figcaption>
</figure>

Writing the case study was a struggle fest. After a week of wrestling with the story, re-hashing old prototypes, and exporting various design artifacts, I had an insanely long write up I was certain no recruiter, design manager, or erstwhile visitor to tomkurzeka.com was actually going to read. 

I needed a break. I went on a two hour walk with my dog, Bird, in the middle of the afternoon as unemployment had allowed me to grow accustomed to doing. I turned on an episode of the [No Priors](https://www.youtube.com/watch?v=g4VszCFonPk&ab_channel=NoPriors%3AAI%2CMachineLearning%2CTech%2C%26Startups) podcast.

The guest was Mustafa Suleyman, the CEO and Co-founder of Inflection AI, the company behind [the conversational AI called Pi](https://pi.ai/talk).

Up until this point, I had been skeptical of the proliferation of chatbots and conversational AI hype. Then, Mustafa said something that shifted my perspective of search and how we find things on the web. 

> Well, we as humans, all humans clearly want a high quality, succinct, fluent natural language answer to the questions that we want. And then crucially, we want to be able to update our response without thinking, "How do I change my query and write this?" We've learned to speak Google. It's a crazy environment. We've learned to Google, right? That's just a weird lexicon that we've co-developed with Google over 20 years. No, now that has to stop. That's over. That moment is done and we can now talk to computers in fluent natural language, and that is the new interface. So that's what I think is going on.

The phrase that caught my ear was “a weird lexicon we’ve co-developed with Google.” I stopped at the top of Mt. Tabor. Bird sniffed at a tuft of grass while I rewound the conversation to hear the phrase again in context. 

![no priors episode cover](/static/images/blog/2023-11-07/no%20priors.avif)
<figcaption>The podcast <a href="https://www.youtube.com/watch?v=g4VszCFonPk&ab_channel=NoPriors%3AAI%2CMachineLearning%2CTech%2C%26Startups" target="_blank">episode</a> that shifted my perspective</figcaption>

I was taken by the idea that Google wasn't just determining the content we saw, but shaping our very behavior and use of language in seeking out information. And since our experience of the internet as a whole relies so heavily on search, our understanding of the internet as a technology is really eclipsed by Google's SEO model. 

Like a majority of people, I *knew* not to type complete sentences into a search bar. I’d never stopped to think about *why* that was the case. 

I finished my walk turning this idea over in my head. I could see more clearly the implications of a natural language human-computer interface, of ways to interact with the internet beyond the confines of keyword eclipsed searches. By the time Bird and I got home I was over the case study. 

It was time to build a chatbot. 

## OpenAI, Langchain, and Streamlit
My initial searches about building a custom chatbot led me to [Streamlit](https://streamlit.io/). I followed a few of their tutorials and deployed them to Streamlit cloud. For Python specific resources, I found myself returning to various tutorials on [Real Python](https://realpython.com/)

At this time, I was still getting my feet wet in the terminal and working with Git. These are tools I always wanted to develop a working familiarity with. I was excited to be installing packages via ’pip’, creating virtual environments, and making commits. I discovered a new satisfaction in interacting with my machine with a text interface, in place of the GUI I spend most of my time in as a designer. 

After a couple days, I had a Streamlit app with a simple chat interface that could query the OpenAI api. If I wanted the chatbot to field true and appropriate responses to questions about “Tom Kurzeka”, it would need information about me. 

In another flurry of searches, I discovered Langchain, a framework built to sit on top of an LLM, enabling developers to create “Retrieval Augmented Generative” chatbot. If you’ve heard of products that allow to “Chat with your .pdf’s” or “Chat with a knowledge base,” they are probably using some form of RAG.


![langchain embeddings graphic](/static/images/blog/2023-11-07/langchain%20streamlit.jpeg) 
<figcaption>Illustration of the Langchain, LLM, Streamlit workflow from a <a href="https://blog.streamlit.io/langchain-tutorial-4-build-an-ask-the-doc-app/" target="_blank">Streamlit tutorial</a></figcaption>

I created a corpus of information from my existing portfolio site. It included the short bio from my About page, the excerpts of work history from my Home page, and each of my case studies. I also added the monolithic case study I’d recently finished. And, pushing my Python and Google-fu skills to the limit, I managed to get LangChain, a vector database (ChromaDB), and OpenAI embeddings to work together. 

My Streamlit app could answer questions about "Tom Kurzeka" based on the documents I provided.

## A new portfolio interface
With the power of a local knowledge chatbot behind me, I started to imagine a new portfolio experience based on a conversational interface. 

I was already using ChatGPT to troubleshoot various development quagmires. I looked around a few other chat interfaces including Anthropic’s Claude and Inflection’s Pi. I was inspired by the minimal layout of the Pi. It didn’t even have an input field or a send button, just a blinking cursor. 

This minimalist approach was short lived. I would still need to display visual design work if this chatbot was to play a role in my portfolio. A short search about multi-modal chat responses helped me realize returning images along with text was beyond my humble Pythonic means (for the moment). 

![chat interface sketches](/static/images/blog/2023-11-07/chat%20sketches%20lg.png)

I explored a number of different ways to merge the chat interface on top of, beside, or within a mix of visual artifacts.   

I was also curious about creating visual contexts for individual projects with a persistent chat interface. 

## Streamlit + Webflow prototype
I created a new page in my existing Webflow project and prototyped a two column concept. At this point, I was still using Streamlit for my chat interface.  

The Streamlit interface is embedded as an iframe on the left and a grid of visual content and suggested questions for the chatbot scroll in an infinite loop in the right column. 

Selecting an image opens Lightbox view. Clicking on a question tile copies the question to the clipboard. 

![webflow prototype](/static/images/blog/2023-11-07/webflow%20proto.png)
<figcaption>Embedding a Streamlit app as an iframe in my existing Webflow project</figcaption>

This first pass got me hyped, but my enthusiasm waned as I encountered the limitations of styling the Streamlit interface as an iframe.

Moreover, the copy and paste interaction felt clunky. I wanted users to be able to click a tile and see the question submitted in the chat interface.  

## HeyTK MVP
After enough tinkering, I realized I decided I would need to build the site from scratch if I wanted my specific vision to come to life.

My initials were never my nickname, but my younger sister has called me TK on occassion. I was playing around with giving my chatbot a name and personality and passed on the moniker. 

Hey Siri. Okay Google. Hey TK. It has a nice rhythm to it. I was also deligthed to have an excuse to purchase another domain name :)

![HeyTK logotype](/static/images/blog/2023-11-07/heytk%20logotype.png)
<figcaption>Exploratory logotype made with <a href="https://ideogram.ai" target="_blank">Ideogram.ai</a></figcaption>

I moved forward with the two column layout. My vision for the container of mockups and suggested questions evolved. I accepted I would probably need to provide some project context and outcomes alongside my mockups of finished work.

![Concept exploration](/static/images/blog/2023-11-07/mvp%20layout%20exploration.png)
<figcaption>A moderate compromise between the display grid and providing some context</figcaption>

![Concept exploration 2](/static/images/blog/2023-11-07/layout%20exploration%202.png)
<figcaption>Moving towards a layout with a vertically scrolling case study column</figcaption>

Part of my vision was keeping all of the case study content immediately accessible to the viewer. I wanted to keep it as simple as possible for recruiters and hiring managers to jump in and out of the breadth of my work all the while able to ask the chatbot quesitons about me. 

I found an awesome animation for an accordion style component on an agency website. I was able to recreate it with the help of ChatGPT. 

Then I mocked up a few variations for display text and copy within color panels in the right hand column. After a few more explorations in Figma, I committed to a layout and built out the interface for the chatbot, the accordions, and four case studies. 

<video autoplay loop muted><source src="/static/images/blog/2023-11-07/mvp scroll through.mov" type="video/mp4" alt="scrolling through the mvp of my portfolio">Your browser does not support the video tag.</video>
<figcaption>The MVP in action. Note the fun accordion animations</figcaption>

Fixing the position of the chat column was a decision I made to emphasize my interest in that kind of product and/or interface in the roles I was looking for next. This may not have been the best design decision, as fixing that column presented some responsive challenges and constrained the width of the main content area. 

A lot of this odyssey was about learning that trying to build my portfolio around a concept I was really excited about wasn’t the best path forward for an effective portfolio. And so a series of compromises followed. 

This lesson feels obvious in retrospect, but at the time I was just so excited to be creating something unique, current, and (to me) super interesting. 

## A tough market
I started applying for jobs once I had my MVP up and running. I was grateful to land a handful of initial interviews and phone calls in September. 

Then, in October, about two and a half months after I had abandoned the mind-numbing case study to start my portfolio-chatbot odyssey, I found myself in final round interviews for two different roles I was really excited about. 

In the end, I wasn’t offered either of them.

I had been hustling–grinding out applications, customizing cover letters, telling my professional story over and over again in screener calls, and building out a site entirely from scratch for the first time–and to get so close for two different roles and not get offers for either of them hit me pretty hard.

It was the last week of October. Thanksgiving loomed a few weeks away. If I didn’t land something by Turkey Day, I wasn’t sure I would be hired before the New Year. Even at the time of this writing, that’s a possibility.

In my frustration, I doubled down. I decided to rebuild the entire site. 

There was some feedback I wanted to address that you’ll read about below. Mostly, I wanted to do something to move past the failure of those two interviews. For me, this meant pushing myself further creatively and technically.

## Routes, Feedback, Use Cases 
Lurking around LinkedIn in the weeks after finishing my MVP, I came across a post from a design recruiter. In the post he asked designers to comment with a link to a project in their portfolio that was relevant to a particular open role. 

And I realized I didn’t have any links. 

I hadn’t actually created any routes. All of the information in HeyTK was in a single index.html file and I was using javascript to show and hide different content. 

<video autoplay loop muted><source src="/static/images/blog/2023-11-07/big index file.mov" type="video/mp4" alt="scrolling through a long index file">Your browser does not support the video tag.</video>
<figcaption>The index.html file of the MVP site. Each highlighted line is the begining of a section containing a case study.</figcaption>

Even if I had a specific case study relevant to that recruiter’s post, I wouldn’t have been able to send a link to it.

In a similar vein, I got received feedback that it was easy to get lost in the case study accordions because there wasn’t any additional navigation besides opening and closing each one. 

## Tailwind and Flowbite
In my initial burst of applications, I applied for a junior React position. I was so thoroughly enjoying my personal explorations of frontend work I thought I might see how far off I was from being able to do the real thing. 

I managed to make it past the initial interview and was issued a coding challenge. I didn’t know beans about React but I spent the weekend before the code challenge going through an all-you-can-eat React tutorial. 

Unsurprisingly, the code challenge kicked my butt. It was still fun to give it a shot. I was grateful for the opportunity to test my mettle, no matter how poorly I fared.

In the code challenge I was asked to add a Flowbite tabs component, wire it to some existing content, and style it with Tailwind. This was my introduction to the Tailwind ecosystem.

One element of the original design I wanted to keep intact in my rebuild was the ability for a user to easily access all of the case studies from any page. I watned to the scope of my work to be immediately apparent and the depth of it easily accessible. 

![Flowbite sidebar component](/static/images/blog/2023-11-07/flowbite%20sidebar.png)
<figcaption>Flowbite's sidebar <a href="https://flowbite.com/docs/components/sidebar/" target="_blank">component</a></figcaption>

I thought a sidebar would be an improved and organized way of achieving the same effect provided by the multiple accordions on a single page in my MVP. It would also allow me to share links of specific case studies, which could be helpful in tailoring my application to different roles. 

The Flowbite sidebar with all of the show/hide functionality out of the box saved me a good deal of time. Additionally, it was a great organizing principle for the rebuild.

![Layout frame](/static/images/blog/2023-11-07/_layout.png)
<figcaption>Framing the content area with the Flowbite sidebar</figcaption>

## Flask and Jinja
I built the MVP as a Flask app with a route for my index.html page and another route for the OpenAI API request.

This time around, I returned to a tutorial on [Real Python](https://www.realpython.com) to figure out how to create routes for each of my case studies, plus some side projects and a blog. I also used nested templates, trying to keep as 'DRY' as possible.

I inventoried the various panel layouts in my MVP and created a corresponding macro for each. From here, getting the case studies laid out in the new navigation frame was pretty straightforward. 

## The chatbot that started it all
The direction of the fire after the spark of inspiration is unpredictable. 

This endeavor started from a shift in my perspective about how we find things on the internet. That shift sparked my desire to explore conversational interfaces. My main goal was to satisfy my curiosity. 

It was a bonus to create something cool and discover my affinity for frontend work. It would be a double bonus for all of this exploration to resonate with a hiring manager at a company developing products in this space (*wink wink nudge nudge*).

<video autoplay loop muted><source src="/static/images/blog/2023-11-07/mvp to v2.mov" type="video/mp4" alt="showing mvp and v2 side by side">Your browser does not support the video tag.</video>
<figcaption>Reloading my portfolio after launching the new build</figcaption>

I didn’t expect to find myself recreating my whole portfolio to try and accommodate a chatbot, only to rebuild it a second time doing just the opposite - nesting ChatTK in it’s own route like all of the other projects. 

The important thing is I felt the spark and followed it. 

I came up with a vision, approximated the construction of it in with the skills I have and could reasonably acquire; then gauged my creation's effectiveness at accomplishing the things I needed it to do and modified it accordingly. 

## Where to next? 
The Odyssean metaphor is apt to a point. But I differ mostly from the witty Odysseus here, at the end of things.

Back home, gazing out upon Itaca's harbor and the waters beyond, Odysseus' satisfaction is short lived. The ships, the seas, the promise of adventure–it calls to him.

My satifsation isn't quite as fleeting. Or so I hope. 

I am eager to see how these efforts and lessons influence my future design work and discover what sorts of ideas I can bring to life with my newly minted skills.

I like to think that with this portfolio I've built my Ithaca. A place wherefrom I can set out on creative adventures and return (hopefully in shorter course than that witty Greek) to share here on The Tom Blog. 


