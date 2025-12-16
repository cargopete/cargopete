# Vercel Deployment Guide

Your code is now on GitHub at: https://github.com/cargopete/cargopete

## Quick Deployment Steps

### 1. Deploy to Vercel

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com
2. Click "Add New Project"
3. Select "Import Git Repository"
4. Choose `cargopete/cargopete` from your repositories
5. Vercel will auto-detect Next.js settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
6. Click **Deploy**

**Option B: Via Vercel CLI (faster)**
```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy from your project directory
cd /Users/pepe/Projects/cargopete-cv
vercel --prod
```

### 2. Configure Custom Domain (cargopete.com)

Once deployed:

1. In your Vercel project, go to **Settings** → **Domains**
2. Add your domain: `cargopete.com`
3. Also add: `www.cargopete.com`
4. Vercel will provide DNS configuration instructions

**DNS Configuration:**
You'll need to add these records at your domain registrar:

**For root domain (cargopete.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

**Alternative (CNAME for both):**
If your registrar supports CNAME flattening:
- Type: `CNAME`
- Name: `@` or `cargopete.com`
- Value: Your Vercel deployment URL (e.g., `cargopete.vercel.app`)

### 3. SSL Certificate

Vercel automatically provisions SSL certificates for your domain. This usually takes a few minutes after DNS propagation.

### 4. Add Your CV PDF

Before going live, add your actual CV PDF:

```bash
# Copy your PDF to the public folder
cp /path/to/your-actual-cv.pdf public/pete-pavlovski-cv.pdf

# Commit and push
git add public/pete-pavlovski-cv.pdf
git commit -m "Add CV PDF"
git push

# Vercel will automatically redeploy
```

### 5. Environment Variables (if needed later)

If you add any environment variables:
1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add variables for Production, Preview, and Development
3. Redeploy to apply changes

## DNS Propagation

After configuring DNS:
- Changes can take up to 48 hours to propagate globally
- Usually much faster (5-30 minutes)
- Check status: https://www.whatsmydns.net/#A/cargopete.com

## Continuous Deployment

Vercel is now connected to your GitHub repo:
- **Push to `main`** → Automatic production deployment
- **Push to other branches** → Preview deployments
- **Pull Requests** → Preview deployments

## Expected Timeline

1. **Initial Vercel deployment:** 2-3 minutes
2. **DNS configuration:** 5-30 minutes (usually)
3. **SSL certificate:** Automatic after DNS propagates

## Testing

Before configuring your custom domain, you can test at:
- Your Vercel deployment URL (e.g., `cargopete.vercel.app`)

## Troubleshooting

**Build fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Test locally: `npm run build`

**Domain not working:**
- Verify DNS records at your registrar
- Check DNS propagation status
- Ensure SSL certificate is provisioned (Vercel handles this automatically)

**Updates not showing:**
- Check Vercel deployments tab to see if new deployment was triggered
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Next Steps

1. Deploy to Vercel now
2. Test the deployment at your `.vercel.app` URL
3. Configure custom domain (cargopete.com)
4. Add your actual CV PDF
5. Share the link!

Your site is ready to go live! 🚀
