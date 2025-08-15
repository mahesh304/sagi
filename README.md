# SFC (Sagi Fried Chickens) — MERN App

Production-ready, responsive MERN app resembling KFC/Burger King style.

## ACCEPTANCE CHECKLIST

- [ ] cd server && npm run dev starts server and connects to MongoDB.
- [ ] cd client && npm run dev starts client at :5173 and calls server API.
- [ ] Register a user (email or phone) and admin (use ADMIN_CODE); login works and JWT stored.
- [ ] Admin can upload an image from local machine and see /uploads/<file>.
- [ ] Admin can create menu items with uploaded image or external URL.
- [ ] Category slider shows all categories with icons, is swipeable, keyboard accessible.
- [ ] Selecting a category filters items with smooth animation.
- [ ] Bottom OfferBox is visible on Home & Menu, animates on content change, and Add button adds the offer to cart.
- [ ] Cart totals are correct; clicking “Proceed” creates order visible in admin orders list.
- [ ] Pages are responsive (mobile, tablet, desktop) and accessible: alt tags, focus outlines, aria-live for cart updates.

## Tech Stack

- Frontend: React (Vite), TailwindCSS, React Router, Redux Toolkit, Framer Motion, Keen Slider, Axios
- Backend: Node.js, Express, Mongoose, JWT, bcrypt, Multer
- Dev/Deploy: Client via Vite; Server standalone (Render/Heroku/Railway compatible)

## Run locally

1) Server

```
cd server
cp .env.sample .env
npm install
npm run dev
```

2) Client

```
cd client
cp .env.sample .env
npm install
npm run dev
```

Open client at `http://localhost:5173`. Ensure server runs on `http://localhost:5000`.

## Environment variables

Server `.env` (see `server/.env.sample`):

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/sfc
JWT_SECRET=replace-with-strong-secret
ADMIN_CODE=supersecretcode
ORIGIN=http://localhost:5173
```

Client `.env`:

```
VITE_API_BASE_URL=http://localhost:5000
```

## Seeding

```
cd server
npm run seed
```

Creates sample menu and, if `ADMIN_CODE` present, ensures an admin user.

## API quick test (curl)

```
# Register (user)
curl -s -X POST http://localhost:5000/api/auth/register \
 -H 'Content-Type: application/json' \
 -d '{"name":"John","email":"john@example.com","password":"secret"}' | jq .

# Login
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
 -H 'Content-Type: application/json' \
 -d '{"identifier":"john@example.com","password":"secret"}' | jq -r .token)

echo $TOKEN

# List menu
curl -s http://localhost:5000/api/menu?category=burgers | jq .

# Create item (admin)
curl -s -X POST http://localhost:5000/api/menu \
 -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
 -d '{"name":"Test Burger","category":"burgers","price":9.99}' | jq .

# Upload image (admin)
curl -s -X POST http://localhost:5000/api/menu/upload \
 -H "Authorization: Bearer $TOKEN" \
 -F image=@/path/to/file.jpg | jq .

# Create order (user)
curl -s -X POST http://localhost:5000/api/orders \
 -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
 -d '{"items":[{"itemId":"<menuItemId>","qty":2}]}' | jq .
```

## Create an admin account

- During registration, include `adminCode` equal to your server's `ADMIN_CODE` to create an admin.
- Example:

```
curl -s -X POST http://localhost:5000/api/auth/register \
 -H 'Content-Type: application/json' \
 -d '{"name":"Admin","email":"admin@example.com","password":"secret","adminCode":"supersecretcode"}' | jq .
```

## Deployment tips

- Client: build with `npm run build` (Vercel). Set `VITE_API_BASE_URL` to deployed server URL.
- Server: deploy to Render/Railway/Heroku. Persist `/uploads` (enable persistent disk). Set env vars.

## File tree

```
server/
  src/
    config/db.js
    controllers/{authController.js, menuController.js, orderController.js}
    middleware/{authMiddleware.js, errorMiddleware.js, uploadMiddleware.js}
    models/{User.js, MenuItem.js, Order.js}
    routes/{authRoutes.js, menuRoutes.js, orderRoutes.js}
    seed/{seed.js, menu.json}
    server.js
  uploads/.gitkeep
  package.json
  .env.sample
client/
  public/{images/.gitkeep, sounds/.gitkeep}
  src/
    api/axios.js
    app/store.js
    components/{Navbar.jsx, BottomOfferBox.jsx, CategoryCarousel.jsx, ItemCard.jsx}
    features/{auth/authSlice.js, cart/cartSlice.js}
    pages/{Home.jsx, Menu.jsx, Cart.jsx, Admin.jsx, Login.jsx, Register.jsx}
    App.jsx
    main.jsx
    index.css
  .env.sample
  package.json
README.md
```

— Built a full MERN SFC app with controllers+routes backend and responsive Tailwind React client, including uploads, cart/orders, admin panel, and animated Bottom Offer Box.
