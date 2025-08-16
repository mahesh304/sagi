# SFC Server

Express + MongoDB API for SFC.

## Setup

1) Copy `.env.sample` to `.env` and set values:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/sfc
JWT_SECRET=replace-with-strong-secret
ADMIN_CODE=supersecretcode
ORIGIN=http://localhost:5173
```

2) Install & run:

```
npm install
npm run dev
```

3) Seed (optional):

```
npm run seed
```

## Endpoints

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/menu?category=`
- POST `/api/menu` (admin)
- PUT `/api/menu/:id` (admin)
- DELETE `/api/menu/:id` (admin)
- POST `/api/menu/upload` (admin, multipart/form-data `image`)
- POST `/api/orders` (auth)
- GET `/api/orders` (admin)
- PUT `/api/orders/:id/status` (admin)






