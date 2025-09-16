import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

const Analytics = () => {
  const tvlData = [
    { date: "Jan", value: 85000000 },
    { date: "Feb", value: 92000000 },
    { date: "Mar", value: 108000000 },
    { date: "Apr", value: 115000000 },
    { date: "May", value: 127000000 },
    { date: "Jun", value: 134000000 }
  ];

  const volumeData = [
    { date: "Jan", volume: 12000000 },
    { date: "Feb", volume: 15000000 },
    { date: "Mar", volume: 18000000 },
    { date: "Apr", volume: 22000000 },
    { date: "May", volume: 25000000 },
    { date: "Jun", volume: 28000000 }
  ];

  const apyData = [
    { pool: "ETH/USDC", apy: 12.4 },
    { pool: "BTC/USDT", apy: 8.7 },
    { pool: "WETH/DAI", apy: 15.2 },
    { pool: "USDC/USDT", apy: 6.1 },
    { pool: "LINK/ETH", apy: 18.9 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Protocol Analytics</h1>
            <p className="text-muted-foreground max-w-2xl">
              Comprehensive analytics and insights for the PrivateLend protocol performance.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Value Locked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-profit">$134.2M</div>
                <div className="text-sm text-profit">+8.2% from last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">24h Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">$28.5M</div>
                <div className="text-sm text-profit">+12.1% from yesterday</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Lenders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-encrypted">2,847</div>
                <div className="text-sm text-profit">+156 this week</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg APY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">11.8%</div>
                <div className="text-sm text-muted-foreground">Across all pools</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Tabs defaultValue="tvl" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tvl">Total Value Locked</TabsTrigger>
              <TabsTrigger value="volume">Trading Volume</TabsTrigger>
              <TabsTrigger value="apy">Pool APY Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tvl">
              <Card>
                <CardHeader>
                  <CardTitle>Total Value Locked Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={tvlData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                      <Tooltip formatter={(value) => [`$${(Number(value) / 1000000).toFixed(1)}M`, 'TVL']} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="volume">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trading Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                      <Tooltip formatter={(value) => [`$${(Number(value) / 1000000).toFixed(1)}M`, 'Volume']} />
                      <Line 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="hsl(var(--encrypted))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--encrypted))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="apy">
              <Card>
                <CardHeader>
                  <CardTitle>Current Pool APY Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={apyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="pool" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, 'APY']} />
                      <Bar 
                        dataKey="apy" 
                        fill="hsl(var(--profit))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Analytics;