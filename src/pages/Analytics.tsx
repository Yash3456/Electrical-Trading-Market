
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { mockMarketStats } from "@/data/mockData";
import EnergySourceChart from "@/components/EnergySourceChart";

// Mock data for charts
const weeklyData = [
  { name: "Mon", energy: 24, value: 120 },
  { name: "Tue", energy: 13, value: 65 },
  { name: "Wed", energy: 29, value: 145 },
  { name: "Thu", energy: 32, value: 160 },
  { name: "Fri", energy: 18, value: 90 },
  { name: "Sat", energy: 11, value: 55 },
  { name: "Sun", energy: 22, value: 110 }
];

const monthlyData = [
  { name: "Jan", energy: 240, value: 1200 },
  { name: "Feb", energy: 138, value: 690 },
  { name: "Mar", energy: 290, value: 1450 },
  { name: "Apr", energy: 320, value: 1600 },
  { name: "May", energy: 180, value: 900 },
  { name: "Jun", energy: 286, value: 1430 },
  { name: "Jul", energy: 190, value: 950 },
  { name: "Aug", energy: 310, value: 1550 },
  { name: "Sep", energy: 172, value: 860 },
  { name: "Oct", energy: 206, value: 1030 },
  { name: "Nov", energy: 152, value: 760 },
  { name: "Dec", energy: 265, value: 1325 }
];

const priceData = [
  { date: "Jan 2023", solar: 4.2, wind: 3.8, hydro: 5.1 },
  { date: "Feb 2023", solar: 4.5, wind: 3.7, hydro: 5.2 },
  { date: "Mar 2023", solar: 4.7, wind: 3.9, hydro: 5.0 },
  { date: "Apr 2023", solar: 4.8, wind: 4.1, hydro: 4.9 },
  { date: "May 2023", solar: 5.0, wind: 4.3, hydro: 4.8 },
  { date: "Jun 2023", solar: 5.2, wind: 4.4, hydro: 4.7 },
  { date: "Jul 2023", solar: 5.4, wind: 4.6, hydro: 4.8 },
  { date: "Aug 2023", solar: 5.5, wind: 4.7, hydro: 4.9 },
  { date: "Sep 2023", solar: 5.3, wind: 4.8, hydro: 5.0 },
  { date: "Oct 2023", solar: 5.2, wind: 4.6, hydro: 5.1 },
  { date: "Nov 2023", solar: 5.0, wind: 4.5, hydro: 5.2 },
  { date: "Dec 2023", solar: 4.8, wind: 4.3, hydro: 5.3 }
];

const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState("week");
  
  const displayData = timeRange === "week" ? weeklyData : monthlyData;
  
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Insights and statistics about energy trading
        </p>
      </div>
      
      <div className="flex justify-end">
        <Select defaultValue="week" onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Weekly</SelectItem>
            <SelectItem value="month">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="energy">
        <TabsList className="mb-4">
          <TabsTrigger value="energy">Energy Trading</TabsTrigger>
          <TabsTrigger value="price">Price Analysis</TabsTrigger>
          <TabsTrigger value="sources">Energy Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="energy">
          <Card>
            <CardHeader>
              <CardTitle>Energy Trading Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={displayData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} kWh`, 'Energy']} />
                    <Legend />
                    <Bar dataKey="energy" name="Energy (kWh)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="price">
          <Card>
            <CardHeader>
              <CardTitle>Energy Prices by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={priceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} tokens/kWh`, 'Price']} />
                    <Legend />
                    <Line type="monotone" dataKey="solar" name="Solar" stroke="#FBBF24" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="wind" name="Wind" stroke="#0EA5E9" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="hydro" name="Hydro" stroke="#06B6D4" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnergySourceChart />
            
            <Card>
              <CardHeader>
                <CardTitle>Transaction Value by Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={displayData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} tokens`, 'Value']} />
                      <Legend />
                      <Bar dataKey="value" name="Value (Tokens)" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
