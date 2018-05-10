# Product Review Platform

<a href="https://teamcity.gahmen.tech/viewType.html?buildTypeId=ProductReviewPlatform_UnitTest&guest=1"> 
<img src="https://teamcity.gahmen.tech/app/rest/builds/buildType(id:ProductReviewPlatform_UnitTest)/statusIcon"/>
</a>

<img src="public/favicon.png" width="96" />

# GRP-React

Welcome! This document details the setting up of a development environment. The project uses the following frameworks:

* [Getting started with React](https://facebook.github.io/react/docs/getting-started.html)

# Setup

1. Clone the project

	cd into the location you would like to clone the project to

	run this command on terminal: 

		git clone https://github.com/GovTechSG/govt-review-frontend

1. Configure project

	cd into the root directory of the project

	run these command on terminal: 

		npm install
		echo 'REACT_APP_AUTH_TOKEN=' > .env.local

1. Get API key

	In the project root directory of the [**backend**](https://github.com/GovTechSG/product-review-platform).. (View https://github.com/GovTechSG/product-review-platform if not set up yet)

	- Test if the project is setup properly:
		
			rails s

	- open http://localhost:3000/ on your browser. you should see a landing page.

  - Navigate to http://localhost:3000/api/docs and expand the tab 'POST /api/v1/oauth/token'

  - Click 'Try it out' and enter the values

  			{
			    "name": "bgp",
			    "password": "test12"
  			}

  - Click execute and copy the return value of "access_token" into the .env.local file created in the step above
			
		# Example value, you have to get your own key with the steps above
		# Remember to include Bearer infront of the token
		REACT_APP_AUTH_TOKEN="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwcm9kdWN0X3Jldmlld19wbGF0Zm9ybSIsImlhdCI6MTUyNTc2NDA5MSwianRpIjoiYjE1M2ExOTgtZDI3YS00NDAyLTk1MTktNjA5ZTZkYjNlMjNmIiwiYXBwIjp7ImlkIjoxLCJuYW1lIjoiYmdwIn19._Hv7ER8Kakex2WQYw9X24B4F8Ywc1tSxjJaoqfT663k"
  

1. Test run


	In the project root directory of the [**frontend**](https://github.com/GovTechSG/govt-review-frontend)..

	- Test if the project is setup properly:
		
			npm start

	- open http://localhost:3001/ on your browser. you should see a landing page.