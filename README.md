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

1. Test run

	In the project root directory of the backend.. (View https://github.com/GovTechSG/product-review-platform if not set up yet)

	Test if the project is setup properly:
		
		rails s

    open http://localhost:3000/ on your browser. you should see a landing page.

	In the project root directory of the backend..

	Test if the project is setup properly:
		
		npm start -p 3001

    open http://localhost:3001/ on your browser. you should see a landing page.