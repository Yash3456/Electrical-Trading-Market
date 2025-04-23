
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Lock } from "lucide-react";

const BlockchainVisualizer = () => {
  // Mock blocks for visualization
  const blocks = [
    { id: "0x8f23", transactions: 3, timestamp: Date.now() - 900000 },
    { id: "0x9e45", transactions: 5, timestamp: Date.now() - 600000 },
    { id: "0xa712", transactions: 2, timestamp: Date.now() - 300000 },
    { id: "0xb483", transactions: 4, timestamp: Date.now() }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Blockchain Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 blockchain-grid rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            {blocks.map((block, index) => (
              <React.Fragment key={block.id}>
                <div 
                  className="flex flex-col items-center justify-center w-40 h-32 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <Lock className="h-5 w-5 text-energy-blue mb-2" />
                  <div className="font-mono text-xs truncate mb-1">{block.id}</div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {block.transactions} transactions
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(block.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                
                {index < blocks.length - 1 && (
                  <div className="hidden md:block">
                    <Link2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-energy-green bg-opacity-20 text-energy-green animate-pulse-slow">
              <span className="w-1.5 h-1.5 rounded-full bg-energy-green mr-1.5"></span>
              Active Network • Last block 32 seconds ago
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainVisualizer;
