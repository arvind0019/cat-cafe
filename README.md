<<<<<<< HEAD
# Luxury Cat Cafe

Premium offline website for **Velvet Paw Cafe**, built with HTML, CSS, vanilla JavaScript, Node.js, Express, and local MongoDB Community Server.

## Folder Structure

```text
cat-cafe/
  frontend/
    index.html about.html menu.html cats.html gallery.html events.html
    reservation.html shop.html blog.html contact.html login.html register.html
    dashboard.html admin.html
    css/styles.css
    js/data.js js/app.js
    assets/images/ assets/videos/
  backend/
    server.js package.json .env
    config/ models/ routes/ controllers/ middleware/ uploads/ public/
```

## Install Node.js

Install the current LTS version from `https://nodejs.org`, then confirm:

```bash
node -v
npm -v
```

## Install MongoDB Community Server

1. Install MongoDB Community Server from `https://www.mongodb.com/try/download/community`.
2. Keep the default local service enabled, or start MongoDB manually.
3. The app uses:

```text
mongodb://127.0.0.1:27017/catcafe
```

No Atlas, Firebase, Supabase, PlanetScale, Railway, hosted MySQL, or cloud database is used.

## Run

From `cat-cafe/backend`:

```bash
npm install
npm start
```

Then open:

```text
http://127.0.0.1:5000
```

The backend serves the frontend, uploaded files, and all REST APIs.

## REST APIs

Base URL: `http://127.0.0.1:5000/api`

Available resources:

```text
/auth/register
/auth/login
/auth/forgot-password
/auth/me
/users
/cats
/reservations
/products
/orders
/blog
/gallery
/videos
/testimonials
/menu
/events
/contact
/newsletter
/uploads
```

Most resource endpoints support:

```text
GET /
GET /:id
POST /
PUT /:id
DELETE /:id
```

Search and filters are available with query parameters such as `search`, `category`, `breed`, `availability`, `minPrice`, `maxPrice`, and `age`.

## Admin

The first account registered through `register.html` becomes an admin. Admin-protected API mutations require:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Uploads

Admin users can upload images and videos through:

```text
POST /api/uploads
```

Use multipart form-data with the field name `files`. Files are stored locally in:

```text
backend/uploads/images
backend/uploads/videos
```

## Notes

The frontend includes local SVG artwork for cats, coffee, interior, desserts, customers, products, blog, and events. The two MP4 files are local placeholders; replace them with production MP4 footage using the same names for full video playback:

```text
frontend/assets/videos/hero-cafe.mp4
frontend/assets/videos/cafe-experience.mp4
```
=======
# cat-cafe
A modern and responsive Cat Cafe website built with HTML, CSS, and JavaScript. It features a clean UI, interactive design, image gallery, menu section, smooth navigation, and mobile-friendly layout. Designed to showcase front-end development skills and provide a pleasant user experience.
>>>>>>> b6db5bb04770687e12862efc883f7589716243f3
