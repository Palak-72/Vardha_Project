# Vardha Warehousing

Production-ready MERN stack application for Vardha Warehousing — premium warehouse space in Gorakhpur since 1987.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Router DOM, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Email**: Nodemailer
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize, cors

## Features

### Frontend
- Responsive multi-page website
- Interactive warehouse booking calculator with live estimates
- Admin panel with dashboard, enquiry management, contact management
- Authentication with JWT tokens

### Backend (Advanced Features)
- **Database integration** — MongoDB with Mongoose ODM, persistent enquiry/contact storage
- **Unique Request ID generation** — Auto-generated IDs for every enquiry and contact submission
- **Customer email confirmation** — Automated confirmation emails sent to customers on form submission
- **Internal team email notification** — Admin team notified via email for every new enquiry/contact
- **Secure admin authentication** — JWT-based auth with bcrypt password hashing, role-based access control
- **Admin dashboard API** — Stats endpoint with overview, recent enquiries, and recent contacts
- **Enquiry management and status updates** — Full CRUD with status tracking (new, read, responded, closed)
- **Backend-managed pricing** — Pricing model with per-type rates, verification API, deposit and maintenance calculations
- **Client/content management** — Warehouse CRUD with filtering, featured listings, status management
- **Backend-side price verification** — API endpoint to verify and calculate rental estimates
- **Production-grade security** — Helmet security headers, rate limiting, NoSQL injection protection, input sanitization, CORS configuration

## Project Structure

```
vardha-warehousing/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       │   └── admin/
│       ├── sections/
│       ├── services/
│       ├── utils/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── dashboardController.js
│   │   ├── enquiryController.js
│   │   ├── pricingController.js
│   │   └── warehouseController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validate.js
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Enquiry.js
│   │   ├── Pricing.js
│   │   ├── User.js
│   │   └── Warehouse.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── enquiryRoutes.js
│   │   ├── pricingRoutes.js
│   │   └── warehouseRoutes.js
│   ├── utils/
│   │   ├── apiResponse.js
│   │   ├── appError.js
│   │   ├── emailService.js
│   │   └── requestId.js
│   ├── uploads/
│   ├── seed.js
│   ├── .env.example
│   ├── .env
│   └── server.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (running locally or Atlas)
- SMTP credentials (Gmail App Password recommended)

### Installation

```bash
npm run install:all
```

### Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/vardha_warehousing
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Vardha Warehousing <your-email@gmail.com>
ADMIN_EMAIL=admin@vardha.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### Seed Database

```bash
cd server
npm run seed
# or
node seed.js
```

This creates:
- Admin user: `admin@vardha.com` / `admin123`
- Default pricing plans for all warehouse types
- Sample warehouse listings

### Running the Application

```bash
# Run both client and server concurrently
npm run dev

# Or run separately
npm run server   # Backend on port 5000
npm run client   # Frontend on port 5173
```

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Public Endpoints
- `GET /api/health` — Health check
- `POST /api/contact` — Submit contact form (sends confirmation + internal notification emails)
- `POST /api/enquiries` — Submit enquiry (sends confirmation + internal notification emails)
- `GET /api/warehouses` — Get all warehouses (supports ?type=, ?status=, ?featured= filters)
- `GET /api/warehouses/:slug` — Get warehouse by slug
- `GET /api/pricing` — Get all active pricing plans
- `GET /api/pricing/:type` — Get pricing by warehouse type
- `POST /api/auth/admin/login` — Admin login
- `POST /api/auth/admin/change-password` — Change admin password (authenticated)

### Admin Endpoints (require JWT token)
- `GET /api/contact` — Get all contacts
- `GET /api/contact/:id` — Get single contact
- `PATCH /api/contact/:id` — Update contact status
- `DELETE /api/contact/:id` — Delete contact
- `GET /api/enquiries` — Get all enquiries
- `GET /api/enquiries/:id` — Get single enquiry
- `PATCH /api/enquiries/:id` — Update enquiry status
- `DELETE /api/enquiries/:id` — Delete enquiry
- `POST /api/warehouses` — Create warehouse
- `PUT /api/warehouses/:id` — Update warehouse
- `DELETE /api/warehouses/:id` — Delete warehouse
- `GET /api/pricing/verify` — Verify and calculate price
- `POST /api/pricing` — Create pricing plan
- `PUT /api/pricing/:id` — Update pricing plan
- `DELETE /api/pricing/:id` — Delete pricing plan
- `GET /api/admin/dashboard/stats` — Dashboard statistics
- `GET /api/admin/dashboard/leads` — Lead statistics by status
- `GET /api/auth/admin/me` — Get current admin profile
- `PUT /api/auth/admin/me` — Update admin profile

## Pages

- `/` — Home
- `/about` — About Us
- `/facility` — Facility
- `/book-space` — Book Space / Enquiry
- `/solutions` — Solutions
- `/use-cases` — Use Cases
- `/clients` — Clients
- `/faq` — FAQ
- `/contact` — Contact
- `/admin/login` — Admin Login
- `/admin` — Admin Dashboard
- `/admin/enquiries` — Manage Enquiries
- `/admin/contacts` — Manage Contacts
- `/admin/settings` — Admin Settings
- `/admin/profile` — Admin Profile

## Design System

- **Colors**: steel, concrete, amber, ink
- **Fonts**: Oswald (display), Inter (body)
- **Spacing**: Consistent with max-w-7xl containers, responsive padding

## Admin Credentials (Default)

- **Email**: admin@vardha.com
- **Password**: admin123

> **Important**: Change these credentials after first login in production.

## License

Private — Vardha Warehousing
