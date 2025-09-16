import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { CipherLendABI } from '../lib/contract';

export function useCipherLendContract() {
  const { address } = useAccount();
  
  const contract = useContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherLendABI,
  });

  return contract;
}

export function usePools() {
  const { data: pools, isLoading, error } = useContractRead({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherLendABI,
    functionName: 'getPoolInfo',
    args: [0], // This would need to be dynamic in a real implementation
  });

  return { pools, isLoading, error };
}

export function useCreatePool() {
  const { write: createPool, isLoading, error } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherLendABI,
    functionName: 'createPool',
  });

  return { createPool, isLoading, error };
}

export function useAddLiquidity() {
  const { write: addLiquidity, isLoading, error } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherLendABI,
    functionName: 'addLiquidity',
  });

  return { addLiquidity, isLoading, error };
}

export function useCreateLoan() {
  const { write: createLoan, isLoading, error } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherLendABI,
    functionName: 'createLoan',
  });

  return { createLoan, isLoading, error };
}

export function useRepayLoan() {
  const { write: repayLoan, isLoading, error } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherLendABI,
    functionName: 'repayLoan',
  });

  return { repayLoan, isLoading, error };
}
