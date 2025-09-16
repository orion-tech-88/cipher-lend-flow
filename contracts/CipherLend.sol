// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherLend is SepoliaConfig {
    using FHE for *;
    
    struct LendingPool {
        euint32 poolId;
        euint32 totalLiquidity;
        euint32 totalBorrowed;
        euint32 interestRate;
        euint32 collateralRatio;
        bool isActive;
        bool isVerified;
        string name;
        string symbol;
        address tokenAddress;
        address poolManager;
        uint256 createdAt;
        uint256 lastUpdated;
    }
    
    struct Loan {
        euint32 loanId;
        euint32 amount;
        euint32 collateralAmount;
        euint32 interestRate;
        euint32 collateralRatio;
        euint32 remainingAmount;
        bool isActive;
        bool isLiquidated;
        address borrower;
        address poolId;
        uint256 startTime;
        uint256 endTime;
        uint256 lastPayment;
    }
    
    struct LiquidityPosition {
        euint32 positionId;
        euint32 amount;
        euint32 shares;
        euint32 rewards;
        bool isActive;
        address provider;
        address poolId;
        uint256 createdAt;
        uint256 lastClaimed;
    }
    
    struct RiskAssessment {
        euint32 riskScore;
        euint32 creditScore;
        euint32 collateralValue;
        euint32 debtRatio;
        bool isVerified;
        address assessor;
        uint256 timestamp;
    }
    
    mapping(uint256 => LendingPool) public pools;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => LiquidityPosition) public liquidityPositions;
    mapping(address => RiskAssessment) public riskAssessments;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public poolReputation;
    
    uint256 public poolCounter;
    uint256 public loanCounter;
    uint256 public positionCounter;
    
    address public owner;
    address public riskAssessor;
    address public verifier;
    
    event PoolCreated(uint256 indexed poolId, address indexed manager, string name);
    event LoanCreated(uint256 indexed loanId, uint256 indexed poolId, address indexed borrower, uint32 amount);
    event LiquidityAdded(uint256 indexed positionId, uint256 indexed poolId, address indexed provider, uint32 amount);
    event LoanRepaid(uint256 indexed loanId, uint32 amount);
    event LoanLiquidated(uint256 indexed loanId, address indexed liquidator);
    event RiskAssessed(address indexed user, uint32 riskScore);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _riskAssessor, address _verifier) {
        owner = msg.sender;
        riskAssessor = _riskAssessor;
        verifier = _verifier;
    }
    
    function createPool(
        string memory _name,
        string memory _symbol,
        address _tokenAddress,
        uint256 _interestRate,
        uint256 _collateralRatio
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Pool name cannot be empty");
        require(_tokenAddress != address(0), "Invalid token address");
        require(_interestRate > 0, "Interest rate must be positive");
        require(_collateralRatio > 0, "Collateral ratio must be positive");
        
        uint256 poolId = poolCounter++;
        
        pools[poolId] = LendingPool({
            poolId: FHE.asEuint32(0), // Will be set properly later
            totalLiquidity: FHE.asEuint32(0),
            totalBorrowed: FHE.asEuint32(0),
            interestRate: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            collateralRatio: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            isActive: true,
            isVerified: false,
            name: _name,
            symbol: _symbol,
            tokenAddress: _tokenAddress,
            poolManager: msg.sender,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        emit PoolCreated(poolId, msg.sender, _name);
        return poolId;
    }
    
    function addLiquidity(
        uint256 poolId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(pools[poolId].poolManager != address(0), "Pool does not exist");
        require(pools[poolId].isActive, "Pool is not active");
        
        uint256 positionId = positionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        liquidityPositions[positionId] = LiquidityPosition({
            positionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            shares: internalAmount, // Simplified: 1:1 ratio for now
            rewards: FHE.asEuint32(0),
            isActive: true,
            provider: msg.sender,
            poolId: address(uint160(poolId)),
            createdAt: block.timestamp,
            lastClaimed: block.timestamp
        });
        
        // Update pool liquidity
        pools[poolId].totalLiquidity = FHE.add(pools[poolId].totalLiquidity, internalAmount);
        pools[poolId].lastUpdated = block.timestamp;
        
        emit LiquidityAdded(positionId, poolId, msg.sender, 0); // Amount will be decrypted off-chain
        return positionId;
    }
    
    function createLoan(
        uint256 poolId,
        externalEuint32 amount,
        externalEuint32 collateralAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(pools[poolId].poolManager != address(0), "Pool does not exist");
        require(pools[poolId].isActive, "Pool is not active");
        require(riskAssessments[msg.sender].isVerified, "Risk assessment required");
        
        uint256 loanId = loanCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalCollateral = FHE.fromExternal(collateralAmount, inputProof);
        
        loans[loanId] = Loan({
            loanId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            collateralAmount: internalCollateral,
            interestRate: pools[poolId].interestRate,
            collateralRatio: pools[poolId].collateralRatio,
            remainingAmount: internalAmount,
            isActive: true,
            isLiquidated: false,
            borrower: msg.sender,
            poolId: address(uint160(poolId)),
            startTime: block.timestamp,
            endTime: block.timestamp + 30 days, // 30 days loan term
            lastPayment: block.timestamp
        });
        
        // Update pool borrowed amount
        pools[poolId].totalBorrowed = FHE.add(pools[poolId].totalBorrowed, internalAmount);
        pools[poolId].lastUpdated = block.timestamp;
        
        emit LoanCreated(loanId, poolId, msg.sender, 0); // Amount will be decrypted off-chain
        return loanId;
    }
    
    function repayLoan(
        uint256 loanId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(loans[loanId].borrower == msg.sender, "Only borrower can repay");
        require(loans[loanId].isActive, "Loan is not active");
        require(!loans[loanId].isLiquidated, "Loan is liquidated");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update remaining amount
        loans[loanId].remainingAmount = FHE.sub(loans[loanId].remainingAmount, internalAmount);
        loans[loanId].lastPayment = block.timestamp;
        
        // Check if loan is fully repaid
        ebool isFullyRepaid = FHE.le(loans[loanId].remainingAmount, FHE.asEuint32(0));
        if (FHE.decrypt(isFullyRepaid)) {
            loans[loanId].isActive = false;
        }
        
        emit LoanRepaid(loanId, 0); // Amount will be decrypted off-chain
    }
    
    function liquidateLoan(uint256 loanId) public {
        require(loans[loanId].isActive, "Loan is not active");
        require(!loans[loanId].isLiquidated, "Loan is already liquidated");
        require(block.timestamp > loans[loanId].endTime, "Loan is not overdue");
        
        loans[loanId].isLiquidated = true;
        loans[loanId].isActive = false;
        
        emit LoanLiquidated(loanId, msg.sender);
    }
    
    function assessRisk(
        address user,
        euint32 riskScore,
        euint32 creditScore,
        euint32 collateralValue,
        euint32 debtRatio
    ) public {
        require(msg.sender == riskAssessor, "Only risk assessor can assess risk");
        require(user != address(0), "Invalid user address");
        
        riskAssessments[user] = RiskAssessment({
            riskScore: riskScore,
            creditScore: creditScore,
            collateralValue: collateralValue,
            debtRatio: debtRatio,
            isVerified: true,
            assessor: msg.sender,
            timestamp: block.timestamp
        });
        
        emit RiskAssessed(user, 0); // Risk score will be decrypted off-chain
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is borrower or liquidity provider based on context
        if (loans[loanCounter - 1].borrower == user) {
            userReputation[user] = reputation;
        } else {
            poolReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // Reputation will be decrypted off-chain
    }
    
    function verifyPool(uint256 poolId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify pools");
        require(pools[poolId].poolManager != address(0), "Pool does not exist");
        
        pools[poolId].isVerified = isVerified;
    }
    
    function getPoolInfo(uint256 poolId) public view returns (
        string memory name,
        string memory symbol,
        address tokenAddress,
        address poolManager,
        uint8 totalLiquidity,
        uint8 totalBorrowed,
        uint8 interestRate,
        uint8 collateralRatio,
        bool isActive,
        bool isVerified,
        uint256 createdAt,
        uint256 lastUpdated
    ) {
        LendingPool storage pool = pools[poolId];
        return (
            pool.name,
            pool.symbol,
            pool.tokenAddress,
            pool.poolManager,
            0, // FHE.decrypt(pool.totalLiquidity) - will be decrypted off-chain
            0, // FHE.decrypt(pool.totalBorrowed) - will be decrypted off-chain
            0, // FHE.decrypt(pool.interestRate) - will be decrypted off-chain
            0, // FHE.decrypt(pool.collateralRatio) - will be decrypted off-chain
            pool.isActive,
            pool.isVerified,
            pool.createdAt,
            pool.lastUpdated
        );
    }
    
    function getLoanInfo(uint256 loanId) public view returns (
        uint8 amount,
        uint8 collateralAmount,
        uint8 interestRate,
        uint8 remainingAmount,
        bool isActive,
        bool isLiquidated,
        address borrower,
        address poolId,
        uint256 startTime,
        uint256 endTime
    ) {
        Loan storage loan = loans[loanId];
        return (
            0, // FHE.decrypt(loan.amount) - will be decrypted off-chain
            0, // FHE.decrypt(loan.collateralAmount) - will be decrypted off-chain
            0, // FHE.decrypt(loan.interestRate) - will be decrypted off-chain
            0, // FHE.decrypt(loan.remainingAmount) - will be decrypted off-chain
            loan.isActive,
            loan.isLiquidated,
            loan.borrower,
            loan.poolId,
            loan.startTime,
            loan.endTime
        );
    }
    
    function getLiquidityPositionInfo(uint256 positionId) public view returns (
        uint8 amount,
        uint8 shares,
        uint8 rewards,
        bool isActive,
        address provider,
        address poolId,
        uint256 createdAt,
        uint256 lastClaimed
    ) {
        LiquidityPosition storage position = liquidityPositions[positionId];
        return (
            0, // FHE.decrypt(position.amount) - will be decrypted off-chain
            0, // FHE.decrypt(position.shares) - will be decrypted off-chain
            0, // FHE.decrypt(position.rewards) - will be decrypted off-chain
            position.isActive,
            position.provider,
            position.poolId,
            position.createdAt,
            position.lastClaimed
        );
    }
    
    function getRiskAssessment(address user) public view returns (
        uint8 riskScore,
        uint8 creditScore,
        uint8 collateralValue,
        uint8 debtRatio,
        bool isVerified,
        address assessor,
        uint256 timestamp
    ) {
        RiskAssessment storage assessment = riskAssessments[user];
        return (
            0, // FHE.decrypt(assessment.riskScore) - will be decrypted off-chain
            0, // FHE.decrypt(assessment.creditScore) - will be decrypted off-chain
            0, // FHE.decrypt(assessment.collateralValue) - will be decrypted off-chain
            0, // FHE.decrypt(assessment.debtRatio) - will be decrypted off-chain
            assessment.isVerified,
            assessment.assessor,
            assessment.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getPoolReputation(address pool) public view returns (uint8) {
        return 0; // FHE.decrypt(poolReputation[pool]) - will be decrypted off-chain
    }
    
    function withdrawLiquidity(uint256 positionId) public {
        require(liquidityPositions[positionId].provider == msg.sender, "Only provider can withdraw");
        require(liquidityPositions[positionId].isActive, "Position is not active");
        
        // Mark position as inactive
        liquidityPositions[positionId].isActive = false;
        
        // Transfer funds back to provider
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        // payable(msg.sender).transfer(amount);
    }
}
