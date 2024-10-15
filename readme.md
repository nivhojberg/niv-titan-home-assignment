This project is built with MongoDB, mongoose, Node.js, Express.js.
In order to connect properly to the database, you need to create a database called "TitanHomeAssignment" on your local MongoDB on port 27017. Under this database create 2 collections: orders and photos.
In order to run the server you need to open command line on the main folder and run npm install, and then npm start.
Then the server will be running on port 3000 by default, and the endpoints will be:
1. GET localhost:300/photos?limit=number
2. POST localhost:300/orders - body { "email": string, "fullName": string, "fullAddress": string, "imagesURLs": array of object ids, "frameColor": string, "user": string }
3. GET localhost:300/orders/getByUser?user=string
