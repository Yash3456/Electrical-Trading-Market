
import React from "react";
import { Transaction } from "@/types/energy";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface TransactionsTableProps {
  transactions: Transaction[];
  userAddress?: string;
}

const TransactionsTable = ({ transactions, userAddress }: TransactionsTableProps) => {
  const getStatusColor = (status: Transaction['status']) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const isBuyer = userAddress && transaction.buyer === userAddress;
          const isSeller = userAddress && transaction.seller === userAddress;
          const type = isBuyer ? 'buy' : 'sell';
          
          return (
            <TableRow key={transaction.id}>
              <TableCell className="font-mono text-xs">
                {transaction.id.substring(0, 8)}...
              </TableCell>
              <TableCell>
                {type === 'buy' ? (
                  <div className="flex items-center">
                    <ArrowDownLeft className="mr-1 h-4 w-4 text-energy-green" />
                    <span>Buy</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4 text-energy-blue" />
                    <span>Sell</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                {isBuyer ? formatAddress(transaction.seller) : formatAddress(transaction.buyer)}
              </TableCell>
              <TableCell className="text-right">
                {transaction.energyAmount} kWh
              </TableCell>
              <TableCell className="text-right">
                {transaction.price} Tokens
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {formatDate(transaction.timestamp)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
