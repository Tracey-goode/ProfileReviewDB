## REVIEW APP
This app inteds to be a dating app social media platform, that allows users to Review other users with both text and a star rating. The back end portion of this app is simply organizing the database of users allowing them to:  
        - create an account
        - update that account
        - get other users' profiles (without seeing confidential data)
        - post reviews to said users account
        - delete thier own account 
        - delete reviews they have posted

## Schema

- decided users will have option to leave text review or star rating or both

## utilities
Password hashing - the process of converting a user's password into a unique, fixed length string of characters

## USER ROUTES

/api/users/register	POST	Public	Register a new user
/api/users/login	POST	Public	Log in and get JWT
/api/users/logout	POST	Public	Logout (frontend removes token)
/api/users/profile	GET	Protected	Get logged-in user’s own profile
/api/users/profile	PUT	Protected	Update logged-in user’s profile (bio, height, weight, kink)
/api/users/delete	DELETE	Protected	Delete logged-in user account and their reviews
/api/users/public/:userId	GET	Public	Get another user’s public profile (optionally includes reviews about them)