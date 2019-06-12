# Bobst Alert

## Overview

Bobst has many problems. One of the prominent one being the frequent internet outages.
In this application, NYU community members can post the status of each area at Bobst through a simple form.

## Data Model

The application will store posts from different users

Posts:

```javascript
{
  user: // a reference to a User object
  posts: [
    {time: 05-12-2019 00:00:00, area: "5W", status: 1},
    {time: 04-10-2019 00:00:00, area: "7S", status: 0},
  ],
}
```


## [Link to Final Schema](/db.js) 

## Wireframes

Wireframe Document:
https://docs.google.com/document/d/1-vA-eh1gP07dehOX7EEjb1WZRodLTlVlS8PkDTvi_cU/edit?usp=sharing

## Site map

Site Map:
https://docs.google.com/drawings/d/1j97aJuxECc9LCGTmWHZj_WvUu3nOUhYvH4jE1kiQJeM/edit?usp=sharing

## User Stories or Use Cases
1. as non-registered user, I can see all the posts that people have created
2. as non-registered user, I can create posts to alert others about an outage or warnings

## Research Topics

* Socket.io
    * this will update to everyone's browser as soons as someone creates a post in the database.
    
* Parcel
    * this will lower overhead as Parcel creates a bundle for all the css/js files in the html
    
* jQuery
    * this will make ajax requests simpler to write for me! (the developer!)


## [Link to Initial Main Project File](/server.js) 

## Annotations / References Used


1. [socket.io tutorialpoint docs](https://www.tutorialspoint.com/socket.io/socket.io_event_handling.htm)
2. [Parcel docs](https://parceljs.org/getting_started.html)
3. [jQuery w3schools docs](https://www.w3schools.com/jquery/ajax_ajax.asp)
