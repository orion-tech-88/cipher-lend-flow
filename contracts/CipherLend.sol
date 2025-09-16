// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CipherLend {
    
    struct LendingPool {
        uint256 poolId;
        uint256 totalLiquidity;
        uint256 totalBorrowed;
        uint256 interestRate;
        uint256 collateralRatio;
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
        uint256 loanId;
        uint256 amount;
        uint256 collateralAmount;
        uint256 interestRate;
        uint256 collateralRatio;
        uint256 remainingAmount;
        bool isActive;
        bool isLiquidated;
        address borrower;
        address poolId;
        uint256 startTime;
        uint256 endTime;
        uint256 lastPayment;
    }
    
    struct LiquidityPosition {
        uint256 positionId;
        uint256 amount;
        uint256 shares;
        uint256 rewards;
        bool isActive;
        address provider;
        address poolId;
        uint256 createdAt;
        uint256 lastClaimed;
    }
    
    struct RiskAssessment {
        uint256 riskScore;
        uint256 creditScore;
        uint256 collateralValue;
        uint256 debtRatio;
        bool isVerified;
        address assessor;
        uint256 timestamp;
    }
    
    mapping(uint256 => LendingPool) public pools;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => LiquidityPosition) public liquidityPositions;
    mapping(address => RiskAssessment) public riskAssessments;
    mapping(address => uint256) public userReputation;
    mapping(address => uint256) public poolReputation;
    
    uint256 public poolCounter;
    uint256 public loanCounter;
    uint256 public positionCounter;
    
    address public owner;
    address public riskAssessor;
    address public verifier;
    
    event PoolCreated(uint256 indexed poolId, address indexed manager, string name);
    event LoanCreated(uint256 indexed loanId, uint256 indexed poolId, address indexed borrower, uint256 amount);
    event LiquidityAdded(uint256 indexed positionId, uint256 indexed poolId, address indexed provider, uint256 amount);
    event LoanRepaid(uint256 indexed loanId, uint256 amount);
    event LoanLiquidated(uint256 indexed loanId, address indexed liquidator);
    event RiskAssessed(address indexed user, uint256 riskScore);
    event ReputationUpdated(address indexed user, uint256 reputation);
    
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
            poolId: poolId,
            totalLiquidity: 0,
            totalBorrowed: 0,
            interestRate: _interestRate,
            collateralRatio: _collateralRatio,
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
        bytes calldata amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(pools[poolId].poolManager != address(0), "Pool does not exist");
        require(pools[poolId].isActive, "Pool is not active");
        
        uint256 positionId = positionCounter++;
        
        // In a real implementation, amount would be decrypted from the bytes
        // For now, we'll use msg.value as the amount
        uint256 liquidityAmount = msg.value;
        
        liquidityPositions[positionId] = LiquidityPosition({
            positionId: positionId,
            amount: liquidityAmount,
            shares: liquidityAmount, // Simplified: 1:1 ratio for now
            rewards: 0,
            isActive: true,
            provider: msg.sender,
            poolId: address(uint160(poolId)),
            createdAt: block.timestamp,
            lastClaimed: block.timestamp
        });
        
        // Update pool liquidity
        pools[poolId].totalLiquidity += liquidityAmount;
        pools[poolId].lastUpdated = block.timestamp;
        
        emit LiquidityAdded(positionId, poolId, msg.sender, liquidityAmount);
        return positionId;
    }
    
    function createLoan(
        uint256 poolId,
        bytes calldata amount,
        bytes calldata collateralAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(pools[poolId].poolManager != address(0), "Pool does not exist");
        require(pools[poolId].isActive, "Pool is not active");
        require(riskAssessments[msg.sender].isVerified, "Risk assessment required");
        
        uint256 loanId = loanCounter++;
        
        // In a real implementation, amounts would be decrypted from the bytes
        // For now, we'll use placeholder values
        uint256 loanAmount = 1000; // This would be decrypted from amount bytes
        uint256 collateralValue = 1500; // This would be decrypted from collateralAmount bytes
        
        loans[loanId] = Loan({
            loanId: loanId,
            amount: loanAmount,
            collateralAmount: collateralValue,
            interestRate: pools[poolId].interestRate,
            collateralRatio: pools[poolId].collateralRatio,
            remainingAmount: loanAmount,
            isActive: true,
            isLiquidated: false,
            borrower: msg.sender,
            poolId: address(uint160(poolId)),
            startTime: block.timestamp,
            endTime: block.timestamp + 30 days, // 30 days loan term
            lastPayment: block.timestamp
        });
        
        // Update pool borrowed amount
        pools[poolId].totalBorrowed += loanAmount;
        pools[poolId].lastUpdated = block.timestamp;
        
        emit LoanCreated(loanId, poolId, msg.sender, loanAmount);
        return loanId;
    }
    
    function repayLoan(
        uint256 loanId,
        bytes calldata amount,
        bytes calldata inputProof
    ) public {
        require(loans[loanId].borrower == msg.sender, "Only borrower can repay");
        require(loans[loanId].isActive, "Loan is not active");
        require(!loans[loanId].isLiquidated, "Loan is liquidated");
        
        // In a real implementation, amount would be decrypted from the bytes
        uint256 repayAmount = 100; // This would be decrypted from amount bytes
        
        // Update remaining amount
        if (repayAmount >= loans[loanId].remainingAmount) {
            loans[loanId].remainingAmount = 0;
            loans[loanId].isActive = false;
        } else {
            loans[loanId].remainingAmount -= repayAmount;
        }
        loans[loanId].lastPayment = block.timestamp;
        
        emit LoanRepaid(loanId, repayAmount);
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
        uint256 riskScore,
        uint256 creditScore,
        uint256 collateralValue,
        uint256 debtRatio
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
        
        emit RiskAssessed(user, riskScore);
    }
    
    function updateReputation(address user, uint256 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is borrower or liquidity provider based on context
        if (loanCounter > 0 && loans[loanCounter - 1].borrower == user) {
            userReputation[user] = reputation;
        } else {
            poolReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, reputation);
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
        uint256 totalLiquidity,
        uint256 totalBorrowed,
        uint256 interestRate,
        uint256 collateralRatio,
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
            pool.totalLiquidity,
            pool.totalBorrowed,
            pool.interestRate,
            pool.collateralRatio,
            pool.isActive,
            pool.isVerified,
            pool.createdAt,
            pool.lastUpdated
        );
    }
    
    function getLoanInfo(uint256 loanId) public view returns (
        uint256 amount,
        uint256 collateralAmount,
        uint256 interestRate,
        uint256 remainingAmount,
        bool isActive,
        bool isLiquidated,
        address borrower,
        address poolId,
        uint256 startTime,
        uint256 endTime
    ) {
        Loan storage loan = loans[loanId];
        return (
            loan.amount,
            loan.collateralAmount,
            loan.interestRate,
            loan.remainingAmount,
            loan.isActive,
            loan.isLiquidated,
            loan.borrower,
            loan.poolId,
            loan.startTime,
            loan.endTime
        );
    }
    
    function getLiquidityPositionInfo(uint256 positionId) public view returns (
        uint256 amount,
        uint256 shares,
        uint256 rewards,
        bool isActive,
        address provider,
        address poolId,
        uint256 createdAt,
        uint256 lastClaimed
    ) {
        LiquidityPosition storage position = liquidityPositions[positionId];
        return (
            position.amount,
            position.shares,
            position.rewards,
            position.isActive,
            position.provider,
            position.poolId,
            position.createdAt,
            position.lastClaimed
        );
    }
    
    function getRiskAssessment(address user) public view returns (
        uint256 riskScore,
        uint256 creditScore,
        uint256 collateralValue,
        uint256 debtRatio,
        bool isVerified,
        address assessor,
        uint256 timestamp
    ) {
        RiskAssessment storage assessment = riskAssessments[user];
        return (
            assessment.riskScore,
            assessment.creditScore,
            assessment.collateralValue,
            assessment.debtRatio,
            assessment.isVerified,
            assessment.assessor,
            assessment.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint256) {
        return userReputation[user];
    }
    
    function getPoolReputation(address pool) public view returns (uint256) {
        return poolReputation[pool];
    }
    
    function withdrawLiquidity(uint256 positionId) public {
        require(liquidityPositions[positionId].provider == msg.sender, "Only provider can withdraw");
        require(liquidityPositions[positionId].isActive, "Position is not active");
        
        // Mark position as inactive
        liquidityPositions[positionId].isActive = false;
        
        // Transfer funds back to provider
        uint256 amount = liquidityPositions[positionId].amount;
        payable(msg.sender).transfer(amount);
    }
}