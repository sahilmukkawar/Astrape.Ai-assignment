# E-commerce App (React + Node + MongoDB)

A full-stack e-commerce single page app with JWT authentication, product listing with filters, cart, checkout, and orders.

Frontend: React + Vite + TypeScript
Backend: Node.js + Express + MongoDB (Mongoose)

## Features
- Auth: signup, login, JWT, protected routes
- Products: list, search, filter by category and price
- Cart: add/update/remove, quantity controls, badge counter
- Checkout: address form and mock payment (COD / card)
- Orders: create order from cart, view “My Orders”
- UI: modern navbar, centered pages, toast notifications

## Structure
```
ecommerce-app/
  backend/
  frontend/
```

## Screenshots
Put screenshots in `frontend/public/images` and uncomment:

```md
![Home](./frontend/public/images/home_page.png)
![Cart](./frontend/public/images/cart.png)
![Address](./frontend/public/images/address.png)
![Payment](./frontend/public/images/payment.png)
![Orders](./frontend/public/images/my_orders.png)



```

## Setup
### Backend
```
cd backend
npm install
```
Create `backend/.env`:
```
MONGODB_URI=your_atlas_uri
MONGODB_DB_NAME=ecommerce_app
JWT_SECRET=your_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```
Seed demo items (optional):
```
npm run seed
```
Run dev server:
```
npm run dev
```
API base: `http://localhost:5000/api`

### Frontend
```
cd ../frontend
npm install
```
Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```
Run dev:
```
npm run dev
```

## Scripts
Backend: `dev`, `seed`, `start`
Frontend: `dev`, `build`, `preview`

## API (summary)
- Auth: POST `/auth/register`, POST `/auth/login`, GET `/auth/me`
- Items: GET `/items`, GET `/items/:id`, POST/PUT/DELETE (auth)
- Cart (auth): GET `/cart`, POST `/cart`, PUT `/cart`, DELETE `/cart/:itemId`
- Orders (auth): POST `/orders`, GET `/orders`

## Deployment
- Frontend URL: [add later]
- Backend URL: [add later]

## Notes
- If Atlas connection fails, allow your IP in Network Access.
- To change theme, edit CSS vars in `frontend/src/App.css`.
