import { Card } from "@/components/ui/card";

interface RiskGaugeProps {
  title: string;
  value: number;
  max: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

const RiskGauge = ({ title, value, max, riskLevel, description }: RiskGaugeProps) => {
  const percentage = (value / max) * 100;
  
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low': return 'text-risk-low';
      case 'medium': return 'text-risk-medium';
      case 'high': return 'text-risk-high';
      default: return 'text-muted-foreground';
    }
  };

  const getGaugeColor = () => {
    switch (riskLevel) {
      case 'low': return 'stroke-risk-low';
      case 'medium': return 'stroke-risk-medium';
      case 'high': return 'stroke-risk-high';
      default: return 'stroke-muted-foreground';
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className={`text-sm font-medium ${getRiskColor()}`}>
          {riskLevel.toUpperCase()}
        </span>
      </div>
      
      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${percentage * 2.51} 251`}
              className={`${getGaugeColor()} transition-all duration-500`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">{value}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold mb-1">{percentage.toFixed(1)}%</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};

export default RiskGauge;