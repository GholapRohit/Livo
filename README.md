# **Airbnb Clone**

## **Brief Overview**

The Airbnb Clone is a web application that replicates the core functionalities of Airbnb. It allows users to:

- Browse and explore property listings.
- Create, update, and delete property listings (for authenticated users).
- Leave reviews for listings.
- Register and log in.

The application uses server-side rendering with EJS templates and provides a responsive user interface. It includes user authentication, session management, and error handling to ensure a smooth user experience.

## **Technologies Used**

1. **Node.js**: Backend runtime environment for building the server-side logic.
2. **Express.js**: Web framework for routing, middleware, and server setup.
3. **MongoDB**: NoSQL database for storing user, listing, and review data.
4. **Mongoose**: ODM (Object Data Modeling) library for MongoDB to define schemas and interact with the database.
5. **EJS**: Template engine for rendering dynamic HTML pages.
6. **Passport.js**: Middleware for user authentication.
7. **connect-mongo**: MongoDB session store for managing user sessions.
8. **dotenv**: For managing environment variables securely.
9. **Bootstrap**: Frontend framework for styling and responsive design.
10. **Flash Messages**: For providing user feedback (e.g., success or error messages).

## **Functions and Variables in Each File**

### **1. `index.js`**

- **Purpose**: Main entry point of the application.
- **Key Functions and Variables**:
  - **Database Connection**: Connects to MongoDB using `mongoose.connect()` with the connection string from `.env`.
  - **Session Management**: Configures sessions using `connect-mongo` to store session data in MongoDB.
  - **Routes**: Defines routes for listings, reviews, users, and documentation.
  - **Error Handling**: Implements custom error handling using `ExpressError`.
  - **Middleware**: Sets up middleware for flash messages, user authentication, and static file serving.

---

### **2. `models/`**

- **Purpose**: Defines Mongoose schemas for the database.

#### **`listing.js`**

- **Schema**: Defines fields for property listings, such as title, description, price, and owner.
- **Connections**: Linked to `review.js` for managing reviews associated with a listing.

#### **`review.js`**

- **Schema**: Defines fields for reviews, such as rating, comment, and the associated listing.
- **Connections**: Linked to `listing.js` for associating reviews with listings.

#### **`user.js`**

- **Schema**: Defines fields for user accounts, such as username, password, and email.
- **Connections**: Uses `passport-local-mongoose` for authentication.

---

### **3. `routes/`**

- **Purpose**: Contains route handlers for different parts of the application.

#### **`listing.js`**

- **Functions**: Handles CRUD operations for property listings.
- **Connections**: Interacts with `listing.js` in the `models` folder.

#### **`review.js`**

- **Functions**: Handles CRUD operations for reviews.
- **Connections**: Interacts with `review.js` and `listing.js` in the `models` folder.

#### **`user.js`**

- **Functions**: Handles user registration, login, and logout.
- **Connections**: Interacts with `user.js` in the `models` folder and uses `passport.js` for authentication.

#### **`docs.js`**

- **Functions**: Serves static pages for privacy policy and terms of service.

---

### **4. `utils/`**

- **Purpose**: Contains utility functions and classes.

#### **`expressError.js`**

- **Class**: Custom error class that extends the default JavaScript `Error` class.
- **Use**: Used for handling errors in routes and middleware.

---

### **5. `views/`**

- **Purpose**: Contains EJS templates for rendering HTML pages.

#### **`layouts/boilerplate.ejs`**

- **Purpose**: Base layout file that includes common HTML structure (e.g., `<head>` and `<footer>`).

#### **`pages/landing.ejs`**

- **Purpose**: Landing page with a welcome message and a call-to-action button.
- **Connections**: Uses a background image from the `public/images` folder.

#### **`pages/privacy.ejs`**

- **Purpose**: Privacy policy page.

#### **`pages/terms.ejs`**

- **Purpose**: Terms of service page.

#### **`pages/error.ejs`**

- **Purpose**: Error page that displays error messages.

---

### **6. `public/`**

#### **`css/` and `js/`**

- **Purpose**: Contains static assets like CSS and JavaScript files.

#### **`images/landing-bg.jpg`**

- **Purpose**: Contains static assets like background image used on the landing page.

---

### **7. `init/`**

- **Purpose**: Contains initialization scripts.

#### **`reset.js`**

- **Functions**:
  - Deletes all existing data in the database.
  - Inserts predefined data for testing or resetting the application.
- **Connections**: Interacts with `listing.js` in the `models` folder.

---

### **8. `.env`**

- **Purpose**: Stores environment variables.
- **Variables**:
  - `ATLASDB_URL`: MongoDB connection string.
  - `SECRET`: Secret key for session management.

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Airbnb-Clone
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add the following:
   ```bash
   ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbnameSECRET=your-secret-key
   ```
4. Start the server
   ```bash
   node index.js
   ```
5. Open the application in your browser
   ```bash
   https://localhost:8000
   ```

## **Future Improvements**

### Search and Filter:

Add functionality to search and filter listings by location, price, and other criteria.

### User Profiles:

Add user profile pages to display user information and their listings.

### Improved UI/UX:

Use a frontend framework like React or Vue.js for a more dynamic user interface.

### Payment Integration:

Integrate payment gateways for booking listings.

## **Other Important Information**

### Error Handling:

The application uses a custom ExpressError class for handling errors.
Errors are displayed on a dedicated error page (error.ejs).

### Session Management:

Sessions are stored in MongoDB using connect-mongo.
Cookies are configured to expire after 7 days.

### Authentication:

User authentication is implemented using passport-local.

---

"Thank you for exploring this Airbnb Clone project—feel free to contribute, customize, and make it your own to create something truly remarkable!"
