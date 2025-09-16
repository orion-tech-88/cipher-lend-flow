// This would be the actual ABI generated from the compiled contract
// For now, we'll create a simplified version
export const CipherLendABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_symbol", "type": "string"},
      {"internalType": "address", "name": "_tokenAddress", "type": "address"},
      {"internalType": "uint256", "name": "_interestRate", "type": "uint256"},
      {"internalType": "uint256", "name": "_collateralRatio", "type": "uint256"}
    ],
    "name": "createPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "addLiquidity",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "collateralAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createLoan",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "loanId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "repayLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
    "name": "getPoolInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "symbol", "type": "string"},
      {"internalType": "address", "name": "tokenAddress", "type": "address"},
      {"internalType": "address", "name": "poolManager", "type": "address"},
      {"internalType": "uint8", "name": "totalLiquidity", "type": "uint8"},
      {"internalType": "uint8", "name": "totalBorrowed", "type": "uint8"},
      {"internalType": "uint8", "name": "interestRate", "type": "uint8"},
      {"internalType": "uint8", "name": "collateralRatio", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "loanId", "type": "uint256"}],
    "name": "getLoanInfo",
    "outputs": [
      {"internalType": "uint8", "name": "amount", "type": "uint8"},
      {"internalType": "uint8", "name": "collateralAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "interestRate", "type": "uint8"},
      {"internalType": "uint8", "name": "remainingAmount", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isLiquidated", "type": "bool"},
      {"internalType": "address", "name": "borrower", "type": "address"},
      {"internalType": "address", "name": "poolId", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getRiskAssessment",
    "outputs": [
      {"internalType": "uint8", "name": "riskScore", "type": "uint8"},
      {"internalType": "uint8", "name": "creditScore", "type": "uint8"},
      {"internalType": "uint8", "name": "collateralValue", "type": "uint8"},
      {"internalType": "uint8", "name": "debtRatio", "type": "uint8"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "assessor", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
