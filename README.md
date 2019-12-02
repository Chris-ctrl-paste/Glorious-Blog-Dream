# Glorious-Blog-Dream
This is a glorious blog
Where you can follow or unfollow people and comment/like/unlike their posts, there is google signin and normal account creation/sign in, you have your own profile page where you can write about yourselfs and much more!




BACKEND
-------------------------------------------------------------------------
.env

APP_NAME=nodeapi

MONGO_URI=xxxx

PORT=8000

JWT_SECRET=xxxxxxxxxxxxxxx

CLIENT_URL=http://localhost:3000/# <------------ i had to add "#" otherwise password reset wont work on AWS elastic beanstalk

REACT_APP_GOOGLE_CLIENT_ID=xxxxxxx.apps.googleusercontent.com


FRONTEND
--------------------------------------------------
.env

REACT_APP_API_URL=http://localhost:8000/api

REACT_APP_GOOGLE_CLIENT_ID=xxxxxx.apps.googleusercontent.com


