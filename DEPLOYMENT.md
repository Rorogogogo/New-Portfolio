# Deployment Guide

This guide explains how to set up automated deployment for your Next.js portfolio using GitHub Actions and Firebase Hosting.

## Prerequisites

1. **Firebase Project**: Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. **Firebase Hosting**: Enable Hosting in your Firebase project
3. **Firebase CLI**: Install Firebase CLI locally for initial setup

## Setup Instructions

### 1. Firebase Configuration

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:

   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Choose `out` as your public directory
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys with GitHub: No (we'll use GitHub Actions)

### 2. GitHub Secrets Setup

In your GitHub repository, go to Settings → Secrets and variables → Actions, and add these secrets:

1. **FIREBASE_SERVICE_ACCOUNT**

   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Copy the entire JSON content and paste it as the secret value

2. **Add any environment variables your app needs** (optional):
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - etc.

### 3. Update Configuration Files

1. **Update `.github/workflows/deploy-main.yml`** (Already configured!):

   - ✅ Project ID: `robert-potfolio`
   - ✅ Hosting URL: `https://robert-potfolio.web.app`
   - Add any environment variables your app needs if required

2. **Verify `firebase.json`**:
   - The configuration is set up for Next.js static export
   - Modify if you need custom redirects or headers

## How It Works

### Main Branch Deployment

- Triggers when code is pushed to `main` branch
- Runs linting, builds the project, and deploys to Firebase Hosting
- Available at your Firebase Hosting URL

### Pull Request Checks

- Triggers on pull requests to `main` branch
- Runs linting, type checking, and builds the project
- Does not deploy, just validates the code

## Local Development

To test the build locally:

```bash
# Build the project
npm run build

# Serve the static files (optional, requires Firebase CLI)
firebase serve --only hosting
```

## Deployment Process

1. Make changes to your code
2. Push to a feature branch
3. Create a pull request to `main`
4. GitHub Actions will run PR checks
5. After merging to `main`, automatic deployment will trigger
6. Your site will be live on Firebase Hosting

## Troubleshooting

### Build Fails

- Check if all dependencies are correctly installed
- Verify environment variables are set correctly
- Check the build logs in GitHub Actions

### Deployment Fails

- Verify Firebase service account permissions
- Check if the Firebase project ID is correct
- Ensure Firebase Hosting is enabled

### Static Export Issues

- Some Next.js features don't work with static export
- Check [Next.js static export documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) for limitations

## Manual Deployment

If needed, you can deploy manually:

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```
