import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Plus } from "lucide-react";

interface LiquidityPool {
  name: string;
  tvl: string;
  apy: number;
  utilization: number;
  risk: 'low' | 'medium' | 'high';
}

const liquidityPools: LiquidityPool[] = [
  {
    name: "Stable Pool",
    tvl: "$45.2M",
    apy: 4.8,
    utilization: 78,
    risk: 'low'
  },
  {
    name: "ETH Pool",
    tvl: "$67.8M", 
    apy: 6.2,
    utilization: 65,
    risk: 'medium'
  },
  {
    name: "BTC Pool",
    tvl: "$28.4M",
    apy: 5.1,
    utilization: 72,
    risk: 'low'
  },
  {
    name: "Alt Pool",
    tvl: "$12.7M",
    apy: 8.9,
    utilization: 85,
    risk: 'high'
  }
];

const LiquidityPoolsCard = () => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-risk-low/20 text-risk-low border-risk-low/30';
      case 'medium': return 'bg-risk-medium/20 text-risk-medium border-risk-medium/30';
      case 'high': return 'bg-risk-high/20 text-risk-high border-risk-high/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Droplets className="h-5 w-5 text-liquidity" />
          <h2 className="text-xl font-bold">Liquidity Pools</h2>
        </div>
        <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          Add Liquidity
        </Button>
      </div>

      <div className="grid gap-4">
        {liquidityPools.map((pool) => (
          <div key={pool.name} className="p-4 rounded-lg border border-border/30 hover:bg-secondary/10 transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-liquidity/20 rounded-full flex items-center justify-center">
                  <Droplets className="h-4 w-4 text-liquidity" />
                </div>
                <div>
                  <h3 className="font-semibold">{pool.name}</h3>
                  <p className="text-sm text-muted-foreground">{pool.tvl} TVL</p>
                </div>
              </div>
              <Badge className={getRiskColor(pool.risk)}>
                {pool.risk.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-profit">{pool.apy}%</div>
                <div className="text-xs text-muted-foreground">APY</div>
              </div>
              <div>
                <div className="text-lg font-bold">{pool.utilization}%</div>
                <div className="text-xs text-muted-foreground">Utilization</div>
              </div>
              <div>
                <Button variant="outline" size="sm" className="w-full">
                  Deposit
                </Button>
              </div>
            </div>

            {/* Utilization Bar */}
            <div className="mt-3">
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div 
                  className="bg-liquidity h-2 rounded-full transition-all duration-500"
                  style={{ width: `${pool.utilization}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-liquidity/5 border border-liquidity/20">
        <p className="text-sm text-muted-foreground">
          <span className="text-liquidity font-medium">Open Liquidity:</span> All pool metrics are transparent while individual positions remain private through zero-knowledge proofs.
        </p>
      </div>
    </Card>
  );
};

export default LiquidityPoolsCard;