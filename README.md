# Workers Hive

Workers Hive is a comprehensive MERN Stack web application designed to provide on-demand services such as electronics repair, plumbing, and more, right at the customer’s doorstep. This platform connects service providers with customers seamlessly and efficiently.

## Features

### Search Technician
- Allows users to search for technicians based on their specific needs.
- Displays detailed profiles of technicians, including their skills, experience.

### User Registration for Service Providers
- Service providers can register on the platform to offer their services.
- Registration includes verification steps to ensure the credibility of the service providers.
- Providers can manage their profiles, including services offered, pricing.

### Real-Time Chat Window
- Facilitates direct communication between customers and service providers.
- Ensures quick response times and better coordination for service appointments.
- Supports text messaging and multimedia sharing for a comprehensive communication experience.

### Admin Dashboards 
- Provides admins with tools for efficient data management and oversight.
- Dashboards include metrics for user activity, service requests, and system performance.
- Admins can manage users, review service provider applications, and resolve disputes.

### Razorpay Integration
- Integrated Razorpay for secure and efficient payment processing.
- Allows customers to make payments online for services rendered.
- Ensures transactions are secure and records are kept for future reference.

## Screenshots

![Home Page](https://github.com/chinmaya-kumar-behera/workers-hive/assets/101429530/ca09ace0-6506-417b-acd7-4720b2acd0c4)
![Technician Search](https://github.com/chinmaya-kumar-behera/workers-hive/assets/101429530/6e774e5a-9528-415b-96cf-91677a3a324d)
![book appointment](https://github.com/chinmaya-kumar-behera/workers-hive/assets/101429530/4d8c3cb9-8e47-413d-93ae-0b7df8f379c4)
![chat window](https://github.com/chinmaya-kumar-behera/workers-hive/assets/101429530/3468769f-8151-47fa-8d12-faa83f09a216)
![image](https://github.com/chinmaya-kumar-behera/workers-hive/assets/101429530/2c9fbd8a-4b1f-4699-ada9-a0b730355bd9)

## Visit the Site

Explore Workers Hive and experience the convenience of on-demand services at [workers-hive.vercel.app](https://workers-hive.vercel.app).

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-Time Communication:** Socket.io
- **Authentication:** JWT, OAuth
- **Payment Gateway:** Razorpay

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/workers-hive.git
    ```
2. Install dependencies for both frontend and backend:
    ```sh
    cd workers-hive
    npm install
    cd client
    npm install
    ```
3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    PORT=5000
    MONGO_URI=<your mongo URI>
    BASE_URL="http://localhost:5000"
    NODE_ENV="development"
    NODEMAILER_MAIL=<your email>
    NODEMAILER_PASSWORD= <passowrd>
    RAZOR_PAY_KEY_ID=<razorpay key id>
    RAZOR_PAY_KEY_SECRET=<key secret>
    ```

4. Create a `.env` file in the `client` directory and add your environment variables:
    ```env
    REACT_APP_API_BASE_URL="http://localhost:5000"
    REACT_APP_API_NODE_ENV="development"
    REACT_APP_API_GOOGLE_OAUTH_CLIENT_ID=<Outh clint id>
    REACT_APP_API_CLIENT_SECRET=<client secret>
    REACT_APP_PUBLIC_RAZOR_PAY_KEY_ID=<razorpay key id>
    ```

5.Run the application

Open two terminal windows or tabs:
In the first terminal window, navigate to the server directory and run the backend server:
```sh
cd server
npm start
```

```sh
cd client
npm start
```
## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the existing code style and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Developed by [Chinmaya Kumar Behera](https://github.com/chinmaya-kumar-behera)
