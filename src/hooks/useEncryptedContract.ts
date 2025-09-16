import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CipherLendABI } from '../lib/contract';
import { 
  encryptNumber, 
  generateFHEProof, 
  toExternalEuint32,
  assessRiskWithFHE,
  generateEncryptedCollateral,
  FHEEncryptedData 
} from '../lib/fhe';
import { toast } from 'sonner';

export interface EncryptedLoanData {
  amount: number;
  collateralAmount: number;
  collateralType: string;
  collateralLocation: string;
  creditScore: number;
}

export interface EncryptedLiquidityData {
  amount: number;
  poolId: number;
}

export function useEncryptedContract() {
  const { address } = useAccount();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create encrypted loan
  const { writeContract: createLoan, data: createLoanData } = useWriteContract({
    onSuccess: () => {
      toast.success('Encrypted loan data submitted to blockchain');
    },
    onError: (error) => {
      toast.error(`Failed to create encrypted loan: ${error.message}`);
    }
  });

  // Add encrypted liquidity
  const { writeContract: addLiquidity, data: addLiquidityData } = useWriteContract({
    onSuccess: () => {
      toast.success('Encrypted liquidity data submitted to blockchain');
    },
    onError: (error) => {
      toast.error(`Failed to add encrypted liquidity: ${error.message}`);
    }
  });

  // Wait for transaction confirmation
  const { isLoading: isCreatingLoan } = useWaitForTransactionReceipt({
    hash: createLoanData,
    onSuccess: () => {
      setIsSubmitting(false);
      toast.success('Encrypted loan created successfully!');
    }
  });

  const { isLoading: isAddingLiquidity } = useWaitForTransactionReceipt({
    hash: addLiquidityData,
    onSuccess: () => {
      setIsSubmitting(false);
      toast.success('Encrypted liquidity added successfully!');
    }
  });

  // Encrypt and submit loan data
  const submitEncryptedLoan = async (loanData: EncryptedLoanData, poolId: number) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsEncrypting(true);
    setIsSubmitting(true);

    try {
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      
      // Encrypt loan amount
      const encryptedAmount = await encryptNumber(loanData.amount, contractAddress, address);
      const amountProof = await generateFHEProof(loanData.amount, contractAddress, address);
      
      // Encrypt collateral amount
      const encryptedCollateral = await encryptNumber(loanData.collateralAmount, contractAddress, address);
      const collateralProof = await generateFHEProof(loanData.collateralAmount, contractAddress, address);
      
      // Generate risk assessment with FHE
      const riskAssessment = await assessRiskWithFHE(
        loanData.collateralAmount,
        loanData.amount,
        loanData.creditScore,
        contractAddress,
        address
      );
      
      // Generate encrypted collateral data
      const encryptedCollateralData = await generateEncryptedCollateral(
        loanData.collateralType,
        loanData.collateralAmount,
        loanData.collateralLocation,
        contractAddress,
        address
      );

      // Prepare encrypted data for blockchain
      const encryptedAmountData = toExternalEuint32(loanData.amount);
      const encryptedCollateralData_uint32 = toExternalEuint32(loanData.collateralAmount);
      
      // Combine proofs
      const combinedProof = btoa(JSON.stringify({
        amountProof: amountProof.proof,
        collateralProof: collateralProof.proof,
        riskAssessment: riskAssessment.encryptedValue,
        collateralData: encryptedCollateralData.encryptedValue,
        timestamp: Date.now(),
        userAddress: address
      }));

      console.log('Submitting encrypted loan data:', {
        poolId,
        amount: encryptedAmountData,
        collateralAmount: encryptedCollateralData_uint32,
        proof: combinedProof
      });

      // Submit to blockchain
      createLoan({
        address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
        abi: CipherLendABI,
        functionName: 'createLoan',
        args: [poolId, encryptedAmountData, encryptedCollateralData_uint32, combinedProof]
      });

    } catch (error) {
      console.error('Error encrypting loan data:', error);
      toast.error('Failed to encrypt loan data');
      setIsSubmitting(false);
    } finally {
      setIsEncrypting(false);
    }
  };

  // Encrypt and submit liquidity data
  const submitEncryptedLiquidity = async (liquidityData: EncryptedLiquidityData) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsEncrypting(true);
    setIsSubmitting(true);

    try {
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      
      // Encrypt liquidity amount
      const encryptedAmount = await encryptNumber(liquidityData.amount, contractAddress, address);
      const amountProof = await generateFHEProof(liquidityData.amount, contractAddress, address);
      
      // Prepare encrypted data for blockchain
      const encryptedAmountData = toExternalEuint32(liquidityData.amount);
      
      // Create proof
      const proof = btoa(JSON.stringify({
        amountProof: amountProof.proof,
        poolId: liquidityData.poolId,
        timestamp: Date.now(),
        userAddress: address
      }));

      console.log('Submitting encrypted liquidity data:', {
        poolId: liquidityData.poolId,
        amount: encryptedAmountData,
        proof
      });

      // Submit to blockchain
      addLiquidity({
        address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
        abi: CipherLendABI,
        functionName: 'addLiquidity',
        args: [liquidityData.poolId, encryptedAmountData, proof],
        value: BigInt(liquidityData.amount * 1e18) // Convert to wei
      });

    } catch (error) {
      console.error('Error encrypting liquidity data:', error);
      toast.error('Failed to encrypt liquidity data');
      setIsSubmitting(false);
    } finally {
      setIsEncrypting(false);
    }
  };

  // Encrypt and submit risk assessment
  const submitEncryptedRiskAssessment = async (
    userAddress: string,
    riskScore: number,
    creditScore: number,
    collateralValue: number,
    debtRatio: number
  ) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsEncrypting(true);

    try {
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      
      // Encrypt risk data
      const encryptedRiskScore = await encryptNumber(riskScore, contractAddress, address);
      const encryptedCreditScore = await encryptNumber(creditScore, contractAddress, address);
      const encryptedCollateralValue = await encryptNumber(collateralValue, contractAddress, address);
      const encryptedDebtRatio = await encryptNumber(debtRatio, contractAddress, address);

      // Generate proofs
      const riskProof = await generateFHEProof(riskScore, contractAddress, address);
      const creditProof = await generateFHEProof(creditScore, contractAddress, address);
      const collateralProof = await generateFHEProof(collateralValue, contractAddress, address);
      const debtProof = await generateFHEProof(debtRatio, contractAddress, address);

      // Combine all encrypted data
      const encryptedAssessment = {
        riskScore: encryptedRiskScore.encryptedValue,
        creditScore: encryptedCreditScore.encryptedValue,
        collateralValue: encryptedCollateralValue.encryptedValue,
        debtRatio: encryptedDebtRatio.encryptedValue,
        proofs: {
          risk: riskProof.proof,
          credit: creditProof.proof,
          collateral: collateralProof.proof,
          debt: debtProof.proof
        },
        timestamp: Date.now(),
        assessor: address
      };

      console.log('Encrypted risk assessment:', encryptedAssessment);
      
      // In a real implementation, this would be submitted to the risk assessor contract
      toast.success('Encrypted risk assessment generated successfully');
      
      return encryptedAssessment;

    } catch (error) {
      console.error('Error encrypting risk assessment:', error);
      toast.error('Failed to encrypt risk assessment');
      return null;
    } finally {
      setIsEncrypting(false);
    }
  };

  return {
    submitEncryptedLoan,
    submitEncryptedLiquidity,
    submitEncryptedRiskAssessment,
    isEncrypting,
    isSubmitting,
    isCreatingLoan,
    isAddingLiquidity
  };
}
