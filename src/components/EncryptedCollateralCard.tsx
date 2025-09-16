import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";

const EncryptedCollateralCard = () => {
  const collateralData = [
    {
      id: "0x1a2b...4f5g",
      ratio: "***%",
      healthFactor: "Healthy",
      status: "encrypted"
    },
    {
      id: "0x2c3d...6h7i", 
      ratio: "***%",
      healthFactor: "Stable",
      status: "encrypted"
    },
    {
      id: "0x4e5f...8j9k",
      ratio: "***%", 
      healthFactor: "At Risk",
      status: "encrypted"
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Healthy': return 'bg-profit/20 text-profit border-profit/30';
      case 'Stable': return 'bg-risk-medium/20 text-risk-medium border-risk-medium/30';
      case 'At Risk': return 'bg-risk-high/20 text-risk-high border-risk-high/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-encrypted" />
          <h2 className="text-xl font-bold">Encrypted Collateral Overview</h2>
        </div>
        <Badge variant="secondary" className="bg-encrypted/20 text-encrypted border-encrypted/30">
          Privacy Protected
        </Badge>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-secondary/20">
        <div className="text-center">
          <div className="text-2xl font-bold text-profit mb-1">156%</div>
          <div className="text-sm text-muted-foreground">Avg Collateral</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">1.4</div>
          <div className="text-sm text-muted-foreground">Avg Health Factor</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-encrypted mb-1">100%</div>
          <div className="text-sm text-muted-foreground">Positions Encrypted</div>
        </div>
      </div>

      {/* Individual Positions (Anonymized) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Individual Positions</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Identities Protected</span>
          </div>
        </div>

        {collateralData.map((position, index) => (
          <div key={position.id} className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:bg-secondary/10 transition-smooth">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <EyeOff className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm text-muted-foreground">{position.id}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-mono text-encrypted">{position.ratio}</div>
                <div className="text-xs text-muted-foreground">Ratio</div>
              </div>
              
              <Badge className={`${getHealthColor(position.healthFactor)} text-xs`}>
                {position.healthFactor}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-encrypted/5 border border-encrypted/20">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-encrypted mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <span className="text-encrypted font-medium">Zero-Knowledge Privacy:</span>
            <span className="text-muted-foreground ml-1">
              Individual collateral ratios are cryptographically hidden while maintaining system-wide transparency and solvency verification.
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EncryptedCollateralCard;