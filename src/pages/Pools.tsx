import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Plus, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pools = () => {
  const navigate = useNavigate();

  const pools = [
    {
      name: "ETH/USDC",
      apy: "12.4%",
      tvl: "$45.2M",
      volume24h: "$2.1M",
      risk: "Low",
      available: true
    },
    {
      name: "BTC/USDT",
      apy: "8.7%",
      tvl: "$32.8M",
      volume24h: "$1.8M",
      risk: "Low",
      available: true
    },
    {
      name: "WETH/DAI",
      apy: "15.2%",
      tvl: "$18.5M",
      volume24h: "$950K",
      risk: "Medium",
      available: true
    },
    {
      name: "USDC/USDT",
      apy: "6.1%",
      tvl: "$67.3M",
      volume24h: "$3.2M",
      risk: "Very Low",
      available: true
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low": return "text-profit";
      case "Low": return "text-profit";
      case "Medium": return "text-warning";
      case "High": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">Liquidity Pools</h1>
              <p className="text-muted-foreground max-w-2xl">
                Provide liquidity to earn fees and rewards while maintaining privacy protection.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/add-liquidity')}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Liquidity
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pools.map((pool, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{pool.name}</CardTitle>
                      <Badge variant="outline" className={getRiskColor(pool.risk)}>
                        {pool.risk} Risk
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-profit">{pool.apy}</div>
                      <div className="text-sm text-muted-foreground">APY</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Value Locked</div>
                      <div className="font-semibold">{pool.tvl}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">24h Volume</div>
                      <div className="font-semibold">{pool.volume24h}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => navigate('/add-liquidity')}
                      className="flex-1"
                      variant="outline"
                    >
                      <Droplets className="mr-2 h-4 w-4" />
                      Add Liquidity
                    </Button>
                    <Button 
                      onClick={() => navigate('/start-lending')}
                      className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Start Lending
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pools;