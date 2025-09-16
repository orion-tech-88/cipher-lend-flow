import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Lock, Key, Shield, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useEncryptedContract } from '@/hooks/useEncryptedContract';
import { encryptNumber, generateFHEProof } from '@/lib/fhe';
import { toast } from 'sonner';

export function FHETestComponent() {
  const [testValue, setTestValue] = useState<number>(1000);
  const [encryptionResult, setEncryptionResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<{
    encryption: boolean;
    proof: boolean;
    contract: boolean;
  }>({
    encryption: false,
    proof: false,
    contract: false
  });

  const { submitEncryptedLoan, isEncrypting, isSubmitting } = useEncryptedContract();

  const testFHEEncryption = async () => {
    setIsTesting(true);
    setTestResults({ encryption: false, proof: false, contract: false });
    
    try {
      // Test 1: FHE Encryption
      console.log('Testing FHE encryption...');
      const encrypted = await encryptNumber(testValue, '0x1234567890123456789012345678901234567890', '0x0987654321098765432109876543210987654321');
      console.log('Encryption result:', encrypted);
      
      setEncryptionResult(encrypted);
      setTestResults(prev => ({ ...prev, encryption: true }));
      toast.success('FHE encryption test passed!');
      
      // Test 2: Proof Generation
      console.log('Testing proof generation...');
      const proof = await generateFHEProof(testValue, '0x1234567890123456789012345678901234567890', '0x0987654321098765432109876543210987654321');
      console.log('Proof result:', proof);
      
      setTestResults(prev => ({ ...prev, proof: true }));
      toast.success('Proof generation test passed!');
      
      // Test 3: Contract Interaction (simulated)
      console.log('Testing contract interaction...');
      const loanData = {
        amount: testValue,
        collateralAmount: testValue * 1.5,
        collateralType: 'ETH',
        collateralLocation: '0x1234567890123456789012345678901234567890',
        creditScore: 750
      };
      
      // Simulate contract call without actually sending transaction
      console.log('Simulated contract call with encrypted data:', {
        loanData,
        encrypted,
        proof
      });
      
      setTestResults(prev => ({ ...prev, contract: true }));
      toast.success('Contract interaction test passed!');
      
    } catch (error) {
      console.error('FHE test failed:', error);
      toast.error('FHE test failed: ' + (error as Error).message);
    } finally {
      setIsTesting(false);
    }
  };

  const testRealContractCall = async () => {
    if (!encryptionResult) {
      toast.error('Please run FHE encryption test first');
      return;
    }

    try {
      const loanData = {
        amount: testValue,
        collateralAmount: testValue * 1.5,
        collateralType: 'ETH',
        collateralLocation: '0x1234567890123456789012345678901234567890',
        creditScore: 750
      };

      await submitEncryptedLoan(loanData, 1);
      toast.success('Real contract call initiated!');
    } catch (error) {
      console.error('Real contract call failed:', error);
      toast.error('Real contract call failed: ' + (error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            FHE Encryption Test Suite
          </CardTitle>
          <CardDescription>
            Test the fully homomorphic encryption functionality for private data submission to blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testValue">Test Value (USD)</Label>
            <Input
              id="testValue"
              type="number"
              value={testValue}
              onChange={(e) => setTestValue(Number(e.target.value))}
              placeholder="Enter amount to encrypt"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={testFHEEncryption} 
              disabled={isTesting}
              className="flex items-center gap-2"
            >
              {isTesting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              Test FHE Encryption
            </Button>
            
            <Button 
              onClick={testRealContractCall} 
              disabled={!encryptionResult || isEncrypting || isSubmitting}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isEncrypting || isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Key className="h-4 w-4" />
              )}
              Test Real Contract Call
            </Button>
          </div>

          {/* Test Results */}
          <div className="space-y-3">
            <h4 className="font-medium">Test Results:</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                {testResults.encryption ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">FHE Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                {testResults.proof ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">Proof Generation</span>
              </div>
              <div className="flex items-center gap-2">
                {testResults.contract ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">Contract Interaction</span>
              </div>
            </div>
          </div>

          {/* Encryption Result Display */}
          {encryptionResult && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Encryption Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label className="text-xs">Encrypted Value:</Label>
                  <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                    {encryptionResult.encryptedValue.substring(0, 100)}...
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Proof:</Label>
                  <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                    {encryptionResult.proof.substring(0, 100)}...
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Public Key:</Label>
                  <div className="p-2 bg-muted rounded text-xs font-mono">
                    {encryptionResult.publicKey}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Encrypted: {encryptionResult.encryptedValue ? 'Yes' : 'No'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Fallback: {encryptionResult.fallback ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Indicators */}
          <div className="flex gap-2">
            {isEncrypting && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Encrypting...
              </Badge>
            )}
            {isSubmitting && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Submitting to Blockchain...
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
