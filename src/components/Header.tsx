import { Shield } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-encrypted" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CipherLend
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-smooth">
              Dashboard
            </a>
            <a href="/pools" className="text-muted-foreground hover:text-foreground transition-smooth">
              Pools
            </a>
            <a href="/analytics" className="text-muted-foreground hover:text-foreground transition-smooth">
              Analytics
            </a>
          </nav>

          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;