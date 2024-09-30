# AI Assistant Web Interface

## Overview

The AI Assistant web interface is a web application built with React.js that allows users to interact with an AI assistant through threaded conversations. It provides functionality for user authentication, including manual login and Google sign-in, along with an intuitive interface for managing conversations.

## Key Features

### 1. Technology Stack

- **Framework**: React.js, utilizing a component-based architecture for a dynamic user experience.
- **State Management**: React Context API for efficient global state management.
- **Routing**: React Router DOM for seamless navigation between pages.
- **Styling**: CSS Modules or Styled Components for modular and maintainable styling.
- **Authentication**: OAuth 2.0 for secure login via Google, managing user authentication through backend APIs.

### 2. Application Structure

- **Login Page**: 
  - Users can log in manually with email and password or through Google.
  - Features form validation and error handling.

- **Registration Page**: 
  - Provides a registration form for new users, supporting both manual registration and Google sign-up.
  - Includes user input validation and error messages for duplicate accounts.

- **Home Page (Conversation List)**: 
  - Displays a list of conversations for the logged-in user, including conversation titles and timestamps.
  - Enables users to navigate to individual conversations and create new chats.

- **Chat Page (View Conversation)**: 
  - Presents a chat interface where users can view and send messages to the AI assistant.

### 3. Authentication and Authorization

- **Protected Routes**: 
  - Ensures redirection of unauthenticated users to the login page when attempting to access protected content.

### 4. API Integration

- **Endpoints**: 
  - Integrates with various API endpoints for authentication, conversation management, and message handling, allowing seamless communication between the frontend and backend.

### 5. State Management

- **Local and Global State**: 
  - Utilizes React's `useState` and `useEffect` hooks for local component state and Context API for global state management.

### 6. Styling and Theming

- **Design**: 
  - Adopts a modern and clean design, inspired by popular interfaces, ensuring consistency throughout the application.
- **Responsive Design**: 
  - Provides usability on both mobile and desktop devices with a layout that smoothly adapts.

### 7. Accessibility

- **Compliance**: 
  - Adheres to WCAG guidelines by using semantic HTML and ensuring keyboard navigation support for all interactive elements.

## Conclusion

This web interface for the AI assistant provides a robust and user-friendly platform for engaging with AI through threaded conversations. Feel free to explore the code and contribute to the project!





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
