import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface LendingRate {
  asset: string;
  supplyAPY: number;
  borrowAPY: number;
  totalSupply: string;
  totalBorrow: string;
  change24h: number;
}

const lendingRates: LendingRate[] = [
  {
    asset: "USDC",
    supplyAPY: 4.2,
    borrowAPY: 6.8,
    totalSupply: "$45.2M",
    totalBorrow: "$23.1M",
    change24h: 0.3
  },
  {
    asset: "ETH",
    supplyAPY: 2.8,
    borrowAPY: 4.5,
    totalSupply: "$67.8M",
    totalBorrow: "$34.2M",
    change24h: -0.1
  },
  {
    asset: "WBTC",
    supplyAPY: 1.9,
    borrowAPY: 3.2,
    totalSupply: "$28.4M",
    totalBorrow: "$15.7M",
    change24h: 0.2
  },
  {
    asset: "DAI",
    supplyAPY: 3.8,
    borrowAPY: 5.9,
    totalSupply: "$32.1M",
    totalBorrow: "$18.9M",
    change24h: 0.5
  }
];

const LendingRatesCard = () => {
  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Lending Rates</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="space-y-4">
        {lendingRates.map((rate) => (
          <div key={rate.asset} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-smooth">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="font-semibold text-primary">{rate.asset.slice(0, 2)}</span>
              </div>
              <div>
                <div className="font-semibold">{rate.asset}</div>
                <div className="text-sm text-muted-foreground">{rate.totalSupply} supplied</div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-profit font-semibold">{rate.supplyAPY}%</span>
                <span className="text-muted-foreground text-sm">APY</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {rate.change24h > 0 ? (
                  <TrendingUp className="h-3 w-3 text-profit" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={rate.change24h > 0 ? "text-profit" : "text-destructive"}>
                  {rate.change24h > 0 ? '+' : ''}{rate.change24h}%
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-muted-foreground font-semibold">{rate.borrowAPY}%</div>
              <div className="text-xs text-muted-foreground">Borrow APY</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LendingRatesCard;