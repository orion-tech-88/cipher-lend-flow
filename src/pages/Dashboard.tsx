import LendingRatesCard from "@/components/LendingRatesCard";
import EncryptedCollateralCard from "@/components/EncryptedCollateralCard";
import LiquidityPoolsCard from "@/components/LiquidityPoolsCard";
import RiskGauge from "@/components/RiskGauge";
import Header from "@/components/Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dashboard Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Protocol Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitor lending rates, risk metrics, and liquidity in real-time while maintaining complete privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <RiskGauge 
              title="System Health"
              value={142}
              max={200}
              riskLevel="low"
              description="Overall protocol stability"
            />
            <RiskGauge 
              title="Liquidation Risk" 
              value={23}
              max={100}
              riskLevel="medium"
              description="Positions at risk of liquidation"
            />
            <RiskGauge 
              title="Privacy Score"
              value={100}
              max={100} 
              riskLevel="low"
              description="Zero-knowledge protection level"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-8">
              <LendingRatesCard />
              <LiquidityPoolsCard />
            </div>
            <div>
              <EncryptedCollateralCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;