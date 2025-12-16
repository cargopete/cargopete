# Deployment Guide

## Prerequisites

- GitHub account (to host the repository)
- Vercel account (already have one)
- Domain: cargopete.com (already purchased)

## Steps to Deploy

### 1. Push to GitHub

```bash
# Create a new repository on GitHub (e.g., cargopete-cv)

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/cargopete-cv.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository (cargopete-cv)
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### 3. Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your custom domain: `cargopete.com`
3. Follow Vercel's DNS configuration instructions:
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record pointing to your Vercel deployment
4. Wait for DNS propagation (can take up to 48 hours, usually much faster)

### 4. Add Your CV PDF

Before deploying, add your CV PDF:

```bash
# Copy your CV PDF to the public folder
cp /path/to/your-cv.pdf public/pete-pavlovski-cv.pdf

# Commit the change
git add public/pete-pavlovski-cv.pdf
git commit -m "Add CV PDF"
git push
```

Vercel will automatically redeploy when you push changes.

## Environment Variables (if needed)

If you add any environment variables later:

1. Go to Vercel project settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy the project

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you push to other branches or open PRs

## Custom Configurations

### Build Settings (already configured)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Domain Configuration
Once your domain is configured, the site will be accessible at:
- https://cargopete.com
- https://www.cargopete.com

## Testing

Before going live, test the preview deployment:
1. Check all sections load correctly
2. Test dark/light mode toggle
3. Test on mobile devices
4. Verify all links work
5. Test the CV download functionality

## Maintenance

To update the site:
```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# Vercel will automatically deploy
```

## Troubleshooting

If the deployment fails:
1. Check the Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Test the build locally: `npm run build`
4. Check for any TypeScript errors

For domain issues:
1. Verify DNS records in your domain registrar
2. Wait for DNS propagation
3. Check Vercel's domain status page
