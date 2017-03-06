# Congress-Information-Search-Website

This is a webpage that allows users to search for congress information using the Sunlight Congress API.

The webpage use bootstrap to show the stylesheet and AngularJS to controll data. I put the PHP file in the cloud server sirst, and let it issue request through AJAX to the server to grab the data of Congress.

This webpage has following features:

1. Use Bootstrap and jQuery to implement responsive web design
2. Add [pagination-control](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination) to create dynamic pages
3. Use AngularJS to manage data and make Ajax request to the server
4. Put the PHP script into AWS for cross-domain request to the [Sunlight Website](https://sunlightfoundation.com/)
