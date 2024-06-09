
## Getting Started

# Next.js Authentication with TypeScript and MongoDB

This project is a Next.js application implementing user authentication using TypeScript and MongoDB. The authentication setup includes user registration, login, and protected routes.

## Features

- User Registration
- User Login
- Protected Routes
- TypeScript for type safety
- Next.js for server-side rendering and static site generation
- MongoDB for database


### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>= 14.x)
- npm or yarn
- MongoDB (local installation or a cloud instance such as MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prabal-verma/authentication_in_nextjs.git
   cd nextjs-auth-ts

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Authentication Flow

### Registration:
- Users can register by providing their email and password.
- The password is hashed before storing in the MongoDB database.
- A JWT token is generated and returned to the user upon successful registration.

### Login:
- Users can log in with their email and password.
- Upon successful authentication, a JWT token is returned to the user.

### Protected Routes:
- Certain routes are protected and require a valid JWT token to access.
- The token is validated on the server-side before granting access to the protected route.

## Setting up MongoDB

### Local MongoDB Installation:
- Install MongoDB from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
- Start the MongoDB server.

### MongoDB Atlas (Cloud):
- Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Create a new cluster.
- Get the connection string and update the `MONGODB_URI` in your `.env.local` file.

## Contributing

Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
