import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lock, Key, Shield, Eye, EyeOff } from 'lucide-react';
import { useEncryptedContract, EncryptedLoanData, EncryptedLiquidityData } from '@/hooks/useEncryptedContract';
import { toast } from 'sonner';

export function EncryptedDataForm() {
  const [activeTab, setActiveTab] = useState<'loan' | 'liquidity' | 'risk'>('loan');
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  
  // Loan form data
  const [loanData, setLoanData] = useState<EncryptedLoanData>({
    amount: 0,
    collateralAmount: 0,
    collateralType: '',
    collateralLocation: '',
    creditScore: 0
  });

  // Liquidity form data
  const [liquidityData, setLiquidityData] = useState<EncryptedLiquidityData>({
    amount: 0,
    poolId: 0
  });

  // Risk assessment data
  const [riskData, setRiskData] = useState({
    userAddress: '',
    riskScore: 0,
    creditScore: 0,
    collateralValue: 0,
    debtRatio: 0
  });

  const {
    submitEncryptedLoan,
    submitEncryptedLiquidity,
    submitEncryptedRiskAssessment,
    isEncrypting,
    isSubmitting
  } = useEncryptedContract();

  const handleSubmitLoan = async () => {
    if (!loanData.amount || !loanData.collateralAmount || !loanData.collateralType) {
      toast.error('Please fill in all required fields');
      return;
    }

    await submitEncryptedLoan(loanData, 1); // Using pool ID 1 for demo
  };

  const handleSubmitLiquidity = async () => {
    if (!liquidityData.amount || !liquidityData.poolId) {
      toast.error('Please fill in all required fields');
      return;
    }

    await submitEncryptedLiquidity(liquidityData);
  };

  const handleSubmitRiskAssessment = async () => {
    if (!riskData.userAddress || !riskData.riskScore) {
      toast.error('Please fill in all required fields');
      return;
    }

    await submitEncryptedRiskAssessment(
      riskData.userAddress,
      riskData.riskScore,
      riskData.creditScore,
      riskData.collateralValue,
      riskData.debtRatio
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Lock className="h-8 w-8 text-primary" />
          <Key className="h-6 w-6 text-encrypted" />
          Encrypted Data Submission
        </h2>
        <p className="text-muted-foreground">
          Submit your financial data with full privacy protection using FHE encryption
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-secondary rounded-lg p-1">
          <Button
            variant={activeTab === 'loan' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('loan')}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Encrypted Loan
          </Button>
          <Button
            variant={activeTab === 'liquidity' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('liquidity')}
            className="flex items-center gap-2"
          >
            <Key className="h-4 w-4" />
            Encrypted Liquidity
          </Button>
          <Button
            variant={activeTab === 'risk' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('risk')}
            className="flex items-center gap-2"
          >
            <Lock className="h-4 w-4" />
            Risk Assessment
          </Button>
        </div>
      </div>

      {/* Loan Form */}
      {activeTab === 'loan' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Create Encrypted Loan
            </CardTitle>
            <CardDescription>
              Your loan amount and collateral will be encrypted before being stored on-chain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount (ETH)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="1.5"
                  value={loanData.amount}
                  onChange={(e) => setLoanData({...loanData, amount: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="collateralAmount">Collateral Amount (ETH)</Label>
                <Input
                  id="collateralAmount"
                  type="number"
                  placeholder="3.0"
                  value={loanData.collateralAmount}
                  onChange={(e) => setLoanData({...loanData, collateralAmount: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="collateralType">Collateral Type</Label>
                <Select value={loanData.collateralType} onValueChange={(value) => setLoanData({...loanData, collateralType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collateral type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="stocks">Stocks</SelectItem>
                    <SelectItem value="bonds">Bonds</SelectItem>
                    <SelectItem value="commodities">Commodities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="creditScore">Credit Score</Label>
                <Input
                  id="creditScore"
                  type="number"
                  placeholder="750"
                  min="300"
                  max="850"
                  value={loanData.creditScore}
                  onChange={(e) => setLoanData({...loanData, creditScore: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="collateralLocation">Collateral Location/Details</Label>
              <Textarea
                id="collateralLocation"
                placeholder="Describe the collateral location or details..."
                value={loanData.collateralLocation}
                onChange={(e) => setLoanData({...loanData, collateralLocation: e.target.value})}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowEncryptedData(!showEncryptedData)}
                variant="outline"
                size="sm"
              >
                {showEncryptedData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showEncryptedData ? 'Hide' : 'Show'} Encrypted Data
              </Button>
            </div>

            {showEncryptedData && (
              <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold mb-2">Encrypted Data Preview:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <Badge variant="outline">Loan Amount</Badge>
                    <code className="ml-2 text-xs">{btoa(JSON.stringify({value: loanData.amount, encrypted: true}))}</code>
                  </div>
                  <div>
                    <Badge variant="outline">Collateral Amount</Badge>
                    <code className="ml-2 text-xs">{btoa(JSON.stringify({value: loanData.collateralAmount, encrypted: true}))}</code>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleSubmitLoan}
              disabled={isEncrypting || isSubmitting}
              className="w-full"
            >
              {isEncrypting ? 'Encrypting Data...' : isSubmitting ? 'Submitting to Blockchain...' : 'Submit Encrypted Loan'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Liquidity Form */}
      {activeTab === 'liquidity' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-encrypted" />
              Add Encrypted Liquidity
            </CardTitle>
            <CardDescription>
              Your liquidity amount will be encrypted to protect your position size
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="liquidityAmount">Liquidity Amount (ETH)</Label>
                <Input
                  id="liquidityAmount"
                  type="number"
                  placeholder="10.0"
                  value={liquidityData.amount}
                  onChange={(e) => setLiquidityData({...liquidityData, amount: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="poolId">Pool ID</Label>
                <Select value={liquidityData.poolId.toString()} onValueChange={(value) => setLiquidityData({...liquidityData, poolId: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Pool 1 - ETH/USDC</SelectItem>
                    <SelectItem value="2">Pool 2 - ETH/DAI</SelectItem>
                    <SelectItem value="3">Pool 3 - ETH/WBTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSubmitLiquidity}
              disabled={isEncrypting || isSubmitting}
              className="w-full"
            >
              {isEncrypting ? 'Encrypting Data...' : isSubmitting ? 'Submitting to Blockchain...' : 'Submit Encrypted Liquidity'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Risk Assessment Form */}
      {activeTab === 'risk' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Encrypted Risk Assessment
            </CardTitle>
            <CardDescription>
              Submit encrypted risk assessment data for user verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userAddress">User Address</Label>
              <Input
                id="userAddress"
                placeholder="0x..."
                value={riskData.userAddress}
                onChange={(e) => setRiskData({...riskData, userAddress: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="riskScore">Risk Score (0-100)</Label>
                <Input
                  id="riskScore"
                  type="number"
                  placeholder="25"
                  min="0"
                  max="100"
                  value={riskData.riskScore}
                  onChange={(e) => setRiskData({...riskData, riskScore: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="creditScore">Credit Score</Label>
                <Input
                  id="creditScore"
                  type="number"
                  placeholder="750"
                  min="300"
                  max="850"
                  value={riskData.creditScore}
                  onChange={(e) => setRiskData({...riskData, creditScore: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="collateralValue">Collateral Value (ETH)</Label>
                <Input
                  id="collateralValue"
                  type="number"
                  placeholder="5.0"
                  value={riskData.collateralValue}
                  onChange={(e) => setRiskData({...riskData, collateralValue: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="debtRatio">Debt Ratio (%)</Label>
                <Input
                  id="debtRatio"
                  type="number"
                  placeholder="30"
                  min="0"
                  max="100"
                  value={riskData.debtRatio}
                  onChange={(e) => setRiskData({...riskData, debtRatio: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <Button
              onClick={handleSubmitRiskAssessment}
              disabled={isEncrypting || isSubmitting}
              className="w-full"
            >
              {isEncrypting ? 'Encrypting Data...' : 'Submit Encrypted Risk Assessment'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Encryption Status */}
      {(isEncrypting || isSubmitting) && (
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <div>
                <p className="font-semibold">
                  {isEncrypting ? 'Encrypting your data with FHE...' : 'Submitting encrypted data to blockchain...'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your privacy is being protected through fully homomorphic encryption
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
