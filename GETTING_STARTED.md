# Reynier Ortiz Personal Website - Getting Started Guide

## 📋 Current Status

Your production-ready personal website is **fully built and running** ✅

- ✅ Development server is running at `http://localhost:3000`
- ✅ Build passes with zero errors
- ✅ All 5 pages are accessible and rendering correctly
- ✅ SEO metadata and sitemap are generated
- ✅ TypeScript types are all correct

## 🚀 Quick Start Commands

### Development
```bash
npm run dev
```
Starts the dev server at http://localhost:3000 with hot reload.

### Production Build
```bash
npm run build
npm run start
```
Creates an optimized production build and starts the server.

### Linting
```bash
npm run lint
```
Checks code for style and errors.

## 📁 Project Files

### Pages (5 total)
- `/app/page.tsx` - Home page with hero, services, work showcase
- `/app/about/page.tsx` - About page with bio and career timeline
- `/app/work/page.tsx` - Portfolio page with case studies
- `/app/services/page.tsx` - Services offered
- `/app/contact/page.tsx` - Contact information and form

### Components (9 total)
All components are reusable, modular, and documented:
- `Button.tsx` - Interactive button component
- `LinkButton.tsx` - Next.js Link wrapper (server-safe)
- `Card.tsx` - Content card with hover effects
- `Badge.tsx` - Tag/label component
- `Container.tsx` - Max-width layout wrapper
- `Section.tsx` - Semantic section wrapper
- `Navbar.tsx` - Navigation bar with active state
- `Footer.tsx` - Multi-column footer
- `CTA.tsx` - Call-to-action section

### Data & Utilities
- `/data/profile.ts` - All profile content (single source of truth)
- `/lib/utils.ts` - Utility functions (className merging)
- `/app/globals.css` - Global styles and Tailwind config
- `/app/layout.tsx` - Root layout with metadata

### SEO & Configuration
- `/app/sitemap.ts` - Dynamic sitemap generation
- `/app/robots.ts` - SEO robots configuration
- `/next.config.ts` - Next.js configuration
- `/tsconfig.json` - TypeScript configuration
- `/tailwind.config.ts` - Tailwind CSS v4 config
- `/postcss.config.mjs` - PostCSS/Tailwind setup

## 🎯 Next Steps

### 1. Update Profile Content
Edit `/data/profile.ts` to customize:
- Name, title, and summary
- Work experience details
- Services offered
- Project case studies
- Skills and expertise
- Social media links
- Contact information

### 2. Update Domain in Sitemap (Optional)
If using a different domain, update `/app/sitemap.ts`:
```typescript
const baseUrl = 'https://yourdomain.com';  // Change this
```

### 3. Deploy to Production

#### Option A: Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel login
vercel deploy
```

#### Option B: Docker
```bash
docker build -t reynierortiz-site .
docker run -p 3000:3000 reynierortiz-site
```

#### Option C: Traditional Server
1. Run `npm run build`
2. Copy `.next` and `public` directories to server
3. Run `npm run start` on the server

#### Option D: AWS/Azure/Other Platforms
Most platforms support Next.js directly. Check their docs for deployment.

### 4. Add Analytics (Optional)
To add Google Analytics, update `/app/layout.tsx`:
```tsx
// Add to head section
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 5. Add Contact Form Backend (Optional)
To enable actual form submissions:
1. Create `/app/api/contact/route.ts`:
```typescript
export async function POST(request: Request) {
  // Handle form submission
  // Send email via SendGrid, Resend, etc.
}
```

2. Update `/app/contact/page.tsx` to submit to the API route

### 6. Custom Domain Setup
1. Buy domain from registrar (Namecheap, GoDaddy, etc.)
2. Point DNS records to your hosting
3. Update sitemap domain if deployed

## 🔍 Testing Checklist

Before deploying, verify:
- [ ] All pages load correctly
- [ ] Navigation works between pages
- [ ] Links are not broken
- [ ] Mobile responsive design works
- [ ] Images load properly
- [ ] Contact info is correct
- [ ] Social links work
- [ ] SEO metadata looks good

Run: `npm run build` to check for build errors

## 📱 Responsive Breakpoints

The site is optimized for:
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## 🎨 Customization

### Colors & Styling
Modify `/app/globals.css` and Tailwind classes:
- Primary color: `slate-900` (dark gray)
- Secondary color: `slate-600` (medium gray)
- Accent: Used for highlights and CTAs

### Typography
- Headings: Bold, large sizes (5xl-2xl)
- Body: Regular, readable sizes (lg-base)
- Font: System fonts (sans-serif)

## 🐛 Troubleshooting

### Dev server won't start
```bash
# Kill any existing process
lsof -i :3000
kill -9 <PID>

# Try again
npm run dev
```

### Build errors
```bash
# Clear cache
rm -rf .next

# Rebuild
npm run build
```

### TypeScript errors
```bash
# Check types
npx tsc --noEmit
```

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs

## ✨ Features Summary

✅ **Performance**
- Static site generation (SSG)
- Optimized bundle size
- Fast page loads

✅ **SEO**
- Dynamic metadata
- Sitemap & robots.txt
- Open Graph tags
- Twitter Card tags

✅ **Developer Experience**
- TypeScript support
- ESLint configuration
- Modular components
- Centralized data

✅ **User Experience**
- Responsive design
- Smooth animations
- Accessible markup
- Fast navigation

## 🎯 Deployment Checklist

Before going live:
- [ ] Update all profile content
- [ ] Test all links work
- [ ] Verify mobile responsiveness
- [ ] Check SEO metadata
- [ ] Add analytics (optional)
- [ ] Set up custom domain
- [ ] Configure email (for contact form)
- [ ] Enable HTTPS on hosting
- [ ] Set up backups
- [ ] Test contact form (if enabled)

---

**Your website is ready to launch!** 🚀

Questions? Check the code comments or refer to the Next.js documentation.

Last Updated: January 3, 2026
