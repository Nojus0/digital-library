# Digital Library
A web app meant for libraries, and its visitors. Visitors can view all the available books, and view what their friends are currently reading. By going to their profile.
Demo deployed [here](https://digital-library-main.vercel.app/) for testing purposes.

## Images
The images are processed and compressed on the client-side using the Compressor javascript library, and then sent to a S3 presigned upload URL with the size limited to 1MB. For more flexibility, you can easily add a GraphQL Mutation that processes the images server-side using the *sharp* npm package.

## Hosting
The book covers are uploaded to AWS S3 and cached using AWS Cloudfront so users all around the world experience low latency.

The GraphQL API is hosted on AWS Lambda so the web app can handle a high or low amount of traffic. While being cheap.

The application database is a PostgreSQL database hosted on AWS RDS.

The Next.JS frontend is hosted using Vercel.

## Notes
To make the web app even more scalable, switch the database to AWS DynamoDB. Though in order to achieve this you would need to make major changes to the backend. 

The user authentication is achieved by using a single JWT token, if you need more control add an additional refresh token or instead of using jwt tokens use session tokens stored in *Redis*. 

![Home Page](https://i.imgur.com/1kfQoUK.jpg)
![Login Page](https://i.imgur.com/W6EkkPH.jpg)
![Register Page](https://i.imgur.com/qYpvjZW.jpg)
![Books List Page](https://i.imgur.com/XMmLsKi.jpg)
![Search Bar Books](https://i.imgur.com/7PDjRWm.jpg)
![Search Bar User](https://i.imgur.com/bLpzu3A.jpg)
![Book Page](https://i.imgur.com/MrIzuqK.jpg)
![Administrator Profile Page](https://i.imgur.com/s53pqCR.jpg)
![Consumer Profile Page](https://i.imgur.com/exysv31.jpg)
![Manage Profile](https://i.imgur.com/EE1Kqdj.jpg)
![Add Book Page](https://i.imgur.com/qr94DdZ.jpg)
![Edit Book](https://i.imgur.com/bzd4u1T.jpg)
![Delete Book](https://i.imgur.com/0iYMAe1.jpg)
