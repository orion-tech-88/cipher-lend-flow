import { EncryptedDataForm } from '@/components/EncryptedDataForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Key, Shield, Eye, Database, Zap } from 'lucide-react';

export default function EncryptedDataPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Lock className="h-10 w-10 text-primary" />
              <Key className="h-8 w-8 text-encrypted" />
              Encrypted Data Submission
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Submit your financial data with complete privacy protection using Fully Homomorphic Encryption (FHE)
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your financial data is encrypted using FHE technology, ensuring complete privacy while maintaining blockchain transparency.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-encrypted" />
                On-Chain Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Encrypted data is stored on the blockchain, providing immutability and verifiability without compromising privacy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-profit" />
                Real-Time Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                FHE operations are performed in real-time, allowing for instant encrypted computations on your data.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Encryption Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              How FHE Encryption Works
            </CardTitle>
            <CardDescription>
              Understanding the encryption process that protects your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Data Input</h3>
                <p className="text-sm text-muted-foreground">Enter your financial data</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-encrypted/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-encrypted font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">FHE Encryption</h3>
                <p className="text-sm text-muted-foreground">Data encrypted with FHE</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-foreground font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Proof Generation</h3>
                <p className="text-sm text-muted-foreground">Generate verification proofs</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-profit/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-profit font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Blockchain Submit</h3>
                <p className="text-sm text-muted-foreground">Submit to blockchain</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge variant="outline" className="px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            FHE Encrypted
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Lock className="h-4 w-4 mr-2" />
            Zero-Knowledge
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Key className="h-4 w-4 mr-2" />
            Privacy-First
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Database className="h-4 w-4 mr-2" />
            On-Chain
          </Badge>
        </div>

        {/* Main Form */}
        <EncryptedDataForm />
      </div>
    </div>
  );
}
