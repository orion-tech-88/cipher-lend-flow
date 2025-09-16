import { Lock, Key } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Lock className="h-8 w-8 text-primary" />
                <Key className="h-4 w-4 text-encrypted absolute -top-1 -right-1" />
              </div>
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
            <a href="/encrypted-data" className="text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1">
              <Lock className="h-4 w-4" />
              Encrypt Data
            </a>
          </nav>

          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;