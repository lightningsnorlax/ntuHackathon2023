## Inspiration

Doctors now a days have so much information to filter through, with leaps and bounds being made each year in the medical industry.

New Diseases, cures, and medications are all very hard for them to cram, especially as doctors get a larger workload.

Thus our application was made to give doctors a quick summary and reference to research papers online.

## What it does

Provides doctors/medical researchers streamlined platform to access latest news in a TLDR manner 

## How we built it

There's 3 main components to our web application.

1. *Webscraping*
  > We needed a way to continuously extract medical research papers being released. We made use of `cheerio` library to extract the title, abstract, methodology, conclusion from sources like [medical research archives](https://esmed.org/MRA/mra) and [The BMJ](https://www.bmj.com/research/research). 

2. *Summarization + topic labelling*
  >  Perform summarization using `bart` model on title, abstract, methodology, conclusion of each research paper. Zero shot classification to predict topic labels ( Brain, heart , eyes etc )

3. *Full Stack Deployment*
 > Front-end, dynamic image map. In back-end, pass webscraped data to cloud hosted bart model through Node.js endpoint. Get out sumarized title + text to display 

## Challenges we ran into

Creating a dynamic image map was partiularly difficult, needing to track each image and its appropriate reference areas. Webscraping the appropriate content dynamically. We also had lots of trouble setting up our APIs to work as intended.

## Accomplishments that we're proud of

We managed to submit a minimum viable product that has the core features of what we wanted to accomplish in time.

## What we learned

Time management is vital in 24h hackathons and stop feature creep AKA being too ambitious to implement 1001 features and focus on the simple core features 

## What's next for DR GO

In future development, we plan on expanding the amount of content we can recieve and contact working professionals to get their opinion on our application so it can be refined to a stage that we can help real doctors with.