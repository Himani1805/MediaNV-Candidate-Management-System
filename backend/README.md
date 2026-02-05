# Candidate Management System (Backend)

## Tech Stack
- **Node.js**: Runtime environment
- **Express**: Web framework
- **PostgreSQL**: Database
- **pg**: PostgreSQL client
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing
- **express-validator**: Request validation

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a file named `.env` in the `backend` directory (not `src`) with the following content:
    ```env
    PORT=5000
    DB_USER=your_postgres_user
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=candidate_system
    NODE_ENV=development
    ```

3.  **Run in Development**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

## API Endpoints

### Candidates

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/candidates` | Retrieve all candidates |
| **GET** | `/api/candidates/:id` | Retrieve a single candidate by ID |
| **POST** | `/api/candidates` | Create a new candidate |
| **PUT** | `/api/candidates/:id` | Update an existing candidate |
| **DELETE** | `/api/candidates/:id` | Delete a candidate |

### **POST /api/candidates** Example Body

```json
{
  "name": "John Doe",
  "age": 30,
  "email": "johndoe@example.com",
  "phone": "555-0199",
  "skills": "JavaScript, React, Node.js",
  "experience": "5 years",
  "applied_position": "Full Stack Developer",
  "status": "Applied"
}
```

## CORS Policy
Cross-Origin Resource Sharing (CORS) is enabled to allow frontend applications (running on different ports/domains) to communicate with this backend. Without it, browsers would block requests from your React/Vue app to this API.
