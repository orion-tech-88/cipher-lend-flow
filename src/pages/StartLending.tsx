import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Info, Calculator } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartLending = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");

  const assets = [
    { value: "eth", label: "ETH", apy: "12.4%", risk: "Low" },
    { value: "btc", label: "BTC", apy: "8.7%", risk: "Low" },
    { value: "usdc", label: "USDC", apy: "6.1%", risk: "Very Low" },
    { value: "usdt", label: "USDT", apy: "5.8%", risk: "Very Low" },
    { value: "dai", label: "DAI", apy: "15.2%", risk: "Medium" }
  ];

  const durations = [
    { value: "7", label: "7 Days", multiplier: 1.0 },
    { value: "30", label: "30 Days", multiplier: 1.1 },
    { value: "90", label: "90 Days", multiplier: 1.25 },
    { value: "180", label: "180 Days", multiplier: 1.4 },
    { value: "365", label: "1 Year", multiplier: 1.6 }
  ];

  const calculateReturns = () => {
    const asset = assets.find(a => a.value === selectedAsset);
    const durationData = durations.find(d => d.value === duration);
    
    if (!asset || !durationData || !amount) return null;

    const baseAPY = parseFloat(asset.apy.replace('%', ''));
    const adjustedAPY = baseAPY * durationData.multiplier;
    const principal = parseFloat(amount);
    const durationDays = parseInt(duration);
    
    const returns = principal * (adjustedAPY / 100) * (durationDays / 365);
    const total = principal + returns;

    return {
      principal,
      returns,
      total,
      apy: adjustedAPY
    };
  };

  const calculations = calculateReturns();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Start Lending</h1>
            <p className="text-muted-foreground">
              Earn passive income by lending your assets with privacy protection.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Create Lending Position
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Asset Selection */}
              <div className="space-y-2">
                <Label htmlFor="asset">Select Asset</Label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an asset to lend" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.value} value={asset.value}>
                        <div className="flex justify-between items-center w-full">
                          <span>{asset.label}</span>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge variant="outline" className="text-profit">{asset.apy}</Badge>
                            <Badge variant="secondary">{asset.risk}</Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Lending Amount</Label>
                <div className="flex gap-2">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" className="px-4">
                    {selectedAsset.toUpperCase()}
                  </Button>
                </div>
                {selectedAsset && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Available: 12.45 {selectedAsset.toUpperCase()}</span>
                    <Button variant="link" className="h-auto p-0 text-xs">MAX</Button>
                  </div>
                )}
              </div>

              {/* Duration Selection */}
              <div className="space-y-2">
                <Label htmlFor="duration">Lock Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose lock duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((dur) => (
                      <SelectItem key={dur.value} value={dur.value}>
                        <div className="flex justify-between items-center w-full">
                          <span>{dur.label}</span>
                          <span className="text-profit ml-4">+{((dur.multiplier - 1) * 100).toFixed(0)}% APY Boost</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {calculations && (
                <>
                  <Separator />
                  
                  {/* Calculations */}
                  <div className="bg-secondary/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Calculator className="h-4 w-4" />
                      Projected Returns
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Principal Amount</div>
                        <div className="font-semibold">
                          {calculations.principal.toFixed(4)} {selectedAsset.toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Adjusted APY</div>
                        <div className="font-semibold text-profit">
                          {calculations.apy.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Estimated Returns</div>
                        <div className="font-semibold text-profit">
                          +{calculations.returns.toFixed(4)} {selectedAsset.toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Total at Maturity</div>
                        <div className="font-semibold text-primary">
                          {calculations.total.toFixed(4)} {selectedAsset.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Info */}
                  <div className="bg-encrypted/10 border border-encrypted/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-encrypted mb-2">
                      <Shield className="h-4 w-4" />
                      Privacy Protection Enabled
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Your lending position is encrypted and anonymous. Other users cannot see your 
                      individual lending amounts or returns, ensuring complete privacy.
                    </div>
                  </div>
                </>
              )}

              {/* Risk Disclaimer */}
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-warning mb-2">
                  <Info className="h-4 w-4" />
                  Important Information
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Lending involves smart contract risks</p>
                  <p>• Funds are locked for the selected duration</p>
                  <p>• Returns are estimated and not guaranteed</p>
                  <p>• Early withdrawal may incur penalties</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate('/pools')}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  disabled={!amount || !duration || !selectedAsset}
                >
                  Start Lending
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default StartLending;