# Client Lead Management System (Mini CRM)

A full-stack CRM application to manage client leads generated from website contact forms. Built as part of the Future Interns Full Stack Development Internship.

## Tech Stack

**Frontend:** React.js (Vite), Tailwind CSS, Axios, React Router, React Hot Toast
**Backend:** Node.js, Express.js
**Database:** MongoDB (Atlas)

## Features

- Dashboard with live statistics (Total, New, Contacted, Follow-up, Converted leads)
- Full CRUD operations on leads (Create, Read, Update, Delete)
- Search leads by name, email, company, or phone
- Filter leads by status
- Recent activity feed
- Toast notifications for all actions
- Confirmation modal before delete
- Responsive design (mobile, tablet, desktop)
- Modern dark glassmorphism UI

## Project Structure
## Setup Instructions

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
Run the backend:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint           | Description           |
|--------|---------------------|------------------------|
| GET    | /api/leads          | Get all leads (supports search & filter) |
| GET    | /api/leads/:id       | Get single lead       |
| POST   | /api/leads           | Create new lead        |
| PUT    | /api/leads/:id       | Update lead            |
| DELETE | /api/leads/:id       | Delete lead             |
| GET    | /api/leads/stats     | Get dashboard statistics |

## Deployment

**Backend:** Can be deployed on Render, Railway, or Cyclic
**Frontend:** Can be deployed on Vercel or Netlify
**Database:** MongoDB Atlas (already cloud-hosted)

## Author

Pranitha Gaddam — Future Interns Full Stack Development Internship