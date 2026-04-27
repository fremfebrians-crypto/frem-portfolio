# Frem Portfolio

Portfolio website for Frem Pebrianta Tarigan with:
- Schmidt-inspired public landing page
- admin login with email and password
- LinkedIn login for comments
- portfolio image and Excel preview uploads
- blog HTML uploads with sanitized rendering
- hero photo and CV updates
- private local file storage

## Run locally

1. Copy `.env.example` to `.env`
2. Install packages
3. Run Prisma migration
4. Seed initial data
5. Start development server

```bash
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## Default sections
- Home
- About
- Services
- Experiences
- Works
- Blog
- Contact

## Notes
- Portfolio starts empty
- Blog starts empty
- Comments start empty
- Only LinkedIn-authenticated users can submit comments
- Comments are stored as `pending` until approved by admin
