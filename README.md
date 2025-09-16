# Cipher Lend Flow

A privacy-first DeFi lending protocol built with FHE (Fully Homomorphic Encryption) technology, enabling encrypted collateral management while maintaining system transparency and solvency.

## Features

- **Encrypted Collateral**: Borrower collateral ratios are encrypted using FHE technology
- **Privacy-Preserving**: Sensitive financial data remains private while maintaining system integrity
- **Transparent Liquidity**: Open liquidity pools with verifiable solvency
- **Real-time Analytics**: Comprehensive dashboard with encrypted data visualization
- **Multi-Wallet Support**: Integration with popular Web3 wallets including Rainbow, MetaMask, and more

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Encryption**: FHE (Fully Homomorphic Encryption) via Zama
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/orion-tech-88/cipher-lend-flow.git
cd cipher-lend-flow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following environment variables:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Landing page hero
│   └── ...
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Analytics.tsx   # Analytics page
│   ├── Pools.tsx       # Liquidity pools
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Smart Contracts

The protocol includes FHE-enabled smart contracts for:
- Encrypted collateral management
- Privacy-preserving lending operations
- Transparent liquidity pool management
- Reputation and verification systems

## Wallet Integration

Supports multiple wallet providers:
- Rainbow Wallet
- MetaMask
- WalletConnect
- Coinbase Wallet
- And more through RainbowKit

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security

This protocol implements FHE technology to ensure:
- Collateral data remains encrypted
- Privacy is preserved while maintaining transparency
- System solvency can be verified without exposing sensitive data

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Join our community discussions
- Contact: support@cipherlend.com

## Roadmap

- [ ] Mainnet deployment
- [ ] Additional FHE operations
- [ ] Cross-chain support
- [ ] Mobile app
- [ ] Advanced analytics dashboard