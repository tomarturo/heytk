date: 2024-11-01
title: PrettyQuery — a multi-model chat interface
preview: Exploring natural language queries, bottom sheet patterns, and autocomplete

This all started with checking out a library for a React bottom sheet component...and before I knew it I was tinkering with loading animations, creating a shader background, and making calls to multiple LLM providers.

<figure>
    <video autoplay loop muted><source src="/static/images/blog/2024-11-01/PQDemo.mp4" type="video/mp4" alt="demo of the multi-model web app, PrettyQuery">Your browser does not support the video tag.</video>
    <figcaption>A short demo of PrettyQuery</figcaption>
</figure>

I have had a number of conversations about information retrieval and keyword vs. natural language search lately, so I used this opportunity to explore how it would feel to suggest fully-formed questions from just a few keywords or a phrase.

The end result? A multi-model Q&A experience.

I use Anthropic for both collaboration/code generation as well prompt design. 

I use their Projects feature, typically giving custom instructions that include a language and any libraries I'm using e.g "You are a javascript expert using Radix Primitives". As my work evolves, I update the Project context with the latest versions of my source code (if only this could happen automatically *wink wink nudge nudge*).

In the application I use the Claude Haiku model for generating suggestions based on the search input. I also used Claude to design a prompt for all of the providers that outputs a two-part response: concise answer + explanation.

I think this is such an exciting and empowering time, when designers can bring ideas and concepts a few steps closer to life through the new tools at our disposal!

