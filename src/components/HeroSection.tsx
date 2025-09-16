import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-encrypted/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-8">
            <Shield className="h-4 w-4" />
            Privacy-First DeFi Protocol
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Encrypted Collateral,
            </span>
            <br />
            <span className="text-foreground">Open Liquidity</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Borrower collateral ratios are encrypted so lenders cannot target individuals, 
            but the system ensures complete solvency and transparency.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
              onClick={() => navigate('/start-lending')}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Start Lending
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 hover:bg-secondary transition-smooth"
              onClick={() => navigate('/encrypted-data')}
            >
              <Lock className="mr-2 h-5 w-5" />
              Encrypt Data
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 hover:bg-secondary transition-smooth"
              onClick={() => navigate('/dashboard')}
            >
              <Shield className="mr-2 h-5 w-5" />
              Explore Protocol
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-profit mb-2">$127M+</div>
              <div className="text-muted-foreground">Total Value Locked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">8.4%</div>
              <div className="text-muted-foreground">Average APY</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-encrypted mb-2">100%</div>
              <div className="text-muted-foreground">Privacy Protected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;