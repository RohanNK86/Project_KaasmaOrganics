# Kasma Organics

> A full-stack e-commerce application for discovering and ordering organic fruit powders, vegetable powders, and healthy snacks.

Kasma Organics is a portfolio project built to practise the end-to-end workflow behind a modern online store: a responsive React storefront, a persistent shopping cart, a validated checkout flow, and an Express/MongoDB API for products, orders, payments, and users. The experience is designed around a clean organic-products catalogue with selectable product weights, dynamic pricing, and order tracking data.

## Highlights

- Browse organic products by category, including fruit powders, vegetable powders, and snacks.
- View product cards with an image carousel, discount badges, ratings, descriptions, and weight-based price options.
- Add products to a cart, change quantities, remove items, and retain the cart after a page refresh with `localStorage`.
- Use a slide-out cart drawer with a live item count and calculated subtotal.
- Complete a two-step checkout with client-side validation for name, email, Indian phone number, address, and six-digit pincode.
- Create orders and payment records through REST APIs; the backend generates order and tracking identifiers.
- Support COD and UPI payment workflows. The current payment processor simulates completion so the complete ordering flow can be demonstrated locally.
- Provide API foundations for user registration/login, JWT generation, profile updates, addresses, product search, filtering, pagination, order status updates, and refunds.

## Product walkthrough

### Storefront and categories

<img width="1158" height="919" alt="Screenshot 2026-08-08 at 1 35 38 PM" src="https://github.com/user-attachments/assets/f3a40115-935b-4d69-81da-977125fd7071" />


### Product catalogue

<img width="1146" height="909" alt="Screenshot 2026-08-08 at 1 36 27 PM" src="https://github.com/user-attachments/assets/a5c70ace-0cbf-431a-9409-d00819b38393" />


### Shopping cart

<img width="1158" height="918" alt="Screenshot 2026-08-08 at 1 36 43 PM" src="https://github.com/user-attachments/assets/43e843cb-cc9c-4090-b34e-154b27d15236" />


### Checkout

<img width="1161" height="918" alt="Screenshot 2026-08-08 at 1 36 52 PM" src="https://github.com/user-attachments/assets/01d58e6b-6bf3-4088-ad0b-8c1a3467adf4" />


### Profile drawer

<img width="1158" height="916" alt="Screenshot 2026-08-08 at 1 35 57 PM" src="https://github.com/user-attachments/assets/9b882665-2095-4782-86d9-1e2ffd623003" />


## Tech stack

| Area | Technologies | How they are used |
| --- | --- | --- |
| Frontend | React 19, Vite | Component-based interface and fast local development/build tooling. |
| Routing | React Router | Client-side routes for the storefront and checkout. |
| State management | React Context + Hooks | A shared cart store manages cart items, totals, quantities, API loading states, and errors. |
| UI | CSS, React Icons, Swiper | Custom responsive styling, iconography, and swipeable product-image galleries. |
| Client persistence | Browser `localStorage` | Retains the user's cart between page refreshes. |
| API communication | Fetch API | Connects the frontend to the Express REST API. |
| Backend | Node.js, Express 5 | REST endpoints, middleware, validation, error responses, and static asset serving. |
| Database | MongoDB, Mongoose | Schemas and persistence for products, users, orders, and payment records. |
| Authentication | JSON Web Tokens, bcryptjs | Secure password hashing plus token creation for registration and login endpoints. |
| Payments | Payment models, Razorpay SDK | COD/UPI payment records and status updates; Razorpay credentials are prepared in the backend utility for future live-gateway integration. |
| Email | Nodemailer | Reusable Gmail transport utility for transactional email integration. |
| Development tooling | ESLint, Nodemon, Morgan, dotenv, CORS | Linting, automatic server restarts, request logging, environment configuration, and controlled cross-origin access. |

## Architecture

```text
React + Vite client (port 5173)
  ├─ Pages and reusable UI components
  ├─ CartContext → cart state + localStorage
  └─ Fetch API
          │
          ▼
Express API (port 8001)
  ├─ /api/v1/products
  ├─ /api/v1/orders
  ├─ /api/v1/payments
  └─ /api/v1/users
          │
          ▼
MongoDB via Mongoose
```

## Project structure

```text
.
├── src/
│   ├── components/       # Product cards, cart, checkout, navigation, profile, footer
│   ├── context/          # Shared CartContext state and cart actions
│   ├── pages/            # Home, shop, about, benefits, and contact views
│   ├── services/         # Frontend REST API client
│   └── assets1/images/   # Product and brand images
├── backend/
│   ├── config/           # MongoDB connection
│   ├── model/            # Mongoose product, user, order, and payment models
│   ├── routes/           # Express REST routes
│   ├── seeds/            # Sample-product seed script
│   └── utils/            # Razorpay and email utilities
└── docs/images/          # README screenshots
```

## Getting started

### Prerequisites

- Node.js 18 or later
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/Subhash-2910/Project_KaasmaOrganics_Final.git
cd Project_KaasmaOrganics_Final
```

### 2. Set up the frontend

```bash
npm install
npm run dev
```

The Vite app starts at `http://localhost:5173`.

### 3. Set up the backend

In a separate terminal:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=8001
DATABASE_URL=mongodb://localhost:27017/kasma_organics
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRE=7d
NODE_ENV=development

# Optional: only required when configuring those integrations
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:8001`; use `GET /health` to confirm it is available.

### 4. Add sample products (optional)

```bash
cd backend
npm run seed
```

## API overview

| Resource | Base endpoint | Capabilities |
| --- | --- | --- |
| Products | `/api/v1/products` | List, search, filter by category, retrieve, create, update, and delete products. |
| Orders | `/api/v1/orders` | Create orders, retrieve and track them, update statuses, and cancel orders. |
| Payments | `/api/v1/payments` | Create/process payment records, query them, update status, and refund completed payments. |
| Users | `/api/v1/users` | Register, log in, manage profile data, and manage saved addresses. |

See [backend/README.md](backend/README.md) for the full endpoint list and data-model documentation.

## Development notes

- The frontend API base URL is currently set to `http://localhost:8001/api/v1` in `src/services/apiService.js`.
- The checkout currently sends a guest user ID; connecting it to the authentication flow is a natural next enhancement.
- Payment handling intentionally simulates COD and UPI completion for development. Do not use it for real transactions until a verified payment-gateway flow, server-side signature validation, and authentication/authorization middleware are implemented.

## Future improvements

- Connect the profile UI and checkout to authenticated users.
- Add protected admin routes for product, order, and payment management.
- Complete Razorpay order creation, checkout, signature verification, and webhook handling.
- Move API URLs into environment variables for staging and production deployments.
- Add automated unit, integration, and end-to-end tests.
- Deploy the frontend, API, and managed MongoDB database.

## What I learned

This project was an opportunity to connect frontend state management with a database-backed API, model a practical e-commerce domain, validate user inputs, and structure a full-stack codebase into reusable UI components, API routes, models, and utilities.

---

Built with team-mates as part of my full-stack development journey and for a client.
