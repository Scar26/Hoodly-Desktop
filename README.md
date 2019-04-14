# Hoodly-Desktop
A Community based app based on real world meetups.

![alt text](https://i.ibb.co/SK4x1Qh/hoodly.jpg)

![alt text](https://i.ibb.co/L8sJZT6/hoodly2.jpg)


Hoodly desktop aims to bring together like minded people within college campuses. As a college student, I have never met or interacted with more than 90% of the people in campus, many of whom might share a lot me with and would've been a blast to be around.

  Hoodly tends to do just that.

Users can Create "Communities" related to anything they are interested in.
One can look through the active list of communities in the college and join any that interests him. Joining checks will be optional.

# Here's the cool part

Once a week, the community meets up for an event of sorts. Be it a night-long bingewatch, a coding sprint or a reading session or just a regular night-out, these events offer the community members a chance to mingle and meet like-minded people.

When a non-member looks up the community, he will be greeted with photos of the past events and a brief description of what they do


![alt text](https://i.ibb.co/WgXy3MF/dashboard.jpg)

The project is still under development and is gonna need a lot of work before it is useable but it should be in beta phase by October 2019.


TODO:
- ``Set up image and file routing ``
- ``Create communities landing page``
- ``Create community dashboard page for new users``
- ``Implement Add Memo functionality``
- Create bundle.py for creating the appropriate database for the application
- write the chat engine
- Create Main interaction pages for communities, complete wth a chatbox and event reminders
- Create UserLogin system
- Make search engine for communities so the "look up a community" search bar actually works.
- Make it localised
- Create the AddEvent Page for community admins

# Testing Instructions

Clone/Download the repository using the command git clone  https://github.com/Scar26/Hoodly-Desktop

The program runs on Electron JS so you need to have node.js and npm installed. If you don't, get them here https://nodejs.org/en/download/

First of all you need a MYSQL database running on localhost with a database "city". If you have that done, run bundle.py using the command <strong>python bundle.py</strong> and it will automatically create the relevant tables and record entries. For this, you need to have python installed. If you don't, get it here https://www.python.org/downloads/

With that done, you need the dependancies done. The package.json file already contains all the dependancies, so all you have to do is run <b>npm install</b>
![alt text](https://i.ibb.co/qBsw4PQ/install.jpg)

For ease in development, open the main.js file and edit line 13 to "development" It will enable a topmenu bar with Developer tools and a refresh button. For consumer testing, change it to "production".
![alt text](https://i.ibb.co/GtC2WGH/env.jpg)


You can start the application with the command <b>npm start</b>
![alt text](https://i.ibb.co/7kFrr56/run.jpg)
