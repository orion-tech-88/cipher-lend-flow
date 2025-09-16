import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, Plus, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLiquidity = () => {
  const navigate = useNavigate();
  const [token1Amount, setToken1Amount] = useState("");
  const [token2Amount, setToken2Amount] = useState("");
  const [selectedPool, setSelectedPool] = useState("");

  const pools = [
    { value: "eth-usdc", label: "ETH/USDC", apy: "12.4%" },
    { value: "btc-usdt", label: "BTC/USDT", apy: "8.7%" },
    { value: "weth-dai", label: "WETH/DAI", apy: "15.2%" },
    { value: "usdc-usdt", label: "USDC/USDT", apy: "6.1%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Add Liquidity</h1>
            <p className="text-muted-foreground">
              Provide liquidity to earn trading fees and rewards while maintaining privacy.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Liquidity to Pool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pool Selection */}
              <div className="space-y-2">
                <Label htmlFor="pool">Select Pool</Label>
                <Select value={selectedPool} onValueChange={setSelectedPool}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a liquidity pool" />
                  </SelectTrigger>
                  <SelectContent>
                    {pools.map((pool) => (
                      <SelectItem key={pool.value} value={pool.value}>
                        <div className="flex justify-between items-center w-full">
                          <span>{pool.label}</span>
                          <span className="text-profit ml-4">{pool.apy} APY</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPool && (
                <>
                  <Separator />
                  
                  {/* Token 1 Input */}
                  <div className="space-y-2">
                    <Label htmlFor="token1">Token 1 Amount</Label>
                    <div className="flex gap-2">
                      <Input
                        id="token1"
                        type="number"
                        placeholder="0.0"
                        value={token1Amount}
                        onChange={(e) => setToken1Amount(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" className="px-4">
                        {selectedPool.split('-')[0].toUpperCase()}
                      </Button>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Balance: 12.45 {selectedPool.split('-')[0].toUpperCase()}</span>
                      <Button variant="link" className="h-auto p-0 text-xs">MAX</Button>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="rounded-full border-2 border-border p-2">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Token 2 Input */}
                  <div className="space-y-2">
                    <Label htmlFor="token2">Token 2 Amount</Label>
                    <div className="flex gap-2">
                      <Input
                        id="token2"
                        type="number"
                        placeholder="0.0"
                        value={token2Amount}
                        onChange={(e) => setToken2Amount(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" className="px-4">
                        {selectedPool.split('-')[1].toUpperCase()}
                      </Button>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Balance: 25,432.18 {selectedPool.split('-')[1].toUpperCase()}</span>
                      <Button variant="link" className="h-auto p-0 text-xs">MAX</Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Pool Info */}
                  <div className="bg-secondary/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Info className="h-4 w-4" />
                      Pool Information
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Current APY</div>
                        <div className="font-semibold text-profit">
                          {pools.find(p => p.value === selectedPool)?.apy}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Your Share</div>
                        <div className="font-semibold">0.00%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Pool Tokens</div>
                        <div className="font-semibold">0.000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Privacy Level</div>
                        <div className="font-semibold text-encrypted">100%</div>
                      </div>
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
                      disabled={!token1Amount || !token2Amount}
                    >
                      Add Liquidity
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AddLiquidity;