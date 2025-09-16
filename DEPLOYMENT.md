# Vercel Deployment Guide for CipherLend

This guide provides step-by-step instructions for deploying the CipherLend application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Environment variables configured

## Step-by-Step Deployment Process

### 1. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### 2. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select the `orion-tech-88/cipher-lend-flow` repository
3. Click "Import"

### 3. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
VITE_FHE_NETWORK_URL=https://devnet.zama.ai
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
VITE_APP_NAME=CipherLend
VITE_APP_DESCRIPTION=Privacy-first DeFi lending protocol with encrypted collateral
```

### 4. Deploy

1. Click "Deploy" to start the deployment process
2. Wait for the build to complete (usually 2-3 minutes)
3. Your application will be available at the provided Vercel URL

### 5. Custom Domain (Optional)

1. In your project dashboard, go to "Settings" > "Domains"
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Environment Variables Configuration

### Required Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `VITE_CHAIN_ID` | Ethereum chain ID | `11155111` (Sepolia) |
| `VITE_RPC_URL` | RPC endpoint URL | `https://sepolia.infura.io/v3/...` |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `2ec9743d0d0cd7fb94dee1a7e6d33475` |
| `VITE_INFURA_API_KEY` | Infura API key | `b18fb7e6ca7045ac83c41157ab93f990` |

### Optional Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `VITE_FHE_NETWORK_URL` | FHE network endpoint | `https://devnet.zama.ai` |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address | `0x...` |
| `VITE_APP_NAME` | Application name | `CipherLend` |
| `VITE_APP_DESCRIPTION` | Application description | `Privacy-first DeFi lending protocol` |

## Build Configuration

### Vercel Configuration File

Create a `vercel.json` file in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Package.json Scripts

Ensure your `package.json` has the following scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are properly installed
   - Verify environment variables are set correctly
   - Check build logs in Vercel dashboard

2. **Environment Variables Not Loading**
   - Ensure variables are prefixed with `VITE_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your target network

### Build Logs

To view build logs:
1. Go to your project in Vercel dashboard
2. Click on the latest deployment
3. Check the "Build Logs" tab for any errors

## Post-Deployment

### 1. Test the Application

1. Visit your deployed URL
2. Test wallet connection functionality
3. Verify all features work as expected
4. Check console for any errors

### 2. Monitor Performance

1. Use Vercel Analytics (if enabled)
2. Monitor Core Web Vitals
3. Check for any runtime errors

### 3. Update Deployment

To update your deployment:
1. Push changes to your GitHub repository
2. Vercel will automatically trigger a new deployment
3. Monitor the deployment status in your dashboard

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to your repository
2. **API Keys**: Use environment variables for all API keys
3. **HTTPS**: Vercel automatically provides SSL certificates
4. **CORS**: Configure CORS settings if needed for API calls

## Performance Optimization

1. **Image Optimization**: Use Vercel's built-in image optimization
2. **Caching**: Configure appropriate cache headers
3. **CDN**: Vercel provides global CDN automatically
4. **Bundle Size**: Monitor and optimize bundle size

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Contact Vercel support if needed
4. Check GitHub repository for issues

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
